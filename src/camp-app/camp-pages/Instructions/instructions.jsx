import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Input,
  Upload,
  Spin,
  Image,
  Popconfirm,
  message,
} from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import {
  FiBook,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiFileText,
  FiImage,
  FiVideo,
  FiMic,
  FiFile,
  FiClock,
  FiUpload,
  FiDownload,
  FiType,
} from "react-icons/fi";
import { BiArrowBack } from "react-icons/bi";
import { AiOutlineInbox } from "react-icons/ai";
import Breadcrumbs from "../../../component/common/breadcrumb/breadcrumb";
import { BASE_URL } from "../../../Api/baseUrl";
import { toast } from "react-toastify";
import "./style.css";

const { TextArea } = Input;

const GroupInstructions = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const groupId = searchParams.get("group_id");

  const [instructions, setInstructions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingInstruction, setEditingInstruction] = useState(null);
  const [selectedType, setSelectedType] = useState("text");
  const [instructionTitle, setInstructionTitle] = useState("");
  const [textContent, setTextContent] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const instructionTypes = [
    { value: "text", label: "Text", icon: <FiFileText />, color: "#eb5d22" },
    { value: "image", label: "Images", icon: <FiImage />, color: "#52c41a" },
    { value: "video", label: "Video", icon: <FiVideo />, color: "#1890ff" },
    { value: "voice", label: "Voice", icon: <FiMic />, color: "#722ed1" },
    {
      value: "file_attachment",
      label: "PDF",
      icon: <FiFile />,
      color: "#faad14",
    },
  ];

  useEffect(() => {
    if (groupId) {
      fetchInstructions();
    } else {
      toast.error("No group ID provided");
      navigate(-1);
    }
  }, [groupId]);

  const fetchInstructions = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/admin/instructions/select_group_instructions.php?group_id=${groupId}`
      );

      if (response?.data?.status === "success") {
        setInstructions(response?.data?.data || []);
      } else {
        setInstructions([]);
      }
    } catch (error) {
      console.error("Error fetching instructions:", error);
      toast.error("Failed to fetch instructions");
      setInstructions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setEditingInstruction(null);
    setSelectedType("text");
    setInstructionTitle("");
    setTextContent("");
    setUploadedFiles([]);
    setModalVisible(true);
  };

  const handleEdit = (instruction) => {
    setEditingInstruction(instruction);
    setSelectedType(instruction.instruction_type);
    setInstructionTitle(instruction.title || "");

    if (instruction.instruction_type === "text") {
      setTextContent(instruction.instruction);
      setUploadedFiles([]);
    } else if (instruction.instruction_type === "image") {
      const existingImages =
        instruction.instruction_array?.map((img, index) => ({
          uid: `existing-${index}`,
          name: img.split("/").pop() || `Image ${index + 1}`,
          url: img,
          status: "done",
          isExisting: true,
        })) || [];
      setUploadedFiles(existingImages);
      setTextContent("");
    } else {
      // For video, voice, pdf - single file
      setUploadedFiles([
        {
          uid: "existing-file",
          name: instruction.instruction.split("/").pop() || "File",
          url: instruction.instruction,
          status: "done",
          isExisting: true,
        },
      ]);
      setTextContent("");
    }

    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/admin/instructions/delete_instruction.php`,
        {
          id: id,
        }
      );

      if (res.data.status == "success") {
        toast.success(res.data.message);
        fetchInstructions();
      }
    } catch (error) {
      console.error("Error deleting instruction:", error);
      toast.error("Failed to delete instruction");
    }
  };

  const getUploadEndpoint = (type) => {
    const endpoints = {
      image: `${BASE_URL}/admin/item_img_uploader.php`,
      video: `${BASE_URL}/admin/upload_video.php`,
      voice: `${BASE_URL}/admin/upload_voice.php`,
      file_attachment: `${BASE_URL}/admin/upload_pdf.php`,
    };
    return endpoints[type];
  };

  const handleFileUpload = async (file, type) => {
    const formData = new FormData();
    formData.append(type, file);

    try {
      setUploading(true);
      const endpoint = getUploadEndpoint(type);
      const response = await axios.post(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response?.data?.status === "success") {
        return response?.data?.message; // Returns filename
      } else {
        throw new Error(response?.data?.message || "Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    } finally {
      setUploading(false);
    }
  };

  const handleFilesChange = async (info) => {
    if (info.file.status === "done" || info.file) {
      try {
        const uploadedFileName = await handleFileUpload(
          info.file.originFileObj || info.file,
          selectedType
        );

        setUploadedFiles((prev) => [
          ...prev,
          {
            name: info.file.name,
            url: uploadedFileName,
            uid: info.file.uid,
            status: "done",
            isExisting: false,
          },
        ]);

        message.success(`${info.file.name} uploaded successfully`);
      } catch (error) {
        message.error(`${info.file.name} upload failed`);
      }
    }
  };

  const handleSubmit = async () => {
    try {
      // Validate title
      if (!instructionTitle.trim()) {
        toast.warning("Please enter a title");
        setUploading(false);
        return;
      }

      setUploading(true);

      let instructionData = "";

      if (selectedType === "text") {
        if (!textContent.trim()) {
          toast.warning("Please enter some text");
          setUploading(false);
          return;
        }
        instructionData = textContent;
      } else {
        if (uploadedFiles.length === 0) {
          toast.warning("Please upload at least one file");
          setUploading(false);
          return;
        }

        const fileUrls = uploadedFiles.map((f) => {
          return f.url;
        });

        // console.log(uploadedFiles, "uploadedFiles");
        // console.log(fileUrls, "fileUrls");

        instructionData = fileUrls.join("**CAMP**");
      }

      // return;

      const payload = {
        instruction_type: selectedType,
        group_id: groupId,
        instruction: instructionData,
        title: instructionTitle.trim(),
      };

      let response;

      if (editingInstruction) {
        payload.id = editingInstruction.id;
        response = await axios.post(
          `${BASE_URL}/admin/instructions/edit_group_instructions.php`,
          JSON.stringify(payload)
        );
      } else {
        response = await axios.post(
          `${BASE_URL}/admin/instructions/add_group_instructions.php`,
          JSON.stringify(payload)
        );
      }

      if (response?.data?.status === "success") {
        toast.success(
          editingInstruction
            ? "Instruction updated successfully"
            : "Instruction added successfully"
        );
        setModalVisible(false);
        fetchInstructions();
        // Reset form
        setInstructionTitle("");
        setTextContent("");
        setUploadedFiles([]);
      } else {
        throw new Error(response?.data?.message || "Operation failed");
      }
    } catch (error) {
      console.error("Error saving instruction:", error);
      toast.error("Failed to save instruction");
    } finally {
      setUploading(false);
    }
  };

  const renderInstructionContent = (instruction) => {
    const type = instruction.instruction_type;

    switch (type) {
      case "text":
        return (
          <div className="instruction-text-content">
            {instruction.instruction}
          </div>
        );

      case "image":
        return (
          <div className="instruction-images-grid">
            <Image.PreviewGroup>
              {instruction.instruction_array?.map((img, index) => (
                <div key={index} className="instruction-image-wrapper">
                  <Image
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                    width={"100%"}
                    height={"100%"}
                    src={img}
                    alt={`Instruction ${index + 1}`}
                  />
                </div>
              ))}
            </Image.PreviewGroup>
          </div>
        );

      case "video":
        return (
          <div className="instruction-video-wrapper">
            <video controls>
              <source src={`${instruction?.instruction}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        );

      case "voice":
        return (
          <div className="instruction-audio-wrapper">
            <audio controls style={{ width: "100%" }}>
              <source src={`${instruction.instruction}`} type="audio/mpeg" />
              Your browser does not support the audio tag.
            </audio>
          </div>
        );

      case "file_attachment":
        return (
          <div
            className="instruction-file-preview"
            onClick={() => window.open(`${instruction.instruction}`, "_blank")}
          >
            <div className="instruction-file-icon">
              <FiFile />
            </div>
            <div className="instruction-file-info">
              <h6>PDF Document</h6>
              <p>Click to view or download</p>
            </div>
            <Button
              type="link"
              icon={<FiDownload />}
              onClick={(e) => {
                e.stopPropagation();
                window.open(`${instruction.instruction}`, "_blank");
              }}
            >
              Download
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  const uploadProps = {
    beforeUpload: () => false,
    onChange: handleFilesChange,
    multiple: selectedType === "image",
    accept:
      selectedType === "image"
        ? "image/*"
        : selectedType === "video"
        ? "video/*"
        : selectedType === "voice"
        ? "audio/*"
        : ".pdf",
    showUploadList: false,
  };

  return (
    <>
      <Breadcrumbs parent="Groups" title="Group Instructions" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card group-instructions-card">
              <div className="card-header group-instructions-header">
                <div className="group-instructions-header-content">
                  <div className="group-instructions-title-section">
                    <FiBook className="group-instructions-header-icon" />
                    <div>
                      <h5>Group Instructions</h5>
                      <p>Manage instructions for this group</p>
                    </div>
                  </div>
                  <div className="group-instructions-header-actions">
                    <Button
                      icon={<FiPlus />}
                      onClick={handleAddNew}
                      style={{
                        background: "rgba(255, 255, 255, 0.2)",
                        border: "1px solid rgba(255, 255, 255, 0.3)",
                        color: "#ffffff",
                      }}
                      size="large"
                    >
                      Add Instruction
                    </Button>
                    <Button
                      icon={<BiArrowBack />}
                      onClick={() => navigate(-1)}
                      size="large"
                      style={{
                        background: "rgba(255, 255, 255, 0.2)",
                        border: "1px solid rgba(255, 255, 255, 0.3)",
                        color: "#ffffff",
                      }}
                    >
                      Back
                    </Button>
                  </div>
                </div>
              </div>

              <div className="card-body group-instructions-container">
                {loading ? (
                  <div className="instruction-loading">
                    <Spin size="large" />
                  </div>
                ) : instructions.length === 0 ? (
                  <div className="instructions-empty-state">
                    <AiOutlineInbox className="instructions-empty-icon" />
                    <h5>No Instructions Yet</h5>
                    <p>Start by adding your first instruction for this group</p>
                    <Button
                      type="primary"
                      icon={<FiPlus />}
                      onClick={handleAddNew}
                      className="add-instruction-btn"
                      size="large"
                    >
                      Add First Instruction
                    </Button>
                  </div>
                ) : (
                  <div className="instructions-grid">
                    {instructions.map((instruction) => {
                      const typeConfig = instructionTypes.find(
                        (t) => t.value === instruction.instruction_type
                      );

                      return (
                        <div
                          key={instruction.id}
                          className="instruction-item-card"
                        >
                          <div className="instruction-item-header">
                            <div
                              className={`instruction-type-badge ${instruction.instruction_type}`}
                            >
                              {typeConfig?.icon}
                              <span>{typeConfig?.label}</span>
                            </div>
                            <div className="instruction-item-actions">
                              <Button
                                type="link"
                                icon={<FiEdit2 />}
                                onClick={() => handleEdit(instruction)}
                                style={{ color: "#1890ff" }}
                              />
                              <Popconfirm
                                title="Delete this instruction?"
                                description="This action cannot be undone."
                                onConfirm={() => handleDelete(instruction.id)}
                                okText="Delete"
                                cancelText="Cancel"
                                okButtonProps={{ danger: true }}
                              >
                                <Button
                                  type="link"
                                  icon={<FiTrash2 />}
                                  danger
                                />
                              </Popconfirm>
                            </div>
                          </div>

                          <div className="instruction-item-body">
                            {/* Display Title */}
                            {instruction.title && (
                              <h6 className="instruction-card-title">
                                {instruction.title}
                              </h6>
                            )}
                            {renderInstructionContent(instruction)}
                          </div>

                          <div className="instruction-item-footer">
                            <div className="instruction-date">
                              <FiClock className="instruction-date-icon" />
                              <span>
                                {new Date(
                                  instruction.created_at
                                ).toLocaleDateString()}
                              </span>
                            </div>
                            {instruction.updated_at !==
                              instruction.created_at && (
                              <div className="instruction-date">
                                <span style={{ fontSize: "11px" }}>
                                  Updated:{" "}
                                  {new Date(
                                    instruction.updated_at
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Modal
        title={
          <div className="instruction-modal-title">
            <FiBook className="instruction-modal-icon" />
            <span>
              {editingInstruction ? "Edit Instruction" : "Add New Instruction"}
            </span>
          </div>
        }
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setInstructionTitle("");
          setTextContent("");
          setUploadedFiles([]);
        }}
        width={700}
        footer={[
          <Button
            key="cancel"
            onClick={() => {
              setModalVisible(false);
              setInstructionTitle("");
              setTextContent("");
              setUploadedFiles([]);
            }}
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleSubmit}
            loading={uploading}
            className="add-instruction-btn"
          >
            {editingInstruction ? "Update" : "Add"} Instruction
          </Button>,
        ]}
        className="instruction-modal"
      >
        <div>
          {/* Title Input - Always visible */}
          <div style={{ marginBottom: "24px" }}>
            <div className="instruction-form-label">
              <FiType className="instruction-form-label-icon" />
              <span>Instruction Title *</span>
            </div>
            <Input
              placeholder="Enter a descriptive title..."
              value={instructionTitle}
              onChange={(e) => setInstructionTitle(e.target.value)}
              size="large"
            />
          </div>

          {/* Type Selector */}
          <div className="instruction-form-label">
            <FiFileText className="instruction-form-label-icon" />
            <span>Select Instruction Type</span>
          </div>

          <div className="instruction-type-selector">
            {instructionTypes.map((type) => (
              <div
                key={type.value}
                className={`instruction-type-option ${
                  selectedType === type.value ? "active" : ""
                }`}
                onClick={() => {
                  setSelectedType(type.value);
                  setTextContent("");
                  setUploadedFiles([]);
                }}
              >
                <div className="instruction-type-option-icon">{type.icon}</div>
                <span className="instruction-type-option-label">
                  {type.label}
                </span>
              </div>
            ))}
          </div>

          {/* Content based on type */}
          {selectedType === "text" ? (
            <div>
              <div className="instruction-form-label">
                <FiFileText className="instruction-form-label-icon" />
                <span>Text Content *</span>
              </div>
              <TextArea
                rows={6}
                placeholder="Enter your instruction text here..."
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
              />
            </div>
          ) : (
            <div>
              <div className="instruction-form-label">
                <FiUpload className="instruction-form-label-icon" />
                <span>
                  Upload{" "}
                  {
                    instructionTypes.find((t) => t.value === selectedType)
                      ?.label
                  }{" "}
                  *
                </span>
              </div>

              <Upload.Dragger {...uploadProps}>
                <div className="instruction-upload-area">
                  <FiUpload className="instruction-upload-icon" />
                  <p className="instruction-upload-text">
                    Click or drag file to this area to upload
                  </p>
                  <p className="instruction-upload-hint">
                    {selectedType === "image"
                      ? "Support for single or multiple image uploads"
                      : `Upload ${
                          instructionTypes.find((t) => t.value === selectedType)
                            ?.label
                        }`}
                  </p>
                </div>
              </Upload.Dragger>

              {uploadedFiles.length > 0 && (
                <div className="instruction-upload-list">
                  {uploadedFiles.map((file, index) => (
                    <div
                      key={file.uid || index}
                      className="instruction-upload-item"
                    >
                      <div className="instruction-upload-item-icon">
                        {
                          instructionTypes.find((t) => t.value === selectedType)
                            ?.icon
                        }
                      </div>
                      <div className="instruction-upload-item-info">
                        <div className="instruction-upload-item-name">
                          {file.name}
                        </div>
                        <div className="instruction-upload-item-size">
                          {file.isExisting
                            ? "Existing file"
                            : "Uploaded successfully"}
                        </div>
                      </div>
                      <Button
                        type="link"
                        danger
                        icon={<FiTrash2 />}
                        onClick={() =>
                          setUploadedFiles(
                            uploadedFiles.filter((f) => f.uid !== file.uid)
                          )
                        }
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default GroupInstructions;
