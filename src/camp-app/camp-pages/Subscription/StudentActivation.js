import { Button, Modal, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../../component/common/breadcrumb/breadcrumb";
import { BASE_URL } from "../../../Api/baseUrl";
import axios from "axios";
import { toast } from "react-toastify";
import { Option } from "antd/es/mentions";

const StudentActivation = () => {
  const [students, setStudents] = useState([]);
  const [NotActivatedLevelsModal, setNotActivatedLevelsModal] = useState(null);
  const [Levels, setLevels] = useState([]);

  const [AddStudentSub, setAddStudentSub] = useState(null);
  const [NewSubscriptionData, setNewSubscriptionData] = useState({
    type: null, // ('package', 'level')
    package_id: null, // put package_id if type is package else send it 0
    level_id: null, // // put level_id if type is level else send it 0
    group_id: null,
    student_id: null,
  });

  const [ActiveNextLevelModal, setActiveNextLevelModal] = useState(null);
  const [ActiveSpacificLevel, setActiveSpacificLevel] = useState({
    subscription_id: null,
    group_id: null,
  });
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

  const handelAddStudentSub = async () => {
    console.log(NewSubscriptionData);
    // return
    const dataSend = {
      type: "level",
      package_id: NewSubscriptionData?.package_id,
      level_id: NewSubscriptionData?.level_id,
      group_id: NewSubscriptionData?.group_id,
      student_id: NewSubscriptionData?.student_id,
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
          setAddStudentSub(false);
          handleGetAllStudents();
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
  };

  function handleGetAllStudents() {
    axios
      .get(
        BASE_URL + "/admin/subscription/select_student_to_activate_level.php"
      )
      .then((res) => {
        if (res?.data?.status == "success") {
          setStudents(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    handleGetAllStudents();
    handleSelectLevels();
  }, []);

  const columns = [
    {
      id: "subscription_id",
      dataIndex: "subscription_id",
      title: "#",
    },
    {
      id: "email",
      dataIndex: "email",
      title: "email",
      render: (text, row) => (
        <a href={`mailto:${row?.email}`} target="_blank">
          {row?.email}
        </a>
      ),
    },
    {
      id: "remaining_sub_count",
      dataIndex: "remaining_sub_count",
      title: "remaining sub count",
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
              // setAddStudentSub(row);
              // setNewSubscriptionData({
              //   ...NewSubscriptionData,
              //   student_id: row.student_id,
              //   package_id: row?.package_id,
              // });
            }}
          >
            Add Student subscription
          </Button>
        </>
      ),
    },
  ];

  const [Groups, setGroups] = useState([]);

  function handleGetGroups() {
    axios
      .get(BASE_URL + "/admin/groups/select_groups.php")
      .then((res) => {
        console.log(res);
        if (res?.data?.status == "success") {
          setGroups(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    handleGetGroups();
  }, []);

  return (
    <>
      <Breadcrumbs parent="Subscription" title="not active students" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>List Of Students Remaining Subscription</h5>
              </div>
              <div className="card-body">
                <Table
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
            <Button onClick={() => setAddStudentSub(false)}>Cancel</Button>
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
                  // package_id: "0",
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
    </>
  );
};

export default StudentActivation;
