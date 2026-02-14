import { Table, Button, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../../component/common/breadcrumb/breadcrumb";
import { BASE_URL } from "../../../Api/baseUrl";
import axios from "axios";
import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
import { FaFileExcel } from "react-icons/fa6";
import { toast } from "react-toastify";
import ExcelJS from "exceljs";

const Absence = () => {
  const [Absence, setAbsence] = useState([]);
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [showBranchModal, setShowBranchModal] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [exportingTable, setExportingTable] = useState(false);

  const AdminData = JSON.parse(localStorage.getItem("AdminData"))?.[0];

  function handleGetAbsence() {
    axios
      .get(BASE_URL + "/admin/groups/select_group_absence.php")
      .then((res) => {
        if (res?.data?.status == "success") {
          setAbsence(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
  }

  // Get all branches for super admin
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

  // Get absence by branch
  function handleGetAbsenceByBranch(branchId) {
    const data_send = {
      branch_id: branchId,
    };

    axios
      .post(BASE_URL + "/admin/absence/select_absent_by_branch.php", data_send)
      .then((res) => {
        if (res?.data?.status == "success") {
          if (res?.data?.message.length === 0) {
            toast.error("There is no absence today");
            setExporting(false);
            return;
          }
          // Export to Excel
          exportToExcel(res?.data?.message);
        } else {
          toast.error("There is no absence today");
        }
      })
      .catch((e) => {
        console.log(e);
        toast.error("Error fetching absence data");
      })
      .finally(() => {
        setShowBranchModal(false);
        setSelectedBranch(null);
      });
  }

  // Export Absence Report to Excel
  const exportToExcel = async (data) => {
    try {
      setExporting(true);

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Absence Report");

      worksheet.columns = [
        { header: "Branch Name", key: "branch_name", width: 20 },
        { header: "Round Name", key: "round_name", width: 20 },
        { header: "Group Name", key: "group_name", width: 25 },
        { header: "Session Name", key: "session_name", width: 15 },
        { header: "Date", key: "end_date", width: 15 },
        { header: "Student Name", key: "name", width: 25 },
        { header: "Phone", key: "phone", width: 15 },
        { header: "Email", key: "email", width: 30 },
        { header: "Total Absence", key: "total_absence_count", width: 15 },
      ];

      worksheet.getRow(1).font = { bold: true, color: { argb: "FFFFFFFF" } };
      worksheet.getRow(1).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF295557" },
      };
      worksheet.getRow(1).alignment = {
        vertical: "middle",
        horizontal: "center",
      };

      data.forEach((item) => {
        worksheet.addRow({
          branch_name: item.branch_name,
          round_name: item.round_name,
          group_name: item.group_name,
          session_name: item.session_name,
          end_date: item.end_date,
          name: item.name,
          phone: item.phone,
          email: item.email,
          total_absence_count: item.total_absence_count,
        });
      });

      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber > 1) {
          row.alignment = { vertical: "middle", wrapText: true };
          row.eachCell((cell) => {
            cell.border = {
              top: { style: "thin" },
              left: { style: "thin" },
              bottom: { style: "thin" },
              right: { style: "thin" },
            };
          });
        }
      });

      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Absence_Report_${
        new Date().toISOString().split("T")[0]
      }.xlsx`;
      link.click();
      window.URL.revokeObjectURL(url);

      toast.success("Excel file exported successfully!");
    } catch (error) {
      console.error("Error exporting to Excel:", error);
      toast.error("Failed to export Excel file");
    } finally {
      setExporting(false);
    }
  };

  // Export Table Data to Excel (with sessions)
  const exportTableToExcel = async () => {
    try {
      if (Absence.length === 0) {
        toast.error("No data to export");
        return;
      }

      setExportingTable(true);

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Absence Table");

      // Calculate max sessions
      const maxSessions = Math.max(
        ...Absence.map((group) => group.group_sessions?.length || 0)
      );

      // Build columns dynamically
      const columns = [
        { header: "#", key: "id", width: 10 },
        { header: "Group Name", key: "group_name", width: 40 },
        { header: "Round Name", key: "round_name", width: 20 },
        { header: "Admin Name", key: "admin_name", width: 20 },
        { header: "Branch Name", key: "branch_name", width: 20 },
      ];

      // Add session columns
      for (let i = 1; i <= maxSessions; i++) {
        columns.push({
          header: `Session ${i}`,
          key: `session_${i}`,
          width: 12,
        });
      }

      worksheet.columns = columns;

      // Style header
      worksheet.getRow(1).font = { bold: true, color: { argb: "FFFFFFFF" } };
      worksheet.getRow(1).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF295557" },
      };
      worksheet.getRow(1).alignment = {
        vertical: "middle",
        horizontal: "center",
      };

      // Add data rows
      Absence.forEach((item) => {
        const rowData = {
          id: item.id,
          group_name: item.group_name,
          round_name: item.round_name,
          admin_name: item.admin_name,
          branch_name: item.branch_name,
        };

        // Add session data
        for (let i = 0; i < maxSessions; i++) {
          const session = item.group_sessions?.[i];
          rowData[`session_${i + 1}`] = session
            ? session.take_absence == 1
              ? "✓"
              : "✗"
            : "-";
        }

        worksheet.addRow(rowData);
      });

      // Style data rows
      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber > 1) {
          row.alignment = { vertical: "middle", horizontal: "center" };
          row.eachCell((cell) => {
            cell.border = {
              top: { style: "thin" },
              left: { style: "thin" },
              bottom: { style: "thin" },
              right: { style: "thin" },
            };

            // Color code session cells
            if (cell.value === "✓") {
              cell.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "FF52C41A" },
              };
              cell.font = { color: { argb: "FFFFFFFF" }, bold: true };
            } else if (cell.value === "✗") {
              cell.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "FFFF4D4F" },
              };
              cell.font = { color: { argb: "FFFFFFFF" }, bold: true };
            }
          });
        }
      });

      // Generate and download
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Absence_Table_${
        new Date().toISOString().split("T")[0]
      }.xlsx`;
      link.click();
      window.URL.revokeObjectURL(url);

      toast.success("Table exported successfully!");
    } catch (error) {
      console.error("Error exporting table:", error);
      toast.error("Failed to export table");
    } finally {
      setExportingTable(false);
    }
  };

  // Handle export button click
  const handleExportClick = () => {
    if (AdminData?.type === "super_admin") {
      setShowBranchModal(true);
    } else {
      const branchId = AdminData?.branch_id;
      if (branchId) {
        handleGetAbsenceByBranch(branchId);
      } else {
        toast.error("Branch ID not found");
      }
    }
  };

  // Handle branch selection and export
  const handleBranchExport = () => {
    if (!selectedBranch) {
      toast.error("Please select a branch");
      return;
    }
    setExporting(true);
    handleGetAbsenceByBranch(selectedBranch);
  };

  useEffect(() => {
    handleGetAbsence();
    if (AdminData?.type === "super_admin") {
      handleGetBranches();
    }
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
    ...Absence.map((group) => group.group_sessions?.length || 0)
  );

  const sessionColumns = Array.from({ length: maxSessions }, (_, i) => ({
    title: `Session ${i + 1}`,
    key: `session_${i + 1}`,
    render: (_, record) => {
      const session = record.group_sessions?.[i];
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
              <div className="card-header d-flex justify-content-between ">
                <h5>List Absence</h5>
                <div className="d-flex gap-2">
                  {/* Export Table Button */}
                  <Button
                    type="default"
                    icon={<FaFileExcel />}
                    onClick={exportTableToExcel}
                    loading={exportingTable}
                    style={{
                      borderColor: "#217346",
                      color: "#217346",
                    }}
                  >
                    Export Table
                  </Button>
                  {/* Export Report Button */}
                  <Button
                    type="primary"
                    icon={<FaFileExcel />}
                    onClick={handleExportClick}
                    loading={exporting}
                    style={{ backgroundColor: "#217346" }}
                  >
                    Export Absence Report Today
                  </Button>
                </div>
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

      {/* Branch Selection Modal for Super Admin */}
      <Modal
        title="Select Branch for Export"
        open={showBranchModal}
        onOk={handleBranchExport}
        onCancel={() => {
          setShowBranchModal(false);
          setSelectedBranch(null);
        }}
        okText="Export"
        cancelText="Cancel"
        confirmLoading={exporting}
      >
        <div className="mb-3">
          <label className="form-label">Select Branch:</label>
          <Select
            style={{ width: "100%" }}
            placeholder="Choose a branch"
            value={selectedBranch}
            onChange={setSelectedBranch}
            options={branches.map((branch) => ({
              value: branch.branch_id,
              label: branch.branch_name,
            }))}
          />
        </div>
      </Modal>
    </>
  );
};

export default Absence;
