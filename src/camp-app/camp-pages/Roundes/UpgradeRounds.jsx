import React, { useEffect, useState, useCallback } from "react";
import {
  Button,
  Select,
  Card,
  Modal,
  Badge,
  Table,
  Popconfirm,
  Checkbox,
  Tabs,
  Tag,
  Tooltip,
  Empty,
} from "antd";
import Breadcrumbs from "../../../component/common/breadcrumb/breadcrumb";
import { BASE_URL } from "../../../Api/baseUrl";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FiUsers,
  FiClock,
  FiCalendar,
  FiArrowRight,
  FiCheckCircle,
  FiAlertCircle,
  FiTrash2,
  FiSend,
  FiCheck,
  FiX,
  FiLock,
  FiUnlock,
} from "react-icons/fi";
import { BiArrowBack } from "react-icons/bi";
import { MdAutorenew } from "react-icons/md";
import "./style.css";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

const { TabPane } = Tabs;

const UpgradeRounds = () => {
  const { round_id } = useParams();
  const navigate = useNavigate();

  const adminData = JSON.parse(localStorage.getItem("AdminData"));

  // Data State
  const [autoGroupsData, setAutoGroupsData] = useState([]);
  const [assignedGroups, setAssignedGroups] = useState([]);
  const [unassignedGroups, setUnassignedGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Selection State
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  // Search State
  const [searchAssigned, setSearchAssigned] = useState("");
  const [searchUnassigned, setSearchUnassigned] = useState("");

  // Modal State
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Round Info
  const [roundInfo, setRoundInfo] = useState(null);

  // Helper function to extract new group ID from string like "موجود مسبقًا (ID: 512)"
  const extractNewGroupId = (newGroupIdStr) => {
    if (!newGroupIdStr) return null;
    const match = newGroupIdStr.match(/ID:\s*(\d+)/);
    return match ? match[1] : null;
  };

  // Fetch auto groups data
  const fetchAutoGroups = useCallback(async () => {
    try {
      setLoading(true);

      const dataSend = {
        round_id: round_id,
      };

      const response = await axios.post(
        BASE_URL + "/admin/subscription/create_auto_groups.php",
        JSON.stringify(dataSend)
      );

      console.log("Auto Groups Response:", response.data);

      if (response?.data?.data) {
        const allData = response.data.data;
        setAutoGroupsData(allData);

        const assigned = allData.filter((group) => {
          const hasAssignId =
            group.assign_id !== null && group.assign_id !== "";
          const hasValidNewGroupId =
            extractNewGroupId(group.new_group_id) !== null;
          return hasAssignId && hasValidNewGroupId;
        });

        const unassigned = allData.filter((group) => {
          const hasAssignId =
            group.assign_id !== null && group.assign_id !== "";
          const hasValidNewGroupId =
            extractNewGroupId(group.new_group_id) !== null;
          return !hasAssignId || !hasValidNewGroupId;
        });

        setAssignedGroups(assigned);
        setUnassignedGroups(unassigned);

        if (allData.length > 0) {
          setRoundInfo({
            round_id: allData[0].round_id,
            branch_id: allData[0].branch_id,
            track_id: allData[0].track_id,
          });
        }
      }
    } catch (error) {
      console.error("Error fetching auto groups:", error);
      toast.error("Failed to fetch auto upgrade data");
    } finally {
      setLoading(false);
    }
  }, [round_id]);

  useEffect(() => {
    if (round_id) {
      fetchAutoGroups();
    }
  }, [round_id, fetchAutoGroups]);

  // Handle group selection
  const handleGroupSelect = (group) => {
    const isSelected = selectedGroups.some(
      (g) => g.old_group_id === group.old_group_id
    );

    if (isSelected) {
      setSelectedGroups(
        selectedGroups.filter((g) => g.old_group_id !== group.old_group_id)
      );
    } else {
      setSelectedGroups([...selectedGroups, group]);
    }
  };

  // Handle select all assigned groups
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedGroups([]);
    } else {
      setSelectedGroups([...assignedGroups]);
    }
    setSelectAll(!selectAll);
  };

  // Check if group is selected
  const isGroupSelected = (groupId) => {
    return selectedGroups.some((g) => g.old_group_id === groupId);
  };

  // Remove from selection
  const handleRemoveFromSelection = (groupId) => {
    setSelectedGroups(selectedGroups.filter((g) => g.old_group_id !== groupId));
    toast.info("Removed from selection");
  };

  // ==================== EXPORT WITH EXCELJS ====================
  const exportUpgradeResults = async (responseData, selectedGroups) => {
    const workbook = new ExcelJS.Workbook();
    workbook.creator = "Admin System";
    workbook.created = new Date();

    // ==================== SHEET 1: Upgrade Results ====================
    const resultsSheet = workbook.addWorksheet("Upgrade Results", {
      properties: { tabColor: { argb: "FF00FF00" } },
    });

    // Define columns
    resultsSheet.columns = [
      { header: "Status", key: "status", width: 15 },
      { header: "Student ID", key: "student_id", width: 15 },
      { header: "Student Name", key: "student_name", width: 30 },
      { header: "Old Group", key: "old_group", width: 35 },
      { header: "Old Level", key: "old_level", width: 15 },
      { header: "New Group", key: "new_group", width: 35 },
      { header: "New Level", key: "new_level", width: 15 },
      { header: "Reason", key: "reason", width: 30 },
      { header: "Date", key: "date", width: 15 },
      { header: "Time", key: "time", width: 12 },
    ];

    // Style header row
    resultsSheet.getRow(1).font = { bold: true, color: { argb: "FFFFFFFF" } };
    resultsSheet.getRow(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFEB5D22" },
    };
    resultsSheet.getRow(1).alignment = {
      horizontal: "center",
      vertical: "middle",
    };
    resultsSheet.getRow(1).height = 25;

    // Prepare data
    const exportData = [];

    // Process the details from response if available
    if (responseData.details && Array.isArray(responseData.details)) {
      responseData.details.forEach((detail) => {
        const queueItem = selectedGroups.find(
          (item) =>
            item.old_group_id == detail.old_group &&
            extractNewGroupId(item.new_group_id) == detail.new_group
        );

        // Add successful students
        if (
          detail.successful_students &&
          Array.isArray(detail.successful_students)
        ) {
          detail.successful_students.forEach((student) => {
            exportData.push({
              status: "✓ Success",
              student_id: student.student_id,
              student_name: student.student_name,
              old_group: queueItem?.old_name || "N/A",
              old_level:
                queueItem?.old_level_name || student.old_level || "N/A",
              new_group: queueItem?.new_name || "N/A",
              new_level:
                queueItem?.next_level_name || student.new_level || "N/A",
              reason: "Successfully upgraded",
              date: new Date().toLocaleDateString(),
              time: new Date().toLocaleTimeString(),
              isSuccess: true,
            });
          });
        }

        // Add failed students
        if (detail.failed_students && Array.isArray(detail.failed_students)) {
          detail.failed_students.forEach((student) => {
            exportData.push({
              status: "✗ Failed",
              student_id: student.student_id,
              student_name: student.student_name,
              old_group: queueItem?.old_name || "N/A",
              old_level:
                queueItem?.old_level_name || student.old_level || "N/A",
              new_group: queueItem?.new_name || "N/A",
              new_level: queueItem?.next_level_name || "N/A",
              reason: student.reason || "Unknown error",
              date: new Date().toLocaleDateString(),
              time: new Date().toLocaleTimeString(),
              isSuccess: false,
            });
          });
        }
      });
    }

    // If no data in details, create summary for simple success response
    if (exportData.length === 0 && responseData.status === "success") {
      selectedGroups.forEach((group) => {
        exportData.push({
          status: "✓ Upgraded",
          student_id: "All",
          student_name: "All students in group",
          old_group: group.old_name || "N/A",
          old_level: group.old_level_name || "N/A",
          new_group: group.new_name || "N/A",
          new_level: group.next_level_name || "N/A",
          reason: "Successfully upgraded",
          date: new Date().toLocaleDateString(),
          time: new Date().toLocaleTimeString(),
          isSuccess: true,
        });
      });
    }

    // Add data rows with styling
    exportData.forEach((data, index) => {
      const row = resultsSheet.addRow({
        status: data.status,
        student_id: data.student_id,
        student_name: data.student_name,
        old_group: data.old_group,
        old_level: data.old_level,
        new_group: data.new_group,
        new_level: data.new_level,
        reason: data.reason,
        date: data.date,
        time: data.time,
      });

      // Alternate row colors
      if (index % 2 === 0) {
        row.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFF5F5F5" },
        };
      }

      // Color status cell based on success/failure
      const statusCell = row.getCell(1);
      if (data.isSuccess) {
        statusCell.font = { bold: true, color: { argb: "FF28A745" } };
        statusCell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFD4EDDA" },
        };
      } else {
        statusCell.font = { bold: true, color: { argb: "FFDC3545" } };
        statusCell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFF8D7DA" },
        };
      }

      // Style level cells with colors
      const oldLevelCell = row.getCell(5);
      oldLevelCell.font = { bold: true, color: { argb: "FF1890FF" } };
      oldLevelCell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFE6F7FF" },
      };

      const newLevelCell = row.getCell(7);
      newLevelCell.font = { bold: true, color: { argb: "FF52C41A" } };
      newLevelCell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFF6FFED" },
      };

      row.alignment = { vertical: "middle" };
    });

    // Add borders to all cells
    resultsSheet.eachRow((row, rowNumber) => {
      row.eachCell((cell) => {
        cell.border = {
          top: { style: "thin", color: { argb: "FFD9D9D9" } },
          left: { style: "thin", color: { argb: "FFD9D9D9" } },
          bottom: { style: "thin", color: { argb: "FFD9D9D9" } },
          right: { style: "thin", color: { argb: "FFD9D9D9" } },
        };
      });
    });

    // ==================== SHEET 2: Groups Summary ====================
    const groupsSheet = workbook.addWorksheet("Groups Summary", {
      properties: { tabColor: { argb: "FF1890FF" } },
    });

    groupsSheet.columns = [
      { header: "#", key: "index", width: 8 },
      { header: "Old Group ID", key: "old_group_id", width: 15 },
      { header: "Old Group Name", key: "old_group_name", width: 40 },
      { header: "Old Level", key: "old_level", width: 15 },
      { header: "", key: "arrow", width: 5 },
      { header: "New Group ID", key: "new_group_id", width: 15 },
      { header: "New Group Name", key: "new_group_name", width: 40 },
      { header: "New Level", key: "new_level", width: 15 },
      { header: "Start Date", key: "start_date", width: 15 },
      { header: "End Date", key: "end_date", width: 15 },
    ];

    // Style header
    groupsSheet.getRow(1).font = { bold: true, color: { argb: "FFFFFFFF" } };
    groupsSheet.getRow(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF1890FF" },
    };
    groupsSheet.getRow(1).alignment = {
      horizontal: "center",
      vertical: "middle",
    };
    groupsSheet.getRow(1).height = 25;

    // Add groups data
    selectedGroups.forEach((group, index) => {
      const row = groupsSheet.addRow({
        index: index + 1,
        old_group_id: group.old_group_id,
        old_group_name: group.old_name,
        old_level: group.old_level_name || "N/A",
        arrow: "→",
        new_group_id: extractNewGroupId(group.new_group_id) || "N/A",
        new_group_name: group.new_name,
        new_level: group.next_level_name || "N/A",
        start_date: group.new_start_date || group.start_time,
        end_date: group.new_end_date || group.end_time,
      });

      if (index % 2 === 0) {
        row.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFF5F5F5" },
        };
      }

      // Style arrow cell
      const arrowCell = row.getCell(5);
      arrowCell.font = { bold: true, size: 14, color: { argb: "FFEB5D22" } };
      arrowCell.alignment = { horizontal: "center" };

      // Style old level
      const oldLevelCell = row.getCell(4);
      oldLevelCell.font = { bold: true, color: { argb: "FF1890FF" } };
      oldLevelCell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFE6F7FF" },
      };

      // Style new level
      const newLevelCell = row.getCell(8);
      newLevelCell.font = { bold: true, color: { argb: "FF52C41A" } };
      newLevelCell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFF6FFED" },
      };

      row.alignment = { vertical: "middle" };
    });

    // Add borders
    groupsSheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.border = {
          top: { style: "thin", color: { argb: "FFD9D9D9" } },
          left: { style: "thin", color: { argb: "FFD9D9D9" } },
          bottom: { style: "thin", color: { argb: "FFD9D9D9" } },
          right: { style: "thin", color: { argb: "FFD9D9D9" } },
        };
      });
    });

    // ==================== SHEET 3: Summary ====================
    const summarySheet = workbook.addWorksheet("Summary", {
      properties: { tabColor: { argb: "FF52C41A" } },
    });

    summarySheet.columns = [
      { header: "Metric", key: "metric", width: 30 },
      { header: "Value", key: "value", width: 40 },
    ];

    // Style header
    summarySheet.getRow(1).font = { bold: true, color: { argb: "FFFFFFFF" } };
    summarySheet.getRow(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF52C41A" },
    };
    summarySheet.getRow(1).height = 25;

    const successCount = exportData.filter((d) => d.isSuccess).length;
    const failCount = exportData.filter((d) => !d.isSuccess).length;

    // Get unique levels
    const oldLevels = [
      ...new Set(selectedGroups.map((g) => g.old_level_name).filter(Boolean)),
    ];
    const newLevels = [
      ...new Set(selectedGroups.map((g) => g.next_level_name).filter(Boolean)),
    ];

    const summaryData = [
      { metric: "Total Groups Upgraded", value: selectedGroups.length },
      {
        metric: "Total Students Processed",
        value: responseData.summary?.total_upgraded || exportData.length,
      },
      { metric: "Successful Upgrades", value: successCount },
      { metric: "Failed Upgrades", value: failCount },
      { metric: "Round ID", value: round_id },
      { metric: "Old Levels", value: oldLevels.join(", ") || "N/A" },
      { metric: "New Levels", value: newLevels.join(", ") || "N/A" },
      { metric: "Upgrade Date", value: new Date().toLocaleDateString() },
      { metric: "Upgrade Time", value: new Date().toLocaleTimeString() },
      { metric: "Admin ID", value: adminData?.[0]?.admin_id || "N/A" },
    ];

    summaryData.forEach((item, index) => {
      const row = summarySheet.addRow(item);

      if (index % 2 === 0) {
        row.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFF5F5F5" },
        };
      }

      row.getCell(1).font = { bold: true };

      // Highlight success/fail counts
      if (item.metric === "Successful Upgrades") {
        row.getCell(2).font = { bold: true, color: { argb: "FF28A745" } };
      }
      if (item.metric === "Failed Upgrades" && failCount > 0) {
        row.getCell(2).font = { bold: true, color: { argb: "FFDC3545" } };
      }

      // Style levels
      if (item.metric === "Old Levels") {
        row.getCell(2).font = { bold: true, color: { argb: "FF1890FF" } };
      }
      if (item.metric === "New Levels") {
        row.getCell(2).font = { bold: true, color: { argb: "FF52C41A" } };
      }
    });

    // Add borders
    summarySheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.border = {
          top: { style: "thin", color: { argb: "FFD9D9D9" } },
          left: { style: "thin", color: { argb: "FFD9D9D9" } },
          bottom: { style: "thin", color: { argb: "FFD9D9D9" } },
          right: { style: "thin", color: { argb: "FFD9D9D9" } },
        };
      });
    });

    // ==================== SHEET 4: Levels Mapping ====================
    const levelsSheet = workbook.addWorksheet("Levels Mapping", {
      properties: { tabColor: { argb: "FFFA8C16" } },
    });

    levelsSheet.columns = [
      { header: "#", key: "index", width: 8 },
      { header: "Old Level Name", key: "old_level_name", width: 25 },
      { header: "", key: "arrow", width: 5 },
      { header: "New Level Name", key: "new_level_name", width: 25 },
      { header: "New Level ID", key: "new_level_id", width: 15 },
      { header: "Groups Count", key: "groups_count", width: 15 },
    ];

    // Style header
    levelsSheet.getRow(1).font = { bold: true, color: { argb: "FFFFFFFF" } };
    levelsSheet.getRow(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFA8C16" },
    };
    levelsSheet.getRow(1).height = 25;

    // Create levels mapping
    const levelsMap = {};
    selectedGroups.forEach((group) => {
      const key = `${group.old_level_name || "N/A"}_${
        group.next_level_name || "N/A"
      }`;
      if (!levelsMap[key]) {
        levelsMap[key] = {
          old_level_name: group.old_level_name || "N/A",
          new_level_name: group.next_level_name || "N/A",
          new_level_id: group.next_level_id || "N/A",
          count: 0,
        };
      }
      levelsMap[key].count++;
    });

    Object.values(levelsMap).forEach((item, index) => {
      const row = levelsSheet.addRow({
        index: index + 1,
        old_level_name: item.old_level_name,
        arrow: "→",
        new_level_name: item.new_level_name,
        new_level_id: item.new_level_id,
        groups_count: item.count,
      });

      if (index % 2 === 0) {
        row.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFF5F5F5" },
        };
      }

      // Style arrow
      row.getCell(3).font = {
        bold: true,
        size: 14,
        color: { argb: "FFEB5D22" },
      };
      row.getCell(3).alignment = { horizontal: "center" };

      // Style old level
      row.getCell(2).font = { bold: true, color: { argb: "FF1890FF" } };
      row.getCell(2).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFE6F7FF" },
      };

      // Style new level
      row.getCell(4).font = { bold: true, color: { argb: "FF52C41A" } };
      row.getCell(4).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFF6FFED" },
      };
    });

    // Add borders
    levelsSheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.border = {
          top: { style: "thin", color: { argb: "FFD9D9D9" } },
          left: { style: "thin", color: { argb: "FFD9D9D9" } },
          bottom: { style: "thin", color: { argb: "FFD9D9D9" } },
          right: { style: "thin", color: { argb: "FFD9D9D9" } },
        };
      });
    });

    // ==================== GENERATE FILE ====================
    const filename = `Auto_Upgrade_Report_Round_${round_id}_${
      new Date().toISOString().split("T")[0]
    }_${Date.now()}.xlsx`;

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, filename);

    return exportData.length;
  };

  // Submit all upgrades
  const handleSubmitUpgrades = async () => {
    if (selectedGroups.length === 0) {
      toast.warning("No groups selected for upgrade!");
      return;
    }

    const invalidGroups = selectedGroups.filter(
      (group) => !extractNewGroupId(group.new_group_id)
    );

    if (invalidGroups.length > 0) {
      toast.error(
        `${invalidGroups.length} group(s) don't have valid target group IDs.`
      );
      return;
    }

    setSubmitting(true);

    try {
      const dataString = selectedGroups
        .map((group) => {
          const newGroupId = extractNewGroupId(group.new_group_id);
          const levelId = group.next_level_id || "";
          return `${group.old_group_id}**${newGroupId}**${levelId}`;
        })
        .join("**camp**");

      const dataSend = {
        admin_id: adminData[0]?.admin_id,
        data: dataString,
      };

      console.log("Submitting upgrade data:", dataSend);

      const response = await axios.post(
        BASE_URL + "/admin/subscription/upgrade_all_rounds.php",
        JSON.stringify(dataSend)
      );

      console.log("Upgrade Response:", response);

      if (
        response?.data?.status === "success" ||
        response?.data?.status === "partial_success"
      ) {
        const exportedCount = await exportUpgradeResults(
          response?.data,
          selectedGroups
        );

        const message =
          response?.data?.status === "partial_success"
            ? `${response?.data?.message} Report exported with ${exportedCount} records.`
            : `All students upgraded successfully! Report exported with ${exportedCount} records.`;

        toast.success(message, { autoClose: 5000 });

        if (response?.data?.summary) {
          toast.info(
            `Total Upgraded: ${response?.data?.summary?.total_upgraded || 0}`,
            { autoClose: 3000 }
          );
        }

        setSelectedGroups([]);
        setSelectAll(false);
        setShowConfirmModal(false);
        fetchAutoGroups();
      } else {
        toast.error(response?.data?.message || "Error upgrading students");
      }
    } catch (error) {
      console.error("Upgrade error:", error);
      toast.error("Error upgrading students");
    } finally {
      setSubmitting(false);
    }
  };

  // Filter groups
  const filteredAssignedGroups = assignedGroups.filter(
    (group) =>
      group.old_name?.toLowerCase().includes(searchAssigned.toLowerCase()) ||
      group.new_name?.toLowerCase().includes(searchAssigned.toLowerCase()) ||
      group.old_level_name
        ?.toLowerCase()
        .includes(searchAssigned.toLowerCase()) ||
      group.next_level_name
        ?.toLowerCase()
        .includes(searchAssigned.toLowerCase())
  );

  const filteredUnassignedGroups = unassignedGroups.filter(
    (group) =>
      group.old_name?.toLowerCase().includes(searchUnassigned.toLowerCase()) ||
      group.new_name?.toLowerCase().includes(searchUnassigned.toLowerCase()) ||
      group.next_level_name
        ?.toLowerCase()
        .includes(searchUnassigned.toLowerCase())
  );

  // Table columns
  const selectedColumns = [
    {
      title: "#",
      key: "index",
      render: (text, record, index) => index + 1,
      width: 50,
    },
    {
      title: "Old Group",
      dataIndex: "old_name",
      key: "old_name",
      render: (text, record) => (
        <div>
          <strong>{text}</strong>
          {record.old_level_name && (
            <Tag color="blue" style={{ marginLeft: 8 }}>
              {record.old_level_name}
            </Tag>
          )}
        </div>
      ),
    },
    {
      title: "",
      key: "arrow",
      width: 50,
      render: () => <FiArrowRight style={{ color: "#eb5d22" }} />,
    },
    {
      title: "New Group",
      dataIndex: "new_name",
      key: "new_name",
      render: (text, record) => (
        <div>
          <strong>{text}</strong>
          {record.next_level_name && (
            <Tag color="green" style={{ marginLeft: 8 }}>
              {record.next_level_name}
            </Tag>
          )}
        </div>
      ),
    },
    {
      title: "New Dates",
      key: "dates",
      render: (text, record) => (
        <div className="text-sm">
          <div>{record.new_start_date}</div>
          <div className="text-muted">to {record.new_end_date}</div>
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: 100,
      render: (text, record) => (
        <Popconfirm
          title="Remove from selection?"
          onConfirm={() => handleRemoveFromSelection(record.old_group_id)}
          okText="Yes"
          cancelText="No"
        >
          <Button danger icon={<FiTrash2 />} size="small">
            Remove
          </Button>
        </Popconfirm>
      ),
    },
  ];

  // Group Card Component - YOUR ORIGINAL DESIGN
  const GroupCard = ({ group, isAssigned = true }) => {
    const isSelected = isGroupSelected(group.old_group_id);
    const isDisabled = !isAssigned;

    return (
      <div
        className={`auto-upgrade-card ${isSelected ? "selected" : ""} ${
          isDisabled ? "disabled" : ""
        }`}
        onClick={() => {
          if (!isDisabled) {
            handleGroupSelect(group);
          }
        }}
      >
        {isAssigned && (
          <div className="card-checkbox">
            <Checkbox
              checked={isSelected}
              onChange={() => handleGroupSelect(group)}
            />
          </div>
        )}

        {isDisabled && (
          <div className="card-lock">
            <Tooltip title="No assignment configured - Cannot auto upgrade">
              <FiLock />
            </Tooltip>
          </div>
        )}

        <div className="group-section old">
          <div className="section-label">
            <span className="label-badge source">FROM</span>
          </div>
          <div className="group-details">
            <h6 className="group-name">{group.old_name}</h6>
            <div className="group-meta">
              {group.old_level_name && (
                <Tag color="blue">{group.old_level_name}</Tag>
              )}
              <span className="meta-item">
                <FiCalendar />
                {group.start_time}
              </span>
              {group.time && group.time !== "00:00:00" && (
                <span className="meta-item">
                  <FiClock />
                  {group.time}
                </span>
              )}
            </div>
            {!isAssigned && (
              <span className="text-muted">Not Assigned Level</span>
            )}
          </div>
        </div>

        {isAssigned && (
          <>
            <div className="transfer-arrow-icon">
              <FiArrowRight />
            </div>

            <div className="group-section new">
              <div className="section-label">
                <span className="label-badge target">TO</span>
              </div>
              <div className="group-details">
                <h6 className="group-name">{group.new_name}</h6>
                <div className="group-meta">
                  {group.next_level_name && (
                    <Tag color="green">{group.next_level_name}</Tag>
                  )}
                  <span className="meta-item">
                    <FiCalendar />
                    {group.new_start_date} - {group.new_end_date}
                  </span>
                  {group.max_student && (
                    <span className="meta-item">
                      <FiUsers />
                      Max: {group.max_student}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        <div className="status-badge gap-3">
          {isAssigned ? (
            <Tooltip title="Ready for auto upgrade">
              <Tag
                color="success"
                icon={<FiUnlock style={{ marginRight: "5px" }} />}
              >
                Ready
              </Tag>
            </Tooltip>
          ) : (
            <Tooltip title="No Assigned Level">
              <Tag
                color="error"
                icon={<FiLock style={{ marginRight: "5px" }} />}
              >
                Not Configured
              </Tag>
            </Tooltip>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <>
        <Breadcrumbs parent="Rounds" title="Auto Upgrade Groups" />
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <Card className="upgrade-card">
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-3">Loading auto upgrade data...</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Breadcrumbs parent="Rounds" title="Auto Upgrade Groups" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card upgrade-card">
              <div className="card-header upgrade-header">
                <div className="header-content">
                  <div className="title-section">
                    <MdAutorenew className="header-icon" />
                    <div>
                      <h5>Auto Upgrade Groups</h5>
                      <span className="header-subtitle">
                        Round ID: {round_id} | Total Groups:{" "}
                        {autoGroupsData.length}
                      </span>
                    </div>
                  </div>
                  <div className="header-actions">
                    <Badge count={selectedGroups.length} offset={[-5, 5]}>
                      <Button
                        icon={<FiCheckCircle />}
                        onClick={() => setShowConfirmModal(true)}
                        size="large"
                        disabled={selectedGroups.length === 0}
                        style={{
                          background:
                            selectedGroups.length > 0
                              ? "rgba(255, 255, 255, 0.2)"
                              : "rgba(255, 255, 255, 0.1)",
                          border: "1px solid rgba(255, 255, 255, 0.3)",
                          color: "#ffffff",
                          marginRight: "12px",
                        }}
                      >
                        Selected ({selectedGroups.length})
                      </Button>
                    </Badge>
                    <Button
                      icon={<BiArrowBack />}
                      onClick={() => navigate(-1)}
                      size="large"
                    >
                      Back
                    </Button>
                  </div>
                </div>
              </div>

              <div className="card-body">
                <div className="stats-row mb-4">
                  <div className="stat-card ready">
                    <div className="stat-icon">
                      <FiUnlock />
                    </div>
                    <div className="stat-content">
                      <h3>{assignedGroups.length}</h3>
                      <p>Ready for Upgrade</p>
                    </div>
                  </div>
                  <div className="stat-card pending">
                    <div className="stat-icon">
                      <FiLock />
                    </div>
                    <div className="stat-content">
                      <h3>{unassignedGroups.length}</h3>
                      <p>Not Configured</p>
                    </div>
                  </div>
                  <div className="stat-card selected">
                    <div className="stat-icon">
                      <FiCheckCircle />
                    </div>
                    <div className="stat-content">
                      <h3>{selectedGroups.length}</h3>
                      <p>Selected</p>
                    </div>
                  </div>
                </div>

                <Tabs defaultActiveKey="assigned" type="card">
                  <TabPane
                    tab={
                      <span>
                        <FiUnlock style={{ marginRight: 8 }} />
                        Ready for Upgrade ({assignedGroups.length})
                      </span>
                    }
                    key="assigned"
                  >
                    <div className="tab-controls">
                      <div className="search-box">
                        <input
                          type="text"
                          placeholder="Search groups..."
                          value={searchAssigned}
                          onChange={(e) => setSearchAssigned(e.target.value)}
                        />
                      </div>
                      <div className="action-buttons">
                        <Button
                          type={selectAll ? "primary" : "default"}
                          icon={selectAll ? <FiX /> : <FiCheck />}
                          onClick={handleSelectAll}
                        >
                          {selectAll ? "Deselect All" : "Select All"}
                        </Button>
                        <Button
                          type="primary"
                          icon={<FiSend />}
                          onClick={() => setShowConfirmModal(true)}
                          disabled={selectedGroups.length === 0}
                          style={{
                            background: "#eb5d22",
                            borderColor: "#eb5d22",
                          }}
                        >
                          Upgrade Selected ({selectedGroups.length})
                        </Button>
                      </div>
                    </div>

                    <div className="groups-grid">
                      {filteredAssignedGroups.length > 0 ? (
                        filteredAssignedGroups.map((group) => (
                          <GroupCard
                            key={group.old_group_id}
                            group={group}
                            isAssigned={true}
                          />
                        ))
                      ) : (
                        <Empty
                          description="No ready groups found"
                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                        />
                      )}
                    </div>
                  </TabPane>

                  <TabPane
                    tab={
                      <span>
                        <FiLock style={{ marginRight: 8 }} />
                        Not Configured ({unassignedGroups.length})
                      </span>
                    }
                    key="unassigned"
                  >
                    <div className="info-alert mb-4">
                      <FiAlertCircle />
                      <span>
                        These groups don't have assignment configuration and
                        cannot be auto-upgraded.
                      </span>
                    </div>

                    <div className="tab-controls">
                      <div className="search-box">
                        <input
                          type="text"
                          placeholder="Search groups..."
                          value={searchUnassigned}
                          onChange={(e) => setSearchUnassigned(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="groups-grid">
                      {filteredUnassignedGroups.length > 0 ? (
                        filteredUnassignedGroups.map((group) => (
                          <GroupCard
                            key={group.old_group_id}
                            group={group}
                            isAssigned={false}
                          />
                        ))
                      ) : (
                        <Empty
                          description="No unconfigured groups found"
                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                        />
                      )}
                    </div>
                  </TabPane>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        title={
          <div className="modal-title">
            <FiSend className="modal-icon" />
            <span>Confirm Auto Upgrade ({selectedGroups.length} Groups)</span>
          </div>
        }
        open={showConfirmModal}
        onCancel={() => setShowConfirmModal(false)}
        width={1000}
        footer={[
          <Button
            key="submit"
            type="primary"
            icon={<FiSend />}
            onClick={handleSubmitUpgrades}
            size="large"
            loading={submitting}
            disabled={selectedGroups.length === 0}
            className="confirm-btn"
            style={{ background: "#eb5d22", borderColor: "#eb5d22" }}
          >
            Confirm & Upgrade All ({selectedGroups.length})
          </Button>,
          <Button
            key="cancel"
            onClick={() => setShowConfirmModal(false)}
            size="large"
          >
            Cancel
          </Button>,
        ]}
        className="upgrade-modal"
      >
        {selectedGroups.length > 0 ? (
          <>
            <div className="upgrade-summary-stats">
              <div className="summary-stat">
                <span className="stat-value">{selectedGroups.length}</span>
                <span className="stat-label">Groups to Upgrade</span>
              </div>
              <div className="summary-stat">
                <span className="stat-value">
                  {new Set(selectedGroups.map((g) => g.next_level_name)).size}
                </span>
                <span className="stat-label">Target Levels</span>
              </div>
            </div>

            <Table
              columns={selectedColumns}
              dataSource={selectedGroups}
              pagination={{ pageSize: 10 }}
              rowKey="old_group_id"
              scroll={{ x: "max-content" }}
              size="small"
            />
          </>
        ) : (
          <Empty description="No groups selected" />
        )}
      </Modal>
    </>
  );
};

export default UpgradeRounds;
