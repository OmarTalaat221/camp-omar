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
import { toast } from "react-toastify";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import * as XLSX from "xlsx";
import { BsSearch } from "react-icons/bs";
import "./style.css";

export default function ListStudents() {
  const AdminData = JSON.parse(localStorage.getItem("AdminData"));
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get("page")) || 1;
  const currentLimit = parseInt(searchParams.get("limit")) || 20;
  const currentBranchId = searchParams.get("branch_id") || "";
  const currentPhone = searchParams.get("phone") || "";
  const currentName = searchParams.get("name") || "";
  const currentEmail = searchParams.get("email") || "";

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
  const [paymentMode, setPaymentMode] = useState("assign_now");
  const [form] = Form.useForm();
  const [packagesStudent, setPackagesStudent] = useState([]);

  const [OpenProfile, setOpenProfile] = useState(null);
  const [OpenGeminiData, setOpenGeminiData] = useState(null);
  const [AddStudentSub, setAddStudentSub] = useState(null);

  const [groupsLoading, setGroupsLoading] = useState(false);

  const [NewSubscriptionData, setNewSubscriptionData] = useState({
    type: "level",
    package_id: null,
    level_id: null,
    group_id: null,
    student_id: null,
    payed: null,
  });

  const [filteredData, setFilteredData] = useState(students);

  const [openExceptionModal, setExceptionModal] = useState(false);
  const [exceptionsData, setExceptionsData] = useState([]);
  const [exceptionLoading, setExceptionLoading] = useState(false);
  const [rowData, setRowData] = useState(null);

  // ✅ Pagination state from API
  const [paginationData, setPaginationData] = useState({
    current_page: 1,
    limit: 20,
    total_students: 0,
    total_pages: 1,
  });

  const updateSearchParams = (newParams) => {
    const params = new URLSearchParams(searchParams);

    Object.keys(newParams).forEach((key) => {
      if (
        newParams[key] !== "" &&
        newParams[key] !== null &&
        newParams[key] !== undefined
      ) {
        params.set(key, newParams[key]);
      } else {
        params.delete(key);
      }
    });

    setSearchParams(params);
  };

  const handlePageChange = (page, pageSize) => {
    updateSearchParams({
      page: page,
      limit: pageSize,
    });
  };

  const handleTableChange = (pagination, filters, sorter, extra) => {
    if (extra && extra.currentDataSource) {
      setFilteredData(extra.currentDataSource);
    }
  };

  const handleSearch = (value, dataIndex) => {
    updateSearchParams({
      [dataIndex]: value,
      page: 1,
    });
  };

  const handleReset = (dataIndex) => {
    const params = new URLSearchParams(searchParams);
    params.delete(dataIndex);
    params.set("page", "1");
    setSearchParams(params);
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

  const handleLevelChange = (value) => {
    setNewSubscriptionData((prev) => ({
      ...prev,
      level_id: value,
      group_id: null,
    }));

    if (value) {
      fetchGroupsByLevel(value);
    } else {
      setGroups([]);
    }
  };

  const fetchGroupsByLevel = async (levelId) => {
    setGroupsLoading(true);
    try {
      const res = await axios.post(
        BASE_URL + "/admin/groups/select_groups_by_admin.php",
        {
          admin_id: AdminData[0]?.admin_id,
          level_id: levelId,
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
  };

  const getColumnSearchProps = (dataIndex) => {
    const currentValue = searchParams.get(dataIndex) || "";

    return {
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <div style={{ padding: 8 }}>
            <Input
              placeholder={`Search ${dataIndex}`}
              // ✅ استخدم defaultValue بدلاً من value
              defaultValue={currentValue}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
              }}
              onPressEnter={() => {
                handleSearch(selectedKeys[0] || "", dataIndex);
              }}
              style={{ marginBottom: 8, display: "block" }}
            />
            <div style={{ display: "flex", gap: "8px" }}>
              <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys[0] || "", dataIndex)}
                icon={<BsSearch />}
                size="small"
                style={{ width: 90 }}
              >
                Search
              </Button>
              <Button
                onClick={() => {
                  setSelectedKeys([]);
                  handleReset(dataIndex);
                }}
                size="small"
                style={{ width: 90 }}
              >
                Reset
              </Button>
            </div>
          </div>
        );
      },
      filterIcon: (filtered) => (
        <BsSearch
          style={{
            color: currentValue ? "#1890ff" : undefined,
          }}
        />
      ),
      filtered: !!currentValue,
    };
  };
  const columns = [
    {
      id: "student_id",
      dataIndex: "student_id",
      title: "Student ID",
      // ...getColumnSearchProps("student_id"),
    },
    {
      id: "name",
      dataIndex: "name",
      title: "Name",
      ...getColumnSearchProps("name"),
    },
    {
      id: "email",
      dataIndex: "email",
      title: "Email",
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
      title: "Phone",
      ...getColumnSearchProps("phone"),
    },
    {
      id: "parent_phone",
      dataIndex: "parent_phone",
      title: "Parent Phone",
      // ...getColumnSearchProps("parent_phone"),
    },
    {
      id: "branch_name",
      dataIndex: "branch_name",
      title: "Branch",
    },
    {
      id: "password",
      dataIndex: "password",
      title: "Password",
    },
    {
      id: "remaining_sub_count",
      dataIndex: "remaining_sub_count",
      title: "Remaining Sub Count",
    },
    {
      id: "student_score_in_placement_test",
      dataIndex: "student_score_in_placement_test",
      title: "Placement Test Score",
    },
    {
      id: "action",
      dataIndex: "x",
      title: "Action",
      render: (text, row) => (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
          <Button
            onClick={() => {
              setEditModal(true);
              setEditStudentData(row);
            }}
          >
            Edit
          </Button>
          <Button
            onClick={() => {
              setOpenUpdateGroup(true);
              setRowData(row);
            }}
          >
            Update Group
          </Button>
          <Link to={`/students/list/${row?.student_id}/profile`}>
            <Button
              style={{ margin: "0px 10px" }}
              onClick={(e) => {
                if (e.ctrlKey || e.metaKey) {
                  return;
                }
                e.preventDefault();

                navigate(`/students/list/${row?.student_id}/profile`);
              }}
            >
              Profile
            </Button>
          </Link>
          <Button
            onClick={() => {
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
              handelGetGroups();
            }}
          >
            Add Subscription
          </Button>
          <Button
            onClick={() =>
              navigate(
                `${process.env.PUBLIC_URL}/students/${row?.student_id}/level/certificates`,
                { state: { rowData: row } }
              )
            }
          >
            Certificates
          </Button>
          <Button
            onClick={() => {
              row?.student_gemini_data
                ? setOpenGeminiData(row?.student_gemini_data)
                : toast.error("This student has not taken the exam yet.");
            }}
          >
            Gemini Data
          </Button>
          <Button
            onClick={() => {
              setExceptionModal(true);
              handleGetStudentException(row?.student_id);
            }}
          >
            Exceptions
          </Button>
        </div>
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
      title: "ID",
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

  function handleGetAllStudents() {
    setLoading(true);

    const params = new URLSearchParams({
      admin_type: AdminData[0]?.type,

      page: currentPage.toString(),
      limit: currentLimit.toString(),
    });

    if (AdminData[0]?.type != "super_admin") {
      params.append("branch_id", AdminData[0]?.branch_id);
    }

    searchParams.forEach((value, key) => {
      if (key !== "page" && key !== "limit" && value) {
        params.set(key, value);
      }
    });
    axios
      .get(
        `${BASE_URL}/admin/home/select_students_with_pagination.php?${params.toString()}`
      )
      .then((res) => {
        if (res?.data?.status == "success") {
          setStudents(res?.data?.message || []);
          setPaginationData(
            res?.data?.pagination || {
              current_page: 1,
              limit: 20,
              total_students: 0,
              total_pages: 1,
            }
          );
        } else {
          setStudents([]);
          setPaginationData({
            current_page: 1,
            limit: 20,
            total_students: 0,
            total_pages: 1,
          });
        }
      })
      .catch((e) => {
        console.log(e);
        setStudents([]);
        toast.error("Error fetching students");
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    handleGetAllStudents();
  }, [searchParams]);

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
        if (res?.data?.status == "success") {
          toast.success(res?.data?.message);
          setAddStudentSub(null);
          handleGetAllStudents();
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
        if (res?.data?.status == "success") {
          setLevels(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
  }

  function handelGetGroups() {
    setGroupsLoading(true);
    axios
      .post(BASE_URL + "/admin/groups/select_groups_by_admin.php", {
        admin_id: AdminData[0]?.admin_id,
      })
      .then((res) => {
        if (res?.data?.status == "success") {
          setGroups(res?.data?.message);
        }
      })
      .catch((e) => console.log(e))
      .finally(() => setGroupsLoading(false));
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
      String(gr.group_levels.level_id) === String(NewSubscriptionData?.level_id)
  );

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

  const handleCloseSubscriptionModal = () => {
    setAddStudentSub(null);
    setNewSubscriptionData({
      type: "level",
      package_id: null,
      level_id: null,
      group_id: null,
      student_id: null,
      payed: null,
    });
    setRowData(null);
  };

  // ✅ Clear all filters
  const handleClearAllFilters = () => {
    setSearchParams({ page: "1", limit: currentLimit.toString() });
  };

  // ✅ Check if any filters are active
  const hasActiveFilters = Array.from(searchParams.keys()).some(
    (key) => key !== "page" && key !== "limit"
  );

  return (
    <>
      <Breadcrumbs parent="Levels" title="Students" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "10px",
                  }}
                >
                  <h5 style={{ margin: 0 }}>List Students</h5>
                  <div style={{ display: "flex", gap: "10px" }}>
                    {hasActiveFilters && (
                      <button
                        className="btn btn-warning"
                        onClick={handleClearAllFilters}
                      >
                        Clear All Filters
                      </button>
                    )}
                  </div>
                  <button className="btn btn-success" onClick={handleExport}>
                    Export to Excel
                  </button>
                  <button
                    className="btn"
                    style={{
                      backgroundColor: "orangered",
                      color: "white",
                    }}
                    onClick={() => setOpenAddModal(true)}
                  >
                    Add Student
                  </button>
                </div>
              </div>

              <div className="card-body">
                {/* ✅ Active Filters Display */}
                {hasActiveFilters && (
                  <Alert
                    message={
                      <div className="d-flex gap-2 align-items-center ">
                        <strong>Active Filters: </strong>
                        {Array.from(searchParams.entries())
                          .filter(([key]) => key !== "page" && key !== "limit")
                          .map(([key, value]) => (
                            <span
                              key={key}
                              className="badge bg-primary"
                              style={{ marginRight: "5px" }}
                            >
                              {key}: {value}
                            </span>
                          ))}
                      </div>
                    }
                    type="info"
                    closable
                    onClose={handleClearAllFilters}
                    style={{ marginBottom: "15px" }}
                  />
                )}

                {/* ✅ Pagination Info */}
                <div
                  style={{
                    marginBottom: "15px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "10px",
                  }}
                >
                  <span>
                    Showing{" "}
                    <strong>
                      {students.length > 0
                        ? (currentPage - 1) * currentLimit + 1
                        : 0}{" "}
                      -{" "}
                      {Math.min(
                        currentPage * currentLimit,
                        parseInt(paginationData.total_students || 0)
                      )}
                    </strong>{" "}
                    of <strong>{paginationData.total_students || 0}</strong>{" "}
                    students
                  </span>
                  <Select
                    value={currentLimit}
                    onChange={(value) => handlePageChange(1, value)}
                    style={{ width: "120px" }}
                  >
                    <Option value={10}>10 / page</Option>
                    <Option value={20}>20 / page</Option>
                    <Option value={50}>50 / page</Option>
                    <Option value={100}>100 / page</Option>
                  </Select>
                </div>

                {/* Table */}
                <Table
                  rowKey={(record) => record.student_id}
                  onChange={handleTableChange}
                  scroll={{
                    x: "max-content",
                  }}
                  columns={columns}
                  loading={loading}
                  dataSource={students}
                  pagination={false}
                />

                {/* ✅ Custom Pagination */}
                <div
                  style={{
                    marginTop: "20px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Pagination
                    current={currentPage}
                    pageSize={currentLimit}
                    total={parseInt(paginationData.total_students || 0)}
                    onChange={handlePageChange}
                    showSizeChanger
                    showTotal={(total, range) =>
                      `${range[0]}-${range[1]} of ${total} items`
                    }
                    pageSizeOptions={["10", "20", "50", "100"]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Student Modal */}
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
            onChange={(e) =>
              setEditStudentData({
                ...EditStudentData,
                parent_phone: e.target.value,
              })
            }
          />
        </div>
      </Modal>

      {/* Gemini Data Modal */}
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
            <strong>Content:</strong> {OpenGeminiData?.content}
          </p>
          <p>
            <strong>Detailed feedback:</strong>{" "}
            {OpenGeminiData?.detailed_feedback}
          </p>
          <p>
            <strong>Energy level:</strong> {OpenGeminiData?.energy_level}
          </p>
          <p>
            <strong>Grammar:</strong> {OpenGeminiData?.grammar}
          </p>
          <p>
            <strong>Overall score:</strong> {OpenGeminiData?.overall_score}
          </p>
          <p>
            <strong>Pronunciation:</strong> {OpenGeminiData?.pronunciation}
          </p>
          <p>
            <strong>Recommendation:</strong> {OpenGeminiData?.recommendation}
          </p>
          <p>
            <strong>Vocabulary:</strong> {OpenGeminiData?.vocabulary}
          </p>
        </>
      </Modal>

      {/* Add Subscription Modal */}
      <Modal
        title="Add Student Subscription"
        open={AddStudentSub}
        footer={
          <>
            <Button
              type="primary"
              onClick={handelAddStudentSub}
              loading={submitting}
              disabled={submitting}
            >
              Add
            </Button>
            <Button onClick={handleCloseSubscriptionModal}>Cancel</Button>
          </>
        }
        onCancel={handleCloseSubscriptionModal}
      >
        <>
          {/* Payment Mode Tabs */}
          <div className="payment-tabs-container" style={{ margin: "20px 0" }}>
            <div className="payment-tabs" style={{ display: "flex", gap: "0" }}>
              <div
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

              <div
                onClick={() => setPaymentMode("assign_later")}
                style={{
                  padding: "12px 24px",
                  cursor: "pointer",
                  border: "2px solid #eb5d22",
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
                      minWidth: "130px",
                    }}
                  >
                    Assign Group & Level
                  </div>
                )}
            </div>
          </div>

          {/* Package Selection */}
          <div className="form_field" style={{ marginBottom: "16px" }}>
            <label className="form_label" style={{ marginBottom: "8px" }}>
              Select Package
            </label>
            <Select
              placeholder="Select a package"
              style={{ width: "100%" }}
              value={NewSubscriptionData?.package_id || undefined}
              onChange={(value) =>
                setNewSubscriptionData({
                  ...NewSubscriptionData,
                  package_id: value,
                })
              }
            >
              {paymentMode == "assign_now" || paymentMode == "assign_later"
                ? packages.map((pkg) => (
                    <Option key={pkg.package_id} value={pkg.package_id}>
                      {pkg?.title} - {pkg.num_of_levels} - {pkg.price}
                    </Option>
                  ))
                : packagesStudent?.map((pkg) => (
                    <Option key={pkg.package_id} value={pkg.package_id}>
                      {pkg?.title} - {pkg.num_of_levels} - {pkg.price}
                    </Option>
                  ))}
            </Select>
          </div>

          {paymentMode == "assign_group_level" &&
            NewSubscriptionData?.package_id && (
              <Alert
                style={{ marginBottom: "16px" }}
                description={
                  <div>
                    <strong>Remaining levels in this package:</strong>{" "}
                    {
                      packagesStudent?.find(
                        (pkg) =>
                          pkg.package_id == NewSubscriptionData?.package_id
                      )?.remaining_levels
                    }
                  </div>
                }
                type="info"
                showIcon
              />
            )}

          {/* Level and Group Selection */}
          {(paymentMode === "assign_now" ||
            paymentMode === "assign_group_level") && (
            <>
              <div className="form_field" style={{ marginBottom: "16px" }}>
                <label className="form_label" style={{ marginBottom: "8px" }}>
                  Select Level
                </label>
                <Select
                  placeholder="Select a level"
                  style={{ width: "100%" }}
                  value={NewSubscriptionData?.level_id || undefined}
                  onChange={handleLevelChange}
                >
                  {Levels.map((level) => (
                    <Option key={level.level_id} value={level.level_id}>
                      {level.level_name}
                    </Option>
                  ))}
                </Select>
              </div>

              <div className="form_field" style={{ marginBottom: "16px" }}>
                <label className="form_label" style={{ marginBottom: "8px" }}>
                  Select Group
                </label>
                <Select
                  placeholder="Select a group"
                  style={{ width: "100%" }}
                  value={NewSubscriptionData?.group_id || undefined}
                  onChange={(value) =>
                    setNewSubscriptionData({
                      ...NewSubscriptionData,
                      group_id: value,
                    })
                  }
                  loading={groupsLoading}
                  disabled={!NewSubscriptionData?.level_id}
                  notFoundContent={
                    groupsLoading
                      ? "Loading..."
                      : "No groups found for this level"
                  }
                >
                  {groupOptions.map((group) => (
                    <Option key={group.group_id} value={group.group_id}>
                      {group.group_name}
                    </Option>
                  ))}
                </Select>
              </div>
            </>
          )}

          {(paymentMode == "assign_now" || paymentMode == "assign_later") && (
            <div className="form_field">
              <label className="form_label" style={{ marginBottom: "8px" }}>
                Student Paid
              </label>
              <input
                type="number"
                className="form_input"
                value={NewSubscriptionData?.payed || ""}
                onWheel={(e) => e.target.blur()}
                onChange={(e) =>
                  setNewSubscriptionData({
                    ...NewSubscriptionData,
                    payed: e.target.value,
                  })
                }
              />
            </div>
          )}

          {paymentMode == "assign_group_level" &&
            rowData?.student_remaining_money > 0 && (
              <div className="form_field">
                <label className="form_label" style={{ marginBottom: "8px" }}>
                  Student Paid
                </label>
                <input
                  type="number"
                  className="form_input"
                  value={NewSubscriptionData?.payed || ""}
                  onWheel={(e) => e.target.blur()}
                  onChange={(e) =>
                    setNewSubscriptionData({
                      ...NewSubscriptionData,
                      payed: e.target.value,
                    })
                  }
                />
              </div>
            )}
        </>
      </Modal>

      {/* Exceptions Modal */}
      <Modal
        width={800}
        title="Student's Complains & Exceptions"
        open={openExceptionModal}
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
          pagination={false}
        />
      </Modal>

      {/* Add Student Modal */}
      <Modal
        open={OpenAddModal}
        title="Add New Student"
        onCancel={() => setOpenAddModal(false)}
        footer={null}
        width={600}
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
            label="Branch"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select branch">
              {branchOptions.map((branch) => (
                <Option key={branch.value} value={branch.value}>
                  {branch.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Update Group Modal */}
      <Modal
        title="Update Student Group"
        open={OpenUpdateGroup}
        onCancel={() => setOpenUpdateGroup(false)}
        onOk={handelUpdateGroup}
        okText="Confirm"
        cancelText="Cancel"
      >
        <div className="form_field">
          <label className="form_label" style={{ marginBottom: "8px" }}>
            Group
          </label>
          <Select
            placeholder="Choose a group"
            style={{ width: "100%" }}
            value={selectedGroup || undefined}
            onChange={(value) => setSelectedGroup(value)}
          >
            {Groups.map((group) => (
              <Option key={group.group_id} value={group.group_id}>
                {group.group_name}
              </Option>
            ))}
          </Select>
        </div>
      </Modal>
    </>
  );
}
