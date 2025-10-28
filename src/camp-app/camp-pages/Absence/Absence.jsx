import { Table } from "antd";
import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../../component/common/breadcrumb/breadcrumb";
import { BASE_URL } from "../../../Api/baseUrl";
import axios from "axios";
import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";

const Absence = () => {
  const [Absence, setAbsence] = useState([]);

  function handleGetAbsence() {
    axios
      .get(BASE_URL + "/admin/groups/select_group_absence.php")
      .then((res) => {
        console.log(res);
        if (res?.data?.status == "success") {
          setAbsence(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    handleGetAbsence();
  }, []);

  // Step 1: Start with static columns
  const baseColumns = [
    { title: "#", dataIndex: "id", key: "id" },
    { title: "Group Name", dataIndex: "group_name", key: "group_name" },
    { title: "Round Name", dataIndex: "round_name", key: "round_name" },
    { title: "Admin Name", dataIndex: "admin_name", key: "admin_name" },
    { title: "Branch Name", dataIndex: "branch_name", key: "branch_name" },
  ];

  // Step 2: Dynamically create session columns
  const maxSessions = Math.max(
    ...Absence.map((group) => group.group_sessions.length)
  );

  const sessionColumns = Array.from({ length: maxSessions }, (_, i) => ({
    title: `Session ${i + 1}`,
    key: `session_${i + 1}`,
    render: (_, record) => {
      const session = record.group_sessions[i];
      if (!session) return "-";
      return session.take_absence == 1 ? (
        <CheckCircleTwoTone twoToneColor="#52c41a" />
      ) : (
        <CloseCircleTwoTone twoToneColor="#ff4d4f" />
      );
    },
  }));

  // Final columns array
  const columns = [...baseColumns, ...sessionColumns];

  return (
    <>
      <Breadcrumbs parent="Absence" title="Absence List" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>List Absence</h5>
              </div>
              <div className="card-body">
                <Table
                  scroll={{
                    x: "max-content",
                  }}
                  columns={columns}
                  dataSource={Absence}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Absence;
