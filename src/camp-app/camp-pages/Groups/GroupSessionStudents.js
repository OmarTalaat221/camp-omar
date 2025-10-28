import { Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../../component/common/breadcrumb/breadcrumb";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../../Api/baseUrl";
import axios from "axios";
import { toast } from "react-toastify";
import "./style.css";
import { AdminData } from "../../../routes/layouts-routes";

const GroupSessionStudents = () => {
  const { group_id, session_id, round_id, branch_id } = useParams();
  console.log(group_id, session_id);
  const navigate = useNavigate();

  const [SessionStudents, setSessionStudents] = useState([]);
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
      render: (text, row) => (
        <a href={`mailto:${row?.email}`} target="_blank">
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
            disabled={row.taken_before == true}
            onClick={() => handleTakeStudentAbsence(row?.student_id)}
          >
            take absence
          </Button>

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
        </>
      ),
    },
  ];

  function handleGetGroupSessionsStudents() {
    const dataSend = {
      group_id: group_id,
      session_id: session_id,
    };
    axios
      .post(
        BASE_URL + "/admin/absence/select_student_by_group.php",
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

  useEffect(() => {
    handleGetGroupSessionsStudents();
  }, []);

  function handleTakeStudentAbsence(student_id) {
    const dataSend = {
      student_id: student_id,
      session_id: session_id,
      admin_id: AdminData[0]?.admin_id,
    };
    axios
      .post(
        BASE_URL + "/admin/absence/take_absence.php",
        JSON.stringify(dataSend)
      )
      .then((res) => {
        console.log(res);
        if (res?.data?.status == "success") {
          toast.success(res.data.message);
          handleGetGroupSessionsStudents();
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((e) => console.log(e));
  }

  return (
    <>
      <Breadcrumbs parent="Groups" title="Group student List" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>List students</h5>
                {/* <Button
                  color="primary btn-pill"
                  style={{ margin: "10px 0" }}
                  onClick={() => setAddGroupModal(true)}
                >
                  Add group
                </Button> */}
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
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupSessionStudents;
