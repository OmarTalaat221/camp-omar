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
  FiAlertCircle,
} from "react-icons/fi";
import { BiArrowBack } from "react-icons/bi";
import { AiOutlineInbox } from "react-icons/ai";
import Breadcrumbs from "../../../component/common/breadcrumb/breadcrumb";
import { BASE_URL } from "../../../Api/baseUrl";
import { toast } from "react-toastify";
import "./style.css";

const { TextArea } = Input;

// Initial state for all content types
const INITIAL_CONTENT_STATE = {
  text: "",
  image: [],
  video: [],
  voice: [],
  file_attachment: [],
};

const GroupInstructions = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const groupId = searchParams.get("group_id");

  const [instructions, setInstructions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Modal State
  const [modalVisible, setModalVisible] = useState(false);
  const [editingInstruction, setEditingInstruction] = useState(null);

  // Form States
  const [selectedType, setSelectedType] = useState("text");
  const [instructionTitle, setInstructionTitle] = useState("");

  // Content state for each type
  const [contentByType, setContentByType] = useState(INITIAL_CONTENT_STATE);

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

  // Reset form to initial state
  const resetForm = () => {
    setEditingInstruction(null);
    setSelectedType("text");
    setInstructionTitle("");
    setContentByType(INITIAL_CONTENT_STATE);
  };

  const handleAddNew = () => {
    resetForm();
    setModalVisible(true);
  };

  const handleEdit = (instruction) => {
    setEditingInstruction(instruction);
    setSelectedType(instruction.instruction_type);
    setInstructionTitle(instruction.title || "");

    // Initialize fresh content state
    const newContentState = { ...INITIAL_CONTENT_STATE };

    // Populate the correct type with existing data
    if (instruction.instruction_type === "text") {
      newContentState.text = instruction.instruction;
    } else if (instruction.instruction_type === "image") {
      newContentState.image =
        instruction.instruction_array?.map((img, index) => ({
          uid: `existing-${index}`,
          name: img.split("/").pop() || `Image ${index + 1}`,
          url: img,
          status: "done",
          isExisting: true,
        })) || [];
    } else {
      // For video, voice, pdf - single file
      newContentState[instruction.instruction_type] = [
        {
          uid: "existing-file",
          name: instruction.instruction.split("/").pop() || "File",
          url: instruction.instruction,
          status: "done",
          isExisting: true,
        },
      ];
    }

    setContentByType(newContentState);
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/admin/instructions/delete_instruction.php`,
        { id: id }
      );

      if (res.data.status === "success") {
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
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response?.data?.status === "success") {
        return response?.data?.message;
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

  // Check if can add more files
  const canAddMoreFiles = (type) => {
    if (type === "image") {
      return true; // No limit for images
    }
    // For video, voice, pdf - allow only 1 file
    return contentByType[type].length < 1;
  };

  // Handle file change for specific type
  const handleFilesChange = async (info, type) => {
    // Check file limit for non-image types
    if (type !== "image" && contentByType[type].length >= 1) {
      message.warning(`You can only upload one ${type.replace("_", " ")} file`);
      return;
    }

    if (info.file.status === "done" || info.file) {
      try {
        const uploadedFileName = await handleFileUpload(
          info.file.originFileObj || info.file,
          type
        );

        const newFile = {
          name: info.file.name,
          url: uploadedFileName,
          uid: info.file.uid,
          status: "done",
          isExisting: false,
        };

        setContentByType((prev) => {
          // For non-image types, replace the existing file
          if (type !== "image" && prev[type].length > 0) {
            return {
              ...prev,
              [type]: [newFile], // Replace with new file
            };
          }
          // For images or empty arrays, add to array
          return {
            ...prev,
            [type]: [...prev[type], newFile],
          };
        });

        message.success(`${info.file.name} uploaded successfully`);
      } catch (error) {
        message.error(`${info.file.name} upload failed`);
      }
    }
  };

  // Remove file from specific type
  const handleRemoveFile = (type, uid) => {
    setContentByType((prev) => ({
      ...prev,
      [type]: prev[type].filter((f) => f.uid !== uid),
    }));
  };

  // Update text content
  const handleTextChange = (value) => {
    setContentByType((prev) => ({
      ...prev,
      text: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (!instructionTitle.trim()) {
        toast.warning("Please enter a title");
        return;
      }

      setUploading(true);

      let instructionData = "";
      const currentContent = contentByType[selectedType];

      if (selectedType === "text") {
        if (!currentContent.trim()) {
          toast.warning("Please enter some text");
          setUploading(false);
          return;
        }
        instructionData = currentContent;
      } else {
        if (currentContent.length === 0) {
          toast.warning("Please upload at least one file");
          setUploading(false);
          return;
        }
        const fileUrls = currentContent.map((f) => f.url);
        instructionData = fileUrls.join("**CAMP**");
      }

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
        resetForm();
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

  const handleCloseModal = () => {
    setModalVisible(false);
    setTimeout(() => {
      resetForm();
    }, 300);
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
                    style={{ width: "100%", height: "100%" }}
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
              <source src={instruction?.instruction} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        );

      case "voice":
        return (
          <div className="instruction-audio-wrapper">
            <audio controls style={{ width: "100%" }}>
              <source src={instruction.instruction} type="audio/mpeg" />
              Your browser does not support the audio tag.
            </audio>
          </div>
        );

      case "file_attachment":
        return (
          <div
            className="instruction-file-preview"
            onClick={() => window.open(instruction.instruction, "_blank")}
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
                window.open(instruction.instruction, "_blank");
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

  // Upload props for current type
  const getUploadProps = (type) => ({
    beforeUpload: (file) => {
      // Check file limit before upload
      if (type !== "image" && contentByType[type].length >= 1) {
        message.warning(
          `You can only upload one ${type.replace("_", " ")} file. Please remove the existing file first.`
        );
        return Upload.LIST_IGNORE;
      }
      return false;
    },
    onChange: (info) => handleFilesChange(info, type),
    multiple: type === "image", // Only allow multiple for images
    accept:
      type === "image"
        ? "image/*"
        : type === "video"
          ? "video/*"
          : type === "voice"
            ? "audio/*"
            : ".pdf",
    showUploadList: false,
    disabled: type !== "image" && contentByType[type].length >= 1,
  });

  // Render upload section for each type
  const renderUploadSection = (type) => {
    const files = contentByType[type] || [];
    const typeConfig = instructionTypes.find((t) => t.value === type);
    const isDisabled = type !== "image" && files.length >= 1;

    return (
      <div>
        <div className="instruction-form-label">
          <FiUpload className="instruction-form-label-icon" />
          <span>
            Upload {typeConfig?.label} *
            {type !== "image" && (
              <span
                style={{
                  color: "#faad14",
                  fontSize: "12px",
                  marginLeft: "8px",
                }}
              >
                (Maximum 1 file)
              </span>
            )}
          </span>
        </div>

        {isDisabled ? (
          <div
            style={{
              background: "#f5f5f5",
              border: "1px dashed #d9d9d9",
              borderRadius: "8px",
              padding: "20px",
              textAlign: "center",
              marginBottom: "16px",
            }}
          >
            <FiAlertCircle
              style={{
                fontSize: "24px",
                color: "#faad14",
                marginBottom: "8px",
              }}
            />
            <p style={{ margin: "8px 0", color: "#666" }}>
              You already have a {typeConfig?.label.toLowerCase()} file
              uploaded.
            </p>
            <p style={{ margin: "0", fontSize: "12px", color: "#999" }}>
              Remove the existing file to upload a new one.
            </p>
          </div>
        ) : (
          <Upload.Dragger {...getUploadProps(type)}>
            <div className="instruction-upload-area">
              <FiUpload className="instruction-upload-icon" />
              <p className="instruction-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="instruction-upload-hint">
                {type === "image"
                  ? "Support for single or multiple image uploads"
                  : `Upload single ${typeConfig?.label} file (max 1 file)`}
              </p>
            </div>
          </Upload.Dragger>
        )}

        {files.length > 0 && (
          <div className="instruction-upload-list">
            {files.map((file, index) => (
              <div key={file.uid || index} className="instruction-upload-item">
                <div className="instruction-upload-item-icon">
                  {typeConfig?.icon}
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
                  onClick={() => handleRemoveFile(type, file.uid)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    );
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
        onCancel={handleCloseModal}
        width={700}
        footer={[
          <Button key="cancel" onClick={handleCloseModal}>
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
          {/* Title Input */}
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
            {instructionTypes.map((type) => {
              // Show indicator if type has content
              const hasContent =
                type.value === "text"
                  ? contentByType.text?.trim()
                  : contentByType[type.value]?.length > 0;

              const fileCount =
                type.value !== "text"
                  ? contentByType[type.value]?.length || 0
                  : null;

              return (
                <div
                  key={type.value}
                  className={`instruction-type-option ${
                    selectedType === type.value ? "active" : ""
                  } ${hasContent ? "has-content" : ""}`}
                  onClick={() => setSelectedType(type.value)}
                >
                  <div className="instruction-type-option-icon">
                    {type.icon}
                  </div>
                  <span className="instruction-type-option-label">
                    {type.label}
                  </span>
                  {hasContent && (
                    <span className="content-indicator">
                      {fileCount !== null && fileCount > 0 ? fileCount : "✓"}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Content based on type */}

          <div
            style={{
              marginTop: "20px",
              marginBottom: "20px",
              padding: "12px",
              background: "#f5f5f5",
              borderRadius: "8px",
            }}
          >
            <p style={{ margin: 0, fontSize: "12px", color: "#666" }}>
              <strong>Content Summary:</strong>
              {contentByType.text && " Text ✓"}
              {contentByType.image.length > 0 &&
                ` | Images (${contentByType.image.length}) ✓`}
              {contentByType.video.length > 0 && " | Video (1) ✓"}
              {contentByType.voice.length > 0 && " | Voice (1) ✓"}
              {contentByType.file_attachment.length > 0 && " | PDF (1) ✓"}
            </p>
            <p style={{ margin: "4px 0 0", fontSize: "11px", color: "red" }}>
              Note: Only the selected type ({selectedType}) content will be
              saved.
            </p>
          </div>
          {selectedType === "text" ? (
            <div>
              <div className="instruction-form-label">
                <FiFileText className="instruction-form-label-icon" />
                <span>Text Content *</span>
              </div>
              <TextArea
                rows={6}
                placeholder="Enter your instruction text here..."
                value={contentByType.text}
                onChange={(e) => handleTextChange(e.target.value)}
              />
            </div>
          ) : (
            renderUploadSection(selectedType)
          )}

          {/* Show summary of all content */}
        </div>
      </Modal>

      <style jsx>{`
        .instruction-type-option {
          position: relative;
          cursor: pointer;
          transition: all 0.3s;
        }

        .content-indicator {
          position: absolute;
          top: 4px;
          right: 4px;
          background: #52c41a;
          color: white;
          font-size: 11px;
          padding: 2px 6px;
          border-radius: 10px;
          font-weight: bold;
        }
        .instruction-upload-item {
          display: flex;
          align-items: center;
          padding: 12px;
          background: #fafafa;
          border-radius: 8px;
          margin-top: 8px;
        }
        .instruction-upload-item-icon {
          font-size: 20px;
          margin-right: 12px;
          color: #fff;
        }
        .instruction-upload-item-info {
          flex: 1;
        }
        .instruction-upload-item-name {
          font-weight: 500;
          color: #333;
        }
        .instruction-upload-item-size {
          font-size: 12px;
          color: #999;
        }
      `}</style>
    </>
  );
};

export default GroupInstructions;
