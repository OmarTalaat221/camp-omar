import { Button, Modal, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../../component/common/breadcrumb/breadcrumb";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../../Api/baseUrl";
import axios from "axios";
import { toast } from "react-toastify";
import "./style.css";

const GroupStudents = () => {
  const AdminData = JSON.parse(localStorage.getItem("AdminData"));

  const { group_id, round_id, branch_id, session_id } = useParams();
  console.log(group_id, session_id);
  const navigate = useNavigate();
  const [AddNoteModal, setAddNoteModal] = useState(null);
  const [StudentNotesModal, setStudentNotesModal] = useState(null);
  const [RemoveModal, setRemoveModal] = useState(false);
  const [rowData, setRowData] = useState(null);

  const [SessionStudents, setSessionStudents] = useState([]);
  const [StudentNotesData, setStudentNotesData] = useState([]);

  const [NewNoteData, setNewNoteData] = useState({
    student_id: null,
    Type: null,
    Text: null,
    admin_id: AdminData[0]?.admin_id,
  });

  const columns = [
    {
      id: "student_id",
      dataIndex: "student_id",
      title: "student_id",
    },
    {
      id: "name",
      dataIndex: "name",
      title: "name",
    },
    {
      id: "group_name",
      dataIndex: "group_name",
      title: "group",
    },
    {
      id: "email",
      dataIndex: "email",
      title: "email",
      render: (text, row) => (
        <a href={`mailto:${row?.email}`} target="_blank" rel="noreferrer">
          {row?.email}
        </a>
      ),
    },
    {
      id: "Action",
      dataIndex: "x",
      title: "Action",
      render: (text, row) => (
        <>
          <Button
            style={{ margin: "0px 10px" }}
            onClick={() =>
              navigate(
                `${process.env.PUBLIC_URL}/groups/${row?.group_id}/students/${row?.student_id}/chat`,
                {
                  state: { additionalData: row },
                }
              )
            }
          >
            Chat with student
          </Button>
          {AdminData[0]?.type == "employee" ? (
            <>
              <Button
                style={{ margin: "0px 10px" }}
                onClick={() => setAddNoteModal(row)}
              >
                Add Complain or exception
              </Button>
              <Button
                style={{ margin: "0px 10px" }}
                onClick={() => {
                  setStudentNotesModal(row);
                  handleGetStudentsNotes(row?.student_id);
                }}
              >
                Show exception
              </Button>
            </>
          ) : null}
          <Button
            danger
            style={{ margin: "0px 10px" }}
            onClick={() => {
              setRemoveModal(true);
              setRowData(row);
            }}
          >
            Remove from group
          </Button>
        </>
      ),
    },
  ];

  const Notescolumns = [
    {
      title: "ID",
      dataIndex: "exceptions_complains_id",
      key: "exceptions_complains_id",
    },
    {
      title: "Student Name",
      dataIndex: "student_name",
      key: "student_name",
    },
    {
      title: "Student ID",
      dataIndex: "student_id",
      key: "student_id",
    },
    {
      title: "Admin Name",
      dataIndex: "admin_name",
      key: "admin_name",
    },
    {
      title: "Admin ID",
      dataIndex: "admin_id",
      key: "admin_id",
    },
    {
      title: "Type",
      dataIndex: "Type",
      key: "Type",
    },
    {
      title: "Text",
      dataIndex: "Text",
      key: "Text",
    },
    {
      title: "Date",
      dataIndex: "Date",
      key: "Date",
    },
  ];

  function handleGetGroupStudents() {
    const dataSend = {
      group_id: group_id,
    };
    axios
      .post(
        BASE_URL + "/admin/absence/select_student_to_chat.php",
        JSON.stringify(dataSend)
      )
      .then((res) => {
        console.log(res);
        if (res?.data?.status == "success") {
          setSessionStudents(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
  }

  function handleGetStudentsNotes(student_id) {
    const dataSend = {
      student_id: student_id,
    };
    axios
      .post(
        BASE_URL +
          "/admin/complains_exceptions/select_students_complains_exceptions.php",
        JSON.stringify(dataSend)
      )
      .then((res) => {
        console.log(res);
        if (res?.data?.status == "success") {
          setStudentNotesData(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
  }

  function handelRemoveFromGroup() {
    const dataSend = {
      subscription_id: rowData?.subscription_id,
    };

    axios
      .post(
        BASE_URL + "/admin/subscription/delete_student_group_sub.php",
        JSON.stringify(dataSend)
      )
      .then((res) => {
        console.log(res);
        if (res?.data?.status == "success") {
          toast.success(res?.data?.message || "Student removed successfully");
          handleGetGroupStudents(); // Refresh the list
          setRemoveModal(false);
          setRowData(null);
        } else {
          toast.error(res?.data?.message || "Failed to remove student");
        }
      })
      .catch((e) => {
        console.log(e);
        toast.error("Error occurred while removing student");
      });
  }

  useEffect(() => {
    handleGetGroupStudents();
  }, []);

  const TypesOptions = [
    { label: "exception", value: "exception" },
    { label: "complain", value: "complain" },
    { label: "note", value: "note" },
  ];

  const handelAddNote = () => {
    const dataSend = {
      ...NewNoteData,
      student_id: AddNoteModal?.student_id,
    };

    console.log(dataSend);

    axios
      .post(
        BASE_URL + "/admin/complains_exceptions/add_complain_exception.php",
        JSON.stringify(dataSend)
      )
      .then((res) => {
        console.log(res);
        if (res?.data?.status == "success") {
          toast.success(res?.data?.message);
          setAddNoteModal(null);
          handleGetGroupStudents();
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <Breadcrumbs parent="Groups" title="Group student List" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>List students</h5>
              </div>
              <div className="card-body">
                <Table
                  scroll={{
                    x: "max-content",
                  }}
                  columns={columns}
                  dataSource={SessionStudents}
                  rowClassName={(record) =>
                    record.taken_before ? "row_highlight" : ""
                  }
                  rowKey={(record) => record.student_id}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Note Modal */}
      <Modal
        title={`Add note for: (${AddNoteModal?.name || ""})`}
        open={AddNoteModal}
        footer={
          <>
            <Button
              style={{ margin: "0px 10px " }}
              onClick={() => handelAddNote()}
            >
              Add
            </Button>
            <Button onClick={() => setAddNoteModal(null)}>Cancel</Button>
          </>
        }
        onCancel={() => setAddNoteModal(null)}
      >
        <div className="form_field">
          <label className="form_label">Type</label>
          <Select
            options={TypesOptions}
            onChange={(e) => {
              setNewNoteData({
                ...NewNoteData,
                Type: e,
              });
            }}
            style={{ width: "100%" }}
          />
        </div>
        <div className="form_field">
          <label className="form_label">Note Text </label>
          <input
            type="text"
            className="form_input"
            onChange={(e) => {
              setNewNoteData({
                ...NewNoteData,
                Text: e.target.value,
              });
            }}
          />
        </div>
      </Modal>

      {/* Student Notes Modal */}
      <Modal
        title={`Notes for: (${StudentNotesModal?.name || ""})`}
        open={StudentNotesModal}
        footer={
          <>
            <Button onClick={() => setStudentNotesModal(null)}>Close</Button>
          </>
        }
        width={"70%"}
        onCancel={() => setStudentNotesModal(null)}
      >
        <div className="card-body">
          <Table
            scroll={{
              x: "max-content",
            }}
            columns={Notescolumns}
            dataSource={StudentNotesData}
            rowKey={(record) => record.exceptions_complains_id}
          />
        </div>
      </Modal>

      {/* Remove from Group Modal */}
      <Modal
        title="Remove student from group"
        open={RemoveModal}
        footer={
          <>
            <Button
              danger
              style={{ margin: "0px 10px " }}
              onClick={handelRemoveFromGroup}
            >
              Remove
            </Button>
            <Button
              onClick={() => {
                setRemoveModal(false);
                setRowData(null);
              }}
            >
              Cancel
            </Button>
          </>
        }
        onCancel={() => {
          setRemoveModal(false);
          setRowData(null);
        }}
      >
        <h3 style={{ marginBottom: "20px" }}>
          Are you sure you want to remove this student from this group?
        </h3>
        {rowData && (
          <div
            style={{
              padding: "10px",
              background: "#f5f5f5",
              borderRadius: "8px",
            }}
          >
            <p>
              <strong>Student Name:</strong> {rowData?.name}
            </p>
            <p>
              <strong>Student ID:</strong> {rowData?.student_id}
            </p>
            <p>
              <strong>Group:</strong> {rowData?.group_name}
            </p>
          </div>
        )}
      </Modal>
    </>
  );
};

export default GroupStudents;
