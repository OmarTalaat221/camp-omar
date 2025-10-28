import { Button, Modal, Table } from "antd";
import Breadcrumbs from "../../../../component/common/breadcrumb/breadcrumb";
import "./style.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { FaEye, FaEyeSlash, FaFilePen, FaTrash } from "react-icons/fa6";
import axios from "axios";
import { BASE_URL } from "../../../../Api/baseUrl";
import { toast } from "react-toastify";
import { relativeValue } from "react-range";
import { imageUploader } from "../../camp-utils";
import TimeInput from "../../camp-utils/timer";
export default function Videos() {
  const { section_id } = useParams();
  const [addModal, setAddModal] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [showHideModal, setShowHideModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [rowData, setRowData] = useState({});
  const [videos, setVideos] = useState([]);
  const [imgs, setImgs] = useState({
    file: null,
    url: "",
  });
  const [time, setTime] = useState("");
  const [videoData, setVideoData] = useState({
    section_id: section_id,
    video_player_id: "",
    duration: "",
    video_title: "",
    video_description: "",
    video_image_link: "",
  });

  const columns = [
    {
      id: "video_id",
      dataIndex: "video_id",
      title: "#",
    },
    {
      id: "video_image_link",
      dataIndex: "video_image_link",
      title: "Image",
      render: (text, row) => (
        <img
          style={{ width: "100px", height: "100px", borderRadius: "10px" }}
          src={row?.video_image_link}
        />
      ),
    },
    {
      id: "video_title",
      dataIndex: "video_title",
      title: "video title",
    },
    {
      id: "video_description",
      dataIndex: "video_description",
      title: "video description",
    },
    {
      id: "duration",
      dataIndex: "duration",
      title: "duration",
      render: (text, row) => {
        const [hour, minute, second] = row?.duration?.split(":")?.map(Number);
        let result = "";
        if (hour > 0) {
          result += `${hour} hour${hour > 1 ? "s" : ""} `;
        }
        if (minute > 0) {
          result += `${minute} minute${minute > 1 ? "s" : ""} `;
        }
        if (second > 0) {
          result += `${second} second${second > 1 ? "s" : ""}`;
        }
        return <p>{result}</p>;
      },
    },
    {
      id: "video_pass",
      dataIndex: "video_pass",
      title: "video pass",
    },
    {
      title: "Actions",
      render: (text, row) => (
        <div className="d-flex gap-3 align-items-center">
          <button
            onClick={() => {
              console.log(row);
              setRowData(row);
              setEditModal(true);
            }}
            className="btn btn-primary"
          >
            Edit Video
          </button>
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
        </div>
      ),
    },
  ];

  function handleGetAllVideos() {
    const data_send = {
      section_id: section_id,
    };
    axios
      .post(BASE_URL + "/admin/content/select_videos.php", data_send)
      .then((res) => {
        if (res?.data?.status == "success") {
          setVideos(res?.data?.message);
        }
      });
  }

  async function handleAddVideo(e) {
    e.preventDefault();
    if (!videoData?.video_title) {
      toast.warn("please enter title first!");
      return;
    }

    if (!imgs?.file) {
      toast.warn("please enter image first!");
      return;
    }

    if (!videoData?.duration) {
      toast.warn("please enter duration first!");
      return;
    }

    if (!videoData?.video_player_id) {
      toast.warn("please enter video player id first!");
      return;
    }

    setAddLoading(true);
    const formData = new FormData();
    formData.append("image", imgs?.file);
    const resImg = await imageUploader(formData);
    if (resImg?.data?.status == "success") {
      const data_send = {
        ...videoData,
        video_image_link: resImg?.data?.message,
      };

      axios
        .post(BASE_URL + "/admin/content/add_videos.php", data_send)
        .then((res) => {
          if (res?.data?.status == "success") {
            toast.success(res?.data?.message);
            handleGetAllVideos();
            setAddLoading(false);
            setAddModal(false);
            setImgs({ file: null, url: "" });
            setVideoData({
              section_id: section_id,
              video_player_id: "",
              duration: "00:00:00",
              video_title: "",
              video_description: "",
              video_image_link: "",
            });
          } else {
            toast.error(res?.data.message || "There's a problem");
          }
        })
        .catch((e) => console.log(e))
        .finally(() => {
          setAddLoading(false);
          setAddModal(false);
        });
    } else {
      toast.error(
        resImg?.data?.message || "There is an issue with uploading the image"
      );
    }
  }

  function handleShowHideLevel() {
    const data_send = {
      video_id: rowData?.video_id,
    };

    axios
      .post(BASE_URL + "/admin/content/show_hide_video.php", data_send)
      .then((res) => {
        if (res?.data?.status == "success") {
          handleGetAllVideos();
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

  async function handleEditVideo(e) {
    e.preventDefault();
    console.log(rowData);

    setEditLoading(true);
    if (imgs?.file) {
      const formData = new FormData();
      formData.append("image", imgs?.file);
      const resImg = await imageUploader(formData);

      if (resImg?.data?.status == "success") {
        const data_send = {
          ...rowData,
          video_image_link: resImg?.data?.message,
        };

        axios
          .post(BASE_URL + "/admin/content/edit_video.php", data_send)
          .then((res) => {
            if (res?.data?.status == "success") {
              toast.success(res?.data?.message);
              handleGetAllVideos();
              setRowData({});
              setEditLoading(false);
              setEditModal(false);
              setImgs({ file: null, url: "" });
            } else {
              toast.error(res?.data?.message || "There's a problem");
            }
          })
          .catch((e) => console.log(e))
          .finally(() => {
            setEditLoading(false);
            setEditModal(false);
          });
      } else {
        toast.error(
          resImg?.data?.message || "There is an issue with uploading the image"
        );
      }
    } else {
      const data_send = {
        ...rowData,
      };

      axios
        .post(BASE_URL + "/admin/content/edit_video.php", data_send)
        .then((res) => {
          if (res?.data?.status == "success") {
            toast.success(res?.data?.message);
            handleGetAllVideos();
            setRowData({});
            setEditLoading(false);
            setEditModal(false);
            setImgs({ file: null, url: "" });
          } else {
            toast.error(res?.data?.message || "There's a problem");
          }
        })
        .catch((e) => console.log(e))
        .finally(() => {
          setEditLoading(false);
          setEditModal(false);
        });
    }
  }

  const handleInputChange = (event) => {
    const value = event.target.value;

    if (/^[0-9:]*$/.test(value) && value.length <= 11) {
      let formattedValue = value.replace(/[^0-9:]/g, "");

      if (formattedValue.length > 2 && formattedValue[2] !== ":") {
        formattedValue =
          formattedValue.slice(0, 2) + ":" + formattedValue.slice(2);
      }
      if (formattedValue.length > 5 && formattedValue[5] !== ":") {
        formattedValue =
          formattedValue.slice(0, 5) + ":" + formattedValue.slice(5);
      }
      if (formattedValue.length > 8 && formattedValue[8] !== ":") {
        formattedValue =
          formattedValue.slice(0, 8) + ":" + formattedValue.slice(8);
      }

      setVideoData({ ...videoData, duration: formattedValue });
      setRowData({ ...rowData, duration: formattedValue });
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Backspace") {
      const newValue = videoData?.duration?.slice(0, -1);
      setVideoData({ ...videoData, duration: newValue });
      setRowData({ ...rowData, duration: newValue });
    }
  };

  useEffect(() => {
    handleGetAllVideos();
  }, []);

  return (
    <div>
      <Breadcrumbs parent="Levels" title=" section Videos" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>section Videos</h5>
              </div>

              <div className="card-body">
                <button
                  className="btn btn-primary my-4"
                  onClick={() => setAddModal(true)}
                >
                  Add Video
                </button>
                <Table columns={columns} dataSource={videos} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        title="Show/ Hide Video"
        open={showHideModal}
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
          the Following video:
          <br />
          <strong>{rowData?.video_title}</strong>
        </p>
      </Modal>

      <Modal
        title="Add Video"
        open={addModal}
        onCancel={() => setAddModal(false)}
        footer={[
          <Button type="primary" key="submit" onClick={handleAddVideo}>
            {addLoading ? (
              <Spinner style={{ width: "15px", height: "15px" }} />
            ) : (
              "Add"
            )}
          </Button>,
          <Button key="cancel" onClick={() => setAddModal(false)}>
            Cancel
          </Button>,
        ]}
      >
        <form onSubmit={handleAddVideo}>
          <div className="form_field">
            <label className="form_label">Video Title</label>
            <input
              value={videoData?.video_title}
              type="text"
              className="form_input"
              onChange={(e) =>
                setVideoData({ ...videoData, video_title: e.target.value })
              }
            />
          </div>

          <div className="form_field">
            <label className="form_label">Video Description</label>
            <textarea
              value={videoData?.video_description}
              onChange={(e) =>
                setVideoData({
                  ...videoData,
                  video_description: e.target.value,
                })
              }
            ></textarea>
          </div>

          <div className="form_field">
            <label className="form_label">Enter Time (hh:mm:ss:ms): </label>
            <input
              className="form_input"
              type="text"
              value={videoData?.duration}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              maxLength={11}
              placeholder="00:00:00:00"
            />
          </div>

          <div className="form_field">
            <label className="form_label">Video Player Id</label>
            <input
              value={videoData?.video_player_id}
              type="number"
              onWheel={(e) => e.target.blur()}
              className="form_input"
              onChange={(e) =>
                setVideoData({ ...videoData, video_player_id: e.target.value })
              }
            />
          </div>

          <div className="form_field">
            <label className="form_label">Video Image</label>
            <input
              type="file"
              className="form_input"
              onChange={(e) => {
                setImgs({
                  file: e.target.files[0],
                  url: URL.createObjectURL(e.target.files[0]),
                });
              }}
            />
          </div>

          {imgs?.url && (
            <div className="d-flex align-items-center gap-3">
              <img
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "10px",
                }}
                src={imgs?.url}
              />

              <FaTrash
                className="delete_icon"
                onClick={() => {
                  setImgs({
                    file: null,
                    url: "",
                  });
                }}
              />
            </div>
          )}
        </form>
      </Modal>

      <Modal
        title="Edit Video"
        open={editModal}
        onCancel={() => setEditModal(false)}
        footer={[
          <Button type="primary" key="submit" onClick={handleEditVideo}>
            {editLoading ? (
              <Spinner style={{ width: "15px", height: "15px" }} />
            ) : (
              "Edit"
            )}
          </Button>,
          <Button key="cancel" onClick={() => setEditModal(false)}>
            Cancel
          </Button>,
        ]}
      >
        <form onSubmit={handleEditVideo}>
          <div className="form_field">
            <label className="form_label">Video Title</label>
            <input
              value={rowData?.video_title}
              type="text"
              className="form_input"
              onChange={(e) =>
                setRowData({ ...rowData, video_title: e.target.value })
              }
            />
          </div>

          <div className="form_field">
            <label className="form_label">Video Description</label>
            <textarea
              value={rowData?.video_description}
              onChange={(e) =>
                setRowData({ ...rowData, video_description: e.target.value })
              }
            ></textarea>
          </div>
          <div className="form_field">
            <label className="form_label">Enter Time (hh:mm:ss:ms): </label>
            <input
              className="form_input"
              type="text"
              value={rowData?.duration}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              maxLength={11}
              placeholder="00:00:00:00"
            />
          </div>

          <div className="form_field">
            <label className="form_label">Video Player Id</label>
            <input
              value={rowData?.video_player_id}
              type="number"
              onWheel={(e) => e.target.blur()}
              className="form_input"
              onChange={(e) =>
                setRowData({ ...rowData, video_player_id: e.target.value })
              }
            />
          </div>

          <div className="form_field">
            <label className="form_label">Video Image</label>
            <input
              type="file"
              className="form_input"
              onChange={(e) => {
                setImgs({
                  file: e.target.files[0],
                  url: URL.createObjectURL(e.target.files[0]),
                });
              }}
            />
          </div>

          {(imgs?.url || rowData?.video_image_link) && (
            <img
              style={{ width: "150px", height: "150px", borderRadius: "10px" }}
              src={imgs?.url || rowData?.video_image_link}
            />
          )}
        </form>
      </Modal>
    </div>
  );
}
