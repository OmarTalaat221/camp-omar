import {
  Button,
  Modal,
  Table,
  Dropdown,
  Input,
  Form,
  Upload,
  Radio,
} from "antd";
import Breadcrumbs from "../../../component/common/breadcrumb/breadcrumb";
import "./style.css";
import { useEffect, useState } from "react";
import { FaBook, FaEllipsisVertical } from "react-icons/fa6";
import {
  UploadOutlined,
  DeleteOutlined,
  PlusOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";
import axios from "axios";
import { BASE_URL } from "../../../Api/baseUrl";
import { toast } from "react-toastify";
import { imageUploader } from "../camp-utils";
import * as XLSX from "xlsx";
import { PdfUploader } from "../camp-utils/UploadPdf";
import { voiceUploader } from "../camp-utils/UploadVoice";
import { BsSearch } from "react-icons/bs";

export default function Questions() {
  // Form Instances
  const [addForm] = Form.useForm();
  const [editForm] = Form.useForm();

  // Data States
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  // Modal States (boolean only)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAttachmentsModalOpen, setIsAttachmentsModalOpen] = useState(false);

  // Loading States
  const [fetchLoading, setFetchLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // File States for Add
  const [addFiles, setAddFiles] = useState({
    image: null,
    imagePreview: null,
    voice: null,
    pdf: null,
  });

  // File States for Edit
  const [editFiles, setEditFiles] = useState({
    image: null,
    imagePreview: null,
  });

  // Answers State for Add
  const [answers, setAnswers] = useState(["", ""]);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);

  // Answers State for Edit
  const [editAnswers, setEditAnswers] = useState([]);
  const [editCorrectAnswerIndex, setEditCorrectAnswerIndex] = useState(null);

  // Search States
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  // ==================== Modal Control Functions ====================

  const openAddModal = () => {
    addForm.resetFields();
    setAnswers(["", ""]);
    setCorrectAnswerIndex(null);
    setAddFiles({ image: null, imagePreview: null, voice: null, pdf: null });
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
    addForm.resetFields();
    setAnswers(["", ""]);
    setCorrectAnswerIndex(null);
    setAddFiles({ image: null, imagePreview: null, voice: null, pdf: null });
  };

  const openEditModal = (row) => {
    const answersArray = row?.question_answers?.split("//CAMP//") || [];
    const correctIndex = answersArray.findIndex(
      (ans) => ans === row?.question_valid_answer
    );

    setSelectedQuestion(row);
    setEditAnswers(answersArray);
    setEditCorrectAnswerIndex(correctIndex >= 0 ? correctIndex : null);
    setEditFiles({ image: null, imagePreview: null });

    editForm.setFieldsValue({
      question_text: row.question_text,
    });

    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedQuestion(null);
    setEditAnswers([]);
    setEditCorrectAnswerIndex(null);
    setEditFiles({ image: null, imagePreview: null });
    editForm.resetFields();
  };

  const openDeleteModal = (row) => {
    setSelectedQuestion(row);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedQuestion(null);
  };

  const openAttachmentsModal = (row) => {
    setSelectedQuestion(row);
    setIsAttachmentsModalOpen(true);
  };

  const closeAttachmentsModal = () => {
    setIsAttachmentsModalOpen(false);
    setSelectedQuestion(null);
  };

  // ==================== Search Functions ====================

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<BsSearch />}
          size="small"
          style={{ width: 90 }}
        >
          Search
        </Button>
        <Button
          onClick={() => handleReset(clearFilters)}
          size="small"
          style={{ width: 90, marginTop: 8 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <BsSearch style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    render: (text) =>
      searchedColumn === dataIndex ? (
        <span style={{ backgroundColor: "#ffc069", padding: 0 }}>{text}</span>
      ) : (
        text
      ),
  });

  const handleTableChange = (pagination, filters, sorter, extra) => {
    if (extra && extra.currentDataSource) {
      setFilteredData(extra.currentDataSource);
    }
  };

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredData && filteredData.length > 0 ? filteredData : questions
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Questions");
    XLSX.writeFile(workbook, "questions_data.xlsx");
  };

  // ==================== Table Columns ====================

  const columns = [
    {
      dataIndex: "question_id",
      title: "#",
      width: 60,
    },
    {
      dataIndex: "question_image",
      title: "Image",
      width: 120,
      render: (text, row) =>
        row?.question_image ? (
          <img
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "8px",
              objectFit: "cover",
            }}
            src={row?.question_image}
            alt="question"
          />
        ) : (
          <span style={{ color: "#999" }}>No Image</span>
        ),
    },
    {
      dataIndex: "question_text",
      title: "Question Text",
      ...getColumnSearchProps("question_text"),
      ellipsis: true,
    },
    {
      dataIndex: "question_answers",
      title: "Answers",
      ...getColumnSearchProps("question_answers"),
      render: (text, row) => {
        const answersArr = row?.question_answers?.split("//CAMP//") || [];
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {answersArr.map((item, index) => {
              const isCorrect = row?.question_valid_answer === item;
              return (
                <span
                  key={index}
                  style={{
                    color: isCorrect ? "#52c41a" : "#333",
                    fontWeight: isCorrect ? "600" : "400",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  {isCorrect && <CheckCircleFilled style={{ fontSize: 14 }} />}
                  {item}
                </span>
              );
            })}
          </div>
        );
      },
    },
    {
      dataIndex: "question_valid_answer",
      title: "Correct Answer",
      ...getColumnSearchProps("question_valid_answer"),
      render: (text) => (
        <span style={{ color: "#52c41a", fontWeight: "600" }}>{text}</span>
      ),
    },
    // {
    //   dataIndex: "real_answers",
    //   title: "Real Answers",
    //   ...getColumnSearchProps("real_answers"),
    //   render: (text, row) => (
    //     <ul
    //       style={{
    //         display: "flex",
    //         flexDirection: "column",
    //         gap: "3px",
    //         margin: 0,
    //         paddingLeft: 16,
    //       }}
    //     >
    //       {row?.real_answers?.map((ans, index) => (
    //         <li key={index}>{ans}</li>
    //       ))}
    //     </ul>
    //   ),
    // },
    {
      title: "Actions",
      width: 80,
      render: (text, row) => {
        const items = [
          {
            key: "edit",
            label: (
              <span onClick={() => openEditModal(row)}>Edit Question</span>
            ),
          },
          {
            key: "delete",
            label: (
              <span
                onClick={() => openDeleteModal(row)}
                style={{ color: "#ff4d4f" }}
              >
                Delete Question
              </span>
            ),
          },
          {
            key: "attachments",
            label: (
              <span onClick={() => openAttachmentsModal(row)}>
                View Attachments
              </span>
            ),
          },
        ];

        return (
          <Dropdown
            menu={{ items }}
            placement="bottomRight"
            trigger={["click"]}
          >
            <Button icon={<FaEllipsisVertical />} />
          </Dropdown>
        );
      },
    },
  ];

  // ==================== API Calls ====================

  const handleGetAllQuestions = () => {
    setFetchLoading(true);
    axios
      .get(BASE_URL + "/admin/questions_content/get_exam_question.php")
      .then((res) => {
        if (res?.data?.status === "success") {
          setQuestions(res?.data?.message);
        }
      })
      .catch((e) => console.log(e))
      .finally(() => setFetchLoading(false));
  };

  useEffect(() => {
    handleGetAllQuestions();
  }, []);

  // ==================== Add Question ====================

  const handleAddQuestion = async (values) => {
    const filledAnswers = answers.filter((ans) => ans.trim());

    if (filledAnswers.length < 2) {
      toast.error("Please enter at least 2 answers");
      return;
    }

    if (correctAnswerIndex === null) {
      toast.error("Please select the correct answer");
      return;
    }

    if (!answers[correctAnswerIndex]?.trim()) {
      toast.error("The selected correct answer cannot be empty");
      return;
    }

    setAddLoading(true);

    try {
      let imageUrl = null;
      let voiceUrl = null;
      let pdfUrl = null;

      // Upload Image
      if (addFiles.image) {
        const formData = new FormData();
        formData.append("image", addFiles.image);
        const resImg = await imageUploader(formData);
        if (resImg?.data?.status === "success") {
          imageUrl = resImg.data.message;
        }
      }

      // Upload Voice
      if (addFiles.voice) {
        const formData = new FormData();
        formData.append("voice", addFiles.voice);
        const resVoice = await voiceUploader(formData);
        if (resVoice?.data?.status === "success") {
          voiceUrl = resVoice.data.message;
        }
      }

      // Upload PDF
      if (addFiles.pdf) {
        const formData = new FormData();
        formData.append("file_attachment", addFiles.pdf);
        const resPdf = await PdfUploader(formData);
        if (resPdf?.data?.status === "success") {
          pdfUrl = resPdf.data.message;
        }
      }

      const dataSend = {
        question_text: values.question_text,
        question_valid_answer: answers[correctAnswerIndex],
        question_answers: filledAnswers.join("//CAMP//"),
        question_image: imageUrl,
        question_audio: voiceUrl,
        question_pdf: pdfUrl,
      };

      const res = await axios.post(
        BASE_URL + "/admin/questions_content/add_exam_questions.php",
        dataSend
      );

      if (res?.data?.status === "success") {
        toast.success(res?.data?.message);
        handleGetAllQuestions();
        closeAddModal();
      } else {
        toast.error(res?.data?.message || "Failed to add question");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred");
    } finally {
      setAddLoading(false);
    }
  };

  // ==================== Edit Question ====================

  const handleEditQuestion = async (values) => {
    const filledAnswers = editAnswers.filter((ans) => ans.trim());

    if (filledAnswers.length < 2) {
      toast.error("Please enter at least 2 answers");
      return;
    }

    if (editCorrectAnswerIndex === null) {
      toast.error("Please select the correct answer");
      return;
    }

    if (!editAnswers[editCorrectAnswerIndex]?.trim()) {
      toast.error("The selected correct answer cannot be empty");
      return;
    }

    setEditLoading(true);

    try {
      let imageUrl = selectedQuestion?.question_image;

      if (editFiles.image) {
        const formData = new FormData();
        formData.append("image", editFiles.image);
        const resImg = await imageUploader(formData);
        if (resImg?.data?.status === "success") {
          imageUrl = resImg.data.message;
        }
      }

      const dataSend = {
        question_id: selectedQuestion?.question_id,
        question_text: values.question_text,
        question_valid_answer: editAnswers[editCorrectAnswerIndex],
        question_answers: filledAnswers.join("//CAMP//"),
        question_image: imageUrl,
      };

      const res = await axios.post(
        BASE_URL + "/admin/questions_content/edit_exam_question.php",
        JSON.stringify(dataSend)
      );

      if (res?.data?.status === "success") {
        toast.success(res?.data?.message);
        handleGetAllQuestions();
        closeEditModal();
      } else {
        toast.error(res?.data?.message || "Failed to edit question");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred");
    } finally {
      setEditLoading(false);
    }
  };

  // ==================== Delete Question ====================

  const handleDeleteQuestion = () => {
    setDeleteLoading(true);

    axios
      .post(BASE_URL + "/admin/questions_content/delete_exam_questions.php", {
        question_id: selectedQuestion?.question_id,
      })
      .then((res) => {
        if (res?.data?.status === "success") {
          toast.success(res?.data?.message);
          handleGetAllQuestions();
          closeDeleteModal();
        } else {
          toast.error(res?.data?.message || "Failed to delete question");
        }
      })
      .catch((e) => {
        console.log(e);
        toast.error("An error occurred");
      })
      .finally(() => setDeleteLoading(false));
  };

  // ==================== Answer Handlers (Add) ====================

  const handleAddAnswer = () => {
    setAnswers([...answers, ""]);
  };

  const handleRemoveAnswer = (index) => {
    if (answers.length > 2) {
      setAnswers(answers.filter((_, i) => i !== index));

      if (correctAnswerIndex === index) {
        setCorrectAnswerIndex(null);
      } else if (correctAnswerIndex > index) {
        setCorrectAnswerIndex(correctAnswerIndex - 1);
      }
    }
  };

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  // ==================== Answer Handlers (Edit) ====================

  const handleAddEditAnswer = () => {
    setEditAnswers([...editAnswers, ""]);
  };

  const handleRemoveEditAnswer = (index) => {
    if (editAnswers.length > 2) {
      setEditAnswers(editAnswers.filter((_, i) => i !== index));

      if (editCorrectAnswerIndex === index) {
        setEditCorrectAnswerIndex(null);
      } else if (editCorrectAnswerIndex > index) {
        setEditCorrectAnswerIndex(editCorrectAnswerIndex - 1);
      }
    }
  };

  const handleEditAnswerChange = (index, value) => {
    const newAnswers = [...editAnswers];
    newAnswers[index] = value;
    setEditAnswers(newAnswers);
  };

  // ==================== Render ====================

  return (
    <div>
      <Breadcrumbs parent="Levels" title="Placement Test" />

      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>Placement Test</h5>
                {/* ✅ زر Export Excel كما هو */}
                <button
                  className="btn btn-success"
                  style={{ marginTop: "10px" }}
                  onClick={handleExport}
                >
                  export to exel
                </button>
              </div>

              <div className="card-body">
                {/* ✅ زر Add Exam Question كما هو */}
                <button className="btn btn-primary my-4" onClick={openAddModal}>
                  Add Exam Question
                </button>

                <Table
                  columns={columns}
                  dataSource={questions}
                  loading={fetchLoading}
                  rowKey="question_id"
                  onChange={handleTableChange}
                  scroll={{ x: "max-content" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== Add Modal ==================== */}
      <Modal
        title="Add Exam Question"
        open={isAddModalOpen}
        onCancel={closeAddModal}
        footer={null}
        width={600}
        destroyOnClose
      >
        <Form form={addForm} layout="vertical" onFinish={handleAddQuestion}>
          <Form.Item
            label="Question Text"
            name="question_text"
            rules={[{ required: true, message: "Please enter question text" }]}
          >
            <Input.TextArea rows={3} placeholder="Enter your question" />
          </Form.Item>

          {/* Answers Section with Radio */}
          <div style={{ marginBottom: 24 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <label style={{ fontWeight: 500 }}>
                Answers <span style={{ color: "#ff4d4f" }}>*</span>
                <span style={{ fontWeight: 400, color: "#666", marginLeft: 8 }}>
                  (Select the correct one)
                </span>
              </label>
              <Button
                type="dashed"
                size="small"
                icon={<PlusOutlined />}
                onClick={handleAddAnswer}
              >
                Add
              </Button>
            </div>

            <Radio.Group
              value={correctAnswerIndex}
              onChange={(e) => setCorrectAnswerIndex(e.target.value)}
              style={{ width: "100%" }}
            >
              {answers.map((ans, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    gap: 8,
                    marginBottom: 8,
                    alignItems: "center",
                    padding: "8px 12px",
                    borderRadius: 6,
                    border:
                      correctAnswerIndex === index
                        ? "2px solid #52c41a"
                        : "1px solid #d9d9d9",
                    backgroundColor:
                      correctAnswerIndex === index ? "#f6ffed" : "#fff",
                  }}
                >
                  <Radio value={index} />
                  <Input
                    placeholder={`Answer ${index + 1}`}
                    value={ans}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                    style={{ flex: 1 }}
                  />
                  {answers.length > 2 && (
                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => handleRemoveAnswer(index)}
                    />
                  )}
                </div>
              ))}
            </Radio.Group>

            {correctAnswerIndex !== null && answers[correctAnswerIndex] && (
              <div
                style={{
                  marginTop: 8,
                  padding: "8px 12px",
                  backgroundColor: "#f6ffed",
                  borderRadius: 6,
                  color: "#52c41a",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <CheckCircleFilled />
                Correct Answer: <strong>{answers[correctAnswerIndex]}</strong>
              </div>
            )}
          </div>

          {/* Image Upload */}
          <Form.Item label="Question Image (Optional)">
            <Upload
              beforeUpload={(file) => {
                setAddFiles({
                  ...addFiles,
                  image: file,
                  imagePreview: URL.createObjectURL(file),
                });
                return false;
              }}
              onRemove={() =>
                setAddFiles({ ...addFiles, image: null, imagePreview: null })
              }
              maxCount={1}
              accept="image/*"
              listType="picture"
              fileList={
                addFiles.image
                  ? [{ uid: "-1", name: addFiles.image.name, status: "done" }]
                  : []
              }
            >
              <Button icon={<UploadOutlined />}>Select Image</Button>
            </Upload>
          </Form.Item>

          {/* Voice Upload */}
          <Form.Item label="Question Voice (Optional)">
            <Upload
              beforeUpload={(file) => {
                setAddFiles({ ...addFiles, voice: file });
                return false;
              }}
              onRemove={() => setAddFiles({ ...addFiles, voice: null })}
              maxCount={1}
              accept="audio/*"
              fileList={
                addFiles.voice
                  ? [{ uid: "-1", name: addFiles.voice.name, status: "done" }]
                  : []
              }
            >
              <Button icon={<UploadOutlined />}>Select Audio</Button>
            </Upload>
          </Form.Item>

          {/* PDF Upload */}
          <Form.Item label="Question PDF (Optional)">
            <Upload
              beforeUpload={(file) => {
                setAddFiles({ ...addFiles, pdf: file });
                return false;
              }}
              onRemove={() => setAddFiles({ ...addFiles, pdf: null })}
              maxCount={1}
              accept=".pdf"
              fileList={
                addFiles.pdf
                  ? [{ uid: "-1", name: addFiles.pdf.name, status: "done" }]
                  : []
              }
            >
              <Button icon={<UploadOutlined />}>Select PDF</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            style={{ marginBottom: 0, textAlign: "right", marginTop: 24 }}
          >
            <Button
              onClick={closeAddModal}
              style={{ marginRight: 8 }}
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

      {/* ==================== Edit Modal ==================== */}
      <Modal
        title="Edit Exam Question"
        open={isEditModalOpen}
        onCancel={closeEditModal}
        footer={null}
        width={600}
        destroyOnClose
      >
        <Form form={editForm} layout="vertical" onFinish={handleEditQuestion}>
          <Form.Item
            label="Question Text"
            name="question_text"
            rules={[{ required: true, message: "Please enter question text" }]}
          >
            <Input.TextArea rows={3} placeholder="Enter your question" />
          </Form.Item>

          {/* Answers Section with Radio */}
          <div style={{ marginBottom: 24 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <label style={{ fontWeight: 500 }}>
                Answers <span style={{ color: "#ff4d4f" }}>*</span>
                <span style={{ fontWeight: 400, color: "#666", marginLeft: 8 }}>
                  (Select the correct one)
                </span>
              </label>
              <Button
                type="dashed"
                size="small"
                icon={<PlusOutlined />}
                onClick={handleAddEditAnswer}
              >
                Add
              </Button>
            </div>

            <Radio.Group
              value={editCorrectAnswerIndex}
              onChange={(e) => setEditCorrectAnswerIndex(e.target.value)}
              style={{ width: "100%" }}
            >
              {editAnswers.map((ans, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    gap: 8,
                    marginBottom: 8,
                    alignItems: "center",
                    padding: "8px 12px",
                    borderRadius: 6,
                    border:
                      editCorrectAnswerIndex === index
                        ? "2px solid #52c41a"
                        : "1px solid #d9d9d9",
                    backgroundColor:
                      editCorrectAnswerIndex === index ? "#f6ffed" : "#fff",
                  }}
                >
                  <Radio value={index} />
                  <Input
                    placeholder={`Answer ${index + 1}`}
                    value={ans}
                    onChange={(e) =>
                      handleEditAnswerChange(index, e.target.value)
                    }
                    style={{ flex: 1 }}
                  />
                  {editAnswers.length > 2 && (
                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => handleRemoveEditAnswer(index)}
                    />
                  )}
                </div>
              ))}
            </Radio.Group>

            {editCorrectAnswerIndex !== null &&
              editAnswers[editCorrectAnswerIndex] && (
                <div
                  style={{
                    marginTop: 8,
                    padding: "8px 12px",
                    backgroundColor: "#f6ffed",
                    borderRadius: 6,
                    color: "#52c41a",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <CheckCircleFilled />
                  Correct Answer:{" "}
                  <strong>{editAnswers[editCorrectAnswerIndex]}</strong>
                </div>
              )}
          </div>

          {/* Image Upload */}
          <Form.Item label="Question Image">
            <Upload
              beforeUpload={(file) => {
                setEditFiles({
                  image: file,
                  imagePreview: URL.createObjectURL(file),
                });
                return false;
              }}
              onRemove={() => setEditFiles({ image: null, imagePreview: null })}
              maxCount={1}
              accept="image/*"
              listType="picture"
              fileList={
                editFiles.image
                  ? [{ uid: "-1", name: editFiles.image.name, status: "done" }]
                  : []
              }
            >
              <Button icon={<UploadOutlined />}>Select New Image</Button>
            </Upload>

            {selectedQuestion?.question_image && !editFiles.image && (
              <div
                style={{
                  marginTop: 8,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <img
                  src={selectedQuestion.question_image}
                  alt="current"
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 8,
                    objectFit: "cover",
                  }}
                />
                <span style={{ color: "#666" }}>Current image</span>
              </div>
            )}
          </Form.Item>

          <Form.Item
            style={{ marginBottom: 0, textAlign: "right", marginTop: 24 }}
          >
            <Button
              onClick={closeEditModal}
              style={{ marginRight: 8 }}
              disabled={editLoading}
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" loading={editLoading}>
              Edit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* ==================== Delete Modal ==================== */}
      <Modal
        title="Delete Question"
        open={isDeleteModalOpen}
        onCancel={closeDeleteModal}
        footer={[
          <Button
            key="cancel"
            onClick={closeDeleteModal}
            disabled={deleteLoading}
          >
            No
          </Button>,
          <Button
            key="delete"
            type="primary"
            danger
            onClick={handleDeleteQuestion}
            loading={deleteLoading}
          >
            Yes
          </Button>,
        ]}
      >
        <p>Are you sure you want to delete this question?</p>
        <p style={{ background: "#f5f5f5", padding: 12, borderRadius: 6 }}>
          <strong>{selectedQuestion?.question_text}</strong>
        </p>
      </Modal>

      {/* ==================== Attachments Modal ==================== */}
      <Modal
        title="Question Attachments"
        open={isAttachmentsModalOpen}
        onCancel={closeAttachmentsModal}
        footer={[
          <Button key="close" onClick={closeAttachmentsModal}>
            Cancel
          </Button>,
        ]}
      >
        {!selectedQuestion?.question_audio &&
        !selectedQuestion?.question_pdf ? (
          <p style={{ textAlign: "center", color: "#999", padding: 20 }}>
            No attachments available for this question
          </p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {selectedQuestion?.question_audio && (
              <div>
                <label
                  style={{ fontWeight: 500, marginBottom: 8, display: "block" }}
                >
                  Audio:
                </label>
                <audio
                  src={selectedQuestion.question_audio}
                  controls
                  style={{ width: "100%" }}
                />
              </div>
            )}

            {selectedQuestion?.question_pdf && (
              <div>
                <label
                  style={{ fontWeight: 500, marginBottom: 8, display: "block" }}
                >
                  PDF:
                </label>
                <Button
                  icon={<FaBook style={{ marginRight: 8 }} />}
                  onClick={() =>
                    window.open(selectedQuestion.question_pdf, "_blank")
                  }
                >
                  Open PDF
                </Button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
