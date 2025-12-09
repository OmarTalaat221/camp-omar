import React, { useEffect, useRef, useState } from "react";
import Breadcrumbs from "../../../component/common/breadcrumb/breadcrumb";
import { Button, Modal, Select, Table, Spin } from "antd";
import { BASE_URL } from "../../../Api/baseUrl";
import axios from "axios";
import { useParams } from "react-router-dom";
import ReactToPrint from "react-to-print";
import { toast } from "react-toastify";
import "./style.css";

const { Option } = Select;

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
  const [textDirection, setTextDirection] = useState("ltr");

  // ✅ NEW: States for Edit Level & Group
  const [EditLevelGroupModal, setEditLevelGroupModal] = useState(false);
  const [EditLevelGroupData, setEditLevelGroupData] = useState({
    subscription_id: null,
    level_id: null,
    group_id: null,
  });
  const [Levels, setLevels] = useState([]);
  const [Groups, setGroups] = useState([]);
  const [groupsLoading, setGroupsLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

  const detectLanguage = (text) => {
    const arabicPattern = /[\u0600-\u06FF]/;
    return arabicPattern.test(text) ? "rtl" : "ltr";
  };

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

  // ✅ NEW: Fetch Levels
  function handleSelectLevels() {
    axios
      .get(BASE_URL + "/admin/content/select_levels.php")
      .then((res) => {
        if (res?.data?.status === "success") {
          setLevels(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
  }

  // ✅ NEW: Fetch Groups by Admin
  function handleGetGroups() {
    setGroupsLoading(true);
    axios
      .post(BASE_URL + "/admin/groups/select_groups_by_admin.php", {
        admin_id: AdminData[0]?.admin_id,
      })
      .then((res) => {
        if (res?.data?.status === "success") {
          setGroups(res?.data?.message);
        }
      })
      .catch((e) => console.log(e))
      .finally(() => setGroupsLoading(false));
  }

  // ✅ NEW: Handle Level Change - Reset group when level changes
  const handleLevelChange = (value) => {
    setEditLevelGroupData((prev) => ({
      ...prev,
      level_id: value,
      group_id: null, // Reset group to empty
    }));

    // Fetch groups for the selected level
    if (value) {
      fetchGroupsByLevel(value);
    }
  };

  // ✅ NEW: Fetch groups filtered by level
  const fetchGroupsByLevel = async (levelId) => {
    setGroupsLoading(true);
    try {
      const res = await axios.post(
        BASE_URL + "/admin/groups/select_groups_by_admin.php",
        {
          admin_id: AdminData[0]?.admin_id,
        }
      );

      if (res?.data?.status === "success") {
        // Filter groups that match the selected level
        const filteredGroups = res?.data?.message?.filter(
          (gr) =>
            gr?.group_levels?.level_id != null &&
            String(gr.group_levels.level_id) === String(levelId)
        );
        setGroups(filteredGroups || []);
      } else {
        setGroups([]);
      }
    } catch (e) {
      console.log(e);
      setGroups([]);
    } finally {
      setGroupsLoading(false);
    }
  };

  const filteredGroupOptions = Groups?.filter(
    (gr) =>
      gr?.group_levels?.level_id != null &&
      String(gr.group_levels.level_id) === String(EditLevelGroupData?.level_id)
  );

  const handleUpdateLevelGroup = () => {
    if (!EditLevelGroupData?.level_id) {
      toast.error("Please select a level");
      return;
    }
    if (!EditLevelGroupData?.group_id) {
      toast.error("Please select a group");
      return;
    }

    setUpdateLoading(true);

    const dataSend = {
      subscription_id: EditLevelGroupData?.subscription_id,
      level_id: EditLevelGroupData?.level_id,
      group_id: EditLevelGroupData?.group_id,
    };

    axios
      .post(
        BASE_URL + "/admin/home/edit_student_level.php",
        JSON.stringify(dataSend)
      )
      .then((res) => {
        if (res?.data?.status === "success") {
          toast.success(res?.data?.message);
          setEditLevelGroupModal(false);
          setEditLevelGroupData({
            subscription_id: null,
            level_id: null,
            group_id: null,
          });
          handleGetStudentData();
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((e) => {
        console.log(e);
        toast.error("Error updating level and group");
      })
      .finally(() => setUpdateLoading(false));
  };

  const handleOpenEditModal = (row) => {
    setEditLevelGroupModal(true);
    setRowData(row);

    const currentLevelId = row?.level_data?.level_id || row?.level_id;
    const currentGroupId = row?.group_data?.group_id || row?.group_id;

    setEditLevelGroupData({
      subscription_id: row?.subscription_id,
      level_id: currentLevelId,
      group_id: currentGroupId,
    });

    // Fetch groups for the current level
    if (currentLevelId) {
      fetchGroupsByLevel(currentLevelId);
    }
  };

  // ✅ NEW: Close Edit Modal and reset
  const handleCloseEditModal = () => {
    setEditLevelGroupModal(false);
    setEditLevelGroupData({
      subscription_id: null,
      level_id: null,
      group_id: null,
    });
    setRowData(null);
  };

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
    handleSelectLevels(); // ✅ Fetch levels on mount
    handleGetGroups(); // ✅ Fetch groups on mount
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
          <>
            <Button
              style={{ margin: "0px 10px" }}
              onClick={() => setAddNoteModal(row)}
            >
              Add Complain or exception
            </Button>
          </>
        </>
      ),
    },
  ];

  // ✅ UPDATED: Added Edit button to columns_study_history
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
      title: "Action",
      dataIndex: "x",
      key: "x",
      render: (text, row) => (
        <>
          <Button
            // type="primary"
            style={{ marginRight: "10px" }}
            onClick={() => handleOpenEditModal(row)}
          >
            Edit Level & Group
          </Button>

          <Button
            danger
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
                  rowKey={(record) => record.subscription_id}
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

      {/* ✅ NEW: Edit Level & Group Modal */}
      <Modal
        title="Edit Level & Group"
        open={EditLevelGroupModal}
        onCancel={handleCloseEditModal}
        footer={
          <>
            <Button
              // type="primary"
              style={{ marginRight: "10px" }}
              onClick={handleUpdateLevelGroup}
              loading={updateLoading}
              disabled={updateLoading}
            >
              Update
            </Button>
            <Button onClick={handleCloseEditModal}>Cancel</Button>
          </>
        }
      >
        {/* Current Info Display */}
        <div
          style={{
            backgroundColor: "#f5f5f5",
            padding: "10px",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          <p style={{ margin: 0 }}>
            <strong>Current Level:</strong>{" "}
            {rowData?.level_data?.level_name || "N/A"}
          </p>
          <p style={{ margin: 0 }}>
            <strong>Current Group:</strong>{" "}
            {rowData?.group_data?.group_name || "N/A"}
          </p>
        </div>

        {/* Level Select */}
        <div className="form_field" style={{ marginBottom: "16px" }}>
          <label
            className="form_label"
            style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}
          >
            Select Level
          </label>
          <Select
            placeholder="Select a level"
            style={{ width: "100%" }}
            value={EditLevelGroupData?.level_id || undefined}
            onChange={handleLevelChange}
          >
            {Levels.map((level) => (
              <Option key={level.level_id} value={level.level_id}>
                {level.level_name}
              </Option>
            ))}
          </Select>
        </div>

        {/* Group Select */}
        <div className="form_field">
          <label
            className="form_label"
            style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}
          >
            Select Group
          </label>
          <Select
            placeholder={
              EditLevelGroupData?.level_id
                ? "Select a group"
                : "Please select a level first"
            }
            style={{ width: "100%" }}
            value={EditLevelGroupData?.group_id || undefined}
            onChange={(value) =>
              setEditLevelGroupData({
                ...EditLevelGroupData,
                group_id: value,
              })
            }
            loading={groupsLoading}
            disabled={!EditLevelGroupData?.level_id}
            notFoundContent={
              groupsLoading ? (
                <Spin size="small" />
              ) : (
                "No groups found for this level"
              )
            }
          >
            {filteredGroupOptions.map((group) => (
              <Option key={group.group_id} value={group.group_id}>
                {group.group_name}
              </Option>
            ))}
          </Select>
        </div>
      </Modal>

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
            <Button onClick={() => setUpdateInvoice(null)}>Cancel</Button>
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
          <textarea
            type="text"
            className="form_input"
            dir={textDirection}
            onChange={(e) => {
              const value = e.target.value;
              setTextDirection(detectLanguage(value));
              setNewNoteData({
                ...NewNoteData,
                Text: value,
              });
            }}
            rows={5}
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
