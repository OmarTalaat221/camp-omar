import { Button, Dropdown, Modal, Table } from "antd";
import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../../component/common/breadcrumb/breadcrumb";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../../Api/baseUrl";
import { render } from "@testing-library/react";
import { FaEllipsisVertical } from "react-icons/fa6";
import { toast } from "react-toastify";
import { set } from "lodash";
import { AdminData } from "../../../routes/layouts-routes";

const GroupSessions = () => {
  const { group_id, round_id, branch_id } = useParams();

  console.log(group_id);

  const navigate = useNavigate();

  const [GroupSessions, setGroupSessions] = useState([]);
  const [DeleteSessionModal, setDeleteSessionModal] = useState(null);
  const [ConfirmAbsenceModal, setConfirmAbsenceModal] = useState(null);

  const [AddSessionModal, setAddSessionModal] = useState(false);
  const [NewSessionData, setNewSessionData] = useState({
    group_id: null,
    session_name: null,
    session_link: null,
    end_date: null,
  });

  const [EditSessionModal, setEditSessionModal] = useState(false);
  const [RowData, setRowData] = useState(null);

  const columns = [
    {
      id: "session_id",
      dataIndex: "session_id",
      title: "#",
    },
    {
      id: "session_name",
      dataIndex: "session_name",
      title: "session_name ",
    },
    {
      id: "session_link",
      dataIndex: "session_link",
      title: "session_link",
      render: (text, row) => (
        <>
          <p
            style={{ cursor: "pointer" }}
            onClick={() => window.open(row?.session_link)}
          >
            {row?.session_link}
          </p>
        </>
      ),
    },
    {
      id: "day_created",
      dataIndex: "day_created",
      title: "day_created",
    },
    {
      id: "end_date",
      dataIndex: "end_date",
      title: "end_date",
    },
    {
      title: "Actions",
      render: (text, row) => {
        const items = [
          {
            key: 1,
            label: (
              <button
                className="btn btn-primary"
                onClick={() => {
                  setDeleteSessionModal(row);
                }}
              >
                Delete session
              </button>
            ),
          },
          {
            key: 2,
            label: (
              <button
                className="btn btn-primary"
                onClick={() => {
                  setEditSessionModal(true);
                  setRowData(row);
                }}
              >
                Edit session
              </button>
            ),
          },
          {
            key: 3,
            label: (
              <Link
                to={`${process.env.PUBLIC_URL}/groups/${group_id}/sessions/${row?.session_id}/students`}
                className="btn btn-primary text-white"
                // onClick={() => {
                //   navigate(
                //     `${process.env.PUBLIC_URL}/groups/${group_id}/sessions/${row?.session_id}/students`
                //   );
                // }}
              >
                session students
              </Link>
            ),
          },
        ];
        return (
          <div className="d-flex gap-2 align-items-center">
            {AdminData[0]?.type == "employee" ? (
              <>
                <Button
                  style={{ margin: "0px 10px" }}
                  onClick={() => {
                    setConfirmAbsenceModal(row);
                    // handleGetStudentsNotes(row?.student_id);
                  }}
                  disabled={row?.take_absence == 1}
                >
                  confirm Absence
                </Button>
              </>
            ) : AdminData[0]?.type == "instractor" ? (
              <>
                <Button
                  style={{ margin: "0px 10px" }}
                  onClick={() => {
                    setConfirmAbsenceModal(row);
                    // handleGetStudentsNotes(row?.student_id);
                  }}
                  disabled={row?.take_absence == 1}
                >
                  confirm Absence
                </Button>
              </>
            ) : null}

            <Dropdown
              menu={{
                items,
              }}
              placement="bottom"
            >
              <Button
                style={{ display: "flex", flexDirection: "column", gap: "3px" }}
              >
                <FaEllipsisVertical />
              </Button>
            </Dropdown>
          </div>
        );
      },
    },
  ];

  function handleGetGroupSessions() {
    const dataSend = {
      group_id: group_id,
    };
    axios
      .post(
        BASE_URL + "/admin/sessions/select_session.php",
        JSON.stringify(dataSend)
      )
      .then((res) => {
        console.log(res);
        if (res?.data?.status == "success") {
          setGroupSessions(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    handleGetGroupSessions();
  }, []);

  function handleDeleteSession(session_id) {
    const dataSend = {
      session_id: session_id,
    };
    axios
      .post(
        BASE_URL + "/admin/sessions/delete_session.php",
        JSON.stringify(dataSend)
      )
      .then((res) => {
        console.log(res);
        if (res?.data?.status == "success") {
          toast.success(res.data.message);
          setDeleteSessionModal(false);
          handleGetGroupSessions();
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((e) => console.log(e));
  }

  function handelConfirmAbsence() {
    const dataSend = {
      session_id: ConfirmAbsenceModal?.session_id,
      admin_id: AdminData[0].admin_id,
    };
    axios
      .post(
        BASE_URL + "/admin/sessions/session_absence_status.php",
        JSON.stringify(dataSend)
      )
      .then((res) => {
        console.log(res);
        if (res?.data?.status == "success") {
          toast.success(res.data.message);
          setConfirmAbsenceModal(null);
          handleGetGroupSessions();
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((e) => console.log(e));
  }

  function handleAddSession() {
    const dataSend = {
      group_id: group_id,
      session_name: NewSessionData.session_name,
      session_link: NewSessionData.session_link,
      end_date: NewSessionData.end_date,
    };

    console.log(dataSend);

    axios
      .post(
        BASE_URL + "/admin/sessions/add_session.php",
        JSON.stringify(dataSend)
      )
      .then((res) => {
        console.log(res);
        if (res?.data?.status == "success") {
          toast.success(res?.data?.message);
          setAddSessionModal(false);
          handleGetGroupSessions();
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
  }

  function handleEditSession() {
    const dataSend = {
      session_id: RowData.session_id,
      session_name: RowData.session_name,
      session_link: RowData.session_link,
      end_date: RowData.end_date,
    };

    console.log(dataSend);

    axios
      .post(
        BASE_URL + "/admin/sessions/edit_session.php",
        JSON.stringify(dataSend)
      )
      .then((res) => {
        console.log(res);
        if (res?.data?.status == "success") {
          toast.success(res?.data?.message);
          setEditSessionModal(false);
          handleGetGroupSessions();
        } else {
          toast.error(res?.data?.message);
        }
      })
      .finally(() => {
        setRowData(null);
      })
      .catch((e) => console.log(e));
  }

  return (
    <>
      <Breadcrumbs parent="Groups" title="Sessions List" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>List Sessions</h5>
                <Button
                  color="primary btn-pill"
                  style={{ margin: "10px 0" }}
                  onClick={() => setAddSessionModal(true)}
                >
                  Add Session
                </Button>
              </div>
              <div className="card-body">
                <Table
                  scroll={{
                    x: "max-content",
                  }}
                  columns={columns}
                  dataSource={GroupSessions}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= Delete Modal ======================= */}

      <Modal
        title="Delete Session"
        open={DeleteSessionModal}
        footer={
          <>
            <Button
              style={{ margin: "0px 10px " }}
              onClick={() =>
                handleDeleteSession(DeleteSessionModal?.session_id)
              }
            >
              Delete
            </Button>
            <Button onClick={() => setDeleteSessionModal(false)}>Cancel</Button>
          </>
        }
        onCancel={() => setDeleteSessionModal(false)}
      >
        <h3>Are you sure that you want to delete this session</h3>
      </Modal>

      {/* ================= Confirm absence Modal ======================= */}

      <Modal
        title="Confirm absence"
        open={ConfirmAbsenceModal}
        footer={
          <>
            <Button
              style={{ margin: "0px 10px " }}
              onClick={() => handelConfirmAbsence()}
            >
              sure
            </Button>
            <Button onClick={() => setConfirmAbsenceModal(null)}>Cancel</Button>
          </>
        }
        onCancel={() => setConfirmAbsenceModal(null)}
      >
        <h3>Are you sure that you had taken all the session absence?!</h3>
      </Modal>

      {/* =================== Add Session Modal ========================== */}

      <Modal
        title="Add Session"
        open={AddSessionModal}
        footer={
          <>
            <Button
              style={{ margin: "0px 10px " }}
              onClick={() => handleAddSession()}
            >
              Add
            </Button>
            <Button onClick={() => setAddSessionModal(false)}>Cancel</Button>
          </>
        }
        onCancel={() => setAddSessionModal(false)}
      >
        <>
          <div className="form_field">
            <label className="form_label">session name</label>
            <input
              type="text"
              className="form_input"
              onChange={(e) => {
                setNewSessionData({
                  ...NewSessionData,
                  session_name: e.target.value,
                });
              }}
            />
          </div>
          <div className="form_field">
            <label className="form_label">session link</label>
            <input
              type="text"
              className="form_input"
              onChange={(e) => {
                setNewSessionData({
                  ...NewSessionData,
                  session_link: e.target.value,
                });
              }}
            />
          </div>

          <div className="form_field">
            <label className="form_label">end date</label>
            <input
              type="date"
              className="form_input"
              onChange={(e) => {
                setNewSessionData({
                  ...NewSessionData,
                  end_date: e.target.value,
                });
              }}
            />
          </div>
        </>
      </Modal>

      {/* =================== Edit Modal ======================================= */}
      <Modal
        title="Edit Session"
        open={EditSessionModal}
        footer={
          <>
            <Button
              style={{ margin: "0px 10px " }}
              onClick={() => handleEditSession()}
            >
              Edit
            </Button>
            <Button
              onClick={() => {
                setEditSessionModal(false);
                setRowData(null); // Clear `RowData` when closing the modal
              }}
            >
              Cancel
            </Button>
          </>
        }
        onCancel={() => {
          setEditSessionModal(false);
          setRowData(null); // Clear `RowData` when closing the modal
        }}
      >
        <>
          <div className="form_field">
            <label className="form_label">Session Name</label>
            <input
              type="text"
              className="form_input"
              value={RowData?.session_name || ""} // Use `value` instead of `defaultValue`
              onChange={(e) => {
                setRowData({
                  ...RowData,
                  session_name: e.target.value,
                });
              }}
            />
          </div>
          <div className="form_field">
            <label className="form_label">Session Link</label>
            <input
              type="text"
              className="form_input"
              value={RowData?.session_link || ""} // Use `value` instead of `defaultValue`
              onChange={(e) => {
                setRowData({
                  ...RowData,
                  session_link: e.target.value,
                });
              }}
            />
          </div>

          <div className="form_field">
            <label className="form_label">End Date</label>
            <input
              type="date"
              className="form_input"
              value={RowData?.end_date || ""} // Use `value` instead of `defaultValue`
              onChange={(e) => {
                setRowData({
                  ...RowData,
                  end_date: e.target.value,
                });
              }}
            />
          </div>
        </>
      </Modal>
    </>
  );
};

export default GroupSessions;
