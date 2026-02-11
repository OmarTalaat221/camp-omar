import { Button, Modal, Table } from "antd";
import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../../component/common/breadcrumb/breadcrumb";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../../Api/baseUrl";
import axios from "axios";
import { toast } from "react-toastify";
import "./style.css";
import { AdminData } from "../../../routes/layouts-routes";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

const GroupSessionStudents = () => {
  const { group_id, session_id, round_id, branch_id } = useParams();
  console.log(group_id, session_id);
  const navigate = useNavigate();

  const [SessionStudents, setSessionStudents] = useState([]);
  const [ConfirmAbsenceModal, setConfirmAbsenceModal] = useState(false);
  const [SessionData, setSessionData] = useState(null);
  const [IsConfirmed, setIsConfirmed] = useState(false);

  const columns = [
    {
      id: "student_id",
      dataIndex: "student_id",
      title: "Student ID",
    },
    {
      id: "name",
      dataIndex: "name",
      title: "Name",
    },
    {
      id: "email",
      dataIndex: "email",
      title: "Email",
      render: (text, row) => (
        <a href={`mailto:${row?.email}`} target="_blank" rel="noreferrer">
          {row?.email}
        </a>
      ),
    },

    // {
    //   id: "Action",
    //   dataIndex: "x",
    //   title: "Action",
    //   render: (text, row) => (
    //     <>
    //       <Button
    //         onClick={() => handleTakeStudentAbsence(row?.student_id)}
    //         disabled={IsConfirmed}
    //         type={row.taken_before ? "default" : "primary"}
    //         color="primary btn-pill"
    //       >
    //         {row.taken_before ? "Remove Absence" : "Take Absence"}
    //       </Button>

    //       <Button
    //         style={{ margin: "0px 10px" }}
    //         onClick={() =>
    //           navigate(
    //             `${process.env.PUBLIC_URL}/groups/${row?.group_id}/students/${row?.student_id}/chat`,
    //             {
    //               state: { additionalData: row },
    //             }
    //           )
    //         }
    //       >
    //         Chat with student
    //       </Button>
    //     </>
    //   ),
    // },
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

          if (res?.data?.session_data) {
            setSessionData(res?.data?.session_data);
            setIsConfirmed(res?.data?.session_data?.confirmed || false);
          }
        }
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    handleGetGroupSessionsStudents();
  }, []);

  function handleTakeStudentAbsence(student_id) {
    if (IsConfirmed) {
      toast.warning(
        "Cannot take/remove absence. Session is already confirmed."
      );
      return;
    }

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

  function handelConfirmAbsence() {
    const dataSend = {
      session_id: session_id,
      admin_id: AdminData[0]?.admin_id,
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
          setConfirmAbsenceModal(false);
          setIsConfirmed(true);
          setSessionData({ ...SessionData, take_absence: 1, confirmed: true });
          handleGetGroupSessionsStudents();
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((e) => console.log(e));
  }

  const exportToExcel = async () => {
    if (SessionStudents.length === 0) {
      toast.warning("No students found to export!");
      return;
    }

    try {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Session Attendance");

      // Define columns
      worksheet.columns = [
        { header: "Student ID", key: "student_id", width: 15 },
        { header: "Student Name", key: "student_name", width: 30 },
        { header: "Session Name", key: "session_name", width: 35 },
        { header: "Attendance Status", key: "attendance_status", width: 20 },
        { header: "Email", key: "email", width: 35 },
        { header: "Phone", key: "phone", width: 15 },
      ];

      // Style header row
      worksheet.getRow(1).font = { bold: true, color: { argb: "FFFFFFFF" } };
      worksheet.getRow(1).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF4472C4" },
      };
      worksheet.getRow(1).alignment = {
        vertical: "middle",
        horizontal: "center",
      };

      // Add data rows
      SessionStudents.forEach((student) => {
        const row = worksheet.addRow({
          student_id: student.student_id,
          student_name: student.name,
          session_name: SessionData?.session_name || "N/A",
          attendance_status: student.taken_before ? "Absent" : "Attend",
          email: student.email,
          phone: student.phone || "N/A",
        });

        if (student.taken_before) {
          row.getCell(4).fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FFFFFF00" },
          };
          row.getCell(4).font = {
            color: { argb: "FF000000" },
          };
        }

        row.alignment = { vertical: "middle", horizontal: "center" };
      });

      // Generate file
      const buffer = await workbook.xlsx.writeBuffer();
      const currentDate = new Date().toISOString().split("T")[0];
      const sessionName =
        SessionData?.session_name?.replace(/[^a-zA-Z0-9]/g, "_") || "Session";
      const filename = `Session_Attendance_${sessionName}_${currentDate}.xlsx`;

      // Save file
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, filename);

      toast.success(
        `Excel file downloaded with ${SessionStudents.length} students!`
      );
    } catch (error) {
      console.error("Error exporting to Excel:", error);
      toast.error("Failed to export to Excel!");
    }
  };

  return (
    <>
      <Breadcrumbs parent="Groups" title="Group student List" />
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
                  }}
                >
                  <div>
                    <h5>List students</h5>
                    {IsConfirmed && (
                      <span style={{ color: "#52c41a", fontSize: "12px" }}>
                        ✓ Session absence confirmed
                      </span>
                    )}
                  </div>

                  <div style={{ display: "flex", gap: "10px" }}>
                    {/* Export to Excel Button */}
                    {IsConfirmed && (
                      <Button
                        color="success"
                        onClick={exportToExcel}
                        disabled={SessionStudents.length === 0}
                        style={{
                          backgroundColor: "#28a745",
                          borderColor: "#28a745",
                          color: "white",
                        }}
                      >
                        Export to Excel
                      </Button>
                    )}

                    {/* Confirm Absence Button */}

                    <Button
                      color="primary btn-pill"
                      onClick={() => setConfirmAbsenceModal(true)}
                      disabled={IsConfirmed}
                      style={{
                        backgroundColor: IsConfirmed ? "#52c41a" : "#1890ff",
                        borderColor: IsConfirmed ? "#52c41a" : "#1890ff",
                        color: "white",
                      }}
                    >
                      {IsConfirmed ? "✓ Absence Confirmed" : "Confirm Absence"}
                    </Button>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div
                  style={{
                    marginBottom: "16px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <span style={{ fontWeight: "bold" }}>
                      Session: {SessionData?.session_name || "N/A"}
                    </span>
                    <span style={{ marginLeft: "20px" }}>
                      Total Students: {SessionStudents.length}
                    </span>
                    <span style={{ marginLeft: "20px", color: "#dc3545" }}>
                      Absent:{" "}
                      {
                        SessionStudents.filter((s) => s.taken_before === true)
                          .length
                      }
                    </span>
                    <span style={{ marginLeft: "20px", color: "#28a745" }}>
                      Present:{" "}
                      {
                        SessionStudents.filter((s) => s.taken_before === false)
                          .length
                      }
                    </span>
                  </div>
                </div>
                <Table
                  scroll={{
                    x: "max-content",
                  }}
                  columns={columns}
                  dataSource={SessionStudents}
                  rowClassName={(record) =>
                    record.taken_before ? "row_highlight" : ""
                  }
                  rowKey="student_id"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= Confirm Absence Modal ======================= */}
      <Modal
        title="Confirm Absence"
        open={ConfirmAbsenceModal}
        footer={
          <>
            <Button
              type="primary"
              style={{ margin: "0px 10px" }}
              onClick={() => handelConfirmAbsence()}
            >
              Sure
            </Button>
            <Button onClick={() => setConfirmAbsenceModal(false)}>
              Cancel
            </Button>
          </>
        }
        onCancel={() => setConfirmAbsenceModal(false)}
      >
        <h3>Are you sure that you had taken all the session absence?!</h3>
        <p style={{ color: "#ff4d4f", marginTop: "10px" }}>
          ⚠️ After confirmation, you won't be able to take or remove absence for
          this session.
        </p>
      </Modal>
    </>
  );
};

export default GroupSessionStudents;
