import { Button, Table, Modal } from "antd";
import Breadcrumbs from "../../../../component/common/breadcrumb/breadcrumb";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../../../Api/baseUrl";
import { toast } from "react-toastify";

export default function Students() {
  const levelId = useParams();
  const [pausedSub, setPausedSub] = useState(false);
  console.log(levelId);
  const [students, setStudents] = useState([]);
  const [rowData, setRowData] = useState({});

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
        <a href={`mailto:${row?.email}`} target="_blank" rel="noreferrer">
          {row?.email}
        </a>
      ),
    },
    {
      id: "phone",
      dataIndex: "phone",
      title: "phone",
    },
    {
      id: "password",
      dataIndex: "password",
      title: "password",
    },
    {
      id: "gender",
      title: "gender",
      dataIndex: "gender",
    },
    {
      id: "age",
      title: "age",
      dataIndex: "age",
    },
    {
      id: "student_score",
      title: "score",
      dataIndex: "student_score",
    },
    {
      id: "app_used_for",
      dataIndex: "app_used_for",
      title: "app_used_for",
    },
    {
      id: "type_of_learning",
      dataIndex: "type_of_learning",
      title: "type_of_learning",
    },
    {
      id: "actions",
      dataIndex: "actions",
      title: "Actions",
      render: (text, row) => (
        <button
          onClick={() => {
            if (row?.pused == "1") return null;
            setPausedSub(true);

            setRowData(row);
          }}
          className={`btn btn-primary`}
          disabled={row?.paused == "1" ? true : false}
          style={
            row?.pused == "1"
              ? { cursor: "not-allowed" }
              : { cursor: "pointer" }
          }
        >
          Paused Subscription
        </button>
      ),
    },
  ];

  function handleGetAllStudents() {
    const data_send = {
      level_id: levelId?.levelId,
    };
    console.log(data_send);
    axios
      .post(BASE_URL + "/admin/home/select_student_by_level.php", data_send)
      .then((res) => {
        if (res?.data?.status == "success") {
          setStudents(res?.data?.message);
        }
      });
  }

  function handlePausedSubscription() {
    const data_send = {
      level_id: levelId?.levelId,
      student_id: rowData?.student_id,
    };
    axios
      .post(BASE_URL + "/admin/home/pused_subscription.php", data_send)
      .then((res) => {
        if (res?.data?.status == "success") {
          toast.success(res?.data?.message);
          setPausedSub(false);
          handleGetAllStudents();
        } else {
          toast.error(res?.data?.message || "There's a problem");
        }
      })
      .catch((e) => console.log(e))
      .finally(() => setPausedSub(false));
  }

  useEffect(() => {
    handleGetAllStudents();
  }, []);
  return (
    <>
      <Breadcrumbs parent="Levels" title="Students" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>Students</h5>
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
        title="Paused Subscription"
        open={pausedSub}
        footer={[
          <Button
            type="primary"
            key="submit"
            onClick={handlePausedSubscription}
          >
            Yes
          </Button>,
          <Button type="" key="cancel" onClick={() => setPausedSub(false)}>
            No
          </Button>,
        ]}
      >
        <p>
          Are you sure you want to Paused Subscription for the Following
          student:
          <br />
          <strong>{rowData?.name}</strong>
        </p>
      </Modal>
    </>
  );
}
