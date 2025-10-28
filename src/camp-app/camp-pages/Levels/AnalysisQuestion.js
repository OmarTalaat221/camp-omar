import { Button, Modal, Table } from "antd";
import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../../component/common/breadcrumb/breadcrumb";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../Api/baseUrl";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const AnalysisQuestion = () => {
  const [AnalysisQuestion, setAnalysisQuestion] = useState([]);
  const [AddAnalysisQues, setAddAnalysisQues] = useState(false);
  const [ShowHideModal, setShowHideModal] = useState(null);
  const [NewQuestionData, setNewQuestionData] = useState({
    text: null,
  });

  const columns = [
    {
      id: "analysis_id",
      dataIndex: "analysis_id",
      title: "#",
    },
    {
      id: "text",
      dataIndex: "text",
      title: "text",
    },
    {
      id: "Action",
      title: "Action",
      dataIndex: "x",
      render: (text, row) => (
        <>
          <div style={{ display: "flex", alignItems: "center" }}>
            {row?.show == "0" && (
              <FaEyeSlash
                className="hide_content"
                onClick={() => setShowHideModal(row)}
              />
            )}
            {row?.show == "1" && (
              <FaEye
                className="visible_content"
                onClick={() => setShowHideModal(row)}
              />
            )}
          </div>
        </>
      ),
    },
  ];

  const handelGetAnalysisQ = async () => {
    const dataSend = {
      analysis_id: "1", // always 1
    };
    axios
      .post(
        BASE_URL + "/admin/questions_content/select_analysis_question.php",
        JSON.stringify(dataSend)
      )
      .then((res) => {
        console.log(res);
        if (res?.data?.status == "success") {
          setAnalysisQuestion(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    handelGetAnalysisQ();
  }, []);

  const handelAddNewQuestion = async () => {
    const dataSend = {
      text: NewQuestionData?.text,
    };
    axios
      .post(
        BASE_URL + "/admin/questions_content/add_analysis_question.php",
        JSON.stringify(dataSend)
      )
      .then((res) => {
        console.log(res);
        if (res?.data?.status == "success") {
          toast.success(res?.data?.message);
          setAddAnalysisQues(false);
          handelGetAnalysisQ();
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
  };

  const handelChangeQuestionStatus = async () => {
    const dataSend = {
      analysis_id: "1", // always 1
    };
    axios
      .post(
        BASE_URL + "/admin/questions_content/show_hide_analysis_text.php",
        JSON.stringify(dataSend)
      )
      .then((res) => {
        console.log(res);
        if (res?.data?.status == "success") {
          toast.success(res?.data?.message);
          setShowHideModal(null);
          handelGetAnalysisQ();
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <Breadcrumbs parent="level" title="Analysis Question" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>Analysis Question</h5>
                <Button
                  color="primary btn-pill"
                  style={{ margin: "10px 0" }}
                  onClick={() => setAddAnalysisQues(true)}
                >
                  Add Analysis Question
                </Button>
              </div>
              <div className="card-body">
                <Table
                  scroll={{
                    x: "max-content",
                  }}
                  columns={columns}
                  dataSource={AnalysisQuestion}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Add Question"
        open={AddAnalysisQues}
        footer={
          <>
            <Button
              style={{ margin: "0px 10px " }}
              onClick={() => handelAddNewQuestion()}
            >
              Add
            </Button>
            <Button onClick={() => setAddAnalysisQues(false)}>Cancel</Button>
          </>
        }
        onCancel={() => setAddAnalysisQues(false)}
      >
        <>
          <div className="form_field">
            <label className="form_label">Question text</label>
            <input
              type="text"
              className="form_input"
              value={NewQuestionData?.text || ""}
              onChange={(e) => {
                setNewQuestionData({
                  ...NewQuestionData,
                  text: e.target.value,
                });
              }}
            />
          </div>
        </>
      </Modal>

      <Modal
        title="Add Question"
        open={ShowHideModal}
        footer={
          <>
            <Button
              style={{ margin: "0px 10px " }}
              onClick={() => handelChangeQuestionStatus()}
            >
              Change
            </Button>
            <Button onClick={() => setShowHideModal(null)}>Cancel</Button>
          </>
        }
        onCancel={() => setShowHideModal(null)}
      >
        <>
          <h3>
            Are you sure you want to{" "}
            {ShowHideModal?.show == 1 ? "hide" : "show"} this analysis question
          </h3>
        </>
      </Modal>
    </>
  );
};

export default AnalysisQuestion;
