import React, { useEffect, useState, useRef, useCallback } from "react";
import { Button, Select, Card, Modal, Badge, Table, Popconfirm } from "antd";
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
  FiPlus,
} from "react-icons/fi";
import { BiTransfer, BiGroup, BiBuilding, BiArrowBack } from "react-icons/bi";
import { HiOutlineUserGroup } from "react-icons/hi";
import { MdOutlineClass } from "react-icons/md";
import "./style.css";
import * as XLSX from "xlsx";

const UpgradeStudentRound = () => {
  const { round_id } = useParams();
  const navigate = useNavigate();
  const oldGroupRefs = useRef({});
  const newGroupRefs = useRef({});
  const containerRef = useRef(null);

  const adminData = JSON.parse(localStorage.getItem("AdminData"));

  // Old Round State
  const [oldRound, setOldRound] = useState(null);
  const [oldGroups, setOldGroups] = useState([]);
  const [selectedOldGroup, setSelectedOldGroup] = useState(null);

  // New Round State
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [newRounds, setNewRounds] = useState([]);
  const [selectedNewRound, setSelectedNewRound] = useState(null);
  const [newGroups, setNewGroups] = useState([]);
  const [selectedNewGroup, setSelectedNewGroup] = useState(null);
  const [showTargetFilters, setShowTargetFilters] = useState(true);

  // Upgrades Queue
  const [upgradeQueue, setUpgradeQueue] = useState([]);
  const [showQueueModal, setShowQueueModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);

  // Loading state
  const [loading, setLoading] = useState(false);

  // Fetch branches
  const fetchBranches = useCallback(() => {
    axios
      .get(BASE_URL + "/admin/branches/select_branch.php")
      .then((res) => {
        if (res?.data?.status === "success") {
          setBranches(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
  }, []);

  const fetchOldRoundGroups = useCallback(() => {
    const dataSend = {
      admin_id: adminData[0]?.admin_id,
      round_id: round_id,
    };

    axios
      .post(
        BASE_URL + "/admin/groups/select_groups_by_round.php",
        JSON.stringify(dataSend)
      )
      .then((res) => {
        if (res?.data?.status === "success") {
          setOldGroups(res?.data?.message);
          if (res?.data?.message.length > 0) {
            setOldRound({
              round_id: res?.data?.message[0].round_id,
              round_name: res?.data?.message[0].round_name,
              branch_name: res?.data?.message[0].branch_name,
              branch_id: res?.data?.message[0].branch_id,
            });
          }
        }
      })
      .catch((e) => console.log(e));
  }, [adminData, round_id]);

  const fetchRoundsByBranch = useCallback(
    (branch_id) => {
      const dataSend = {
        branch_id: branch_id,
      };

      axios
        .post(
          BASE_URL + "/admin/round/select_round.php",
          JSON.stringify(dataSend)
        )
        .then((res) => {
          if (res?.data?.status === "success") {
            const activeRounds = res?.data?.message.filter(
              (r) => r.finish !== 1 && r.round_id !== round_id
            );
            setNewRounds(activeRounds);
          }
        })
        .catch((e) => console.log(e));
    },
    [round_id]
  );

  const fetchGroupsByRound = (roundId) => {
    const dataSend = {
      admin_id: adminData[0]?.admin_id,
      round_id: roundId,
    };

    axios
      .post(
        BASE_URL + "/admin/groups/select_groups_by_round.php",
        JSON.stringify(dataSend)
      )
      .then((res) => {
        if (res?.data?.status === "success") {
          setNewGroups(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
  };

  const exportUpgradeResults = (responseData, upgradeQueue, oldRound) => {
    const exportData = [];

    // Process the details from response
    if (responseData.details && Array.isArray(responseData.details)) {
      responseData.details.forEach((detail) => {
        const queueItem = upgradeQueue.find(
          (item) =>
            item.oldGroup.group_id == detail.old_group &&
            item.newGroup.group_id == detail.new_group
        );

        // Add successful students
        if (
          detail.successful_students &&
          Array.isArray(detail.successful_students)
        ) {
          detail.successful_students.forEach((student) => {
            exportData.push({
              Status: "✓ Success",
              "Student ID": student.student_id,
              "Student Name": student.student_name,
              "Old Round": oldRound?.round_name || "N/A",
              "Old Group": queueItem?.oldGroup?.group_name || "N/A",
              "Old Level": student.old_level || "N/A",
              "New Round": queueItem?.newRound?.round_name || "N/A",
              "New Group": queueItem?.newGroup?.group_name || "N/A",
              "New Level":
                queueItem?.newGroup?.group_levels?.level_name ||
                student.new_level ||
                "N/A",
              Reason: "Successfully upgraded",
              Date: new Date().toLocaleDateString(),
              Time: new Date().toLocaleTimeString(),
            });
          });
        }

        // Add failed students
        if (detail.failed_students && Array.isArray(detail.failed_students)) {
          detail.failed_students.forEach((student) => {
            exportData.push({
              Status: "✗ Failed",
              "Student ID": student.student_id,
              "Student Name": student.student_name,
              "Old Round": oldRound?.round_name || "N/A",
              "Old Group": queueItem?.oldGroup?.group_name || "N/A",
              "Old Level": student.old_level || "N/A",
              "New Round": queueItem?.newRound?.round_name || "N/A",
              "New Group": queueItem?.newGroup?.group_name || "N/A",
              "New Level":
                queueItem?.newGroup?.group_levels?.level_name || "N/A",
              Reason: student.reason || "Unknown error",
              Date: new Date().toLocaleDateString(),
              Time: new Date().toLocaleTimeString(),
            });
          });
        }
      });
    }

    // If no data in details, try to parse from message
    if (exportData.length === 0 && responseData.status === "success") {
      // For simple success response
      upgradeQueue.forEach((item) => {
        exportData.push({
          Status: "✓ Success",
          "Student ID": "All",
          "Student Name": "All students in group",
          "Old Round": oldRound?.round_name || "N/A",
          "Old Group": item.oldGroup?.group_name || "N/A",
          "Old Level": item.oldGroup?.group_levels?.level_name || "N/A",
          "New Round": item.newRound?.round_name || "N/A",
          "New Group": item.newGroup?.group_name || "N/A",
          "New Level": item.newGroup?.group_levels?.level_name || "N/A",
          Reason: "Successfully upgraded",
          Date: new Date().toLocaleDateString(),
          Time: new Date().toLocaleTimeString(),
        });
      });
    }

    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(exportData);

    // Set column widths
    const columnWidths = [
      { wch: 12 }, // Status
      { wch: 12 }, // Student ID
      { wch: 25 }, // Student Name
      { wch: 20 }, // Old Round
      { wch: 20 }, // Old Group
      { wch: 15 }, // Old Level
      { wch: 20 }, // New Round
      { wch: 20 }, // New Group
      { wch: 15 }, // New Level
      { wch: 35 }, // Reason
      { wch: 12 }, // Date
      { wch: 12 }, // Time
    ];
    worksheet["!cols"] = columnWidths;

    // Style the header row
    const range = XLSX.utils.decode_range(worksheet["!ref"]);
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const address = XLSX.utils.encode_col(C) + "1";
      if (!worksheet[address]) continue;
      worksheet[address].s = {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "eb5d22" } },
        alignment: { horizontal: "center", vertical: "center" },
      };
    }

    // Create workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Upgrade Results");

    // Add summary sheet
    const summaryData = [
      {
        Metric: "Total Upgraded",
        Value: responseData.summary?.total_upgraded || 0,
      },
      {
        Metric: "Successful",
        Value: exportData.filter((d) => d.Status.includes("Success")).length,
      },
      {
        Metric: "Failed",
        Value: exportData.filter((d) => d.Status.includes("Failed")).length,
      },
      { Metric: "Upgrade Date", Value: new Date().toLocaleDateString() },
      { Metric: "Upgrade Time", Value: new Date().toLocaleTimeString() },
      {
        Metric: "Admin ID",
        Value:
          JSON.parse(localStorage.getItem("AdminData"))?.[0]?.admin_id || "N/A",
      },
    ];

    const summarySheet = XLSX.utils.json_to_sheet(summaryData);
    summarySheet["!cols"] = [{ wch: 20 }, { wch: 30 }];
    XLSX.utils.book_append_sheet(workbook, summarySheet, "Summary");

    // Generate filename
    const filename = `Student_Upgrade_Report_${
      new Date().toISOString().split("T")[0]
    }_${Date.now()}.xlsx`;

    // Download file
    XLSX.writeFile(workbook, filename);

    return exportData.length;
  };

  // Default target branch to old round's branch once old round loads
  useEffect(() => {
    if (oldRound?.branch_id && !selectedBranch) {
      setSelectedBranch(oldRound.branch_id);
      fetchRoundsByBranch(oldRound.branch_id);
      setShowTargetFilters(true);
    }
  }, [oldRound, selectedBranch, fetchRoundsByBranch]);

  useEffect(() => {
    fetchBranches();
    fetchOldRoundGroups();
  }, []);

  const handleBranchChange = (branchId) => {
    setSelectedBranch(branchId);
    setSelectedNewRound(null);
    setNewGroups([]);
    setSelectedNewGroup(null);
    fetchRoundsByBranch(branchId);
  };

  const handleNewRoundSelect = (round) => {
    setSelectedNewRound(round);
    setSelectedNewGroup(null);
    fetchGroupsByRound(round.round_id);
    setShowTargetFilters(false);
  };

  const handleNewGroupSelect = (group) => {
    if (!selectedOldGroup) {
      toast.warning("Please select a group from the old round first!");
      return;
    }
    setSelectedNewGroup(group);
    setConfirmModal(true);
  };

  // Add to upgrade queue
  const handleAddToQueue = () => {
    if (!selectedOldGroup || !selectedNewGroup) {
      toast.error("Please select both old and new groups");
      return;
    }

    // Check if old group already in queue
    const alreadyExists = upgradeQueue.some(
      (item) => item.oldGroup.group_id === selectedOldGroup.group_id
    );

    if (alreadyExists) {
      toast.warning("This group is already in the upgrade queue!");
      return;
    }

    const newUpgrade = {
      oldGroup: selectedOldGroup,
      newGroup: selectedNewGroup,
      newRound: selectedNewRound,
      newGroupLevel: selectedNewGroup.group_levels?.level_id || null,
    };

    setUpgradeQueue([...upgradeQueue, newUpgrade]);
    toast.success("Added to upgrade queue!");
    setConfirmModal(false);

    // Reset selections
    setSelectedOldGroup(null);
    setSelectedNewGroup(null);
  };

  // Remove from queue
  const handleRemoveFromQueue = (index) => {
    const newQueue = upgradeQueue.filter((_, i) => i !== index);
    setUpgradeQueue(newQueue);
    toast.info("Removed from queue");
  };

  const handleSubmitAllUpgrades = () => {
    if (upgradeQueue.length === 0) {
      toast.warning("No upgrades in queue!");
      return;
    }

    setLoading(true);

    const dataString = upgradeQueue
      .map(
        (item) =>
          `${item.oldGroup.group_id}**${item.newGroup.group_id}**${
            item.newGroupLevel || ""
          }`
      )
      .join("**camp**");

    const dataSend = {
      admin_id: adminData[0]?.admin_id,
      data: dataString,
    };

    axios
      .post(
        BASE_URL + "/admin/subscription/upgrade_all_rounds.php",
        JSON.stringify(dataSend)
      )
      .then((res) => {
        console.log("Upgrade Response:", res);

        if (
          res?.data?.status === "success" ||
          res?.data?.status === "partial_success"
        ) {
          // Export results to Excel
          const exportedCount = exportUpgradeResults(
            res?.data,
            upgradeQueue,
            oldRound
          );

          // Show success message
          const message =
            res?.data?.status === "partial_success"
              ? `${res?.data?.message} Report exported with ${exportedCount} records.`
              : `All students upgraded successfully! Report exported with ${exportedCount} records.`;

          toast.success(message, { autoClose: 5000 });

          // Show detailed summary
          if (res?.data?.summary) {
            toast.info(
              `Total Upgraded: ${res?.data?.summary?.total_upgraded || 0}`,
              { autoClose: 3000 }
            );
          }

          // Clear queue and close modal
          setUpgradeQueue([]);
          setShowQueueModal(false);

          // Refresh the old groups data
          fetchOldRoundGroups();
        } else {
          toast.error(res?.data?.message || "Error upgrading students");
        }
      })
      .catch((e) => {
        console.error("Upgrade error:", e);
        toast.error("Error upgrading students");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const branchOptions = branches.map((branch) => ({
    label: (
      <div className="select-option">
        <BiBuilding className="option-icon" />
        <span>{branch.branch_name}</span>
      </div>
    ),
    value: branch.branch_id,
  }));

  const isGroupInQueue = (groupId) => {
    return upgradeQueue.some((item) => item.oldGroup.group_id === groupId);
  };

  const ConnectionLine = () => {
    if (!selectedOldGroup || !selectedNewGroup) return null;

    const oldGroupEl = oldGroupRefs.current[selectedOldGroup.group_id];
    const newGroupEl = newGroupRefs.current[selectedNewGroup.group_id];
    const containerEl = containerRef.current;

    if (!oldGroupEl || !newGroupEl || !containerEl) return null;

    const containerRect = containerEl.getBoundingClientRect();
    const oldRect = oldGroupEl.getBoundingClientRect();
    const newRect = newGroupEl.getBoundingClientRect();

    const startX = oldRect.right - containerRect.left;
    const startY = oldRect.top + oldRect.height / 2 - containerRect.top;
    const endX = newRect.left - containerRect.left;
    const endY = newRect.top + newRect.height / 2 - containerRect.top;

    const midX = (startX + endX) / 2;

    const path = `M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${endY}, ${endX} ${endY}`;

    return (
      <svg className="connection-svg">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#eb5d22" />
            <stop offset="50%" stopColor="#ff7849" />
            <stop offset="100%" stopColor="#eb5d22" />
          </linearGradient>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 10 3, 0 6" fill="#eb5d22" />
          </marker>
        </defs>
        <path
          d={path}
          stroke="url(#lineGradient)"
          strokeWidth="3"
          fill="none"
          markerEnd="url(#arrowhead)"
          className="connection-path"
        />
        <circle cx={startX} cy={startY} r="6" fill="#eb5d22" />
        <circle cx={endX} cy={endY} r="6" fill="#eb5d22" />
      </svg>
    );
  };

  const queueColumns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1,
      width: 60,
    },
    {
      title: "From Group",
      dataIndex: "oldGroup",
      key: "oldGroup",
      render: (oldGroup) => (
        <div>
          <strong>{oldGroup.group_name}</strong>
          <div className="table-meta">
            <span>{oldGroup.round_name}</span>
          </div>
        </div>
      ),
    },
    {
      title: "To Group",
      dataIndex: "newGroup",
      key: "newGroup",
      render: (newGroup) => (
        <div>
          <strong>{newGroup.group_name}</strong>
          <div className="table-meta">
            <span>{newGroup.group_levels?.level_name}</span>
          </div>
        </div>
      ),
    },
    {
      title: "Round",
      dataIndex: "newRound",
      key: "newRound",
      render: (newRound) => newRound.round_name,
    },
    // {
    //   title: "Students",
    //   dataIndex: "oldGroup",
    //   key: "students",
    //   render: (oldGroup) => (
    //     <Badge
    //       count={oldGroup.student_count}
    //       style={{ backgroundColor: "#eb5d22" }}
    //     />
    //   ),
    // },
    {
      title: "Action",
      key: "action",
      render: (text, record, index) => (
        <Popconfirm
          title="Remove this upgrade?"
          onConfirm={() => handleRemoveFromQueue(index)}
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

  return (
    <>
      <Breadcrumbs parent="Rounds" title="Upgrade Student Round" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card upgrade-card">
              <div className="card-header upgrade-header">
                <div className="header-content">
                  <div className="title-section">
                    <BiTransfer className="header-icon" />
                    <h5>Upgrade Students to New Round</h5>
                  </div>
                  <div className="header-actions">
                    <Badge count={upgradeQueue.length} offset={[-5, 5]}>
                      <Button
                        icon={<FiUsers />}
                        onClick={() => setShowQueueModal(true)}
                        size="large"
                        style={{
                          background: "rgba(255, 255, 255, 0.2)",
                          border: "1px solid rgba(255, 255, 255, 0.3)",
                          color: "#ffffff",
                          marginRight: "12px",
                        }}
                      >
                        View Queue ({upgradeQueue.length})
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
                <div className="upgrade-container" ref={containerRef}>
                  <ConnectionLine />

                  {/* Old Round Section */}
                  <div className="round-section old-round">
                    <div className="section-header">
                      <div className="header-badge source">
                        <HiOutlineUserGroup className="badge-icon" />
                        <span>Source Round</span>
                      </div>
                    </div>

                    {oldRound && (
                      <Card className="round-info-card source-card">
                        <div className="round-info">
                          <h5 className="round-title">{oldRound.round_name}</h5>
                          <div className="round-meta">
                            <div className="meta-item">
                              <BiBuilding className="meta-icon" />
                              <span>{oldRound.branch_name}</span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    )}

                    <div className="groups-list">
                      <div className="list-header">
                        <MdOutlineClass className="list-icon" />
                        <h6 className="list-title">Select Group to Upgrade</h6>
                      </div>

                      {oldGroups.length > 0 ? (
                        <div className="groups-scroll">
                          {oldGroups.map((group) => (
                            <div
                              key={group.group_id}
                              ref={(el) =>
                                (oldGroupRefs.current[group.group_id] = el)
                              }
                              className={`group-card ${
                                selectedOldGroup?.group_id === group.group_id
                                  ? "selected"
                                  : ""
                              } ${
                                isGroupInQueue(group.group_id) ? "in-queue" : ""
                              }`}
                              onClick={() => {
                                if (!isGroupInQueue(group.group_id)) {
                                  setSelectedOldGroup(group);
                                }
                              }}
                            >
                              <div className="group-header">
                                <h6 className="group-name">
                                  {group.group_name}
                                  {isGroupInQueue(group.group_id) && (
                                    <FiCheckCircle
                                      className="queued-icon"
                                      title="In Queue"
                                    />
                                  )}
                                </h6>
                                {/* <Badge
                                  count={group.student_count}
                                  showZero
                                  style={{
                                    backgroundColor: "#eb5d22",
                                  }}
                                /> */}
                              </div>
                              <div className="group-info">
                                {/* <div className="info-item">
                                  <FiUsers className="info-icon" />
                                  <span>{group.student_count} Students</span>
                                </div> */}
                                {/* <div className="info-item">
                                  <FiClock className="info-icon" />
                                  <span>{group.time}</span>
                                </div> */}
                                <div className="info-item">
                                  <FiCalendar className="info-icon" />
                                  <span>{group.start_time}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="empty-state">
                          <FiAlertCircle className="empty-icon" />
                          <p>No groups found</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Center Divider */}
                  <div className="center-divider">
                    <div className="divider-line"></div>
                    <div className="divider-icon">
                      <FiArrowRight />
                    </div>
                    <div className="divider-line"></div>
                  </div>

                  {/* New Round Section */}
                  <div className="round-section new-round">
                    <div
                      className="section-header"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div className="header-badge target">
                        <BiGroup className="badge-icon" />
                        <span>Target Round</span>
                      </div>
                      {!showTargetFilters && (
                        <div>
                          <Button
                            // size="small"
                            style={{
                              padding: "20px 5px",
                              backgroundColor: "transparent",
                              border: "none",
                            }}
                            className="header-badge target"
                            onClick={() => {
                              setShowTargetFilters(true);
                              setSelectedNewRound(null);
                              setNewGroups([]);
                              setSelectedNewGroup(null);
                            }}
                          >
                            Change Branch / Round
                          </Button>
                        </div>
                      )}
                    </div>
                    <Card className="round-info-card source-card">
                      <div className="round-info">
                        <h5 className="round-title">
                          {selectedNewRound?.round_name || "Round not chosen"}
                        </h5>
                        <div className="round-meta">
                          <div className="meta-item">
                            <BiBuilding className="meta-icon" />
                            <span>
                              {selectedBranch
                                ? branches.find(
                                    (b) => b.branch_id === selectedBranch
                                  )?.branch_name || "Select a branch"
                                : "Select a branch"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>

                    {showTargetFilters && (
                      <div className="filters-section">
                        <div className="filter-group">
                          <label className="filter-label">
                            <BiBuilding className="label-icon" />
                            <span>Step 1: Select Branch</span>
                          </label>
                          <Select
                            placeholder="Choose a branch"
                            options={branchOptions}
                            onChange={handleBranchChange}
                            value={selectedBranch}
                            style={{ width: "100%" }}
                            size="large"
                            className="custom-select"
                          />
                        </div>
                      </div>
                    )}

                    {showTargetFilters &&
                      selectedBranch &&
                      newRounds.length > 0 && (
                        <div className="rounds-list">
                          <div className="list-header">
                            <BiTransfer className="list-icon" />
                            <h6 className="list-title">Step 2: Select Round</h6>
                          </div>
                          <div className="rounds-scroll">
                            {newRounds.map((round) => (
                              <div
                                key={round.round_id}
                                className={`round-card ${
                                  selectedNewRound?.round_id === round.round_id
                                    ? "selected"
                                    : ""
                                }`}
                                onClick={() => handleNewRoundSelect(round)}
                              >
                                <div className="round-card-content">
                                  <BiTransfer className="round-icon" />
                                  <span className="round-name">
                                    {round.round_name}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    {selectedNewRound && newGroups.length > 0 && (
                      <div className="groups-list">
                        <div className="list-header">
                          <MdOutlineClass className="list-icon" />
                          <h6 className="list-title">
                            Step 3: Select Target Group
                          </h6>
                        </div>
                        <div className="groups-scroll">
                          {newGroups.map((group) => (
                            <div
                              key={group.group_id}
                              ref={(el) =>
                                (newGroupRefs.current[group.group_id] = el)
                              }
                              className={`group-card ${
                                selectedNewGroup?.group_id === group.group_id
                                  ? "selected"
                                  : ""
                              } ${!selectedOldGroup ? "disabled" : ""}`}
                              onClick={() => handleNewGroupSelect(group)}
                            >
                              <div className="group-header">
                                <h6 className="group-name">
                                  {group.group_name}
                                </h6>
                                {/* <Badge
                                  count={group.student_count}
                                  showZero
                                  style={{
                                    backgroundColor: "#52c41a",
                                  }}
                                /> */}
                              </div>
                              <div className="group-info">
                                {/* <div className="info-item">
                                  <FiUsers className="info-icon" />
                                  <span>{group.student_count} Students</span>
                                </div> */}
                                {/* <div className="info-item">
                                  <FiClock className="info-icon" />
                                  <span>{group.time}</span>
                                </div> */}
                                <div className="info-item">
                                  <FiCalendar className="info-icon" />
                                  <span>{group.start_time}</span>
                                </div>
                              </div>
                              {group.group_levels && (
                                <div className="group-level-tag">
                                  <span>{group.group_levels.level_name}</span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {showTargetFilters &&
                      selectedBranch &&
                      newRounds.length === 0 && (
                        <div className="empty-state">
                          <FiAlertCircle className="empty-icon" />
                          <p>No active rounds available in this branch</p>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add to Queue Modal */}
      <Modal
        title={
          <div className="modal-title">
            <FiPlus className="modal-icon" />
            <span>Upgrade Students</span>
          </div>
        }
        open={confirmModal}
        onCancel={() => setConfirmModal(false)}
        footer={[
          <Button
            key="confirm"
            type="primary"
            icon={<FiPlus />}
            onClick={handleAddToQueue}
            size="large"
            className="confirm-btn"
          >
            Upgrade Students
          </Button>,
          <Button
            key="cancel"
            onClick={() => setConfirmModal(false)}
            size="large"
          >
            Cancel
          </Button>,
        ]}
        className="upgrade-modal"
      >
        <div className="confirm-content">
          <div className="upgrade-summary">
            <div className="summary-card source">
              <div className="summary-header">
                <span className="summary-label">From</span>
              </div>
              <div className="summary-body">
                <h6>{selectedOldGroup?.group_name}</h6>
                <p className="summary-meta">{oldRound?.round_name}</p>
              </div>
            </div>

            <div className="transfer-arrow">
              <FiArrowRight />
            </div>

            <div className="summary-card target">
              <div className="summary-header">
                <span className="summary-label">To</span>
              </div>
              <div className="summary-body">
                <h6>{selectedNewGroup?.group_name}</h6>
                <p className="summary-meta">{selectedNewRound?.round_name}</p>
                {/* {selectedNewGroup?.group_levels && (
                  <p className="summary-level">
                    Level: {selectedNewGroup.group_levels.level_name}
                  </p>
                )} */}
              </div>
            </div>
          </div>

          <div className="student-count-card">
            <FiUsers className="count-icon" />
            <div className="count-content">
              <span className="count-label">Students to Upgrade</span>
              {/* <span className="count-number">
                {selectedOldGroup?.student_count}
              </span> */}
            </div>
          </div>
        </div>
      </Modal>

      {/* Queue Modal */}
      <Modal
        title={
          <div className="modal-title">
            <FiUsers className="modal-icon" />
            <span>Upgrade Queue ({upgradeQueue.length})</span>
          </div>
        }
        open={showQueueModal}
        onCancel={() => setShowQueueModal(false)}
        width={900}
        footer={[
          <Button
            key="submit"
            type="primary"
            icon={<FiSend />}
            onClick={handleSubmitAllUpgrades}
            size="large"
            loading={loading}
            disabled={upgradeQueue.length === 0}
            className="confirm-btn"
          >
            Submit All Upgrades ({upgradeQueue.length})
          </Button>,
          <Button
            key="cancel"
            onClick={() => setShowQueueModal(false)}
            size="large"
          >
            Close
          </Button>,
        ]}
        className="upgrade-modal queue-modal"
      >
        {upgradeQueue.length > 0 ? (
          <Table
            columns={queueColumns}
            dataSource={upgradeQueue}
            pagination={false}
            rowKey={(record, index) => index}
            scroll={{ x: "max-content" }}
          />
        ) : (
          <div className="empty-state">
            <FiAlertCircle className="empty-icon" />
            <p>No upgrades in queue. Add some upgrades first!</p>
          </div>
        )}
      </Modal>
    </>
  );
};

export default UpgradeStudentRound;
