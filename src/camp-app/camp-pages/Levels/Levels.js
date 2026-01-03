import { useEffect, useState } from "react";
import Breadcrumbs from "../../../component/common/breadcrumb/breadcrumb";
import { Button, Modal, Table, Dropdown, Input, Select } from "antd";
import "./style.css";
import axios from "axios";
import { BASE_URL } from "../../../Api/baseUrl";
import { toast } from "react-toastify";
import { Spinner } from "reactstrap";
import { FaBook, FaEllipsisVertical, FaTrashCan } from "react-icons/fa6";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import { BsSearch } from "react-icons/bs";

export default function Levels() {
  const navigate = useNavigate();
  const recorderControls = useAudioRecorder();

  const [openModal, setOpenModal] = useState(false);
  const [OpenShowExamModal, setOpenShowExamModal] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [showHideModal, setShowHideModal] = useState(false);
  const [levels, setLevels] = useState([]);
  const [Trackes, setTrackes] = useState([]);
  const [rowData, setRowData] = useState({});

  const [AttachmentType, setAttachmentType] = useState("pdf");
  const [AddExamAttachmentModal, setAddExamAttachmentModal] = useState(null);
  const [ShowExamAttachmentModal, setShowExamAttachmentModal] = useState(null);

  const [AttchmentPdf, setAttchmentPdf] = useState(null);
  const [voice, setVoice] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [formModal, setFormModal] = useState(false);
  const [allForms, setAllForms] = useState([]);
  const [assignLevelLoading, setAssignLevelLoading] = useState(false);
  const [levelData, setLevelData] = useState({
    level_description: "",
    level_name: "",
    max_students: "",
    track_id: "",
  });
  const [addLoading, setAddLoading] = useState(false);

  const [filteredData, setFilteredData] = useState(levels);

  const handleTableChange = (pagination, filters, sorter, extra) => {
    // Capture the current filtered data
    if (extra && extra.currentDataSource) {
      setFilteredData(extra.currentDataSource);
      console.log("Filtered Data:", extra.currentDataSource); // Log filtered data
    }
  };

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  function handleGetFormByLevel(level_id) {
    const data_send = {
      level_id,
    };
    axios
      .post(BASE_URL + "/admin/forms/get_form_by_levels.php", data_send)
      .then((res) => {
        if (res?.data?.status == "success") {
          setAllForms(res?.data?.message);
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
  }

  function handleAssignLevelToForm(form_id) {
    const data_send = {
      form_id,
      level_id: rowData?.level_id,
    };
    try {
      setAssignLevelLoading(true);
      axios
        .post(BASE_URL + "/admin/forms/assign_form_level.php", data_send)
        .then((res) => {
          console.log(res);
          if (res?.data?.success) {
            toast.success(res?.data?.message);
            setAssignLevelLoading(false);
          } else {
            toast.error(res?.data?.message);
            setAssignLevelLoading(false);
          }
        })
        .catch((e) => console.log(e))
        .finally(() => {
          setAssignLevelLoading(false);
        });
      console.log(data_send);
    } catch (e) {
      console.log(e);
    }
  }

  const forms_columns = [
    {
      dataIndex: "form_id",
      key: "form_id",
      title: "Form Id",
    },
    {
      dataIndex: "form_name",
      key: "form_name",
      title: "Form Name",
    },
    {
      dataIndex: "created_at",
      key: "created_at",
      title: "Created At",
      render: (row) => <p>{new Date(row).toLocaleDateString()}</p>,
    },
    {
      title: "Actions",
      render: (row) => (
        <div>
          <Link
            to={`${process.env.PUBLIC_URL}/forms_students_repsonse/${row?.form_id}/${rowData?.level_id}`}
          >
            <Button
              color="primary btn-pill"
              onClick={(e) => {
                if (e.ctrlKey || e.metaKey) {
                  return;
                }
                e.preventDefault();
                console.log(row, rowData);
                navigate(
                  `${process.env.PUBLIC_URL}/forms_students_repsonse/${row?.form_id}/${rowData?.level_id}`
                );
              }}
            >
              Responded students
            </Button>
          </Link>
        </div>
      ),
    },
  ];

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
        <div style={{ display: "flex", alignItems: "center" }}>
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
            style={{ width: 90, margin: "0px 10px" }}
          >
            Reset
          </Button>
        </div>
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

  const columns = [
    {
      id: "level_id",
      dataIndex: "level_id",
      title: "Id",
    },
    {
      id: "level_name",
      dataIndex: "level_name",
      title: "Level Name",
      ...getColumnSearchProps("level_name"),
    },
    {
      title: "Actions",
      render: (text, row) => {
        const items = [
          {
            key: 1,
            label: (
              <Link
                to={`${process.env.PUBLIC_URL}/levels/${row?.level_id}/sections`}
                className="btn btn-primary text-white"
                style={{ width: "100%" }}
              // onClick={() =>
              //   navigate(
              //     `${process.env.PUBLIC_URL}/levels/${row?.level_id}/sections`
              //   )
              // }
              >
                Sections
              </Link>
            ),
          },
          // {
          //   key: 2,
          //   label: (
          //     <button
          //       className="btn btn-primary"
          //       style={{ width: "100%" }}
          //       onClick={() =>
          //         navigate(
          //           `${process.env.PUBLIC_URL}/levels/${row?.level_id}/questions`
          //         )
          //       }
          //     >
          //       Questions
          //     </button>
          //   ),
          // },
        ];
        return (
          <div className="d-flex gap-2 align-items-center">
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
            <FaTrashCan
              style={{ cursor: "pointer" }}
              className="del_icon"
              onClick={() => {
                setDeleteModal(true);
                setRowData(row);
              }}
            />
          </div>
        );
      },
    },
    {
      id: "leve_exam",
      title: "Level Exam Actions",
      dataIndex: "x",
      render: (text, row) => (
        <>
          <div style={{ display: "flex", alignItems: "center" }}>
            {row?.show_exam_status == "0" && (
              <FaEyeSlash
                className="hide_content"
                onClick={() => setOpenShowExamModal(row)}
              />
            )}
            {row?.show_exam_status == "1" && (
              <FaEye
                className="visible_content"
                onClick={() => setOpenShowExamModal(row)}
              />
            )}
            <Link
              to={`${process.env.PUBLIC_URL}/levels/${row?.level_id}/students`}
            >
              <Button
                onClick={(e) => {
                  if (e.ctrlKey || e.metaKey) {
                    return;
                  }

                  e.preventDefault();
                  navigate(
                    `${process.env.PUBLIC_URL}/levels/${row?.level_id}/students`
                  );
                }}
              >
                students
              </Button>
            </Link>
          </div>
        </>
      ),
    },
    {
      id: "exam_attachment",
      dataIndex: "x",
      title: "Exam Attachment",
      render: (text, row) => (
        <>
          <Button onClick={() => setAddExamAttachmentModal(row)}>
            Add Exam Attachment
          </Button>
          <Button
            style={{ margin: "0px 10px" }}
            onClick={() => setShowExamAttachmentModal(row)}
          >
            show Exam Attachment
          </Button>
        </>
      ),
    },
    {
      dataIndex: "",
      key: "",
      title: "Forms",
      render: (row) => (
        <Button
          onClick={() => {
            setRowData(row);
            handleGetFormByLevel(row?.level_id);
            setFormModal(true);
          }}
          color="primary btn-pill"
        >
          Forms
        </Button>
      ),
    },
  ];

  function handleAddLevel(e) {
    e.preventDefault();
    const data_send = {
      ...levelData,
    };
    setAddLoading(true);
    axios
      .post(BASE_URL + "/admin/content/add_levels.php", data_send)
      .then((res) => {
        if (res?.data?.status == "success") {
          toast.success(res?.data?.message);
          setLevelData({
            level_description: "",
            level_name: "",
          });
          setAddLoading(false);
          setOpenModal(false);
          handleSelectLevels();
        } else {
          toast.error(res?.data?.message || "There's a problem");
        }
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setOpenModal(false);
        setAddLoading(false);
      });
  }

  function handleSelectLevels() {
    axios
      .get(BASE_URL + "/admin/content/select_levels.php")
      .then((res) => {
        console.log(res);
        if (res?.data?.status == "success") {
          setLevels(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
  }

  function handleSelectTracks() {
    axios
      .get(BASE_URL + "/admin/tracks/select_tracks.php")
      .then((res) => {
        console.log(res);
        if (res?.data?.status == "success") {
          setTrackes(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
  }

  const trackOptions = Trackes.map((track) => {
    return { label: track?.name, value: track?.id };
  });

  function handleDeleteLevel() {
    const data_send = {
      level_id: rowData?.level_id,
    };

    axios
      .post(BASE_URL + "/admin/content/delete_level.php", data_send)
      .then((res) => {
        if (res?.data?.status == "success") {
          toast.success(res?.data?.message);
          handleSelectLevels();
          setRowData({});
          setDeleteModal(false);
        } else {
          toast.error(res?.data?.message || "There's a problem");
        }
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setDeleteModal(false);
      });
  }

  function handleShowHideLevel() {
    const data_send = {
      level_id: rowData?.level_id,
    };

    axios
      .post(BASE_URL + "/admin/content/show_hide_level.php", data_send)
      .then((res) => {
        if (res?.data?.status == "success") {
          handleSelectLevels();
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
    handleSelectLevels();
    handleSelectTracks();
  }, []);

  function handelChangeLevelExamStatus() {
    const data_send = {
      level_id: OpenShowExamModal?.level_id,
    };

    axios
      .post(
        BASE_URL + "/admin/content/show_hide_level_questions.php",
        data_send
      )
      .then((res) => {
        if (res?.data?.status == "success") {
          handleSelectLevels();
          toast.success(res?.data?.message);
          setOpenShowExamModal(false);
        } else {
          toast.error(res?.data?.message || "There's a problem");
        }
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setOpenShowExamModal(false);
      });
  }

  const handleAddExamAttachment = async (level_id) => {
    console.log(AttachmentType);
    if (AttachmentType == "pdf") {
      setLoading(true);
      const formData = new FormData();
      formData.append("file_attachment", AttchmentPdf);
      await axios
        .post(
          "http://camp-coding.online/camp-for-english/admin/upload_pdf.php",
          formData
        )
        .then((resPdf) => {
          if (resPdf?.data?.status == "success") {
            const dataSend = {
              exam_attach_type: AttachmentType,
              exam_attach_link: resPdf?.data?.message,
              level_id: level_id,
            };

            console.log(dataSend);

            axios
              .post(
                BASE_URL + "/admin/content/add_edit_level_exam_attach.php",
                JSON.stringify(dataSend)
              )
              .then((res) => {
                console.log(res);
                if (res?.data?.status == "success") {
                  toast.success(res.data.message);
                  setAddExamAttachmentModal(null);
                  handleSelectLevels();
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
          "http://camp-coding.online/camp-for-english/admin/upload_voice.php",
          formData
        )

        .then((resvoice) => {
          console.log(resvoice);
          if (resvoice?.data?.status == "success") {
            const dataSend = {
              exam_attach_type: AttachmentType,
              exam_attach_link: resvoice?.data?.message,
              level_id: level_id,
            };

            console.log(dataSend);

            axios
              .post(
                BASE_URL + "/admin/content/add_edit_level_exam_attach.php",
                JSON.stringify(dataSend)
              )
              .then((res) => {
                console.log(res);
                if (res?.data?.status == "success") {
                  toast.success(res.data.message);
                  setAddExamAttachmentModal(null);
                  handleSelectLevels();
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
    console.log(blob);
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    setVoice(url);
    audio.src = url;
    audio.controls = true;
    document.body.appendChild(audio);
    console.log(url);
    const file = new File([blob], "recording.mp3", { type: "audio/mp3" });
    setAudioUrl(file);
  };

  return (
    <>
      <Breadcrumbs parent="Levels" title="List Levels" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>Levels List</h5>
              </div>
              <div className="card-body">
                <button
                  className="btn btn-primary mb-3"
                  onClick={() => setOpenModal(true)}
                >
                  Add Level
                </button>
                <Table
                  columns={columns}
                  dataSource={
                    filteredData && filteredData.length > 0
                      ? filteredData
                      : levels
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        title="Add Level"
        footer={[
          <Button key="cancel" onClick={() => setOpenModal(false)}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={addLoading} // Show spinner when loading
            onClick={handleAddLevel}
          >
            {addLoading ? <Spinner size="sm" animation="border" /> : "Add"}
          </Button>,
        ]}
        onOk={handleAddLevel}
        onCancel={() => setOpenModal(false)}
        open={openModal}
      >
        <form onSubmit={handleAddLevel}>
          <div className="form_field">
            <label className="form_label">Level track</label>
            <Select
              options={trackOptions}
              onChange={(e) => {
                setLevelData({ ...levelData, track_id: e });
              }}
            />
          </div>
          <div className="form_field">
            <label className="form_label">Level Name</label>
            <input
              className="form_input"
              value={levelData?.level_name}
              onChange={(e) =>
                setLevelData({ ...levelData, level_name: e.target.value })
              }
              type="text"
            />
          </div>
          <div className="form_field">
            <label className="form_label">Level maximum students</label>
            <input
              className="form_input"
              value={levelData?.max_students}
              onChange={(e) =>
                setLevelData({ ...levelData, max_students: e.target.value })
              }
              type="number"
            />
          </div>

          <div className="form_field">
            <label className="form_label">Level target</label>
            <textarea
              className="form_input"
              value={levelData?.level_description}
              onChange={(e) =>
                setLevelData({
                  ...levelData,
                  level_description: e.target.value,
                })
              }
            ></textarea>
          </div>
        </form>
      </Modal>

      <Modal
        title="Confirm Deletion"
        open={deleteModal}
        onOk={handleDeleteLevel}
        onCancel={() => setDeleteModal(false)}
        footer={[
          <Button type="primary" key="submit" onClick={handleDeleteLevel}>
            Yes
          </Button>,
          <Button type="" key="cancel" onClick={() => setDeleteModal(false)}>
            No
          </Button>,
        ]}
      >
        <p>
          Are you sure you want to delete the Following level:
          <br />
          <strong>{rowData?.level_name}</strong>
        </p>
      </Modal>

      <Modal
        title="Show/ Hide Level"
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
          the Following level:
          <br />
          <strong>{rowData?.level_name}</strong>
        </p>
      </Modal>

      <Modal
        title="Show/ Hide Level"
        open={OpenShowExamModal}
        onCancel={() => setOpenShowExamModal(false)}
        footer={[
          <Button
            type="primary"
            key="submit"
            onClick={() => handelChangeLevelExamStatus()}
          >
            Yes
          </Button>,
          <Button
            type=""
            key="cancel"
            onClick={() => setOpenShowExamModal(null)}
          >
            No
          </Button>,
        ]}
      >
        <p>
          Are you sure you want to{" "}
          {OpenShowExamModal?.show_exam_status == "1" ? "hide" : "show"} the
          Following level's Exam:
          <br />
          <strong>{OpenShowExamModal?.level_name}</strong>
        </p>
      </Modal>

      <Modal
        title="Add Exam Attachment"
        open={AddExamAttachmentModal}
        onCancel={() => setAddExamAttachmentModal(null)}
        footer={[
          <Button
            type="primary"
            key="submit"
            onClick={() =>
              handleAddExamAttachment(AddExamAttachmentModal?.level_id)
            }
          >
            {Loading ? (
              <Spinner style={{ width: "15px", height: "15px" }} />
            ) : (
              "Add Attachment"
            )}
          </Button>,
          <Button key="cancel" onClick={() => setAddExamAttachmentModal(null)}>
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
          <>
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
          </>
        ) : (
          <>
            <AudioRecorder
              onRecordingComplete={addAudioElement}
              recorderControls={recorderControls}
              audioTrackConstraints={{
                noiseSuppression: true,
                echoCancellation: true,
              }}
              // downloadOnSavePress={true}
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

      <Modal
        title="show Exam AttachmentModal"
        open={ShowExamAttachmentModal}
        onCancel={() => setShowExamAttachmentModal(null)}
        footer={[
          <Button key="cancel" onClick={() => setShowExamAttachmentModal(null)}>
            Cancel
          </Button>,
        ]}
      >
        {ShowExamAttachmentModal?.exam_attach_type == "pdf" ? (
          <>
            <div className="form_field">
              <label className="form_label">pdf</label>
              <FaBook
                onClick={() =>
                  window.open(ShowExamAttachmentModal?.exam_attach_link)
                }
                style={{
                  width: "30px",
                  height: "30px",
                  color: "orange",
                  cursor: "pointer",
                }}
              />
            </div>
          </>
        ) : (
          <>
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
                src={ShowExamAttachmentModal?.exam_attach_link}
              ></audio>
            </div>
          </>
        )}
      </Modal>

      <Modal
        footer={null}
        width={800}
        open={formModal}
        onClose={() => setFormModal(false)}
        onCancel={() => setFormModal(false)}
        title="level Forms"
      >
        <Table
          scroll={{ x: "max-content" }}
          dataSource={allForms?.length > 0 ? allForms : []}
          columns={forms_columns}
        />
      </Modal>
    </>
  );
}
