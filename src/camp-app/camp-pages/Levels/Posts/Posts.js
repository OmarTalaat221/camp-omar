import { Button, Dropdown, Modal, Table } from "antd";
import Breadcrumbs from "../../../../component/common/breadcrumb/breadcrumb";
import "./style.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../../Api/baseUrl";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FaEllipsisVertical,
  FaEye,
  FaEyeSlash,
  FaFilePen,
  FaPlus,
  FaTrash,
} from "react-icons/fa6";
import { toast } from "react-toastify";
import { imageUploader } from "../../camp-utils";
import { Spinner } from "react-bootstrap";
export default function Posts() {
  const { levelId } = useParams();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [addModal, setAddModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [postData, setPostData] = useState({
    post_text: "",
    post_images: "",
  });
  const [images, setImages] = useState([]);
  const [additionalInputs, setAdditionalInputs] = useState([
    {
      id: Date.now(),
      imgFile: null,
      imgUrl: "",
    },
  ]);
  const [showHideModal, setShowHideModal] = useState(false);
  const [rowData, setRowData] = useState({});
  const [addLoading, setAddLoading] = useState(false);
  const columns = [
    {
      id: "post_id",
      title: "ID",
      dataIndex: "post_id",
    },
    {
      id: "post_text",
      title: "Post Text",
      dataIndex: "post_text",
    },
    {
      title: "Actions",
      render: (text, row) => {
        const items = [
          {
            key: 1,
            label: (
              <Link
                to={`${process.env.PUBLIC_URL}/posts/${row?.post_id}/postDetails`}
                className="btn btn-primary text-white"
                // onClick={() =>
                //   navigate(
                //     `${process.env.PUBLIC_URL}/posts/${row?.post_id}/postDetails`
                //   )
                // }
              >
                View Post
              </Link>
            ),
          },
          {
            key: 2,
            label: (
              <button
                className="btn btn-primary"
                style={{ width: "100%" }}
                onClick={() => {
                  setRowData(row);
                  setEditModal(true);
                }}
              >
                Edit Post
              </button>
            ),
          },
        ];
        return (
          <div className="d-flex gap-3 align-items-center">
            {row?.hidden == "1" && (
              <FaEyeSlash
                onClick={() => {
                  setRowData(row);
                  setShowHideModal(true);
                }}
                className="hide_content"
              />
            )}
            {row?.hidden == "0" && (
              <FaEye
                onClick={() => {
                  setRowData(row);
                  setShowHideModal(true);
                }}
                className="visible_content"
              />
            )}
            <Dropdown
              menu={{
                items,
              }}
              placement="bottom"
            >
              <Button
                style={{ display: "flex", flexDirection: "column", gap: "3px" }}
              >
                <FaEllipsisVertical />
              </Button>
            </Dropdown>
          </div>
        );
      },
    },
  ];

  function handleGetAllPosts() {
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

  function handleShowHideLevel() {
    const data_send = {
      post_id: rowData?.post_id,
    };

    axios
      .post(BASE_URL + "/admin/content/show_hide_post.php", data_send)
      .then((res) => {
        if (res?.data?.status == "success") {
          handleGetAllPosts();
          toast.success(res?.data?.message);
          setShowHideModal(false);
        } else {
          toast.error(res?.data?.message || "There's a problem");
        }
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setShowHideModal(false);
      });
  }

  useEffect(() => {
    handleGetAllPosts();
  }, []);

  async function handleAddPost(e) {
    e.preventDefault();
    if (!postData?.post_text) {
      toast.error("Post text is required!");
      return;
    }

    if (!additionalInputs.some((input) => input.imgFile)) {
      toast.error("At least one image is required!");
      return;
    }

    setAddLoading(true);
    const imagsData = await Promise.all(
      additionalInputs.map(async (item) => {
        const formData = new FormData();
        if (item?.imgFile) {
          formData.append("image", item.imgFile);
          const response = await imageUploader(formData);
          return response?.data?.message;
        }
        return null;
      })
    );

    const validateImgs = imagsData.filter(Boolean);
    if (validateImgs.length > 0) {
      const data_send = {
        post_text: postData?.post_text,
        post_images: validateImgs.join("**camp**"),
      };

      axios
        .post(BASE_URL + "/admin/content/add_post.php", data_send)
        .then((res) => {
          if (res?.data?.status == "success") {
            handleGetAllPosts();

            setPostData({
              post_text: "",
              post_images: "",
            });
            setAdditionalInputs([
              { id: Date.now(), imgFile: null, imgUrl: "" },
            ]);
            setImages([]);

            toast.success(res?.data?.message);
            setAddLoading(false);

            setAddModal(false);
          } else {
            toast.error(res?.data?.message || "There's a problem");
          }
        })
        .catch((e) => console.log(e))
        .finally(() => {
          setAddLoading(false);
          setAddModal(false);
        });
    } else {
      toast.error("There's a problem while uploading image");
    }
  }

  function handleAddInput() {
    setAdditionalInputs([
      ...additionalInputs,
      { id: Date.now(), imgFile: null, imgUrl: "" }, // Unique ID for each input
    ]);
  }

  function handleRemoveInput(id) {
    setAdditionalInputs(additionalInputs.filter((input) => input.id !== id));
  }

  function handleInputChange(id, file) {
    setAdditionalInputs(
      additionalInputs.map((input) =>
        input.id === id
          ? { ...input, imgFile: file, imgUrl: URL.createObjectURL(file) }
          : input
      )
    );
  }

  function handleDeletePost() {
    const data_send = {};
  }

  function handleEditPost(e) {
    e.preventDefault();
    const data_send = {
      post_id: rowData?.post_id,
      post_text: rowData?.post_text,
    };
    setEditLoading(true);
    axios
      .post(BASE_URL + "/admin/content/edit_post.php", data_send)
      .then((res) => {
        if (res?.data?.status == "success") {
          setEditLoading(false);
          setEditModal(false);
          handleGetAllPosts();
          setRowData({});
          toast.success(res?.data?.message);
        } else {
          toast.error(
            res?.data?.message || "There's a proble while editing post text"
          );
        }
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setEditLoading(false);
        setEditModal(false);
      });
  }

  return (
    <>
      <Breadcrumbs parent="Levels" title="Posts" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>Level Posts</h5>
              </div>

              <div className="card-body">
                <button
                  className="btn btn-primary my-3"
                  onClick={() => setAddModal(true)}
                >
                  Add Post
                </button>
                <Table columns={columns} dataSource={posts} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        title="Show/ Hide Post"
        open={showHideModal}
        onCancel={() => setShowHideModal(false)}
        footer={[
          <Button type="primary" key="submit" onClick={handleShowHideLevel}>
            Yes
          </Button>,
          <Button type="" key="cancel" onClick={() => setShowHideModal(false)}>
            No
          </Button>,
        ]}
      >
        <p>
          Are you sure you want to {rowData?.hidden == "1" ? "show" : "hide"}{" "}
          the Following post:
          <br />
          <strong>{rowData?.post_text}</strong>
        </p>
      </Modal>

      <Modal
        title="Delete Post"
        open={deleteModal}
        onCancel={() => setDeleteModal(false)}
        footer={[
          <Button type="primary" key="submit" onClick={handleDeletePost}>
            Yes
          </Button>,
          <Button type="" key="cancel" onClick={() => setDeleteModal(false)}>
            No
          </Button>,
        ]}
      >
        <p>
          Are you sure you want to delete the Following post:
          <br />
          <strong>{rowData?.post_text}</strong>
        </p>
      </Modal>

      <Modal
        title="Add Post"
        onCancel={() => setAddModal(false)}
        open={addModal}
        footer={[
          <Button type="primary" key="submit" onClick={handleAddPost}>
            {addLoading ? (
              <Spinner style={{ width: "10px", height: "10px" }} />
            ) : (
              "Add"
            )}
          </Button>,
          <Button type="" key="cancel" onClick={() => setAddModal(false)}>
            cancel
          </Button>,
        ]}
      >
        <form onSubmit={handleAddPost}>
          <div className="form_field">
            <label className="form_label">Post Text</label>
            <input
              type="text"
              value={postData?.post_text}
              className="form_input"
              onChange={(e) =>
                setPostData({ ...postData, post_text: e.target.value })
              }
            />
          </div>

          <div
            className="form_field my-4 d-flex"
            style={{ flexDirection: "column", gap: "5px" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <label className="form_label">Post Image</label>
              <FaPlus style={{ fontSize: "20px" }} onClick={handleAddInput} />
            </div>

            {additionalInputs.map((inp, index) => (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <div className="d-flex justify-content-between align-items-center gap-3">
                  <input
                    required
                    defaultValue={inp?.imgFile}
                    onChange={(e) =>
                      handleInputChange(inp.id, e.target.files[0])
                    }
                    type="file"
                    className="form_input"
                    style={{ border: "1px solid #000" }}
                  />
                  {index !== 0 && (
                    <FaTrash
                      style={{ color: "red" }}
                      onClick={() => handleRemoveInput(inp?.id)}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </form>
      </Modal>

      <Modal
        title="Edit Post"
        onCancel={() => setEditModal(false)}
        open={editModal}
        footer={[
          <Button type="primary" key="submit" onClick={handleEditPost}>
            {editLoading ? <Spinner animation="border" size="sm" /> : "Edit"}
          </Button>,
          <Button type="" key="cancel" onClick={() => setEditModal(false)}>
            cancel
          </Button>,
        ]}
      >
        <form onSubmit={handleEditPost}>
          <div className="form_field">
            <label className="form_label">Post Text</label>
            <input
              type="text"
              value={rowData?.post_text}
              className="form_input"
              onChange={(e) =>
                setRowData({ ...rowData, post_text: e.target.value })
              }
            />
          </div>
        </form>
      </Modal>
    </>
  );
}
