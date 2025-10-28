import { Button, Table, Modal } from "antd";
import Breadcrumbs from "../../../component/common/breadcrumb/breadcrumb";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import axios from "axios";
import { BASE_URL } from "../../../Api/baseUrl";
import { toast } from "react-toastify";

export default function Feedback() {
  const [feedback, setFeedback] = useState([]);
  const [rowData, setRowData] = useState({});
  const [showHideModal, setShowHideModal] = useState(false);
  const columns = [
    {
      id: "feedback_id",
      dataIndex: "feedback_id",
      title: "feedback_id",
    },
    {
      id: "feedback_text",
      dataIndex: "feedback_text",
      title: "feedback_text",
    },
    {
      id: "rate",
      dataIndex: "rate",
      title: "rate",
    },
    {
      id: "name",
      dataIndex: "name",
      title: "Student Name",
      render: (text, row) => <p>{row?.student_data?.name}</p>,
    },
    {
      title: "Actions",
      render: (text, row) => (
        <div>
          {row?.hidden == "1" ? (
            <FaEyeSlash
              onClick={() => {
                setRowData(row);
                setShowHideModal(true);
              }}
              className="hide_content"
            />
          ) : (
            <FaEye
              onClick={() => {
                setRowData(row);
                setShowHideModal(true);
              }}
              className="visible_content"
            />
          )}
        </div>
      ),
    },
  ];

  function handleGetAllFeedbacks() {
    axios
      .get(BASE_URL + "/admin/home/select_feedback.php")
      .then((res) => {
        if (res?.data?.status == "success") {
          setFeedback(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
  }

  function handleShowHideFeedback() {
    const data_send = {
      feedback_id: rowData?.feedback_id,
    };

    axios
      .post(BASE_URL + "/admin/home/show_hide_feedback.php", data_send)
      .then((res) => {
        if (res?.data?.status == "success") {
          toast.success(res?.data?.message);
          handleGetAllFeedbacks();
          setShowHideModal(false);
        } else {
          toast.error(res?.data?.message || "There's a problem");
        }
      })
      .catch((e) => console.log(e))
      .finally(() => setShowHideModal(false));
  }

  useEffect(() => {
    handleGetAllFeedbacks();
  }, []);
  return (
    <>
      <Breadcrumbs parent="Home" title="Feedback" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>Feedback</h5>
              </div>

              <div className="card-body">
                <Table dataSource={feedback} columns={columns} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        title="Show/ Hide Feedback"
        open={showHideModal}
        footer={[
          <Button type="primary" key="submit" onClick={handleShowHideFeedback}>
            Yes
          </Button>,
          <Button type="" key="cancel" onClick={() => setShowHideModal(false)}>
            No
          </Button>,
        ]}
      >
        <p>
          Are you sure you want to {rowData?.hidden == "1" ? "show" : "hide"}{" "}
          the Following feedback:
          <br />
          <strong>{rowData?.feedback_text}</strong>
        </p>
      </Modal>
    </>
  );
}
