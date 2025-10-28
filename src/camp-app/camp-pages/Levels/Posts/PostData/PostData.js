import { useParams } from "react-router-dom";
import "./style.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../../../Api/baseUrl";
import Breadcrumbs from "../../../../../component/common/breadcrumb/breadcrumb";
import { Button, Modal } from "antd";
import { Spinner } from "reactstrap";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa6";

export default function PostData() {
  const { postId } = useParams();
  const [specificPost, setSpecificPost] = useState();
  const [posts, setPosts] = useState([]);
  const [addLoading, setAddLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [rowData, setRowData] = useState({});
  const [imgs, setImgs] = useState({
    file: null,
    url: "",
  });

  function handleGetAllPost() {
    axios
      .get(BASE_URL + "/admin/content/select_posts.php")
      .then((res) => {
        console.log(res);
        if (res?.data?.status == "success") {
          setPosts(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    const filteredData = posts.find((item) => item?.post_id == postId);
    console.log(filteredData);
    setSpecificPost(filteredData);
  }, [posts]);

  useEffect(() => {
    handleGetAllPost();
  }, []);

  function handleAddImage(e) {
    e.preventDefault();
    setAddLoading(true);

    if (!imgs?.file) {
      toast.warn("Please Upload Image first!");
      return;
    }
    const formData = new FormData();
    formData.append("image", imgs.file);
    axios
      .post(BASE_URL + "/admin/item_img_uploader.php", formData)
      .then((res) => {
        if (res?.data?.status == "success") {
          const data_send = {
            post_id: postId,
            image_link: res?.data?.message,
          };
          axios
            .post(BASE_URL + "/admin/content/add_image_post.php", data_send)
            .then((ress) => {
              if (ress?.data?.status == "success") {
                toast.success(ress?.data?.message);
                handleGetAllPost();
                setAddLoading(false);
                setAddModal(false);
                setImgs({
                  file: null,
                  url: "",
                });
              } else {
                toast.error(
                  ress?.data?.message ||
                    "There's a problem while uploading image"
                );
              }
            })
            .catch((e) => console.log(e))
            .finally(() => {
              setAddLoading(false);
              setAddModal(false);
            });
        }
      });
  }

  function handleDeleteImg() {
    const data_send = {
      image_id: rowData?.image_id,
    };
    axios
      .post(BASE_URL + "/admin/content/delete_post_image.php", data_send)
      .then((res) => {
        if (res?.data?.status == "success") {
          toast.success(res?.data?.message);
          handleGetAllPost();
          setDeleteModal(false);
        } else {
          toast.error(
            res?.data?.message || "There's a problem while deleting image"
          );
        }
      })
      .catch((e) => console.log(e))
      .finally(() => setDeleteModal(false));
  }

  return (
    <>
      <Breadcrumbs parent="Posts" title="Post Details" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>Post Details</h5>
              </div>

              <div className="card-body">
                <button
                  className="btn btn-primary my-3 mb-5"
                  onClick={() => setAddModal(true)}
                >
                  Add Post Image
                </button>
                <div>
                  <h3>Post Title</h3>
                  <p>{specificPost?.post_text}</p>
                </div>

                <div style={{ margin: "40px 0px" }}>
                  <h3>Images</h3>
                  <div className="image_grid">
                    {specificPost?.images &&
                      specificPost?.images?.length > 0 &&
                      specificPost?.images?.map((image) => (
                        <div
                          style={{
                            display: "flex",
                            position: "relative",
                            backgroundColor: "green",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <div
                            onClick={() => {
                              setRowData(image);
                              setDeleteModal(true);
                            }}
                            style={{
                              borderRadius: "3px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              position: "absolute",
                              right: "10px",
                              top: "10px",
                            }}
                          >
                            <button
                              style={{
                                padding: "5px",
                                borderRadius: "5px",
                                backgroundColor: "red",
                                color: "white",
                                border: "1px solid red",
                              }}
                            >
                              Delete
                            </button>
                          </div>
                          <img src={image?.image} style={{ width: "100%" }} />
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={addModal}
        title="Add Image"
        onCancel={() => setAddModal(false)}
        footer={[
          <Button type="primary" key="submit" onClick={handleAddImage}>
            {addLoading ? <Spinner animation="border" size="sm" /> : "Add"}
          </Button>,
          <Button type="" key="cancel" onClick={() => setAddModal(false)}>
            Cancel
          </Button>,
        ]}
      >
        <form onSubmit={handleAddImage}>
          <div className="form_field">
            <label className="form_label">Post Image</label>
            <input
              type="file"
              className="form_input"
              onChange={(e) =>
                setImgs({
                  ...imgs,
                  file: e.target.files[0],
                  url: URL.createObjectURL(e.target.files[0]),
                })
              }
            />
          </div>

          {imgs?.url && (
            <div className="d-flex gap-3 align-items-center">
              <img
                src={imgs?.url}
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
              <FaTrash
                onClick={() => {
                  setImgs({
                    file: null,
                    url: "",
                  });
                }}
                className="delete_icon"
              />
            </div>
          )}
        </form>
      </Modal>

      <Modal
        title="Delete Image"
        onCancel={() => setDeleteModal(false)}
        open={deleteModal}
        footer={[
          <Button type="primary" key="submit" onClick={handleDeleteImg}>
            Yes
          </Button>,
          <Button type="" key="cancel" onClick={() => setDeleteModal(false)}>
            No
          </Button>,
        ]}
      >
        <p>
          Are you sure you want to delete the Following image:
          <br />
          <img
            src={rowData?.image}
            style={{ width: "150px", height: "150px", borderRadius: "10px" }}
          />
        </p>
      </Modal>
    </>
  );
}
