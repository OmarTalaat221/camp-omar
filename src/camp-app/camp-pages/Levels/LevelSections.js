import React, { useEffect, useRef, useState } from "react";
import Breadcrumbs from "../../../component/common/breadcrumb/breadcrumb";
import { Button, Dropdown, Modal, Table } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FaBook,
  FaEllipsisVertical,
  FaEye,
  FaTrashCan,
  FaEyeSlash,
} from "react-icons/fa6";
import { BASE_URL } from "../../../Api/baseUrl";
import axios from "axios";
import { toast } from "react-toastify";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import { Spinner } from "reactstrap";

const LevelSections = () => {
  const navigate = useNavigate();
  const { levelId } = useParams();
  const [levelSections, setLevelSections] = useState([]);
  const [AttachmentType, setAttachmentType] = useState("pdf");
  const recorderControls = useAudioRecorder();
  const [newSectionName, setNewSectionName] = useState({
    section_name: null,
  });

  // فصل states الـ Modals عن الـ Data
  const [AddSectionModal, setAddSectionModal] = useState(false);

  // Edit Modal - فصل الـ state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [EditingSection, setEditingSection] = useState(null);

  // Delete Modal - فصل الـ state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [DeletingSection, setDeletingSection] = useState(null);

  const [Loading, setLoading] = useState(false);

  // Add Exam Attachment Modal - فصل الـ state
  const [isAddExamAttachmentModalOpen, setIsAddExamAttachmentModalOpen] =
    useState(false);
  const [ExamAttachmentSection, setExamAttachmentSection] = useState(null);

  // Show Exam Attachment Modal - فصل الـ state
  const [isShowExamAttachmentModalOpen, setIsShowExamAttachmentModalOpen] =
    useState(false);
  const [ShowExamAttachmentSection, setShowExamAttachmentSection] =
    useState(null);

  const [AttchmentPdf, setAttchmentPdf] = useState(null);
  const [voice, setVoice] = useState(null);
  const [rowData, setRowData] = useState(false);
  const [showHideModal, setShowHideModal] = useState(false);
  const [showHideLoading, setShowHideLoading] = useState(false);

  // Helper functions لفتح الـ Modals
  const openEditModal = (row) => {
    setEditingSection(row);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingSection(null);
  };

  const openDeleteModal = (row) => {
    setDeletingSection(row);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeletingSection(null);
  };

  const openAddExamAttachmentModal = (row) => {
    setExamAttachmentSection(row);
    setIsAddExamAttachmentModalOpen(true);
  };

  const closeAddExamAttachmentModal = () => {
    setIsAddExamAttachmentModalOpen(false);
    setExamAttachmentSection(null);
  };

  const openShowExamAttachmentModal = (row) => {
    setShowExamAttachmentSection(row);
    setIsShowExamAttachmentModalOpen(true);
  };

  const closeShowExamAttachmentModal = () => {
    setIsShowExamAttachmentModalOpen(false);
    setShowExamAttachmentSection(null);
  };

  const columns = [
    {
      id: "section_id",
      dataIndex: "section_id",
      title: "#",
    },
    {
      id: "section_name",
      dataIndex: "section_name",
      title: "section name",
    },
    {
      title: "Actions",
      render: (text, row) => {
        const items = [
          {
            key: 1,
            label: (
              <Link
                to={`${process.env.PUBLIC_URL}/levels/${levelId}/sections/${row?.section_id}/videos`}
                className="btn btn-primary text-white"
                style={{ width: "100%" }}
              >
                Videos
              </Link>
            ),
          },
          {
            key: 2,
            label: (
              <Link
                to={`${process.env.PUBLIC_URL}/levels/${levelId}/sections/${row?.section_id}/Examquestions`}
                className="btn btn-primary text-white"
                style={{ width: "100%" }}
              >
                Exam
              </Link>
            ),
          },
          {
            key: 3,
            label: (
              <Link
                to={`${process.env.PUBLIC_URL}/levels/${levelId}/sections/${row?.section_id}/pdfs`}
                className="btn btn-primary text-white"
                style={{ width: "100%" }}
              >
                Files
              </Link>
            ),
          },
          {
            key: 4,
            label: (
              <Link
                to={`${process.env.PUBLIC_URL}/levels/${levelId}/sections/${row?.section_id}/voices`}
                className="btn btn-primary text-white"
                style={{ width: "100%" }}
              >
                Voices
              </Link>
            ),
          },
        ];
        return (
          <div className="d-flex gap-2 align-items-center">
            <Button onClick={() => openEditModal(row)}>Edit</Button>
            <Dropdown
              menu={{
                items,
              }}
              placement="bottom"
            >
              <Button
                className="btn btn-primary "
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "3px",
                  width: "fit-content",
                  fontSize: "18px",
                }}
              >
                <FaEllipsisVertical
                  style={{
                    fontSize: "18px",
                  }}
                />
              </Button>
            </Dropdown>
            <FaTrashCan
              className="del_icon"
              style={{ cursor: "pointer" }}
              onClick={() => openDeleteModal(row)}
            />
          </div>
        );
      },
    },
    {
      id: "exam_attachment",
      dataIndex: "x",
      title: "Exam Attachment",
      render: (text, row) => {
        return (
          <>
            {row.exam_status === "1" ? (
              <FaEye
                style={{
                  fontSize: "23px",
                  color: "green",
                  margin: "0px 10px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setRowData(row);
                  setShowHideModal(true);
                }}
              />
            ) : (
              <FaEyeSlash
                style={{
                  fontSize: "23px",
                  color: "red",
                  margin: "0px 10px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setRowData(row);
                  setShowHideModal(true);
                }}
              />
            )}
            <Button onClick={() => openAddExamAttachmentModal(row)}>
              Add Exam Attachment
            </Button>
            <Button
              style={{ margin: "0px 10px" }}
              onClick={() => openShowExamAttachmentModal(row)}
            >
              Show Exam Attachment
            </Button>
          </>
        );
      },
    },
  ];

  function handleSelectSections() {
    const dataSend = {
      level_id: levelId,
    };
    axios
      .post(
        BASE_URL + "/admin/content/select_sections.php",
        JSON.stringify(dataSend)
      )
      .then((res) => {
        console.log(res);
        if (res?.data?.status == "success") {
          setLevelSections(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    handleSelectSections();
  }, []);

  const handleAddSection = () => {
    const dataSend = {
      section_name: newSectionName.section_name,
      level_id: levelId,
    };

    axios
      .post(
        BASE_URL + "/admin/content/add_section.php",
        JSON.stringify(dataSend)
      )
      .then((res) => {
        if (res?.data?.status == "success") {
          toast.success(res.data.message);
          setAddSectionModal(false);
          handleSelectSections();
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((e) => console.log(e));
  };

  const handleEditSection = () => {
    const dataSend = {
      section_name: EditingSection.section_name,
      section_id: EditingSection.section_id,
    };

    axios
      .post(
        BASE_URL + "/admin/content/edit_section.php",
        JSON.stringify(dataSend)
      )
      .then((res) => {
        if (res?.data?.status == "success") {
          toast.success(res.data.message);
          closeEditModal();
          handleSelectSections();
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((e) => console.log(e));
  };

  const handleDeleteSection = (id) => {
    const dataSend = {
      section_id: id,
    };
    axios
      .post(
        BASE_URL + "/admin/content/delete_section.php",
        JSON.stringify(dataSend)
      )
      .then((res) => {
        if (res?.data?.status == "success") {
          toast.success(res.data.message);
          closeDeleteModal();
          handleSelectSections();
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((e) => console.log(e));
  };

  const handleAddExamAttachment = async (section_id) => {
    if (AttachmentType == "pdf") {
      setLoading(true);
      const formData = new FormData();
      formData.append("file_attachment", AttchmentPdf);
      await axios
        .post(
          "https://campforenglish.net/camp_for_english/admin/upload_pdf.php",
          formData
        )
        .then((resPdf) => {
          if (resPdf?.data?.status == "success") {
            const dataSend = {
              exam_attach_type: AttachmentType,
              exam_attach_link: resPdf?.data?.message,
              section_id: section_id,
            };

            axios
              .post(
                BASE_URL + "/admin/content/add_edit_section_exam_attach.php",
                JSON.stringify(dataSend)
              )
              .then((res) => {
                if (res?.data?.status == "success") {
                  toast.success(res.data.message);
                  closeAddExamAttachmentModal();
                  handleSelectSections();
                } else {
                  toast.error(res.data.message);
                }
              })
              .catch((e) => console.log(e));
          } else {
            toast.error(resPdf?.data?.message);
          }
        })
        .finally(() => {
          setLoading(false);
        })
        .catch((e) => console.log(e));
    } else {
      setLoading(true);
      const formData = new FormData();
      formData.append("voice", audioUrl);
      await axios
        .post(
          "https://campforenglish.net/camp_for_english/admin/upload_voice.php",
          formData
        )
        .then((resvoice) => {
          if (resvoice?.data?.status == "success") {
            const dataSend = {
              exam_attach_type: AttachmentType,
              exam_attach_link: resvoice?.data?.message,
              section_id: section_id,
            };

            axios
              .post(
                BASE_URL + "/admin/content/add_edit_section_exam_attach.php",
                JSON.stringify(dataSend)
              )
              .then((res) => {
                if (res?.data?.status == "success") {
                  toast.success(res.data.message);
                  closeAddExamAttachmentModal();
                  handleSelectSections();
                } else {
                  toast.error(res.data.message);
                }
              })
              .catch((e) => console.log(e));
          } else {
            toast.error(resvoice?.data?.message);
          }
        })
        .finally(() => {
          setLoading(false);
        })
        .catch((e) => console.log(e));
    }
  };

  const [audioUrl, setAudioUrl] = useState(null);

  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    setVoice(url);
    audio.src = url;
    audio.controls = true;
    document.body.appendChild(audio);
    const file = new File([blob], "recording.mp3", { type: "audio/mp3" });
    setAudioUrl(file);
  };

  function handleShowHideExam() {
    const data_send = {
      section_id: rowData?.section_id,
      exam_status: rowData?.exam_status === "1" ? "0" : "1",
    };
    setShowHideLoading(true);
    axios
      .post(
        "https://campforenglish.net/camp_for_english/admin/content/show_hide_exam_section.php",
        data_send
      )
      .then((res) => {
        if (res?.data?.status === "success") {
          toast.success(res.data.message);
          setShowHideModal(false);
          handleSelectSections();
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((e) => {
        console.log(e);
        toast.error("An error occurred");
      })
      .finally(() => setShowHideLoading(false));
  }

  return (
    <>
      <Breadcrumbs parent="levels" title="sections List" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>List sections</h5>
                <Button
                  color="primary btn-pill"
                  style={{ margin: "10px 0" }}
                  onClick={() => setAddSectionModal(true)}
                >
                  Add section
                </Button>
              </div>
              <div className="card-body">
                <Table
                  scroll={{
                    x: "max-content",
                  }}
                  columns={columns}
                  dataSource={levelSections}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Section Modal */}
      <Modal
        title="Add section"
        open={AddSectionModal}
        footer={
          <>
            <Button
              style={{ margin: "0px 10px " }}
              onClick={() => handleAddSection()}
            >
              Add
            </Button>
            <Button onClick={() => setAddSectionModal(false)}>Cancel</Button>
          </>
        }
        onCancel={() => setAddSectionModal(false)}
      >
        <div className="form_field">
          <label className="form_label">section name</label>
          <input
            type="text"
            className="form_input"
            onChange={(e) => {
              setNewSectionName({
                ...newSectionName,
                section_name: e.target.value,
              });
            }}
          />
        </div>
      </Modal>

      {/* Edit Section Modal - منفصل */}
      <Modal
        title="Edit section"
        open={isEditModalOpen}
        footer={
          <>
            <Button
              style={{ margin: "0px 10px " }}
              onClick={() => handleEditSection()}
            >
              Edit
            </Button>
            <Button onClick={closeEditModal}>Cancel</Button>
          </>
        }
        onCancel={closeEditModal}
      >
        <div className="form_field">
          <label className="form_label">section name</label>
          <input
            type="text"
            className="form_input"
            value={EditingSection?.section_name || ""}
            onChange={(e) => {
              setEditingSection({
                ...EditingSection,
                section_name: e.target.value,
              });
            }}
          />
        </div>
      </Modal>

      {/* Delete Section Modal - منفصل */}
      <Modal
        title="Delete section"
        open={isDeleteModalOpen}
        onCancel={closeDeleteModal}
        footer={[
          <Button
            type="primary"
            key="submit"
            onClick={() => handleDeleteSection(DeletingSection?.section_id)}
          >
            Delete
          </Button>,
          <Button key="cancel" onClick={closeDeleteModal}>
            Cancel
          </Button>,
        ]}
      >
        <h3>Are you sure you want to delete this section</h3>
        <p>
          <strong>section name:</strong> {DeletingSection?.section_name}
        </p>
      </Modal>

      {/* Add Exam Attachment Modal - منفصل */}
      <Modal
        title="Add Exam Attachment"
        open={isAddExamAttachmentModalOpen}
        onCancel={closeAddExamAttachmentModal}
        footer={[
          <Button
            type="primary"
            key="submit"
            onClick={() =>
              handleAddExamAttachment(ExamAttachmentSection?.section_id)
            }
          >
            {Loading ? (
              <Spinner style={{ width: "15px", height: "15px" }} />
            ) : (
              "Add Attachment"
            )}
          </Button>,
          <Button key="cancel" onClick={closeAddExamAttachmentModal}>
            Cancel
          </Button>,
        ]}
      >
        <div
          style={{
            display: "flex",
            width: "20%",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <label className="form_label">pdf</label>
            <input
              type="radio"
              name="attachment_type"
              value="pdf"
              defaultChecked
              onChange={(e) => {
                setAttachmentType(e.target.value);
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <label className="form_label">voice</label>
            <input
              type="radio"
              name="attachment_type"
              value="voice"
              onChange={(e) => {
                setAttachmentType(e.target.value);
              }}
            />
          </div>
        </div>
        {AttachmentType == "pdf" ? (
          <div className="form_field">
            <label className="form_label">pdf</label>
            <input
              type="file"
              className="form_input"
              onChange={(e) => {
                setAttchmentPdf(e.target.files[0]);
              }}
            />
          </div>
        ) : (
          <>
            <AudioRecorder
              onRecordingComplete={addAudioElement}
              recorderControls={recorderControls}
              audioTrackConstraints={{
                noiseSuppression: true,
                echoCancellation: true,
              }}
              downloadFileExtension="mp3"
            />
            <div className="form_field">
              <label className="form_label">upload voice</label>
              <input
                type="file"
                className="form_input"
                onChange={(e) => {
                  setAudioUrl(e.target.files[0]);
                }}
              />
            </div>

            {voice && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "space-around",
                  margin: "10px 0",
                }}
              >
                <label className="form_label">Recorded Audio :</label>
                <audio controls src={voice}></audio>
              </div>
            )}
          </>
        )}
      </Modal>

      {/* Show Exam Attachment Modal - منفصل */}
      <Modal
        title="Show Exam Attachment Modal"
        open={isShowExamAttachmentModalOpen}
        onCancel={closeShowExamAttachmentModal}
        footer={[
          <Button key="cancel" onClick={closeShowExamAttachmentModal}>
            Cancel
          </Button>,
        ]}
      >
        {ShowExamAttachmentSection?.exam_attach_type == "pdf" ? (
          <div className="form_field">
            <label className="form_label">pdf</label>
            <FaBook
              onClick={() =>
                window.open(ShowExamAttachmentSection?.exam_attach_link)
              }
              style={{
                width: "30px",
                height: "30px",
                color: "orange",
                cursor: "pointer",
              }}
            />
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              justifyContent: "space-around",
              margin: "10px 0",
            }}
          >
            <label className="form_label">Recorded Audio :</label>
            <audio
              controls
              src={ShowExamAttachmentSection?.exam_attach_link}
            ></audio>
          </div>
        )}
      </Modal>

      {/* Show/Hide Modal */}
      <Modal
        title="hide offline session exam"
        open={showHideModal}
        onCancel={() => setShowHideModal(false)}
        footer={[
          <Button key="submit" type="primary" onClick={handleShowHideExam}>
            {rowData?.exam_status === "1"
              ? showHideLoading
                ? "Loading..."
                : "Hide"
              : showHideLoading
                ? "Loading..."
                : "Show"}
          </Button>,
          <Button key="cancel" onClick={() => setShowHideModal(false)}>
            Cancel
          </Button>,
        ]}
      >
        <p>
          Are you sure you want to{" "}
          {rowData?.exam_status === "1" ? "Hide" : "Show"} the following offline
          session exam:
        </p>
        <p>{rowData?.section_name}</p>
      </Modal>
    </>
  );
};

export default LevelSections;
