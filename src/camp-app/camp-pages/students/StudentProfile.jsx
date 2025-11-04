import React, { useEffect, useRef, useState } from "react";
import Breadcrumbs from "../../../component/common/breadcrumb/breadcrumb";
import { Button, Modal, Select, Table } from "antd";
import { BASE_URL } from "../../../Api/baseUrl";
import axios from "axios";
import { useParams } from "react-router-dom";
import ReactToPrint from "react-to-print";
import { toast } from "react-toastify";
import "./style.css";

const CustomeRecept = React.forwardRef(({ data, recordData }, ref) => {
  console.log(data);
  console.log(recordData);

  return (
    <div
      ref={ref}
      style={{
        border: "1px solid #000",
        padding: 20,
        width: "600px",
        margin: "0 auto",
        fontFamily: "Arial",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Camp for English</h2>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <div>
          <p>
            <strong>Invoice:</strong> {recordData.payment_id}
          </p>
          <p>
            <strong>Date:</strong> {recordData.date}
          </p>
        </div>
        <div>
          <p>
            <strong>{data?.admin_data?.name}</strong>
          </p>
          <p>{data?.admin_data?.email}</p>
          <p>{data?.admin_data?.type}</p>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <div>
          <p>
            <strong>{data?.student_name}</strong>
          </p>
          <p>{data?.student?.city}</p>
          <p>{data?.student?.phone}</p>
        </div>
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: 10,
        }}
      >
        <thead>
          <tr>
            <th style={thStyle}>Payment id</th>
            <th style={thStyle}>Paid</th>
            <th style={thStyle}>Package id</th>
            <th style={thStyle}>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}>{recordData?.payment_id}</td>
            <td style={tdStyle}>{recordData?.payed}</td>
            <td style={tdStyle}>{recordData?.package_id}</td>
            <td style={tdStyle}>{recordData?.status}</td>
          </tr>
        </tbody>
      </table>

      <p>
        <strong>Total coast:</strong> {data?.student_total_payment} &nbsp; -
        &nbsp;
        <strong>Total student payed:</strong> {data?.student_payed} &nbsp; =
        &nbsp;
        <strong>Student remaining money:</strong>{" "}
        {data?.student_remaining_money}
      </p>

      <p>
        <strong>Branch Address:</strong> {data?.branch_location}
      </p>
    </div>
  );
});

const thStyle = {
  border: "1px solid black",
  padding: "6px",
  textAlign: "center",
};

const tdStyle = {
  border: "1px solid black",
  padding: "6px",
  textAlign: "center",
};

