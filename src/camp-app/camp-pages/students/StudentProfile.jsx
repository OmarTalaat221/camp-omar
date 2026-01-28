import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
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
            <strong>Invoice:</strong> {recordData?.payment_id}
          </p>
          <p>
            <strong>Date:</strong> {recordData?.date}
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

// Initial states for modals
const INITIAL_NOTE_DATA = {
  student_id: null,
  Type: null,
  Text: null,
  admin_id: null,
};

const INITIAL_EDIT_LEVEL_GROUP_DATA = {
  subscription_id: null,
  level_id: null,
  group_id: null,
};

const INITIAL_UPDATE_INVOICE_DATA = {
  payment_id: null,
  payed: "",
  date: "",
};

const INITIAL_UPDATE_DATE_DATA = {
  payment_id: null,
  date: "",
};

const StudentProfile = () => {
  // ✅ FIX: Memoize AdminData to prevent recreation on every render
  const AdminData = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("AdminData"));
    } catch {
      return null;
    }
  }, []);

  // ✅ FIX: Extract admin_id to use in dependencies
  const adminId = AdminData?.[0]?.admin_id;

  const [StudentData, setStudentData] = useState([]);
  const { student_id } = useParams();
  const printRef = useRef();
  const [printData, setPrintData] = useState(null);
  const [textDirection, setTextDirection] = useState("ltr");

  // ========== MODAL STATES ==========

  // Update Invoice Modal (Update All)
  const [isUpdateInvoiceOpen, setIsUpdateInvoiceOpen] = useState(false);
  const [updateInvoiceData, setUpdateInvoiceData] = useState(
    INITIAL_UPDATE_INVOICE_DATA
  );
  const [updateInvoiceLoading, setUpdateInvoiceLoading] = useState(false);

  // Update Date Only Modal
  const [isUpdateDateOpen, setIsUpdateDateOpen] = useState(false);
  const [updateDateData, setUpdateDateData] = useState(
    INITIAL_UPDATE_DATE_DATA
  );
  const [updateDateLoading, setUpdateDateLoading] = useState(false);

  // Add Note Modal
  const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);
  const [addNoteStudentData, setAddNoteStudentData] = useState(null);
  const [newNoteData, setNewNoteData] = useState(INITIAL_NOTE_DATA);
  const [addNoteLoading, setAddNoteLoading] = useState(false);

  // Student Notes Modal (if needed)
  const [isStudentNotesOpen, setIsStudentNotesOpen] = useState(false);

  // Remove from Group Modal
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [removeRowData, setRemoveRowData] = useState(null);
  const [removeLoading, setRemoveLoading] = useState(false);

  // Edit Level & Group Modal
  const [isEditLevelGroupOpen, setIsEditLevelGroupOpen] = useState(false);
  const [editLevelGroupData, setEditLevelGroupData] = useState(
    INITIAL_EDIT_LEVEL_GROUP_DATA
  );
  const [editLevelGroupRowData, setEditLevelGroupRowData] = useState(null);
  const [updateLevelGroupLoading, setUpdateLevelGroupLoading] = useState(false);

  // Levels and Groups
  const [Levels, setLevels] = useState([]);
  const [Groups, setGroups] = useState([]);
  const [groupsLoading, setGroupsLoading] = useState(false);

  const detectLanguage = (text) => {
    const arabicPattern = /[\u0600-\u06FF]/;
    return arabicPattern.test(text) ? "rtl" : "ltr";
  };

  const TypesOptions = [
    { label: "exception", value: "exception" },
    { label: "complain", value: "complain" },
    { label: "note", value: "note" },
  ];

  // ========== API CALLS ==========

  // ✅ FIX: Use student_id directly, it's a primitive value
  const handleGetStudentData = useCallback(() => {
    if (!student_id) return;

    const dataSend = {
      student_id: student_id,
    };
    axios
      .post(
        BASE_URL + "/admin/home/select_student_profile.php",
        JSON.stringify(dataSend)
      )
      .then((res) => {
        if (res?.data?.status === "success") {
          setStudentData(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
  }, [student_id]);

  // ✅ FIX: No dependencies needed, this doesn't depend on any state
  const handleSelectLevels = useCallback(() => {
    axios
      .get(BASE_URL + "/admin/content/select_levels.php")
      .then((res) => {
        if (res?.data?.status === "success") {
          setLevels(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
  }, []);

  // ✅ FIX: Use adminId (primitive) instead of AdminData (object)
  const handleGetGroups = useCallback(() => {
    if (!adminId) return;

    setGroupsLoading(true);
    axios
      .post(BASE_URL + "/admin/groups/select_groups_by_admin.php", {
        admin_id: adminId,
      })
      .then((res) => {
        if (res?.data?.status === "success") {
          setGroups(res?.data?.message);
        }
      })
      .catch((e) => console.log(e))
      .finally(() => setGroupsLoading(false));
  }, [adminId]);

  // ✅ FIX: Use adminId (primitive) instead of AdminData (object)
  const fetchGroupsByLevel = useCallback(
    async (levelId) => {
      if (!adminId) return;

      setGroupsLoading(true);
      try {
        const res = await axios.post(
          BASE_URL + "/admin/groups/select_groups_by_admin.php",
          {
            admin_id: adminId,
          }
        );

        if (res?.data?.status === "success") {
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
    },
    [adminId]
  );

  // ========== MODAL HANDLERS ==========

  // Update Invoice Modal Handlers
  const openUpdateInvoiceModal = useCallback((row) => {
    setUpdateInvoiceData({
      payment_id: row?.payment_id,
      payed: row?.payed || "",
      date: row?.date || "",
    });
    setIsUpdateInvoiceOpen(true);
  }, []);

  const closeUpdateInvoiceModal = useCallback(() => {
    setIsUpdateInvoiceOpen(false);
    setUpdateInvoiceData(INITIAL_UPDATE_INVOICE_DATA);
  }, []);

  const handleUpdateInvoice = useCallback(() => {
    if (!updateInvoiceData?.date) {
      toast.error("Please select a date");
      return;
    }
    if (!updateInvoiceData?.payed) {
      toast.error("Please enter paid amount");
      return;
    }

    setUpdateInvoiceLoading(true);

    const dataSend = {
      payed: updateInvoiceData.payed,
      admin_id: adminId,
      date: updateInvoiceData.date,
      payment_id: updateInvoiceData.payment_id,
    };

    axios
      .post(
        BASE_URL + "/admin/home/update_receipt.php",
        JSON.stringify(dataSend)
      )
      .then((res) => {
        if (res?.data?.status === "success") {
          toast.success(res?.data?.message);
          closeUpdateInvoiceModal();
          handleGetStudentData();
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((e) => {
        console.log(e);
        toast.error("Error updating invoice");
      })
      .finally(() => setUpdateInvoiceLoading(false));
  }, [
    updateInvoiceData,
    adminId,
    closeUpdateInvoiceModal,
    handleGetStudentData,
  ]);

  // Update Date Only Modal Handlers
  const openUpdateDateModal = useCallback((row) => {
    setUpdateDateData({
      payment_id: row?.payment_id,
      date: row?.date || "",
    });
    setIsUpdateDateOpen(true);
  }, []);

  const closeUpdateDateModal = useCallback(() => {
    setIsUpdateDateOpen(false);
    setUpdateDateData(INITIAL_UPDATE_DATE_DATA);
  }, []);

  const handleUpdateDateOnly = useCallback(() => {
    if (!updateDateData?.date) {
      toast.error("Please select a date");
      return;
    }

    setUpdateDateLoading(true);

    const dataSend = {
      date: updateDateData.date,
      payment_id: updateDateData.payment_id,
    };

    axios
      .post(
        BASE_URL + "/admin/home/update_receipt_date.php",
        JSON.stringify(dataSend)
      )
      .then((res) => {
        if (res?.data?.status === "success") {
          toast.success(res?.data?.message || "Date updated successfully");
          closeUpdateDateModal();
          handleGetStudentData();
        } else {
          toast.error(res?.data?.message || "Error updating date");
        }
      })
      .catch((e) => {
        console.log(e);
        toast.error("Error updating date");
      })
      .finally(() => setUpdateDateLoading(false));
  }, [updateDateData, closeUpdateDateModal, handleGetStudentData]);

  // Add Note Modal Handlers
  const openAddNoteModal = useCallback(
    (row) => {
      setAddNoteStudentData(row);
      setNewNoteData({
        ...INITIAL_NOTE_DATA,
        student_id: row?.student_id,
        admin_id: adminId,
      });
      setTextDirection("ltr");
      setIsAddNoteOpen(true);
    },
    [adminId]
  );

  const closeAddNoteModal = useCallback(() => {
    setIsAddNoteOpen(false);
    setAddNoteStudentData(null);
    setNewNoteData(INITIAL_NOTE_DATA);
    setTextDirection("ltr");
  }, []);

  const handleAddNote = useCallback(() => {
    if (!newNoteData?.Type) {
      toast.error("Please select a type");
      return;
    }
    if (!newNoteData?.Text) {
      toast.error("Please enter note text");
      return;
    }

    setAddNoteLoading(true);

    const dataSend = {
      ...newNoteData,
      student_id: addNoteStudentData?.student_id,
    };

    axios
      .post(
        BASE_URL + "/admin/complains_exceptions/add_complain_exception.php",
        JSON.stringify(dataSend)
      )
      .then((res) => {
        if (res?.data?.status === "success") {
          toast.success(res?.data?.message);
          closeAddNoteModal();
          handleGetStudentData();
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((e) => {
        console.log(e);
        toast.error("Error adding note");
      })
      .finally(() => setAddNoteLoading(false));
  }, [
    newNoteData,
    addNoteStudentData,
    closeAddNoteModal,
    handleGetStudentData,
  ]);

  // Remove from Group Modal Handlers
  const openRemoveModal = useCallback((row) => {
    setRemoveRowData(row);
    setIsRemoveModalOpen(true);
  }, []);

  const closeRemoveModal = useCallback(() => {
    setIsRemoveModalOpen(false);
    setRemoveRowData(null);
  }, []);

  const handleRemoveFromGroup = useCallback(() => {
    if (!removeRowData?.subscription_id) {
      toast.error("Invalid subscription");
      return;
    }

    setRemoveLoading(true);

    const dataSend = {
      subscription_id: removeRowData.subscription_id,
    };

    axios
      .post(
        BASE_URL + "/admin/subscription/delete_student_group_sub.php",
        JSON.stringify(dataSend)
      )
      .then((res) => {
        if (res?.data?.status === "success") {
          toast.success(res?.data?.message);
          closeRemoveModal();
          handleGetStudentData();
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((e) => {
        console.log(e);
        toast.error("Error removing from group");
      })
      .finally(() => setRemoveLoading(false));
  }, [removeRowData, closeRemoveModal, handleGetStudentData]);

  // Edit Level & Group Modal Handlers
  const openEditLevelGroupModal = useCallback(
    (row) => {
      const currentLevelId = row?.level_data?.level_id || row?.level_id;
      const currentGroupId = row?.group_data?.group_id || row?.group_id;

      setEditLevelGroupRowData(row);
      setEditLevelGroupData({
        subscription_id: row?.subscription_id,
        level_id: currentLevelId,
        group_id: currentGroupId,
      });
      setIsEditLevelGroupOpen(true);

      if (currentLevelId) {
        fetchGroupsByLevel(currentLevelId);
      }
    },
    [fetchGroupsByLevel]
  );

  const closeEditLevelGroupModal = useCallback(() => {
    setIsEditLevelGroupOpen(false);
    setEditLevelGroupData(INITIAL_EDIT_LEVEL_GROUP_DATA);
    setEditLevelGroupRowData(null);
  }, []);

  const handleLevelChange = useCallback(
    (value) => {
      setEditLevelGroupData((prev) => ({
        ...prev,
        level_id: value,
        group_id: null,
      }));

      if (value) {
        fetchGroupsByLevel(value);
      }
    },
    [fetchGroupsByLevel]
  );

  const handleUpdateLevelGroup = useCallback(() => {
    if (!editLevelGroupData?.level_id) {
      toast.error("Please select a level");
      return;
    }
    if (!editLevelGroupData?.group_id) {
      toast.error("Please select a group");
      return;
    }

    setUpdateLevelGroupLoading(true);

    const dataSend = {
      subscription_id: editLevelGroupData.subscription_id,
      level_id: editLevelGroupData.level_id,
      group_id: editLevelGroupData.group_id,
    };

    axios
      .post(
        BASE_URL + "/admin/home/edit_student_level.php",
        JSON.stringify(dataSend)
      )
      .then((res) => {
        if (res?.data?.status === "success") {
          toast.success(res?.data?.message);
          closeEditLevelGroupModal();
          handleGetStudentData();
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((e) => {
        console.log(e);
        toast.error("Error updating level and group");
      })
      .finally(() => setUpdateLevelGroupLoading(false));
  }, [editLevelGroupData, closeEditLevelGroupModal, handleGetStudentData]);

  // Print Handler
  const handlePrint = useCallback((record) => {
    setPrintData(record);

    setTimeout(() => {
      document.getElementById("print-trigger")?.click();
    }, 100);
  }, []);

  // Filter groups by level for dropdown
  const filteredGroupOptions = useMemo(() => {
    return (
      Groups?.filter(
        (gr) =>
          gr?.group_levels?.level_id != null &&
          String(gr.group_levels.level_id) ===
            String(editLevelGroupData?.level_id)
      ) || []
    );
  }, [Groups, editLevelGroupData?.level_id]);

  // ✅ FIX: Single useEffect with proper dependencies
  useEffect(() => {
    handleGetStudentData();
    handleSelectLevels();
    handleGetGroups();
  }, [handleGetStudentData, handleSelectLevels, handleGetGroups]);

  // ========== TABLE COLUMNS ==========

  const columns = useMemo(
    () => [
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
          <Button
            style={{ margin: "0px 10px" }}
            onClick={() => openAddNoteModal(row)}
          >
            Add Complain or exception
          </Button>
        ),
      },
    ],
    [openAddNoteModal]
  );

  const columns_study_history = useMemo(
    () => [
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
            className="flex items-center gap-2"
          >
            <Button
              style={{ marginRight: "10px" }}
              onClick={() => openEditLevelGroupModal(row)}
            >
              Edit Level & Group
            </Button>

            <Button danger onClick={() => openRemoveModal(row)}>
              Remove from group
            </Button>
          </div>
        ),
      },
    ],
    [openEditLevelGroupModal, openRemoveModal]
  );

  const columns_study_score = useMemo(
    () => [
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
    ],
    []
  );

  const Payment_columns = useMemo(
    () => [
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
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <Button onClick={() => handlePrint(row)}>Print receipt</Button>
            <Button onClick={() => openUpdateInvoiceModal(row)}>
              Update All
            </Button>
            <Button
              type="default"
              style={{
                backgroundColor: "#faad14",
                borderColor: "#faad14",
                color: "#fff",
              }}
              onClick={() => openUpdateDateModal(row)}
            >
              Update Date
            </Button>
          </div>
        ),
      },
    ],
    [handlePrint, openUpdateInvoiceModal, openUpdateDateModal]
  );

  const Notes_columns = useMemo(
    () => [
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
    ],
    []
  );

  const absence_columns = useMemo(
    () => [
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
    ],
    []
  );

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
                  rowKey={(record) => record.payment_id}
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
                  rowKey={(record) => record.exceptions_complains_id}
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
                  rowKey={(record) => record.absence_id}
                  columns={absence_columns}
                  dataSource={StudentData[0]?.student_absence}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Print Component */}
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

      {/* Edit Level & Group Modal */}
      <Modal
        title="Edit Level & Group"
        open={isEditLevelGroupOpen}
        onCancel={closeEditLevelGroupModal}
        destroyOnClose
        footer={
          <>
            <Button
              style={{ marginRight: "10px" }}
              onClick={handleUpdateLevelGroup}
              loading={updateLevelGroupLoading}
              disabled={updateLevelGroupLoading}
            >
              Update
            </Button>
            <Button onClick={closeEditLevelGroupModal}>Cancel</Button>
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
            {editLevelGroupRowData?.level_data?.level_name || "N/A"}
          </p>
          <p style={{ margin: 0 }}>
            <strong>Current Group:</strong>{" "}
            {editLevelGroupRowData?.group_data?.group_name || "N/A"}
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
            value={editLevelGroupData?.level_id || undefined}
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
              editLevelGroupData?.level_id
                ? "Select a group"
                : "Please select a level first"
            }
            style={{ width: "100%" }}
            value={editLevelGroupData?.group_id || undefined}
            onChange={(value) =>
              setEditLevelGroupData((prev) => ({
                ...prev,
                group_id: value,
              }))
            }
            loading={groupsLoading}
            disabled={!editLevelGroupData?.level_id}
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

      {/* Update Invoice Modal (Update All) */}
      <Modal
        title={`Update invoice / invoice id => #${
          updateInvoiceData?.payment_id || ""
        }`}
        open={isUpdateInvoiceOpen}
        onCancel={closeUpdateInvoiceModal}
        destroyOnClose
        footer={
          <>
            <Button
              style={{ margin: "0px 10px" }}
              onClick={handleUpdateInvoice}
              loading={updateInvoiceLoading}
              disabled={updateInvoiceLoading}
            >
              Update
            </Button>
            <Button onClick={closeUpdateInvoiceModal}>Cancel</Button>
          </>
        }
      >
        <div className="form_field">
          <label className="form_label">Paid date</label>
          <input
            className="form_input"
            value={updateInvoiceData?.date || ""}
            onChange={(e) =>
              setUpdateInvoiceData((prev) => ({
                ...prev,
                date: e.target.value,
              }))
            }
            type="date"
          />
        </div>
        <div className="form_field">
          <label className="form_label">Paid cost</label>
          <input
            className="form_input"
            value={updateInvoiceData?.payed || ""}
            onChange={(e) =>
              setUpdateInvoiceData((prev) => ({
                ...prev,
                payed: e.target.value,
              }))
            }
            type="text"
          />
        </div>
      </Modal>

      {/* Update Date Only Modal */}
      <Modal
        title={
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span>
              Update Invoice Date - #{updateDateData?.payment_id || ""}
            </span>
          </div>
        }
        open={isUpdateDateOpen}
        onCancel={closeUpdateDateModal}
        destroyOnClose
        footer={
          <>
            <Button
              type="primary"
              style={{
                backgroundColor: "#faad14",
                borderColor: "#faad14",
                marginRight: "10px",
              }}
              onClick={handleUpdateDateOnly}
              loading={updateDateLoading}
              disabled={updateDateLoading}
            >
              Update Date
            </Button>
            <Button onClick={closeUpdateDateModal}>Cancel</Button>
          </>
        }
      >
        <div className="form_field">
          <label
            className="form_label"
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "600",
            }}
          >
            New Date
          </label>
          <input
            className="form_input"
            value={updateDateData?.date || ""}
            onChange={(e) =>
              setUpdateDateData((prev) => ({
                ...prev,
                date: e.target.value,
              }))
            }
            type="date"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #d9d9d9",
              fontSize: "14px",
            }}
          />
        </div>
      </Modal>

      {/* Add Note Modal */}
      <Modal
        title={`Add note for: (${addNoteStudentData?.name || ""})`}
        open={isAddNoteOpen}
        onCancel={closeAddNoteModal}
        destroyOnClose
        footer={
          <>
            <Button
              style={{ margin: "0px 10px" }}
              onClick={handleAddNote}
              loading={addNoteLoading}
              disabled={addNoteLoading}
            >
              Add
            </Button>
            <Button onClick={closeAddNoteModal}>Cancel</Button>
          </>
        }
      >
        <div className="form_field">
          <label className="form_label">Type</label>
          <Select
            style={{ width: "100%" }}
            options={TypesOptions}
            value={newNoteData?.Type || undefined}
            placeholder="Select type"
            onChange={(value) => {
              setNewNoteData((prev) => ({
                ...prev,
                Type: value,
              }));
            }}
          />
        </div>

        <div className="form_field">
          <label className="form_label">Note Text</label>
          <textarea
            className="form_input"
            dir={textDirection}
            value={newNoteData?.Text || ""}
            onChange={(e) => {
              const value = e.target.value;
              setTextDirection(detectLanguage(value));
              setNewNoteData((prev) => ({
                ...prev,
                Text: value,
              }));
            }}
            rows={5}
          />
        </div>
      </Modal>

      {/* Remove from Group Modal */}
      <Modal
        title="Remove student from group"
        open={isRemoveModalOpen}
        onCancel={closeRemoveModal}
        destroyOnClose
        footer={
          <>
            <Button
              style={{ margin: "0px 10px" }}
              onClick={handleRemoveFromGroup}
              loading={removeLoading}
              disabled={removeLoading}
              danger
            >
              Remove
            </Button>
            <Button onClick={closeRemoveModal}>Cancel</Button>
          </>
        }
      >
        <h3>Are you sure you want to remove this student from this group?</h3>
        {removeRowData && (
          <div
            style={{
              backgroundColor: "#f5f5f5",
              padding: "10px",
              borderRadius: "8px",
              marginTop: "10px",
            }}
          >
            <p style={{ margin: 0 }}>
              <strong>Group:</strong>{" "}
              {removeRowData?.group_data?.group_name || "N/A"}
            </p>
            <p style={{ margin: 0 }}>
              <strong>Level:</strong>{" "}
              {removeRowData?.level_data?.level_name || "N/A"}
            </p>
          </div>
        )}
      </Modal>
    </>
  );
};

export default StudentProfile;
