import {
  Button,
  Input,
  Modal,
  Select,
  Table,
  Form,
  Pagination,
  Alert,
} from "antd";
import Breadcrumbs from "../../../component/common/breadcrumb/breadcrumb";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../Api/baseUrl";
import { Option } from "antd/es/mentions";
import { use } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { BsSearch } from "react-icons/bs";
import { toNumber } from "lodash";
import "./style.css";

export default function ListStudents() {
  const AdminData = JSON.parse(localStorage.getItem("AdminData"));
  const [students, setStudents] = useState([]);
  const [Levels, setLevels] = useState([]);
  const [EditModal, setEditModal] = useState(false);
  const [OpenUpdateGroup, setOpenUpdateGroup] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [EditStudentData, setEditStudentData] = useState(null);
  const [packages, setPackages] = useState([]);
  const [Groups, setGroups] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [OpenAddModal, setOpenAddModal] = useState(false);
  const navigate = useNavigate();
  const [paymentMode, setPaymentMode] = useState("assign_now");
  const [form] = Form.useForm();
  const [packagesStudent, setPackagesStudent] = useState([]);

  const [OpenProfile, setOpenProfile] = useState(null);
  const [OpenGeminiData, setOpenGeminiData] = useState(null);
  const [AddStudentSub, setAddStudentSub] = useState(null);

  const [NewSubscriptionData, setNewSubscriptionData] = useState({
    type: "level", // ('package', 'level')
    package_id: null, // put package_id if type is package else send it 0
    level_id: null, // // put level_id if type is level else send it 0
    group_id: null,
    student_id: null,
    payed: null,
  });

  const [filteredData, setFilteredData] = useState(students);

  const handleTableChange = (pagination, filters, sorter, extra) => {
    // Capture the current filtered data
    if (extra && extra.currentDataSource) {
      setFilteredData(extra.currentDataSource);
      console.log("Filtered Data:", extra.currentDataSource); // Log filtered data
    }
  };

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [openExceptionModal, setExceptionModal] = useState(false);
  const [exceptionsData, setExceptionsData] = useState([]);
  const [exceptionLoading, setExceptionLoading] = useState(false);
  const [rowData, setRowData] = useState(null);

  const NewStudent = students.filter(
    (student) =>
      new Date(student?.date_added).toDateString() === new Date().toDateString()
  );

  console.log(NewStudent);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  useEffect(() => {
    setNewSubscriptionData({
      type: "level",
      package_id: null,
      level_id: null,
      group_id: null,

      payed: null,
    });
  }, [paymentMode]);

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
        <div className="flex gap-2">
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
            style={{ width: 90, marginTop: 8 }}
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
      id: "student_id",
      dataIndex: "student_id",
      title: "student_id",
      ...getColumnSearchProps("student_id"),
    },
    {
      id: "name",
      dataIndex: "name",
      title: "name",
      ...getColumnSearchProps("name"),
    },
    {
      id: "email",
      dataIndex: "email",
      title: "email",
      ...getColumnSearchProps("email"),
      render: (text, row) => (
        <a href={`mailto:${row?.email}`} target="_blank" rel="noreferrer">
          {row?.email}
        </a>
      ),
    },
    {
      id: "phone",
      dataIndex: "phone",
      title: "phone",
      ...getColumnSearchProps("phone"),
    },
    {
      id: "parent_phone",
      dataIndex: "parent_phone",
      title: "Parent Phone",
      ...getColumnSearchProps("parent_phone"),
    },

    ...(AdminData[0]?.type === "super_admin"
      ? [
          {
            id: "password",
            dataIndex: "password",
            title: "password",
            ...getColumnSearchProps("password"),
          },
        ]
      : []),
    {
      id: "remaining_sub_count",
      dataIndex: "remaining_sub_count",
      title: "remaining sub count",
      ...getColumnSearchProps("remaining_sub_count"),
    },
    {
      id: "student_score_in_placement_test",
      dataIndex: "student_score_in_placement_test",
      title: "placement test score",
      ...getColumnSearchProps("student_score_in_placement_test"),
    },
    {
      id: "action",
      dataIndex: "x",
      title: "action",
      render: (text, row) => (
        <>
          <Button
            color="primary btn-pill"
            style={{ margin: "0px 10px" }}
            onClick={() => {
              setEditModal(true);
              setEditStudentData(row);
            }}
          >
            Edit
          </Button>
          <Button
            color="primary btn-pill"
            style={{ margin: "0px 10px" }}
            onClick={() => {
              setOpenUpdateGroup(true);
              setRowData(row);
            }}
          >
            Update student group
          </Button>
          <Button
            color="primary btn-pill"
            onClick={() =>
              navigate(`/students/list/${row?.student_id}/profile`)
            }
          >
            profile
          </Button>
          <Button
            color="primary btn-pill"
            style={{ margin: "0px 10px" }}
            onClick={() => {
              // Set payment mode based on student subscription status
              if (
                row?.remaining_sub_count == 0 ||
                row?.remaining_sub_count == "not subscription yet"
              ) {
                setPaymentMode("assign_now");
              } else {
                setPaymentMode("assign_group_level");
              }

              setAddStudentSub(row);
              setNewSubscriptionData({
                ...NewSubscriptionData,
                student_id: row.student_id,
              });
              setRowData(row);
            }}
          >
            Add Student subscription
          </Button>
          <Button
            color="primary btn-pill"
            onClick={() =>
              navigate(
                `${process.env.PUBLIC_URL}/students/${row?.student_id}/level/certificates`,
                { state: { rowData: row } }
              )
            }
          >
            certificates
          </Button>
          <Button
            style={{ margin: "0px 10px" }}
            color="primary btn-pill"
            onClick={() => {
              row?.student_gemini_data
                ? setOpenGeminiData(row?.student_gemini_data)
                : toast.error("This student has not taken the exam yet.");
            }}
          >
            gemini data
          </Button>
          <Button
            style={{ margin: "0px 10px" }}
            color="primary btn-pill"
            onClick={() => {
              setExceptionModal(true);
              handleGetStudentException(row?.student_id);
            }}
          >
            Exceptions & Complains
          </Button>
        </>
      ),
    },
  ];

  const getStudentRemainingInfo = async (student_id) => {
    try {
      const dataSend = {
        student_id: student_id,
      };

      const res = await axios.post(
        `${BASE_URL}/admin/subscription/select_student_remaining_info.php`,
        dataSend
      );

      if (res?.data?.status === "success") {
        setPackagesStudent(res?.data?.packages);
      } else {
        toast.error(
          res?.data?.message || "Failed to fetch student remaining info"
        );
        return null;
      }
    } catch (error) {
      console.error("Error fetching student remaining info:", error);
      toast.error("Error fetching student remaining info");
      return null;
    }
  };

  useEffect(() => {
    if (rowData?.student_id) {
      getStudentRemainingInfo(rowData?.student_id);
    }
  }, [AddStudentSub]);

  function handleGetStudentException(student_id) {
    const data_send = {
      student_id,
    };
    setExceptionLoading(true);
    axios
      .post(
        "https://camp-coding.tech/camp_for_english/admin/complains_exceptions/select_students_complains_exceptions.php",
        data_send
      )
      .then((res) => {
        if (res?.data?.status == "success") {
          setExceptionsData(res?.data?.message);
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((e) => console.log(e))
      .finally(() => setExceptionLoading(false));
  }

  const exceptions_columns = [
    {
      dataIndex: "exceptions_complains_id",
      key: "exceptions_complains_id",
      title: "Exceptions Complains Id",
    },
    {
      dataIndex: "Type",
      key: "Type",
      title: "Type",
    },
    {
      dataIndex: "Text",
      key: "Text",
      title: "Text",
    },
    {
      dataIndex: "admin_name",
      key: "admin_name",
      title: "Admin Name",
    },
    {
      dataIndex: "Date",
      key: "Date",
      title: "Date",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [totalStudents, setTotalStudents] = useState(0);
  const pageSize = 10;

  function handleGetAllStudents() {
    const dataSend = {
      admin_type: AdminData[0]?.type,
      admin_id: AdminData[0]?.admin_id,
    };
    setLoading(true);
    axios
      .post(
        BASE_URL + "/admin/home/select_student_v2.php",
        JSON.stringify(dataSend)
      )
      .then((res) => {
        if (res?.data?.status == "success") {
          setStudents(res?.data?.message);
        }
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    handleGetAllStudents();
  }, []);

  const handelEditStudent = async () => {
    setSubmitting(true);
    const dataSend = {
      name: EditStudentData?.name,
      email: EditStudentData?.email,
      phone: EditStudentData?.phone,
      student_id: EditStudentData?.student_id,
      parent_phone: EditStudentData?.parent_phone,
    };

    axios
      .post(BASE_URL + "/admin/home/update_student_data.php", dataSend)
      .then((res) => {
        console.log(res);
        if (res?.data?.status == "success") {
          toast.success(res?.data?.message);
          setEditModal(false);
          handleGetAllStudents();
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((e) => console.log(e))
      .finally(() => setSubmitting(false));
  };

  const handelAddStudentSub = async () => {
    // if(NewSubscriptionData?.payed )
    setSubmitting(true);
    let dataSend;

    if (paymentMode === "assign_group_level") {
      dataSend = {
        type: "level",
        package_id: NewSubscriptionData?.package_id || 0,
        level_id: NewSubscriptionData?.level_id,
        group_id: NewSubscriptionData?.group_id,
        student_id: rowData?.student_id,
        admin_id: AdminData[0].admin_id,
        payed: NewSubscriptionData?.payed,
        status: "GL",
      };
    } else if (paymentMode == "assign_later") {
      dataSend = {
        type: "level",
        package_id: NewSubscriptionData?.package_id || 0,
        level_id: 0,
        group_id: 0,
        student_id: rowData?.student_id,
        admin_id: AdminData[0].admin_id,
        payed: NewSubscriptionData?.payed,
        status: "later",
      };
    } else {
      dataSend = {
        type: NewSubscriptionData?.type || "level",
        package_id: NewSubscriptionData?.package_id || 0,
        level_id: NewSubscriptionData?.level_id,
        group_id: NewSubscriptionData?.group_id,
        student_id: rowData?.student_id,
        admin_id: AdminData[0].admin_id,
        payed: NewSubscriptionData?.payed,
        status: "now",
      };
    }

    axios
      .post(
        BASE_URL + "/admin/subscription/make_new_subscription.php",
        dataSend
      )
      .then((res) => {
        console.log(res);
        if (res?.data?.status == "success") {
          toast.success(res?.data?.message);
          setAddStudentSub(null);
          handleGetAllStudents();
          // Reset state
          setNewSubscriptionData({
            type: "level",
            package_id: null,
            level_id: null,
            group_id: null,
            student_id: null,
            payed: null,
          });
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((e) => console.log(e))
      .finally(() => setSubmitting(false));
  };

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

  function handelGetGroups() {
    axios
      .post(BASE_URL + "/admin/groups/select_groups_by_admin.php", {
        admin_id: AdminData[0]?.admin_id,
      })
      .then((res) => {
        if (res?.data?.status == "success") {
          setGroups(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    handleSelectLevels();
    handelGetGroups();
  }, []);

  function handleGetAllSubscription() {
    axios
      .get(BASE_URL + "/admin/subscription/select_subscription_offers.php")
      .then((res) => {
        if (res?.data?.status == "success") {
          setPackages(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    handleGetAllSubscription();
  }, []);

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredData && filteredData.length > 0 ? filteredData : students
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
    XLSX.writeFile(workbook, "students_data.xlsx");
  };

  function handleSubmit(values) {
    setLoading(true);
    axios
      .post(BASE_URL + "/admin/home/student_signup.php", JSON.stringify(values))
      .then((res) => {
        console.log(res);
        if (res?.data?.status == "success") {
          toast.success(res?.data?.message);
          form.resetFields();
          setOpenAddModal(false);
          handleGetAllStudents();
        } else {
          toast.error(res?.data?.message);
        }
      })
      .finally(() => {
        setLoading(false);
      })
      .catch((e) => console.log(e));
  }

  const [Branches, setBranches] = useState([]);

  function handleGetBranches() {
    axios
      .get(BASE_URL + "/admin/branches/select_branch.php")
      .then((res) => {
        console.log(res);
        if (res?.data?.status == "success") {
          setBranches(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    handleGetBranches();
  }, []);

  const branchOptions = Branches.map((branch) => {
    return { label: branch?.branch_name, value: branch?.branch_id };
  });

  const groupOptions = Groups?.filter(
    (gr) =>
      gr?.group_levels?.level_id != null &&
      String(gr.group_levels.level_id) == String(NewSubscriptionData?.level_id)
  );

  console.log(groupOptions);
  console.log(Groups);

  useEffect(() => {
    console.log(rowData);
  }, [rowData]);

  function handelUpdateGroup() {
    axios
      .post(BASE_URL + "/admin/subscription/update_student_group.php", {
        admin_id: AdminData[0]?.admin_id,
        group_id: selectedGroup,
        student_id: rowData?.student_id,
      })
      .then((res) => {
        if (res?.data?.status == "success") {
          toast.success(res?.data?.message);
          setOpenUpdateGroup(false);
          setRowData(null);
          handleGetAllStudents();
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
  }

  return (
    <>
      <Breadcrumbs parent="Levels" title="Students" />
      <div className="container-fluid">
        <div
          className="row"
          style={{
            margin: "auto !important",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>List Students </h5>
                <button
                  className="btn btn-success"
                  style={{ marginTop: "10px" }}
                  onClick={handleExport}
                >
                  Export to Exel
                </button>
                <button
                  className="btn"
                  style={{
                    marginTop: "10px",
                    backgroundColor: "orangered",
                    color: "white",
                  }}
                  onClick={() => setOpenAddModal(true)}
                >
                  Add student
                </button>
              </div>

              <div className="card-body">
                <Table
                  rowKey={(record) => record.student_id}
                  onChange={handleTableChange}
                  scroll={{
                    x: "max-content",
                  }}
                  columns={columns}
                  loading={loading}
                  dataSource={
                    AdminData[0]?.type == "super_admin"
                      ? students
                      : searchText
                      ? students
                      : NewStudent
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        title="Edit Student"
        open={EditModal}
        onCancel={() => setEditModal(false)}
        footer={
          <>
            <Button loading={submitting} onClick={handelEditStudent}>
              Edit
            </Button>
            <Button onClick={() => setEditModal(false)}>Cancel</Button>
          </>
        }
      >
        <div className="form_field">
          <label className="form_label">Name</label>
          <input
            className="form_input"
            value={EditStudentData?.name || ""}
            onWheel={(e) => e.target.blur()}
            onChange={(e) =>
              setEditStudentData({
                ...EditStudentData,
                name: e.target.value,
              })
            }
          />
        </div>
        <div className="form_field">
          <label className="form_label">Email</label>
          <input
            className="form_input"
            value={EditStudentData?.email || ""}
            onWheel={(e) => e.target.blur()}
            onChange={(e) =>
              setEditStudentData({
                ...EditStudentData,
                email: e.target.value,
              })
            }
          />
        </div>
        <div className="form_field">
          <label className="form_label">Phone</label>
          <input
            className="form_input"
            value={EditStudentData?.phone || ""}
            onWheel={(e) => e.target.blur()}
            onChange={(e) =>
              setEditStudentData({
                ...EditStudentData,
                phone: e.target.value,
              })
            }
          />
        </div>
        <div className="form_field">
          <label className="form_label">Parent Phone</label>
          <input
            className="form_input"
            value={EditStudentData?.parent_phone || ""}
            onWheel={(e) => e.target.blur()}
            onChange={(e) =>
              setEditStudentData({
                ...EditStudentData,
                parent_phone: e.target.value,
              })
            }
          />
        </div>
      </Modal>

      <Modal
        title="Student Gemini Data"
        open={OpenGeminiData}
        onCancel={() => setOpenGeminiData(null)}
        footer={[
          <Button key="cancel" onClick={() => setOpenGeminiData(null)}>
            Cancel
          </Button>,
        ]}
      >
        <>
          <audio src={OpenGeminiData?.audio_url} controls>
            Your browser does not support the audio element.
          </audio>
          <p>
            <strong>CEFR level:</strong> {OpenGeminiData?.CEFR_level}
          </p>
          <p>
            <strong>content :</strong> {OpenGeminiData?.content}
          </p>
          <p>
            <strong>detailed feedback :</strong>{" "}
            {OpenGeminiData?.detailed_feedback}
          </p>
          <p>
            <strong>energy level :</strong> {OpenGeminiData?.energy_level}
          </p>
          <p>
            <strong>grammar :</strong> {OpenGeminiData?.grammar}
          </p>
          <p>
            <strong>overall score :</strong> {OpenGeminiData?.overall_score}
          </p>
          <p>
            <strong>pronunciation :</strong> {OpenGeminiData?.pronunciation}
          </p>
          <p>
            <strong>recommendation:</strong> {OpenGeminiData?.recommendation}
          </p>
          <p>
            <strong>score analysis test id:</strong>{" "}
            {OpenGeminiData?.score_analysis_test_id}
          </p>
          <p>
            <strong>vocabulary :</strong> {OpenGeminiData?.vocabulary}
          </p>
        </>
      </Modal>

      <Modal
        title="Add student subscription"
        open={AddStudentSub}
        // loading={submitting}
        footer={
          <>
            <Button
              style={{ margin: "0px 10px " }}
              onClick={handelAddStudentSub}
              loading={submitting}
              disabled={submitting}
            >
              Add
            </Button>
            <Button onClick={() => setAddStudentSub(null)}>Cancel</Button>
          </>
        }
        onCancel={() => setAddStudentSub(null)}
      >
        <>
          {/* Payment Mode Tabs - Only show for new subscribers */}
          <div className="payment-tabs-container" style={{ margin: "20px 0" }}>
            <div className="payment-tabs">
              {/* Assign Now Tab */}
              <div
                className={`payment-tab ${
                  paymentMode === "assign_now" ? "active" : ""
                }`}
                onClick={() => setPaymentMode("assign_now")}
                style={{
                  padding: "12px 24px",
                  cursor: "pointer",
                  borderRadius: "8px 0 0 8px",
                  border: "2px solid #eb5d22",
                  borderRight: "none",
                  backgroundColor:
                    paymentMode === "assign_now" ? "#eb5d22" : "transparent",
                  color: paymentMode === "assign_now" ? "#fff" : "#eb5d22",
                  fontWeight: "600",
                  fontSize: "14px",
                  textAlign: "center",
                  transition: "all 0.3s ease",
                  minWidth: "100px",
                }}
              >
                Assign Now
              </div>

              {/* Assign Later Tab */}
              <div
                className={`payment-tab ${
                  paymentMode === "assign_later" ? "active" : ""
                }`}
                onClick={() => setPaymentMode("assign_later")}
                style={{
                  padding: "12px 24px",
                  cursor: "pointer",
                  border: "2px solid #eb5d22",
                  borderLeft: "2px solid #eb5d22",
                  borderRight:
                    rowData?.remaining_sub_count !== 0 &&
                    rowData?.remaining_sub_count !== "not subscription yet"
                      ? "none"
                      : "2px solid #eb5d22",
                  borderRadius:
                    rowData?.remaining_sub_count !== 0 &&
                    rowData?.remaining_sub_count !== "not subscription yet"
                      ? "0"
                      : "0 8px 8px 0",
                  backgroundColor:
                    paymentMode === "assign_later" ? "#eb5d22" : "transparent",
                  color: paymentMode === "assign_later" ? "#fff" : "#eb5d22",
                  fontWeight: "600",
                  fontSize: "14px",
                  textAlign: "center",
                  transition: "all 0.3s ease",
                  minWidth: "100px",
                }}
              >
                Assign Later
              </div>

              {rowData?.remaining_sub_count !== 0 &&
                rowData?.remaining_sub_count !== "not subscription yet" && (
                  <div
                    className={`payment-tab ${
                      paymentMode === "assign_group_level" ? "active" : ""
                    }`}
                    onClick={() => setPaymentMode("assign_group_level")}
                    style={{
                      padding: "12px 24px",
                      cursor: "pointer",
                      borderRadius: "0 8px 8px 0",
                      border: "2px solid #eb5d22",
                      backgroundColor:
                        paymentMode === "assign_group_level"
                          ? "#eb5d22"
                          : "transparent",
                      color:
                        paymentMode === "assign_group_level"
                          ? "#fff"
                          : "#eb5d22",
                      fontWeight: "600",
                      fontSize: "14px",
                      textAlign: "center",
                      transition: "all 0.3s ease",
                      minWidth: "100px",
                    }}
                  >
                    Assign Group & Level
                  </div>
                )}
            </div>
          </div>
          {/* Package Selection - Only for new subscribers */}

          <div className="form_field">
            <label className="form_label">Select package</label>
            <Select
              placeholder="Select a package"
              style={{ width: "100%" }}
              value={NewSubscriptionData?.package_id || ""}
              onChange={(value) =>
                setNewSubscriptionData({
                  ...NewSubscriptionData,
                  package_id: value,
                })
              }
            >
              {paymentMode == "assign_now" || paymentMode == "assign_later"
                ? packages.map((pkg, index) => (
                    <Option key={index} value={pkg.package_id}>
                      {pkg.num_of_levels}-{pkg.price}
                    </Option>
                  ))
                : packagesStudent?.map((pkg, index) => (
                    <Option key={index} value={pkg.package_id}>
                      {pkg.num_of_levels}-{pkg.price}
                    </Option>
                  ))}
            </Select>
          </div>

          {paymentMode == "assign_group_level" &&
            NewSubscriptionData?.package_id && (
              <Alert
                className="my-3"
                description={
                  <div>
                    <strong>The remaining level in this package is :</strong>{" "}
                    {
                      packagesStudent?.find(
                        (pkg) =>
                          pkg.package_id == NewSubscriptionData?.package_id
                      )?.remaining_levels
                    }{" "}
                  </div>
                }
                type="info"
                showIcon
              />
            )}

          {/* Level and Group Selection - Show for assign_now or assign_group_level */}
          {(paymentMode === "assign_now" ||
            paymentMode === "assign_group_level") && (
            <>
              <div className="form_field">
                <label className="form_label">Select Level</label>
                <Select
                  placeholder="Select a level"
                  style={{ width: "100%" }}
                  value={NewSubscriptionData?.level_id || ""}
                  onChange={(value) =>
                    setNewSubscriptionData({
                      ...NewSubscriptionData,
                      level_id: value,
                    })
                  }
                >
                  {Levels.map((level, index) => (
                    <Option key={index} value={level.level_id}>
                      {level.level_name}
                    </Option>
                  ))}
                </Select>
              </div>

              <div className="form_field">
                <label className="form_label">Select group</label>
                <Select
                  placeholder="Select a group"
                  style={{ width: "100%" }}
                  value={NewSubscriptionData?.group_id || ""}
                  onChange={(value) =>
                    setNewSubscriptionData({
                      ...NewSubscriptionData,
                      group_id: value,
                    })
                  }
                >
                  {groupOptions.map((group, index) => (
                    <Option key={index} value={group.group_id}>
                      {group.group_name}
                    </Option>
                  ))}
                </Select>
              </div>
            </>
          )}

          {(paymentMode == "assign_now" || paymentMode == "assign_later") && (
            <div className="form_field">
              <label className="form_label">Student paid</label>
              <input
                type="number"
                className="form_input"
                value={NewSubscriptionData?.payed || ""}
                onWheel={(e) => e.target.blur()}
                onChange={(value) =>
                  setNewSubscriptionData({
                    ...NewSubscriptionData,
                    payed: value.target.value,
                  })
                }
              />
            </div>
          )}

          {paymentMode == "assign_group_level" &&
            rowData?.student_remaining_money > 0 && (
              <div className="form_field">
                <label className="form_label">Student paid</label>
                <input
                  type="number"
                  className="form_input"
                  value={NewSubscriptionData?.payed || ""}
                  onWheel={(e) => e.target.blur()}
                  onChange={(value) =>
                    setNewSubscriptionData({
                      ...NewSubscriptionData,
                      payed: value.target.value,
                    })
                  }
                />
              </div>
            )}
        </>
      </Modal>

      <Modal
        width={800}
        title="student's complains & exceptions"
        open={openExceptionModal}
        onClose={() => setExceptionModal(false)}
        onCancel={() => setExceptionModal(false)}
        footer={null}
      >
        <Table
          columns={exceptions_columns}
          loading={exceptionLoading}
          dataSource={
            Array.isArray(exceptionsData) && exceptionsData?.length > 0
              ? exceptionsData
              : []
          }
          scroll={{ x: "max-content" }}
        />
      </Modal>

      <Modal
        open={OpenAddModal}
        title="Add New Student"
        onCancel={() => setOpenAddModal(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="name" label="Full Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="parent_phone"
            label="Parent Phone"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
            <Select placeholder="Select gender">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="age_type"
            label="Age Type"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select age type">
              <Option value="adult">Adult</Option>
              <Option value="kids">Kids</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="app_used_for"
            label="App Used For"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select purpose">
              <Option value="study">Study</Option>
              <Option value="work">Work</Option>
            </Select>
          </Form.Item>

          <Form.Item name="age" label="Age" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>

          <Form.Item
            name="type_of_learning"
            label="Type of Learning"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select type">
              <Option value="remotly">Remotely</Option>
              <Option value="onsite">Onsite</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="student_type"
            label="Student Type"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select student type">
              <Option value="new">New</Option>
              <Option value="old">Old</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="branch_id"
            label="Branch ID"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select student type">
              {branchOptions.map((branch) => {
                return <Option value={branch?.value}>{branch.label}</Option>;
              })}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Select a Group"
        open={OpenUpdateGroup}
        onCancel={() => setOpenUpdateGroup(false)}
        onOk={handelUpdateGroup}
        okText="Confirm"
        cancelText="Cancel"
      >
        <div className="form_field">
          <label className="form_label">Group</label>
          <Select
            placeholder="Choose a group"
            style={{ width: "100%" }}
            value={selectedGroup}
            onChange={(value) => setSelectedGroup(value)}
            options={Groups.map((group) => {
              return { label: group?.group_name, value: group?.group_id };
            })}
          />
        </div>
      </Modal>
    </>
  );
}