const StudentProfile = () => {
  const AdminData = JSON.parse(localStorage.getItem("AdminData"));
  const [StudentData, setStudentData] = useState([]);
  const { student_id } = useParams();
  const printRef = useRef();
  const [printData, setPrintData] = useState(null);
  const [UpdateInvoice, setUpdateInvoice] = useState(null);
  const [AddNoteModal, setAddNoteModal] = useState(null);
  const [StudentNotesModal, setStudentNotesModal] = useState(null);
  const [RemoveModal, setRemoveModal] = useState(false);
  const [rowData, setRowData] = useState(false);

  const TypesOptions = [
    { label: "exception", value: "exception" },
    { label: "complain", value: "complain" },
    { label: "note", value: "note" },
  ];

  const [NewNoteData, setNewNoteData] = useState({
    student_id: null,
    Type: null,
    Text: null,
    admin_id: AdminData[0]?.admin_id,
  });

  function handleGetStudentData() {
    const dataSend = {
      student_id: student_id,
    };
    axios
      .post(
        BASE_URL + "/admin/home/select_student_profile.php",
        JSON.stringify(dataSend)
      )
      .then((res) => {
        if (res?.data?.status == "success") {
          setStudentData(res?.data?.message);
        }
      });
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
        if (res?.data?.status == "success") {
          toast.success(res?.data?.message);
          handleGetStudentData();
          setRemoveModal(false);
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
  }

  const handlePrint = (record) => {
    setPrintData(record);

    setTimeout(() => {
      document.getElementById("print-trigger").click();
    }, 100);
  };

  useEffect(() => {
    handleGetStudentData();
  }, []);

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
      id: "email",
      dataIndex: "email",
      title: "email",
    },
    {
      id: "branch_name",
      dataIndex: "branch_name",
      title: "Branch",
    },
    {
      id: "phone",
      dataIndex: "phone",
      title: "phone",
    },
    {
      id: "remaining_sub_count",
      dataIndex: "remaining_sub_count",
      title: "remaining sub count",
    },
    {
      id: "student_score_in_placement_test",
      dataIndex: "student_score_in_placement_test",
      title: "placement test score",
    },
    {
      title: "level status",
      dataIndex: "level_status",
      key: "level_status",
      render: (text, row) => (
        <>
          {AdminData[0]?.type == "employee" ? (
            <>
              <Button
                style={{ margin: "0px 10px" }}
                onClick={() => setAddNoteModal(row)}
              >
                Add Complain or exception
              </Button>
            </>
          ) : null}
        </>
      ),
    },
  ];

  const columns_study_history = [
    {
      title: "level_id",
      dataIndex: "level_id",
      key: "level_id",
    },
    {
      title: "level_name",
      dataIndex: "level_name",
      key: "level_name",
      render: (text, row) => (
        <p style={{ textTransform: "capitalize" }}>
          {row?.level_data?.level_name}
        </p>
      ),
    },

    {
      title: "Group Name",
      dataIndex: "group_name",
      key: "group_name",
      render: (text, row) => (
        <p style={{ textTransform: "capitalize" }}>
          {row?.group_data?.group_name}
        </p>
      ),
    },
    {
      title: "Round Name",
      dataIndex: "round_name",
      key: "round_name",
      render: (text, row) => (
        <p style={{ textTransform: "capitalize" }}>
          {row?.group_data?.round_name}
        </p>
      ),
    },

    {
      title: "Created at",
      dataIndex: "created_at",
      key: "created_at",
      render: (text, row) => (
        <p style={{ textTransform: "capitalize" }}>
          {new Date(row.created_at).toLocaleDateString()}
        </p>
      ),
    },
    {
      title: "level status",
      dataIndex: "status",
      key: "status",
      render: (text, row) => (
        <>
          {row.status === "active" ? (
            <p style={{ color: "green", textTransform: "capitalize" }}>
              {row.status}
            </p>
          ) : (
            <p style={{ color: "red", textTransform: "capitalize" }}>
              {row.status}
            </p>
          )}
        </>
      ),
    },
    {
      title: "level Action",
      dataIndex: "x",
      key: "x",
      render: (text, row) => (
        <>
          <Button
            onClick={() => {
              setRemoveModal(true);
              setRowData(row);
            }}
          >
            remove from group
          </Button>
        </>
      ),
    },
  ];
  const columns_study_score = [
    {
      title: "level_id",
      dataIndex: "level_id",
      key: "level_id",
    },
    {
      title: "level_name",
      dataIndex: "level_name",
      key: "level_name",
    },
    {
      title: "score",
      dataIndex: "score_value",
      key: "score_value",
    },
    {
      title: "date solve",
      dataIndex: "date_solve",
      key: "date_solve",
    },
    {
      title: "level status",
      dataIndex: "level_status",
      key: "level_status",
      render: (text, row) => (
        <>
          {row.level_status === "active" ? (
            <p style={{ color: "green", textTransform: "capitalize" }}>
              {row.level_status}
            </p>
          ) : (
            <p style={{ color: "red", textTransform: "capitalize" }}>
              {row.level_status}
            </p>
          )}
        </>
      ),
    },
  ];

  const Payment_columns = [
    {
      title: "payment id",
      dataIndex: "payment_id",
      key: "payment_id",
    },
    {
      title: "payed",
      dataIndex: "payed",
      key: "payed",
    },
    {
      title: "date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "total price",
      dataIndex: "total_price",
      key: "total_price",
    },
    {
      title: "status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, row) => (
        <>
          <Button
            style={{ marginRight: "10px" }}
            onClick={() => handlePrint(row)}
          >
            Print receipt
          </Button>
          <Button onClick={() => setUpdateInvoice(row)}>Update</Button>
        </>
      ),
    },
  ];

  const Notes_columns = [
    {
      title: "#",
      dataIndex: "exceptions_complains_id",
      key: "exceptions_complains_id",
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
    {
      title: "admin_name",
      dataIndex: "admin_name",
      key: "admin_name",
    },
  ];

  const absence_columns = [
    {
      title: "#",
      dataIndex: "absence_id",
      key: "absence_id",
    },
    {
      title: "session_name",
      dataIndex: "session_name",
      key: "session_name",
    },
    {
      title: "admin_name",
      dataIndex: "admin_name",
      key: "admin_name",
    },
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
          handleGetStudentData();
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
  };

  const handelUpdateInvoice = () => {
    const dataSend = {
      payed: UpdateInvoice?.payed,
      admin_id: AdminData[0].admin_id,
      date: UpdateInvoice?.date,
      payment_id: UpdateInvoice?.payment_id,
    };

    console.log(dataSend);

    axios
      .post(
        BASE_URL + "/admin/home/update_receipt.php",
        JSON.stringify(dataSend)
      )
      .then((res) => {
        if (res?.data?.status == "success") {
          toast.success(res?.data?.message);
          setUpdateInvoice(null);
          handleGetStudentData();
        } else {
          toast.success(res?.data?.message);
        }
      });
  };

  useEffect(() => {
    console.log(StudentData);
  }, [StudentData]);

  return (
    <>
      <Breadcrumbs parent="students" title="profile" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>Students details</h5>
              </div>

              <div className="card-body">
                <Table
                  rowKey={(record) => record.student_id}
                  // onChange={handleTableChange}
                  // scroll={{
                  //   x: "max-content",
                  // }}
                  columns={columns}
                  dataSource={StudentData}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>Student Study Score</h5>
              </div>

              <div className="card-body">
                <Table
                  rowKey={(record) => record.student_id}
                  columns={columns_study_score}
                  dataSource={StudentData[0]?.student_levels}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>Student Study History</h5>
              </div>

              <div className="card-body">
                <Table
                  rowKey={(record) => record.student_id}
                  columns={columns_study_history}
                  dataSource={StudentData[0]?.student_subscriptions}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>Payment History</h5>
              </div>

              <div className="card-body">
                <Table
                  rowKey={(record) => record.student_id}
                  columns={Payment_columns}
                  dataSource={StudentData[0]?.student_payments}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="student_data">
          <div>
            <p>
              Total Coast:{" "}
              <span style={{ color: "red" }}>
                {StudentData[0]?.student_total_payment}
              </span>
            </p>
          </div>
          -
          <div>
            <p>
              Total Student Payed :{" "}
              <span style={{ color: "green" }}>
                {StudentData[0]?.student_payed}
              </span>
            </p>
          </div>
          =
          <div>
            <p>
              Student Remaining Money :{" "}
              <span style={{ color: "red" }}>
                {StudentData[0]?.student_remaining_money}
              </span>
            </p>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>Student Complains & Exceptions</h5>
              </div>

              <div className="card-body">
                <Table
                  rowKey={(record) => record.student_id}
                  columns={Notes_columns}
                  dataSource={StudentData[0]?.student_notes}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>Student Absence</h5>
              </div>

              <div className="card-body">
                <Table
                  rowKey={(record) => record.student_id}
                  columns={absence_columns}
                  dataSource={StudentData[0]?.student_absence}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {printData && (
        <>
          <div style={{ display: "none" }}>
            <CustomeRecept
              ref={printRef}
              data={StudentData[0]}
              recordData={printData}
            />
          </div>
          <ReactToPrint
            trigger={() => (
              <button id="print-trigger" style={{ display: "none" }}>
                Print
              </button>
            )}
            content={() => printRef.current}
          />
        </>
      )}

      <Modal
        title={`Update invoice /invoice id => #${UpdateInvoice?.payment_id}`}
        open={UpdateInvoice}
        footer={
          <>
            <Button
              style={{ margin: "0px 10px " }}
              onClick={handelUpdateInvoice}
            >
              Update
            </Button>
            <Button>Cancel</Button>
          </>
        }
        onCancel={() => setUpdateInvoice(null)}
      >
        <div className="form_field">
          <label className="form_label">paied date</label>
          <input
            className="form_input"
            value={UpdateInvoice?.date}
            onChange={(e) =>
              setUpdateInvoice({
                ...UpdateInvoice,
                date: e.target.value,
              })
            }
            type="date"
          />
        </div>
        <div className="form_field">
          <label className="form_label">Paied coast</label>
          <input
            className="form_input"
            value={UpdateInvoice?.payed}
            onChange={(e) =>
              setUpdateInvoice({
                ...UpdateInvoice,
                payed: e.target.value,
              })
            }
            type="text"
          />
        </div>
      </Modal>

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

      <Modal
        title={`remove student from group`}
        open={RemoveModal}
        footer={
          <>
            <Button
              style={{ margin: "0px 10px " }}
              onClick={handelRemoveFromGroup}
            >
              Remove
            </Button>
            <Button onClick={() => setRemoveModal(false)}>Cancel</Button>
          </>
        }
        onCancel={() => setRemoveModal(false)}
      >
        <h1>Are you sure you want to remove this student from this group?</h1>
      </Modal>
    </>
  );
};

export default StudentProfile;
