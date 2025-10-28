import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../../component/common/breadcrumb/breadcrumb";
import { Button, Modal, Table } from "antd";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL } from "../../../Api/baseUrl";
import { FaBook } from "react-icons/fa6";
import { Spinner } from "reactstrap";

const LevelPlacmentAttachment = () => {
  const [AttachmentType, setAttachmentType] = useState("pdf");
  const recorderControls = useAudioRecorder();
  const [placementAttachment, setPlacementAttachment] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [AddExamAttachmentModal, setAddExamAttachmentModal] = useState(null);
  const [ShowExamAttachmentModal, setShowExamAttachmentModal] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);

  const [AttchmentPdf, setAttchmentPdf] = useState(null);
  const [voice, setVoice] = useState(null);

  const columns = [
    {
      id: "attachment_id",
      dataIndex: "attachment_id",
      title: "#",
    },
    {
      id: "exam_attach_type",
      dataIndex: "exam_attach_type",
      title: "exam attach type",
    },
    {
      id: "Attachment_id",
      dataIndex: "x",
      title: "Attachment",
      render: (text, row) => (
        <>
          {row?.exam_attach_type == "pdf" ? (
            <>
              <div className="form_field">
                <label className="form_label">pdf</label>
                <FaBook
                  onClick={() => window.open(row?.exam_attach_link)}
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
                <audio controls src={row?.exam_attach_link}></audio>
              </div>
            </>
          )}
        </>
      ),
    },
  ];

  const handleAddExamAttachment = async () => {
    console.log(AttachmentType);
    if (AttachmentType == "pdf") {
      setLoading(true);
      const formData = new FormData();
      formData.append("file_attachment", AttchmentPdf);
      await axios
        .post(
          "https://camp-coding.tech/camp_for_english/admin/upload_pdf.php",
          formData
        )
        .then((resPdf) => {
          if (resPdf?.data?.status == "success") {
            const dataSend = {
              exam_attach_type: AttachmentType,
              exam_attach_link: resPdf?.data?.message,
            };

            console.log(dataSend);

            axios
              .post(
                BASE_URL + "/admin/content/add_edit_placement_test_attach.php",
                JSON.stringify(dataSend)
              )
              .then((res) => {
                console.log(res);
                if (res?.data?.status == "success") {
                  toast.success(res.data.message);
                  setAddExamAttachmentModal(null);
                  //   handleSelectSections();
                  handelGetExamAttachment();
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
          "https://camp-coding.tech/camp_for_english/admin/upload_voice.php",
          formData
        )

        .then((resvoice) => {
          console.log(resvoice);
          if (resvoice?.data?.status == "success") {
            const dataSend = {
              exam_attach_type: AttachmentType,
              exam_attach_link: resvoice?.data?.message,
            };

            console.log(dataSend);

            axios
              .post(
                BASE_URL + "/admin/content/add_edit_placement_test_attach.php",
                JSON.stringify(dataSend)
              )
              .then((res) => {
                console.log(res);
                if (res?.data?.status == "success") {
                  toast.success(res.data.message);
                  setAddExamAttachmentModal(null);
                  //   handleSelectSections();
                  handelGetExamAttachment();
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

  const handelGetExamAttachment = async () => {
    axios
      .get(BASE_URL + `/admin/content/select_placement_test_attach.php`)
      .then((res) => {
        if (res?.data?.status == "success") {
          setPlacementAttachment(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    handelGetExamAttachment();
  }, []);

  return (
    <>
      <Breadcrumbs parent="level" title="placement Attachment" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>placement Attachment</h5>
                <Button
                  color="primary btn-pill"
                  style={{ margin: "10px 0" }}
                  onClick={() => setAddExamAttachmentModal(true)}
                >
                  Edit placement Attachment
                </Button>
              </div>
              <div className="card-body">
                <Table
                  scroll={{
                    x: "max-content",
                  }}
                  columns={columns}
                  dataSource={placementAttachment}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        title="Add Exam Attachment"
        open={AddExamAttachmentModal}
        onCancel={() => setAddExamAttachmentModal(null)}
        footer={[
          <Button
            type="primary"
            key="submit"
            onClick={() =>
              handleAddExamAttachment(AddExamAttachmentModal?.section_id)
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
    </>
  );
};

export default LevelPlacmentAttachment;
