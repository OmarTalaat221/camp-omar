import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../../component/common/breadcrumb/breadcrumb";
import axios from "axios";
import { BASE_URL } from "../../../Api/baseUrl";
import { toast } from "react-toastify";
import { Button, Modal, Table } from "antd";
import { IoCheckmarkSharp, IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

export default function QuestionnaireList() {
  const navigate = useNavigate();
  const [allForms, setAllForms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [rowData, setRowData] = useState({});
  const [openLevelModal, setOpenLevelModal] = useState(false);
  const [assignLevelLoading, setAssignLevelLoading] = useState(false);
  const [singleForm, setSingleForm] = useState([]);
  const [formDetailsRow, setFormDetailsRow] = useState({});
  const [formDetailsModal, setFormDetailsModal] = useState(false);
  const [questionsModal, setQuestionsMdoal] = useState(false);
  const [allLevels, setAllLevels] = useState([]);
  const [openAllLevelsModal, setOpenAllLevelsModal] = useState(false);

  function handleGetAllForms() {
    try {
      setIsLoading(true);
      axios
        .get(BASE_URL + "/admin/forms/get_all_forms.php")
        .then((res) => {
          console.log(res);
          if (res?.data?.status == "success") {
            setAllForms(res?.data?.message);
            setIsLoading(false);
          } else {
            toast.error(res?.data?.message);
          }
        })
        .catch((e) => console.log(e));
    } catch (e) {
      console.log(e);
    }
  }

  function handleGetOneForm(form_id) {
    const data_send = {
      form_id,
    };

    axios
      .post(BASE_URL + "/admin/forms/get_form.php", data_send)
      .then((res) => {
        console.log(res);
        if (res?.data?.status == "success") {
          setSingleForm(res?.data?.data);
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
  }

  function handleAssignLevelToForm(level_id) {
    const data_send = {
      form_id: rowData?.form_id,
      level_id,
    };
    try {
      setAssignLevelLoading(true);
      axios
        .post(BASE_URL + "/admin/forms/assign_form_level.php", data_send)
        .then((res) => {
          if (res?.data?.status == "success") {
            toast.success(res?.data?.message);
            handleGetAllForms();
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

  function handleGetAllLevels() {
    axios
      .get(BASE_URL + "/admin/content/select_levels.php")
      .then((res) => {
        if (res?.data?.status === "success") {
          setAllLevels(res?.data?.message);
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((e) => {
        console.log(e);
        toast.error("Error fetching levels");
      });
  }

  useEffect(() => {
    handleGetAllForms();
    handleGetAllLevels();
  }, []);

  useEffect(() => {
    console.log(singleForm);
  }, [singleForm]);

  const columns = [
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
      render: (row) => <p>{new Date(row).toLocaleString()}</p>,
    },
    {
      title: "Actions",
      render: (row) => {
        return (
          <div>
            <Button
              onClick={() => {
                setRowData(row);
                setOpenLevelModal(true);
              }}
              color="primary btn-pill"
            >
              Assigned Levels
            </Button>

            <Button
              onClick={() => {
                handleGetOneForm(row?.form_id);
                setFormDetailsModal(true);
              }}
              color="primary btn-pill"
              style={{ margin: "0px 10px" }}
            >
              Form Details
            </Button>

            <Button
              onClick={() => {
                setRowData(row);
                setOpenAllLevelsModal(true);
              }}
              color="primary btn-pill"
              style={{ margin: "0px 10px" }}
            >
              Assign Level
            </Button>
          </div>
        );
      },
    },
  ];

  const level_columns = [
    {
      dataIndex: "level_id",
      key: "level_id",
      title: "Level Id",
    },
    {
      dataIndex: "track_id",
      key: "track_id",
      title: "Track Id",
    },
    {
      dataIndex: "level_name",
      key: "level_name",
      title: "Level Name",
    },
    {
      dataIndex: "level_description",
      key: "level_description",
      title: "Level Description",
      render: (row) => <p>{row ? row : "---"}</p>,
    },
    {
      dataIndex: "exam_attach_link",
      key: "exam_attach_link",
      title: "Exam Attach Link",
      render: (row) => <p>{row ? row : "---"}</p>,
    },
    {
      dataIndex: "exam_attach_type",
      key: "exam_attach_type",
      title: "Exam Attach Type",
      render: (row) => <p>{row ? row : "---"}</p>,
    },
    {
      title: "Actions",
      render: (row) => {
        return (
          <div>
            {/* <Button
              onClick={() => {
                handleAssignLevelToForm(row?.level_id);
              }}
              color="primary btn-pill"
            >
             {assignLevelLoading ? "Loading...." : "Assign To Form"}
            </Button> */}
            <Link
              to={`${process.env.PUBLIC_URL}/forms_students_repsonse/${rowData?.form_id}/${row?.level_id}`}
            >
              <Button
                onClick={(e) => {
                  if (e.ctrlKey || e.metaKey) {
                    return;
                  }
                  e.preventDefault();
                  navigate(
                    `${process.env.PUBLIC_URL}/forms_students_repsonse/${rowData?.form_id}/${row?.level_id}`
                  );
                }}
                style={{ margin: "0px 10px" }}
                color="primary btn-pill"
              >
                Responded students
              </Button>
            </Link>
          </div>
        );
      },
    },
  ];

  const formDetails_columns = [
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
      title: "Actions",
      render: (row) => {
        return (
          <div>
            <Button
              onClick={() => {
                setFormDetailsRow(row);
                setQuestionsMdoal(true);
              }}
              color="primary btn-pill"
              style={{ margin: "0px 10px" }}
            >
              Questions
            </Button>
          </div>
        );
      },
    },
  ];

  const questions_columns = [
    {
      dataIndex: "question_id",
      key: "question_id",
      title: "Question Id",
    },
    {
      dataIndex: "question_text",
      key: "question_text",
      title: "Question Text",
    },
    {
      dataIndex: "question_type",
      key: "question_type",
      title: "Question Type",
    },
    {
      dataIndex: "is_required",
      key: "is_required",
      title: "Required",
      render: (row) => (
        <p
          style={
            row == "1"
              ? {
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "green",
                  color: "white",
                }
              : {
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "red",
                  color: "white",
                }
          }
        >
          {row == "1" ? <IoCheckmarkSharp /> : <IoClose />}
        </p>
      ),
    },
  ];

  const allLevelsColumns = [
    {
      dataIndex: "level_id",
      key: "level_id",
      title: "Level Id",
    },
    {
      dataIndex: "level_name",
      key: "level_name",
      title: "Level Name",
    },
    {
      dataIndex: "level_description",
      key: "level_description",
      title: "Level Description",
      render: (row) => <p>{row ? row : "---"}</p>,
    },
    {
      title: "Actions",
      render: (row) => {
        return (
          <div>
            <Button
              onClick={() => {
                handleAssignLevelToForm(row?.level_id);
                setOpenAllLevelsModal(false);
              }}
              color="primary btn-pill"
            >
              {assignLevelLoading ? "Loading...." : "Assign To Form"}
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Breadcrumbs parent="Forms" title="Form List" />
      <div className="container-fluid">
        <div className="col-sm-12">
          <div className="card">
            <div className="card-header">
              <h5>List Forms </h5>
            </div>
            <div className="card-body">
              <Table
                rowKey={(record) => record.form_id} // Ensure a unique key
                //   onChange={handleTableChange}
                scroll={{
                  x: "max-content",
                }}
                columns={columns}
                loading={isLoading}
                dataSource={allForms}
              />
            </div>
          </div>
        </div>
      </div>

      <Modal
        footer={null}
        width={800}
        open={openLevelModal}
        onClose={() => setOpenLevelModal(false)}
        onCancel={() => setOpenLevelModal(false)}
        title="Levels Form"
      >
        <Table
          scroll={{ x: "max-content" }}
          dataSource={rowData?.levels ? rowData?.levels : []}
          columns={level_columns}
        />
      </Modal>

      <Modal
        footer={null}
        width={800}
        open={formDetailsModal}
        onClose={() => setFormDetailsModal(false)}
        onCancel={() => setFormDetailsModal(false)}
        title="Form Details"
      >
        <Table
          scroll={{ x: "max-content" }}
          dataSource={singleForm ? [singleForm] : []}
          columns={formDetails_columns}
        />
      </Modal>

      <Modal
        footer={null}
        width={800}
        open={questionsModal}
        onClose={() => setQuestionsMdoal(false)}
        onCancel={() => setQuestionsMdoal(false)}
        title="Form Questions"
      >
        <Table
          scroll={{ x: "max-content" }}
          dataSource={
            formDetailsRow?.questions ? formDetailsRow?.questions : []
          }
          columns={questions_columns}
        />
      </Modal>

      <Modal
        footer={null}
        width={800}
        open={openAllLevelsModal}
        onClose={() => setOpenAllLevelsModal(false)}
        onCancel={() => setOpenAllLevelsModal(false)}
        title="All Levels"
      >
        <Table
          scroll={{ x: "max-content" }}
          dataSource={allLevels}
          columns={allLevelsColumns}
        />
      </Modal>
    </>
  );
}
