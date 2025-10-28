import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../../component/common/breadcrumb/breadcrumb";
import { Button, Modal, Table, message } from "antd";
import { BASE_URL } from "../../../Api/baseUrl";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { FcAudioFile } from "react-icons/fc";

export default function Voices() {
  const [addModal, setAddModal] = useState(false);
  const [voice, setVoice] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [allVoices, setAllVoices] = useState([]);
  const { section_id } = useParams();
  const [audioName, setAudioName] = useState("");
  const [rowData, setRowData] = useState({});
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteLoading , setDeleteLoading] = useState(false);
  const [editLoading , setEditLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if file is an audio file
      if (!file.type.startsWith("audio/")) {
        message.error("Please upload an audio file");
        return;
      }
      setVoice(file);
    }
  };

  async function handleAddVoice() {
    if (!voice) {
      message.error("Please select a voice file");
      return;
    }

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("voice", voice);
      setIsLoading(true);
      axios
        .post(BASE_URL + "/admin/upload_voice.php", formData)
        .then((res) => {
          if (res?.data?.status == "success") {
            toast.success("The Voice Uploaded Successfully");
            const data_send = {
              section_id,
              audio_name: audioName,
              audio_link: res?.data?.message,
            };
            axios
              .post(BASE_URL + "/admin/content/add_voice.php", data_send)
              .then((res2) => {
                console.log(res2);
                if (res2?.data?.status == "success") {
                  toast.success(res2?.data?.message);
                  handleGetAllVoices();
                  setVoice(null);
                  setAudioName("");
                  setAddModal(false);
                  setIsLoading(false);
                }
              });
          } else {
            toast.error(res?.data?.message);
          }
        })
        .catch((e) => console.log(e));
    } catch (error) {
      message.error("Failed to upload voice");
      console.error("Upload error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleGetAllVoices() {
    const data_send = {
      section_id,
    };
    axios
      .post(BASE_URL + "/admin/content/select_voices.php", data_send)
      .then((res) => {
        if (res?.data?.status == "success") {
          setAllVoices(res?.data?.message);
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    if (section_id) {
      handleGetAllVoices();
    }
  }, [section_id]);
  
  function handleDeleteVoice() {
    const data_send = {
      audio_id : rowData?.audio_id
    }
    
    setDeleteLoading(true);
    axios.post(BASE_URL +"/admin/content/delete_voice.php", data_send)
    .then(res => {
      console.log(res)
      if(res?.data?.status=="success") {
        toast.success(res?.data?.message);
        handleGetAllVoices();
        setDeleteModal(false);
      }else {
        toast.error(res?.data?.message);
      }
    }).catch(e =>console.log(e))
    .finally(() => setDeleteLoading(false))
  }

  function handleEditVoice() {
    setEditLoading(true);
    
    if (voice) {
      const formData = new FormData();
      formData.append("voice", voice);
      
      axios.post(BASE_URL + "/admin/upload_voice.php", formData)
        .then((res) => {
          if (res?.data?.status === "success") {
            const data_send = {
              audio_id: rowData?.audio_id,
              audio_name: rowData?.audio_name,
              audio_link: res?.data?.message
            };
            
            updateVoiceRecord(data_send);
          } else {
            toast.error(res?.data?.message);
            setEditLoading(false);
          }
        })
        .catch((e) => {
          console.log(e);
          toast.error("Failed to upload voice file");
          setEditLoading(false);
        });
    } else {
      // If no new file, just update the name
      const data_send = {
        audio_id: rowData?.audio_id,
        audio_name: rowData?.audio_name,
        audio_link : rowData?.audio_link
      };
      
      updateVoiceRecord(data_send);
    }
  }

  function updateVoiceRecord(data) {
    axios.post(BASE_URL + "/admin/content/edit_voice.php", data)
      .then((res) => {
        if (res?.data?.status === "success") {
          toast.success(res?.data?.message);
          handleGetAllVoices();
          setEditModal(false);
          setVoice(null);
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((e) => {
        console.log(e);
        toast.error("Failed to update voice");
      })
      .finally(() => {
        setEditLoading(false);
      });
  }

  const columns = [
    {
      dataIndex: "audio_id",
      key: "audio_id",
      title: "Audio Id",
    },
    {
      dataIndex: "audio_name",
      key: "audio_name",
      title: "Audio Name",
    },
    {
      dataIndex: "audio_link",
      key: "audio_link",
      title: "Audio Link",
      render: (row) => (
        <a href={row} target="_blank">
          <FcAudioFile style={{ width: "30px", height: "30px" }} />
        </a>
      ),
    },
    {
      title: "Actions",
      render: (row) => (
        <div>
          <Button
            onClick={() => {
              setRowData(row);
              setDeleteModal(true);
            }}
            color="danger btn-pill"
          >
            Delete
          </Button>

          <Button
            onClick={() => {
              setRowData(row);

              setEditModal(true);
            }}
            color="primary btn-pill"
            style={{ margin: "0px 10px" }}
          >
            Edit
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Breadcrumbs parent="sections" title=" section Voices" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card-header">
              <h5>section voices</h5>
              <div className="card-body">
                <button
                  className="btn btn-primary my-4"
                  onClick={() => setAddModal(true)}
                >
                  Add Voice
                </button>
              </div>

              <Table
                columns={columns}
                dataSource={allVoices?.length > 0 ? allVoices : []}
                scroll={{ x: "max-content" }}
              />
            </div>
          </div>
        </div>
      </div>

      <Modal
        okText={isLoading ? "Loading..." : "Add"}
        title="Add Voice"
        open={addModal}
        onCancel={() => {
          setAddModal(false);
          setVoice(null);
        }}
        onOk={handleAddVoice}
        confirmLoading={isLoading}
      >
        <div className="upload-container">
          <div className="form_field">
            <label className="form_label">Audio Name</label>
            <input
              type="text"
              className="form_input"
              onChange={(e) => setAudioName(e.target?.value)}
              value={audioName}
              placeholder="Audio Name"
            />
          </div>

          <div className="form_field">
            <label className="form_label">Audio</label>
            <input
              type="file"
              accept="audio/*"
              onChange={handleFileChange}
              className="form-control"
            />
          </div>
        </div>
      </Modal>

      <Modal
        okText={editLoading ? "Loading..." : "Edit"}
        title="Edit Voice"
        open={editModal}
        onCancel={() => {
          setEditModal(false);
        }}
        onOk={handleEditVoice}
        confirmLoading={editLoading}
      >
        <div className="upload-container">
          <div className="form_field">
            <label className="form_label">Audio Name</label>
            <input
              type="text"
              className="form_input"
              onChange={(e) => setRowData({...rowData , audio_name : e.target.value})}
              value={rowData?.audio_name}
              placeholder="Audio Name"
            />
          </div>

          <div className="form_field">
            <label className="form_label">Audio</label>
            <input
              type="file"
              accept="audio/*"
              onChange={handleFileChange}
              className="form-control"
            />
          </div>
        </div>
      </Modal>

      <Modal open={deleteModal} onCancel={() => setDeleteModal(false)} okText={deleteLoading ? "Loading...." :"Delete"} onOk={handleDeleteVoice} onClose={() => setDeleteModal(false)}>
        <h3>Do You Want to delete this voice?</h3>
      </Modal>
    </>
  );
}
