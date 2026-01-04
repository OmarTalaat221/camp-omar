import { Button, Input, Modal, Select, Table } from "antd";
import Breadcrumbs from "../../../component/common/breadcrumb/breadcrumb";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../Api/baseUrl";
import { Option } from "antd/es/mentions";
import { use } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as XLSX from "xlsx";
import { BsSearch } from "react-icons/bs";

export default function BranchStudents() {
  const [students, setStudents] = useState([]);
  const [Levels, setLevels] = useState([]);
  const [packages, setPackages] = useState([]);
  const [Groups, setGroups] = useState([]);
  const navigate = useNavigate();
  const { branch_id } = useParams();
  const [OpenProfile, setOpenProfile] = useState(null);
  const [OpenGeminiData, setOpenGeminiData] = useState(null);
  const [AddStudentSub, setAddStudentSub] = useState(null);
  const [SubscriptionType, setSubscriptionType] = useState({
    type: null,
  });

  const [AddNotSubscribedStudentSub, setAddNotSubscribedStudentSub] =
    useState(null);

  const [NewSubscriptionData, setNewSubscriptionData] = useState({
    type: null, // ('package', 'level')
    package_id: null, // put package_id if type is package else send it 0
    level_id: null, // // put level_id if type is level else send it 0
    group_id: null,
    student_id: null,
  });

  const [
    NewSubscriptionDataNotSubscribed,
    setNewSubscriptionDataNotSubscribed,
  ] = useState({
    type: "level", // ('package', 'level')
    package_id: null, // put package_id if type is package else send it 0
    level_id: null, // // put level_id if type is level else send it 0
    group_id: null,
    student_id: null,
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

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

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
          <Link
            className="mr-2"
            to={`/students/list/${row?.student_id}/profile`}
          >
            <Button
              className="mr-2"
              style={{ marginRight: "5px" }}
              color="primary btn-pill"
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
          <Link to={`/students/list/${row?.student_id}/profile`}>
            <Button
              color="primary btn-pill"
              onClick={(e) => {
                if (e.ctrlKey || e.metaKey) {
                  return;
                }
                e.preventDefault();
                navigate(`/students/list/${row?.student_id}/profile`);
              }}
            >
              activate placement test
            </Button>
          </Link>
          <Button
            color="primary btn-pill"
            style={{ margin: "0px 10px" }}
            onClick={() => {
              {
                row?.remaining_sub_count == 0 ||
                  row?.remaining_sub_count == "not subscription yet"
                  ? setAddNotSubscribedStudentSub(row)
                  : setAddStudentSub(row);
                setNewSubscriptionData({
                  ...NewSubscriptionData,
                  student_id: row.student_id,
                });
              }
            }}
          >
            Add Student subscription
          </Button>
          <Button
            color="primary btn-pill"
            onClick={() =>
              // console.log(row)
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

  function handleGetStudentException(student_id) {
    const data_send = {
      student_id,
    };
    setExceptionLoading(true);
    axios
      .post(
        "https://camp-coding.online/camp-for-english/admin/complains_exceptions/select_students_complains_exceptions.php",
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
    // {
    //   dataIndex:"student_name",
    //   key:"student_name",
    //   title:"Student Name"
    // },
    {
      dataIndex: "Date",
      key: "Date",
      title: "Date",
    },
  ];

  function handleGetAllStudents() {
    axios
      .post(BASE_URL + "/admin/branches/select_branch_students.php", {
        branch_id: branch_id,
      })
      .then((res) => {
        if (res?.data?.status == "success") {
          setStudents(res?.data?.message);
        }
      });
  }

  useEffect(() => {
    handleGetAllStudents();
  }, []);

  const handelAddStudentSub = async () => {
    console.log(NewSubscriptionData);
    const dataSend = {
      type: "level",
      package_id: AddStudentSub?.package_id,
      level_id: NewSubscriptionData?.level_id,
      group_id: NewSubscriptionData?.group_id,
      student_id: NewSubscriptionData?.student_id,
    };

    console.log(dataSend, AddStudentSub);

    axios
      .post(
        BASE_URL + "/admin/subscription/make_subscription_to_student.php",
        JSON.stringify(dataSend)
      )
      .then((res) => {
        console.log(res);
        if (res?.data?.status == "success") {
          toast.success("student subscription added succesfully!");
          setAddStudentSub(false);
          handleGetAllStudents();
        } else {
          toast.error("Faild to add student subscription");
        }
      })
      .catch((e) => console.log(e));
  };

  const handelAddNotSubscriebedStudentSub = async () => {
    console.log(NewSubscriptionData);
    const dataSend = {
      type: NewSubscriptionDataNotSubscribed?.type,
      package_id: NewSubscriptionDataNotSubscribed?.package_id,
      level_id: NewSubscriptionDataNotSubscribed?.level_id,
      group_id: NewSubscriptionDataNotSubscribed?.group_id,
      student_id: AddNotSubscribedStudentSub?.student_id,
    };

    console.log(dataSend);

    axios
      .post(
        BASE_URL + "/admin/subscription/make_subscription_to_student.php",
        JSON.stringify(dataSend)
      )
      .then((res) => {
        console.log(res);
        if (res?.data?.status == "success") {
          toast.success(res?.data?.message);
          setAddNotSubscribedStudentSub(null);
          handleGetAllStudents();
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
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

  useEffect(() => {
    handleSelectLevels();
    handelGetGroups();
  }, [SubscriptionType.type === "level"]);

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
    handelGetGroups();
  }, [SubscriptionType.type === "package"]);

  function handelGetGroups() {
    axios
      .get(BASE_URL + "/admin/groups/select_groups.php")
      .then((res) => {
        if (res?.data?.status == "success") {
          setGroups(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
  }

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredData && filteredData.length > 0 ? filteredData : students
    ); // Convert JSON to Excel sheet
    const workbook = XLSX.utils.book_new(); // Create a new workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students"); // Append the sheet
    XLSX.writeFile(workbook, "students_data.xlsx"); // Export the workbook as a file
  };

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
              </div>

              <div className="card-body">
                <Table
                  rowKey={(record) => record.student_id} // Ensure a unique key
                  onChange={handleTableChange}
                  scroll={{
                    x: "max-content",
                  }}
                  columns={columns}
                  dataSource={students}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Modal
        title="Student profile"
        open={OpenProfile}
        onCancel={() => setOpenProfile(false)}
        footer={[
          <Button key="cancel" onClick={() => setOpenProfile(false)}>
            Cancel
          </Button>,
        ]}
      >
        <>
          <img
            src={OpenProfile?.image}
            alt=""
            style={{ width: "80px", height: "80px" }}
          />
          <p>
            <strong>student name :</strong> {OpenProfile?.name}
          </p>
          <p>
            <strong>student email :</strong> {OpenProfile?.email}
          </p>
          <p>
            <strong>gender :</strong> {OpenProfile?.gender}
          </p>
          <p>
            <strong>Phone :</strong> {OpenProfile?.phone}
          </p>
          <p>
            <strong>Age :</strong> {OpenProfile?.age}
          </p>
          <p>
            <strong>Type of learning :</strong> {OpenProfile?.type_of_learning}
          </p>
          <p>
            <strong>Branch name:</strong> {OpenProfile?.branch_name}
          </p>
          <p>
            <strong>App used for:</strong> {OpenProfile?.app_used_for}
          </p>
          <p>
            <strong>password:</strong> {OpenProfile?.password}
          </p>
        </>
      </Modal> */}

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
        footer={
          <>
            <Button
              style={{ margin: "0px 10px " }}
              onClick={handelAddStudentSub}
            >
              Add
            </Button>
            <Button>Cancel</Button>
          </>
        }
        onCancel={() => setAddStudentSub(false)}
      >
        <>
          <div className="form_field">
            <label className="form_label">Select Level</label>
            <Select
              placeholder="Select a level"
              style={{ width: "100%" }}
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

          {/* {SubscriptionType.type === "package" && (
            <div className="form_field">
              <label className="form_label">Select Package</label>
              <Select
                placeholder="Select a package"
                style={{ width: "100%" }}
                onChange={(value) =>
                  setNewSubscriptionData({
                    ...NewSubscriptionData,
                    package_id: value,
                    level_id: "0",
                  })
                }
              >
              
          )} */}
          {/* {SubscriptionType.type === "level" && (
            <div className="form_field">
              <label className="form_label">Select Level</label>
              <Select
                placeholder="Select a level"
                style={{ width: "100%" }}
                onChange={(value) =>
                  setNewSubscriptionData({
                    ...NewSubscriptionData,
                    package_id: "0",
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
          )} */}

          <div className="form_field">
            <label className="form_label">Select group</label>
            <Select
              placeholder="Select a group"
              style={{ width: "100%" }}
              onChange={(value) =>
                setNewSubscriptionData({
                  ...NewSubscriptionData,
                  group_id: value,
                })
              }
            >
              {Groups.map((group, index) => (
                <Option key={index} value={group.group_id}>
                  {group.group_name}
                </Option>
              ))}
            </Select>
          </div>
        </>
      </Modal>

      <Modal
        title="Add student subscription"
        open={AddNotSubscribedStudentSub}
        footer={
          <>
            <Button
              style={{ margin: "0px 10px " }}
              onClick={handelAddNotSubscriebedStudentSub}
            >
              Add
            </Button>
            <Button>Cancel</Button>
          </>
        }
        onCancel={() => setAddNotSubscribedStudentSub(null)}
      >
        <>
          <div className="form_field">
            <label className="form_label">Select package</label>
            <Select
              placeholder="Select a package"
              style={{ width: "100%" }}
              onChange={(value) =>
                setNewSubscriptionDataNotSubscribed({
                  ...NewSubscriptionDataNotSubscribed,
                  package_id: value,
                })
              }
            >
              {packages.map((pkg, index) => (
                <Option key={index} value={pkg.package_id}>
                  {pkg.num_of_levels}-{pkg.price}
                </Option>
              ))}
            </Select>
          </div>
          <div className="form_field">
            <label className="form_label">Select Level</label>
            <Select
              placeholder="Select a level"
              style={{ width: "100%" }}
              onChange={(value) =>
                setNewSubscriptionDataNotSubscribed({
                  ...NewSubscriptionDataNotSubscribed,
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
              onChange={(value) =>
                setNewSubscriptionDataNotSubscribed({
                  ...NewSubscriptionDataNotSubscribed,
                  group_id: value,
                })
              }
            >
              {Groups.map((group, index) => (
                <Option key={index} value={group.group_id}>
                  {group.group_name}
                </Option>
              ))}
            </Select>
          </div>
        </>
      </Modal>

      <Modal
        width={800}
        title="student's complains & exceptions"
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
        />
      </Modal>
    </>
  );
}
