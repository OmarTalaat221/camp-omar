import React, { useEffect, useState, useRef } from "react";
import Breadcrumbs from "../../../component/common/breadcrumb/breadcrumb";
import { Button, Modal, Table, message } from "antd";
import { BASE_URL } from "../../../Api/baseUrl";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { FcAudioFile } from "react-icons/fc";
import { FiTrash2 } from "react-icons/fi";

export default function Voices() {
  const [addModal, setAddModal] = useState(false);
  const [voice, setVoice] = useState(null);
  const [voicePreviewUrl, setVoicePreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [allVoices, setAllVoices] = useState([]);
  const { section_id } = useParams();
  const [audioName, setAudioName] = useState("");
  const [rowData, setRowData] = useState({});
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);

  // File input refs
  const addFileInputRef = useRef(null);
  const editFileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check if file is an audio file
      if (!file.type.startsWith("audio/")) {
        message.error("Please upload an audio file");
        return;
      }
      setVoice(file);

      // Create preview URL for the audio file
      const previewUrl = URL.createObjectURL(file);
      setVoicePreviewUrl(previewUrl);
    }
  };

  // Clear voice and preview
  const clearVoicePreview = () => {
    if (voicePreviewUrl) {
      URL.revokeObjectURL(voicePreviewUrl);
      setVoicePreviewUrl(null);
    }
    setVoice(null);
  };

  // Remove selected file
  const removeSelectedFile = (isEdit = false) => {
    clearVoicePreview();

    // Reset the appropriate file input
    const fileInput = isEdit
      ? editFileInputRef.current
      : addFileInputRef.current;
    if (fileInput) {
      fileInput.value = "";
    }

    message.info("File removed");
  };

  async function handleAddVoice() {
    if (!audioName) {
      message.error("Please enter a name for the voice");
      return;
    }

    if (!voice) {
      message.error("Please select a voice file");
      return;
    }

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("voice", voice);

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
                  handleCloseAddModal();
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
          setAllVoices(res?.data?.message || []);
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

  // Cleanup preview URLs when component unmounts
  useEffect(() => {
    return () => {
      if (voicePreviewUrl) {
        URL.revokeObjectURL(voicePreviewUrl);
      }
    };
  }, [voicePreviewUrl]);

  function handleDeleteVoice() {
    const data_send = {
      audio_id: rowData?.audio_id,
    };

    setDeleteLoading(true);
    axios
      .post(BASE_URL + "/admin/content/delete_voice.php", data_send)
      .then((res) => {
        console.log(res);
        if (res?.data?.status == "success") {
          toast.success(res?.data?.message);
          handleGetAllVoices();
          setDeleteModal(false);
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((e) => console.log(e))
      .finally(() => setDeleteLoading(false));
  }

  function handleEditVoice() {
    if (!rowData?.audio_name) {
      message.error("Please enter a name for the voice");
      return;
    }

    setEditLoading(true);

    if (voice) {
      const formData = new FormData();
      formData.append("voice", voice);

      axios
        .post(BASE_URL + "/admin/upload_voice.php", formData)
        .then((res) => {
          if (res?.data?.status === "success") {
            const data_send = {
              audio_id: rowData?.audio_id,
              audio_name: rowData?.audio_name,
              audio_link: res?.data?.message,
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
        audio_link: rowData?.audio_link,
      };

      updateVoiceRecord(data_send);
    }
  }

  function updateVoiceRecord(data) {
    axios
      .post(BASE_URL + "/admin/content/edit_voice.php", data)
      .then((res) => {
        if (res?.data?.status === "success") {
          toast.success(res?.data?.message);
          handleGetAllVoices();
          handleCloseEditModal();
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

  // Clean up when closing modals
  const handleCloseAddModal = () => {
    setAddModal(false);
    setVoice(null);
    setAudioName("");
    clearVoicePreview();
    if (addFileInputRef.current) {
      addFileInputRef.current.value = "";
    }
  };

  const handleCloseEditModal = () => {
    setEditModal(false);
    setVoice(null);
    setRowData({});
    clearVoicePreview();
    if (editFileInputRef.current) {
      editFileInputRef.current.value = "";
    }
  };

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
        <a href={row} target="_blank" rel="noopener noreferrer">
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
      <Breadcrumbs parent="sections" title="Section Voices" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card-header">
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
                dataSource={allVoices}
                scroll={{ x: "max-content" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Add Modal */}
      <Modal
        okText={isLoading ? "Loading..." : "Add"}
        title="Add Voice"
        open={addModal}
        onCancel={handleCloseAddModal}
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

            {/* Show selected file preview */}
            {voice && voicePreviewUrl && (
              <div
                style={{
                  background: "#f5f5f5",
                  padding: "12px",
                  borderRadius: "8px",
                  marginBottom: "12px",
                  border: "1px solid #d9d9d9",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                  }}
                >
                  <span style={{ fontWeight: 500, color: "#000" }}>
                    ✓ {voice.name}
                  </span>
                  <Button
                    danger
                    size="small"
                    icon={<FiTrash2 />}
                    onClick={() => removeSelectedFile(false)}
                  >
                    Remove
                  </Button>
                </div>

                <audio controls style={{ width: "100%" }}>
                  <source src={voicePreviewUrl} type={voice.type} />
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}

            <input
              ref={addFileInputRef}
              type="file"
              accept="audio/*"
              onChange={handleFileChange}
              className="form-control"
            />
          </div>
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal
        okText={editLoading ? "Loading..." : "Edit"}
        title="Edit Voice"
        open={editModal}
        onCancel={handleCloseEditModal}
        onOk={handleEditVoice}
        confirmLoading={editLoading}
      >
        <div className="upload-container">
          <div className="form_field">
            <label className="form_label">Audio Name</label>
            <input
              type="text"
              className="form_input"
              onChange={(e) =>
                setRowData({ ...rowData, audio_name: e.target.value })
              }
              value={rowData?.audio_name}
              placeholder="Audio Name"
            />
          </div>

          {/* Current Audio */}
          {rowData?.audio_link && (
            <div className="form_field">
              <div className="d-flex align-items-center justify-content-between gap-2">
                <label className="form_label">Current Audio</label>
                <Button
                  danger
                  size="small"
                  icon={<FiTrash2 />}
                  onClick={() => setRowData({ ...rowData, audio_link: "" })}
                >
                  Remove
                </Button>
              </div>
              <div
                style={{
                  background: "#f5f5f5",
                  padding: "12px",
                  borderRadius: "8px",
                  marginBottom: "12px",
                  border: "1px solid #d9d9d9",
                }}
              >
                <audio controls style={{ width: "100%", marginBottom: "8px" }}>
                  <source src={rowData.audio_link} type="audio/mpeg" />
                  <source src={rowData.audio_link} type="audio/ogg" />
                  <source src={rowData.audio_link} type="audio/wav" />
                  Your browser does not support the audio element.
                </audio>
                <div style={{ fontSize: "12px", color: "#666" }}>
                  <a
                    href={rowData.audio_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#1890ff" }}
                  >
                    Open in new tab →
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* New Audio Upload */}
          <div className="form_field">
            <label className="form_label">
              {rowData?.audio_link ? "Replace Audio (Optional)" : "Audio"}
            </label>

            {/* Show new file preview */}
            {voice && voicePreviewUrl && (
              <div
                style={{
                  background: "#fff7e6",
                  padding: "12px",
                  borderRadius: "8px",
                  marginBottom: "12px",
                  border: "1px solid #ffc53d",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                  }}
                >
                  <span style={{ fontWeight: 500, color: "#fa8c16" }}>
                    New: {voice.name}
                  </span>
                  <Button
                    danger
                    size="small"
                    icon={<FiTrash2 />}
                    onClick={() => removeSelectedFile(true)}
                  >
                    Remove
                  </Button>
                </div>

                <audio controls style={{ width: "100%" }}>
                  <source src={voicePreviewUrl} type={voice.type} />
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}

            <input
              ref={editFileInputRef}
              type="file"
              accept="audio/*"
              onChange={handleFileChange}
              className="form-control"
            />

            {rowData?.audio_link && !voice && (
              <small
                style={{ color: "#888", display: "block", marginTop: "5px" }}
              >
                Leave empty to keep the current audio file
              </small>
            )}
          </div>
        </div>
      </Modal>

      {/* Delete Modal */}
      <Modal
        open={deleteModal}
        onCancel={() => setDeleteModal(false)}
        okText={deleteLoading ? "Loading...." : "Delete"}
        onOk={handleDeleteVoice}
        onClose={() => setDeleteModal(false)}
      >
        <h3>Do You Want to delete this voice?</h3>
      </Modal>
    </>
  );
}
