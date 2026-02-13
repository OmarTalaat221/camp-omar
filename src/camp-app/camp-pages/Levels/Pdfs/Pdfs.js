import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../../../component/common/breadcrumb/breadcrumb";
import { Button, Modal, Table, Form, Input, Upload } from "antd";
import { FaBook, FaTrashCan } from "react-icons/fa6";
import { UploadOutlined } from "@ant-design/icons";
import { BASE_URL } from "../../../../Api/baseUrl";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Pdfs = () => {
  // Form instances
  const [addForm] = Form.useForm();
  const [editForm] = Form.useForm();

  const { section_id } = useParams();

  // Data States
  const [Pdfs, setPdfs] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null);

  // File States
  const [newPdfFile, setNewPdfFile] = useState(null);
  const [editPdfFile, setEditPdfFile] = useState(null);

  // Modal States (boolean only)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Loading States
  const [fetchLoading, setFetchLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Modal Control Functions
  const openAddModal = () => {
    addForm.resetFields();
    setNewPdfFile(null);
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
    addForm.resetFields();
    setNewPdfFile(null);
  };

  const openEditModal = (row) => {
    setSelectedPdf({ ...row });
    editForm.setFieldsValue({
      pdf_name: row.pdf_name,
    });
    setEditPdfFile(null);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedPdf(null);
    editForm.resetFields();
    setEditPdfFile(null);
  };

  const openDeleteModal = (row) => {
    setSelectedPdf(row);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedPdf(null);
  };

  const columns = [
    {
      id: "pdf_id",
      dataIndex: "pdf_id",
      title: "#",
    },
    {
      id: "pdf_name",
      dataIndex: "pdf_name",
      title: "PDF Name",
    },
    {
      id: "pdf_link",
      dataIndex: "pdf_link",
      title: "PDF Link",
      render: (text, row) => (
        <FaBook
          onClick={() => window.open(row?.pdf_link, "_blank")}
          style={{
            width: "30px",
            height: "30px",
            color: "orange",
            cursor: "pointer",
          }}
        />
      ),
    },
    {
      id: "Action",
      dataIndex: "x",
      title: "Actions",
      render: (text, row) => (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <FaTrashCan
            className="del_icon"
            style={{ cursor: "pointer", color: "red" }}
            onClick={() => openDeleteModal(row)}
          />
          <Button onClick={() => openEditModal(row)}>Edit</Button>
        </div>
      ),
    },
  ];

  // API Calls
  const handleGetPdfs = () => {
    setFetchLoading(true);
    const data_send = {
      section_id: section_id,
    };
    axios
      .post(BASE_URL + "/admin/content/select_pdfs.php", data_send)
      .then((res) => {
        if (res?.data?.status === "success") {
          setPdfs(res?.data?.message);
        }
      })
      .catch((e) => console.log(e))
      .finally(() => setFetchLoading(false));
  };

  useEffect(() => {
    handleGetPdfs();
  }, []);

  // Upload PDF file
  const uploadPdfFile = async (file) => {
    const formData = new FormData();
    formData.append("file_attachment", file);

    const response = await axios.post(
      "https://campforenglish.net/camp_for_english/admin/upload_pdf.php",
      formData
    );

    if (response?.data?.status === "success") {
      return response.data.message;
    } else {
      throw new Error(response?.data?.message || "Failed to upload file");
    }
  };

  // Add PDF
  const handleAddPdf = async (values) => {
    if (!newPdfFile) {
      toast.error("Please select a PDF/PowerPoint file");
      return;
    }

    setAddLoading(true);

    try {
      const uploadedUrl = await uploadPdfFile(newPdfFile);

      const dataSend = {
        section_id: section_id,
        pdf_name: values.pdf_name,
        pdf_link: uploadedUrl,
      };

      const res = await axios.post(
        BASE_URL + "/admin/content/add_pdf.php",
        JSON.stringify(dataSend)
      );

      if (res?.data?.status === "success") {
        toast.success(res?.data?.message);
        handleGetPdfs();
        closeAddModal();
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while adding the file");
    } finally {
      setAddLoading(false);
    }
  };

  // Edit PDF
  const handleEditPdf = async (values) => {
    setEditLoading(true);

    try {
      let pdfLink = selectedPdf?.pdf_link;

      // If new file selected, upload it
      if (editPdfFile) {
        pdfLink = await uploadPdfFile(editPdfFile);
      }

      const dataSend = {
        pdf_name: values.pdf_name,
        pdf_link: pdfLink,
        pdf_id: selectedPdf?.pdf_id,
      };

      const res = await axios.post(
        BASE_URL + "/admin/content/edit_pdf.php",
        JSON.stringify(dataSend)
      );

      if (res?.data?.status === "success") {
        toast.success(res?.data?.message);
        handleGetPdfs();
        closeEditModal();
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while editing the file");
    } finally {
      setEditLoading(false);
    }
  };

  // Delete PDF
  const handleDeletePdf = async () => {
    setDeleteLoading(true);

    const dataSend = {
      pdf_id: selectedPdf?.pdf_id,
    };

    axios
      .post(
        BASE_URL + "/admin/content/delete_pdf.php",
        JSON.stringify(dataSend)
      )
      .then((res) => {
        if (res?.data?.status === "success") {
          toast.success(res.data.message);
          handleGetPdfs();
          closeDeleteModal();
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((e) => {
        console.log(e);
        toast.error("An error occurred while deleting the file");
      })
      .finally(() => setDeleteLoading(false));
  };

  // File validation
  const validateFile = (file) => {
    const allowedTypes = [
      "application/pdf",
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    ];

    const isAllowed = allowedTypes.includes(file.type);
    if (!isAllowed) {
      toast.error("Only PDF and PowerPoint files are allowed!");
    }

    return false; // Prevent auto upload
  };

  return (
    <>
      <Breadcrumbs parent="sections" title="Section Files" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>Section Files</h5>
                <button
                  className="btn btn-primary my-4"
                  onClick={() => openAddModal()}
                >
                  Add pdf/powerpoint
                </button>
              </div>
              <div className="card-body">
                <Table
                  columns={columns}
                  dataSource={Pdfs}
                  loading={fetchLoading}
                  rowKey="pdf_id"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Modal */}
      <Modal
        title="Add PDF/PowerPoint"
        open={isAddModalOpen}
        onCancel={closeAddModal}
        footer={null}
        destroyOnClose
      >
        <Form
          form={addForm}
          layout="vertical"
          onFinish={handleAddPdf}
          autoComplete="off"
        >
          <Form.Item
            label="PDF/PowerPoint Name"
            name="pdf_name"
            rules={[
              { required: true, message: "Please enter file name" },
              { min: 2, message: "Name must be at least 2 characters" },
              { max: 100, message: "Name must be less than 100 characters" },
            ]}
          >
            <Input placeholder="Enter file name" />
          </Form.Item>

          <Form.Item
            label="PDF/PowerPoint File"
            required
            extra="Allowed: PDF, PPT, PPTX "
          >
            <Upload
              beforeUpload={(file) => {
                validateFile(file);
                setNewPdfFile(file);
                return false;
              }}
              onRemove={() => setNewPdfFile(null)}
              maxCount={1}
              accept=".pdf,.ppt,.pptx"
              fileList={
                newPdfFile
                  ? [
                      {
                        uid: "-1",
                        name: newPdfFile.name,
                        status: "done",
                      },
                    ]
                  : []
              }
            >
              <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, textAlign: "right" }}>
            <Button
              style={{ marginRight: 8 }}
              onClick={closeAddModal}
              disabled={addLoading}
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" loading={addLoading}>
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit Modal */}
      <Modal
        title="Edit PDF/PowerPoint"
        open={isEditModalOpen}
        onCancel={closeEditModal}
        footer={null}
        destroyOnClose
      >
        <Form
          form={editForm}
          layout="vertical"
          onFinish={handleEditPdf}
          autoComplete="off"
        >
          <Form.Item
            label="PDF/PowerPoint Name"
            name="pdf_name"
            rules={[
              { required: true, message: "Please enter file name" },
              { min: 2, message: "Name must be at least 2 characters" },
              { max: 100, message: "Name must be less than 100 characters" },
            ]}
          >
            <Input placeholder="Enter file name" />
          </Form.Item>

          <Form.Item
            label="PDF/PowerPoint File"
            extra="Leave empty to keep existing file"
          >
            <Upload
              beforeUpload={(file) => {
                validateFile(file);
                setEditPdfFile(file);
                return false;
              }}
              onRemove={() => setEditPdfFile(null)}
              maxCount={1}
              accept=".pdf,.ppt,.pptx"
              fileList={
                editPdfFile
                  ? [
                      {
                        uid: "-1",
                        name: editPdfFile.name,
                        status: "done",
                      },
                    ]
                  : []
              }
            >
              <Button icon={<UploadOutlined />}>Select New File</Button>
            </Upload>
          </Form.Item>

          {/* Current File Preview */}
          {selectedPdf?.pdf_link && !editPdfFile && (
            <Form.Item label="Current File">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                  padding: "10px",
                  border: "1px solid #d9d9d9",
                  borderRadius: "6px",
                  backgroundColor: "#fafafa",
                }}
              >
                <FaBook
                  onClick={() => window.open(selectedPdf?.pdf_link, "_blank")}
                  style={{
                    width: "25px",
                    height: "25px",
                    color: "orange",
                    cursor: "pointer",
                  }}
                />
                <span style={{ flex: 1 }}>Click icon to view current file</span>
                <FaTrashCan
                  style={{
                    width: "18px",
                    height: "18px",
                    color: "red",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    setSelectedPdf({ ...selectedPdf, pdf_link: null })
                  }
                />
              </div>
            </Form.Item>
          )}

          <Form.Item style={{ marginBottom: 0, textAlign: "right" }}>
            <Button
              style={{ marginRight: 8 }}
              onClick={closeEditModal}
              disabled={editLoading}
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" loading={editLoading}>
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Delete Modal */}
      <Modal
        title="Delete PDF/PowerPoint"
        open={isDeleteModalOpen}
        onCancel={closeDeleteModal}
        footer={[
          <Button
            key="cancel"
            onClick={closeDeleteModal}
            disabled={deleteLoading}
          >
            Cancel
          </Button>,
          <Button
            key="delete"
            type="primary"
            danger
            onClick={handleDeletePdf}
            loading={deleteLoading}
          >
            Delete
          </Button>,
        ]}
      >
        <p>Are you sure you want to delete this file?</p>
        <p>
          <strong>File Name:</strong> {selectedPdf?.pdf_name}
        </p>
      </Modal>
    </>
  );
};

export default Pdfs;
