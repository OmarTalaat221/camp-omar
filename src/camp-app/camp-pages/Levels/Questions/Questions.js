import { Button, Modal, Table, Dropdown } from "antd";
import Breadcrumbs from "../../../../component/common/breadcrumb/breadcrumb";
import "./style.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import {
  FaBook,
  FaEllipsisVertical,
  FaEye,
  FaEyeSlash,
  FaFilePen,
  FaPlus,
  FaTrash,
} from "react-icons/fa6";
import axios from "axios";
import { BASE_URL } from "../../../../Api/baseUrl";
import { toast } from "react-toastify";
import { relativeValue } from "react-range";
import { imageUploader } from "../../camp-utils";
import { split } from "lodash";
import { voiceUploader } from "../../camp-utils/UploadVoice";
import { PdfUploader } from "../../camp-utils/UploadPdf";
export default function Questions() {
  const { section_id } = useParams();
  const [addModal, setAddModal] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [showHideModal, setShowHideModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [rowData, setRowData] = useState({});
  const [questions, setQuestions] = useState([]);
  const [imgs, setImgs] = useState({
    file: null,
    url: "",
  });

  const [AttachmentsModal, setAttachmentsModal] = useState(null);

  const [voice, setVoice] = useState(null);
  const [pdf, setPdf] = useState(null);

  const [questionData, setQuestionsData] = useState({
    section_id: section_id,
    question_text: "",
    question_image: "",
    question_valid_answer: "",
    question_answers: "",
    question_audio: "",
    question_pdf: "",
  });
  const [additionalAnswers, setAdditionalAnswers] = useState(
    Array.from({ length: 2 }, (_, id) => ({ id, ans: "" }))
  );

  const columns = [
    {
      id: "question_id",
      dataIndex: "question_id",
      title: "Id",
    },
    {
      id: "question_image",
      dataIndex: "question_image",
      title: "Image",
      render: (text, row) =>
        row?.question_image && (
          <img
            style={{ width: "100px", height: "100px", borderRadius: "10px" }}
            src={row?.question_image}
          />
        ),
    },
    {
      id: "question_answers",
      dataIndex: "question_answers",
      title: "question answers",
      render: (text, row) => {
        const answers = row?.question_answers?.split("//CAMP//");
        return (
          <ul style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
            {answers?.map((item, index) => (
              <li
                style={
                  row?.question_valid_answer == item
                    ? { color: "green" }
                    : { color: "red" }
                }
                key={index}
              >
                {item}
              </li>
            ))}
          </ul>
        );
      },
    },
    {
      id: "question_valid_answer",
      dataIndex: "question_valid_answer",
      title: "question valid answer",
    },
    {
      id: "real_answers",
      dataIndex: "real_answers",
      title: "real answers",
      render: (text, row) => (
        <ul style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
          {row?.real_answers?.map((ans, index) => (
            <li key={index}>{ans}</li>
          ))}
        </ul>
      ),
    },
    {
      title: "Actions",
      render: (text, row) => {
        const items = [
          {
            key: 1,
            label: (
              <button
                className="btn btn-primary"
                onClick={() => {
                  setRowData(row);
                  setEditModal(true);
                }}
              >
                Edit Question
              </button>
            ),
          },
          {
            key: 2,
            label: (
              <button
                className="btn btn-primary"
                onClick={() => {
                  setRowData(row);
                  setDeleteModal(true);
                }}
              >
                Delete Question
              </button>
            ),
          },
          {
            key: 3,
            label: (
              <button
                className="btn btn-primary"
                onClick={() => {
                  setAttachmentsModal(row);
                }}
              >
                {" "}
                Question's Attachments
              </button>
            ),
          },
        ];
        return (
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
        );
      },
    },
  ];

  function handleGetAllQuestion() {
    const data_send = {
      section_id: section_id,
    };
    axios
      .post(
        BASE_URL + "/admin/questions_content/get_section_question.php",
        data_send
      )
      .then((res) => {
        if (res?.data?.status == "success") {
          setQuestions(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
  }

  async function handleAddQuestion(e) {
    e.preventDefault();
    if (!questionData?.question_text) {
      toast.warn("please enter title first!");
      return;
    }

    if (!questionData?.question_valid_answer) {
      toast.warn("please Enter Valid answer");
      return;
    }

    if (additionalAnswers?.some((ans) => !ans?.ans?.trim())) {
      alert("All answers must be filled.");
      return;
    }

    setAddLoading(true);

    let pdfUrl;

    if (pdf) {
      const formData = new FormData();
      formData.append("file_attachment", pdf);
      const respdf = await PdfUploader(formData);
      console.log(respdf);

      if (respdf.data.status == "success") {
        console.log("wdjajidij");

        pdfUrl = respdf.data.message;
      }
    }

    console.log(pdfUrl);

    let voiceUrl;

    if (voice) {
      const formData = new FormData();
      formData.append("voice", voice);
      const resvoice = await voiceUploader(formData);
      console.log(resvoice);

      if (resvoice.data.status == "success") {
        console.log("wdjajidij");

        voiceUrl = resvoice.data.message;
      }
    }

    console.log(voiceUrl);

    if (imgs?.file) {
      const formData = new FormData();
      formData.append("image", imgs?.file);
      const resImg = await imageUploader(formData);
      if (resImg?.data?.status == "success") {
        const data_send = {
          ...questionData,
          question_answers: additionalAnswers
            .map((ans) => ans?.ans)
            ?.join("//CAMP//"),
          question_image: resImg?.data?.message,
          question_pdf: pdfUrl,
          question_audio: voiceUrl,
        };

        console.log(data_send);

        axios
          .post(
            BASE_URL + "/admin/questions_content/add_section_questions.php",
            data_send
          )
          .then((res) => {
            if (res?.data?.status == "success") {
              toast.success(res?.data?.message);
              handleGetAllQuestion();
              setAddLoading(false);
              setAddModal(false);
              setImgs({ file: null, url: "" });
              setQuestionsData({
                section_id: section_id,

                question_text: "",
                question_valid_answer: "",
                question_answers: "",
                question_image: "",
              });
              setAdditionalAnswers(
                Array.from({ length: 2 }, (_, id) => ({ id, ans: "" }))
              );
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
        toast.error(
          resImg?.data?.message || "There is an issue with uploading the image"
        );
      }
    } else {
      const data_send = {
        ...questionData,
        question_answers: additionalAnswers
          .map((ans) => ans?.ans)
          ?.join("//CAMP//"),
        question_image: null,
      };

      axios
        .post(
          BASE_URL + "/admin/questions_content/add_section_questions.php",
          data_send
        )
        .then((res) => {
          if (res?.data?.status == "success") {
            toast.success(res?.data?.message);
            handleGetAllQuestion();
            setAddLoading(false);
            setAddModal(false);
            setImgs({ file: null, url: "" });
            setQuestionsData({
              section_id: section_id,

              question_text: "",
              question_valid_answer: "",
              question_answers: "",
              question_image: "",
            });
            setAdditionalAnswers(
              Array.from({ length: 2 }, (_, id) => ({ id, ans: "" }))
            );
          } else {
            toast.error(res?.data?.message || "There's a problem");
          }
        })
        .catch((e) => console.log(e))
        .finally(() => {
          setAddLoading(false);
          setAddModal(false);
        });
    }
  }

  async function handleEditQuestion(e) {
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
          question_image: resImg?.data?.message,
        };

        axios
          .post(
            BASE_URL + "/admin/questions_content/edit_section_question.php",
            data_send
          )
          .then((res) => {
            if (res?.data?.status == "success") {
              toast.success(res?.data?.message);
              handleGetAllQuestion();
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
        .post(
          BASE_URL + "/admin/questions_content/edit_section_question.php",
          data_send
        )
        .then((res) => {
          if (res?.data?.status == "success") {
            toast.success(res?.data?.message);
            handleGetAllQuestion();
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

  function handleAddInput() {
    setAdditionalAnswers([
      ...additionalAnswers,
      { id: additionalAnswers?.length + 1, ans: "" },
    ]);
  }

  function handleRemoveInput(id) {
    setAdditionalAnswers(
      additionalAnswers.filter((ans, index) => index !== id)
    );
  }

  function handleInputChange(id, e) {
    setAdditionalAnswers((prev) =>
      prev.map((ans, index) =>
        index === id ? { ...ans, ans: e.target.value } : ans
      )
    );
  }

  function handleDeleteQuestion() {
    const data_send = {
      question_id: rowData?.question_id,
    };

    axios
      .post(
        BASE_URL + "/admin/questions_content/delete_section_question.php",
        data_send
      )
      .then((res) => {
        if (res?.data?.status == "success") {
          toast.success(res?.data?.message);
          handleGetAllQuestion();
          setRowData({});
          setDeleteModal(false);
        } else {
          toast.error(
            res?.data?.message || "There's an issue while deleting a question"
          );
        }
      })
      .catch((e) => console.log(e))
      .finally(() => setDeleteModal(false));
  }

  useEffect(() => {
    handleGetAllQuestion();
  }, []);

  function handleCheckbox(e, index) {
    console.log(e, index);
  }
  return (
    <div>
      <Breadcrumbs parent="sections" title="Exam questions" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>Exam Questions</h5>
              </div>

              <div className="card-body">
                <button
                  className="btn btn-primary my-4"
                  onClick={() => setAddModal(true)}
                >
                  Add Questions
                </button>
                <Table columns={columns} dataSource={questions} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        title="Delete Question"
        onCancel={() => setDeleteModal(false)}
        open={deleteModal}
        footer={[
          <Button type="primary" key="submit" onClick={handleDeleteQuestion}>
            Yes
          </Button>,
          <Button type="" key="cancel" onClick={() => setDeleteModal(false)}>
            No
          </Button>,
        ]}
      >
        <p>
          Are you sure you want to delete the Following question:
          <br />
          <strong>{rowData?.question_text}</strong>
        </p>
      </Modal>

      <Modal
        title="Add Question"
        open={addModal}
        onCancel={() => setAddModal(false)}
        footer={[
          <Button type="primary" key="submit" onClick={handleAddQuestion}>
            {addLoading ? <Spinner animation="border" size="sm" /> : "Add"}
          </Button>,
          <Button key="cancel" onClick={() => setAddModal(false)}>
            Cancel
          </Button>,
        ]}
      >
        <form onSubmit={handleAddQuestion}>
          <div className="form_field">
            <label className="form_label">Question Text</label>
            <input
              value={questionData?.question_text}
              type="text"
              className="form_input"
              onChange={(e) =>
                setQuestionsData({
                  ...questionData,
                  question_text: e.target.value,
                })
              }
            />
          </div>

          <div className="form_field">
            <div className="d-flex justify-content-between align-items-center">
              <label className="form_label">Question Answers</label>
              <FaPlus
                onClick={handleAddInput}
                style={{ width: "20px", height: "20px" }}
              />
            </div>

            {additionalAnswers.map((ans, index) => (
              <div
                className="d-flex justify-content-between align-items-center gap-3"
                key={ans?.id}
              >
                {/* <input type="checkbox"  value={ans} onChange={(e) => handleCheckbox(e, index)}/> */}
                <input
                  onChange={(e) => handleInputChange(index, e)}
                  type="text"
                  value={ans?.ans}
                  className="form_input"
                />

                {index > 2 && (
                  <FaTrash
                    className="delete_icon"
                    onClick={() => handleRemoveInput(index)}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="form_field">
            <label className="form_label">Question Valid Answer</label>
            <input
              value={questionData?.question_valid_answer}
              type="text"
              className="form_input"
              onChange={(e) =>
                setQuestionsData({
                  ...questionData,
                  question_valid_answer: e.target.value,
                })
              }
            />
          </div>

          <div className="form_field">
            <label className="form_label">Question Image</label>
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
            <img
              style={{ width: "150px", height: "150px", borderRadius: "10px" }}
              src={imgs?.url}
            />
          )}

          <div className="form_field">
            <label className="form_label">Question voice</label>
            <input
              type="file"
              className="form_input"
              onChange={(e) => {
                setVoice(e.target.files[0]);
              }}
            />
          </div>
          <div className="form_field">
            <label className="form_label">Question pdf</label>
            <input
              type="file"
              className="form_input"
              onChange={(e) => {
                setPdf(e.target.files[0]);
              }}
            />
          </div>
        </form>
      </Modal>

      <Modal
        title="Edit Question"
        open={editModal}
        onCancel={() => setEditModal(false)}
        footer={[
          <Button type="primary" key="submit" onClick={handleEditQuestion}>
            {editLoading ? <Spinner animation="border" size="sm" /> : "Edit"}
          </Button>,
          <Button key="cancel" onClick={() => setEditModal(false)}>
            Cancel
          </Button>,
        ]}
      >
        <form onSubmit={handleEditQuestion}>
          <div className="form_field">
            <label className="form_label">Question Text</label>
            <input
              value={rowData?.question_text}
              type="text"
              className="form_input"
              onChange={(e) =>
                setRowData({ ...rowData, question_text: e.target.value })
              }
            />
          </div>

          <div className="form_field">
            <div className="d-flex justify-content-between align-items-center">
              <label className="form_label">Question Answers</label>
              <FaPlus
                onClick={() => {
                  const updatedAnswers = [
                    ...rowData?.question_answers?.split("//CAMP//"),
                    "",
                  ];
                  setRowData({
                    ...rowData,
                    question_answers: updatedAnswers.join("//CAMP//"),
                  });
                }}
                style={{ width: "20px", height: "20px" }}
              />
            </div>

            {rowData?.question_answers?.split("//CAMP//")?.map((ans, index) => (
              <div
                className="d-flex justify-content-between align-items-center gap-3"
                key={ans?.id}
              >
                <input
                  onChange={(e) => {
                    const updatedAnswers = [
                      ...rowData.question_answers?.split("//CAMP//"),
                    ];
                    updatedAnswers[index] = e.target.value;
                    setRowData({
                      ...rowData,
                      question_answers: updatedAnswers.join("//CAMP//"),
                    });
                  }}
                  type="text"
                  value={ans}
                  className="form_input"
                />

                {index > 3 && (
                  <FaTrash
                    className="delete_icon"
                    onClick={() => {
                      setRowData({
                        ...rowData,
                        question_answers: rowData?.question_answers
                          ?.split("//CAMP//")
                          ?.filter((item, i) => i !== index)
                          .join("//CAMP//"),
                      });
                    }}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="form_field">
            <label className="form_label">Question Valid Answer</label>
            <input
              value={rowData?.question_valid_answer}
              type="text"
              className="form_input"
              onChange={(e) =>
                setRowData({
                  ...rowData,
                  question_valid_answer: e.target.value,
                })
              }
            />
          </div>

          <div className="form_field">
            <label className="form_label">Question Image</label>
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

          {(imgs?.url || rowData?.question_image) && (
            <div className="d-flex gap-3 align-items-center">
              <img
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "10px",
                }}
                src={imgs?.url || rowData?.question_image}
              />

              <FaTrash
                className="delete_icon"
                onClick={() => setRowData({ ...rowData, question_image: null })}
              />
            </div>
          )}
        </form>
      </Modal>

      <Modal
        title="Question Attachments"
        open={AttachmentsModal}
        onCancel={() => setAttachmentsModal(null)}
        footer={[
          <Button key="cancel" onClick={() => setAttachmentsModal(null)}>
            Cancel
          </Button>,
        ]}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          {AttachmentsModal?.question_audio ? (
            <>
              <audio src={AttachmentsModal?.question_audio} controls>
                Your browser does not support the audio element.
              </audio>
            </>
          ) : null}

          {AttachmentsModal?.question_pdf ? (
            <>
              <div style={{ display: "flex", alignItems: "center" }}>
                <label>pdf</label>
                <FaBook
                  onClick={() => window.open(AttachmentsModal?.question_pdf)}
                  style={{
                    width: "30px",
                    height: "30px",
                    color: "orange",
                    cursor: "pointer",
                    margin: "0px 10px",
                  }}
                />
              </div>
            </>
          ) : null}
        </div>
      </Modal>
    </div>
  );
}
