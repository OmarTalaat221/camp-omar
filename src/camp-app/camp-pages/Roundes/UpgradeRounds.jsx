import React, { useEffect, useState, useRef, useCallback } from "react";
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
  FiPlus,
  FiCheck,
  FiX,
  FiLock,
  FiUnlock,
} from "react-icons/fi";
import { BiTransfer, BiGroup, BiBuilding, BiArrowBack } from "react-icons/bi";
import { HiOutlineUserGroup } from "react-icons/hi";
import { MdOutlineClass, MdAutorenew } from "react-icons/md";
import "./style.css";
import * as XLSX from "xlsx";

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

        // Separate assigned and unassigned groups
        const assigned = allData.filter(
          (group) => group.assign_id !== null && group.assign_id !== ""
        );
        const unassigned = allData.filter(
          (group) => group.assign_id === null || group.assign_id === ""
        );

        setAssignedGroups(assigned);
        setUnassignedGroups(unassigned);

        // Set round info from first item
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

  // Export upgrade results
  const exportUpgradeResults = (responseData, selectedGroups) => {
    const exportData = [];

    selectedGroups.forEach((group) => {
      exportData.push({
        Status: "✓ Upgraded",
        "Old Group ID": group.old_group_id,
        "Old Group Name": group.old_name,
        "Old Level": group.old_level_name || "N/A",
        "New Group Name": group.new_name,
        "New Level": group.next_level_name || "N/A",
        "New Level ID": group.next_level_id || "N/A",
        "Start Date": group.new_start_date,
        "End Date": group.new_end_date,
        "Max Students": group.max_student || "N/A",
        Date: new Date().toLocaleDateString(),
        Time: new Date().toLocaleTimeString(),
      });
    });

    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(exportData);

    // Set column widths
    const columnWidths = [
      { wch: 12 },
      { wch: 15 },
      { wch: 35 },
      { wch: 12 },
      { wch: 35 },
      { wch: 12 },
      { wch: 12 },
      { wch: 12 },
      { wch: 12 },
      { wch: 12 },
      { wch: 12 },
      { wch: 12 },
    ];
    worksheet["!cols"] = columnWidths;

    // Create workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Upgrade Results");

    // Add summary sheet
    const summaryData = [
      { Metric: "Total Groups Upgraded", Value: selectedGroups.length },
      { Metric: "Round ID", Value: round_id },
      { Metric: "Upgrade Date", Value: new Date().toLocaleDateString() },
      { Metric: "Upgrade Time", Value: new Date().toLocaleTimeString() },
      { Metric: "Admin ID", Value: adminData?.[0]?.admin_id || "N/A" },
    ];

    const summarySheet = XLSX.utils.json_to_sheet(summaryData);
    summarySheet["!cols"] = [{ wch: 25 }, { wch: 30 }];
    XLSX.utils.book_append_sheet(workbook, summarySheet, "Summary");

    // Generate filename
    const filename = `Auto_Upgrade_Report_Round_${round_id}_${
      new Date().toISOString().split("T")[0]
    }.xlsx`;

    // Download file
    XLSX.writeFile(workbook, filename);

    return exportData.length;
  };

  // Submit all upgrades
  const handleSubmitUpgrades = async () => {
    if (selectedGroups.length === 0) {
      toast.warning("No groups selected for upgrade!");
      return;
    }

    setSubmitting(true);

    try {
      // Format data for API
      // old_group_id**new_group_id**level_id**camp**...
      const dataString = selectedGroups
        .map(
          (group) =>
            `${group.old_group_id}**${group.next_level_id || ""}**${
              group.assign_id || ""
            }`
        )
        .join("**camp**");

      const dataSend = {
        admin_id: adminData[0]?.admin_id,
        round_id: round_id,
        data: dataString,
        groups: selectedGroups.map((g) => ({
          old_group_id: g.old_group_id,
          new_name: g.new_name,
          next_level_id: g.next_level_id,
          assign_id: g.assign_id,
          new_start_date: g.new_start_date,
          new_end_date: g.new_end_date,
          max_student: g.max_student,
        })),
      };

      const response = await axios.post(
        BASE_URL + "/admin/subscription/execute_auto_upgrade.php",
        JSON.stringify(dataSend)
      );

      console.log("Upgrade Response:", response);

      if (
        response?.data?.status === "success" ||
        response?.data?.status === "partial_success"
      ) {
        // Export results
        const exportedCount = exportUpgradeResults(
          response.data,
          selectedGroups
        );

        toast.success(
          `Successfully upgraded ${selectedGroups.length} groups! Report exported.`,
          { autoClose: 5000 }
        );

        // Clear selection and refresh
        setSelectedGroups([]);
        setSelectAll(false);
        setShowConfirmModal(false);
        fetchAutoGroups();
      } else {
        toast.error(response?.data?.message || "Error upgrading groups");
      }
    } catch (error) {
      console.error("Upgrade error:", error);
      toast.error("Error upgrading groups");
    } finally {
      setSubmitting(false);
    }
  };

  // Filter assigned groups
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

  // Filter unassigned groups
  const filteredUnassignedGroups = unassignedGroups.filter(
    (group) =>
      group.old_name?.toLowerCase().includes(searchUnassigned.toLowerCase()) ||
      group.new_name?.toLowerCase().includes(searchUnassigned.toLowerCase()) ||
      group.next_level_name
        ?.toLowerCase()
        .includes(searchUnassigned.toLowerCase())
  );

  // Table columns for selected groups modal
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

  // Group Card Component
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
        {/* Selection Checkbox */}
        {isAssigned && (
          <div className="card-checkbox">
            <Checkbox
              checked={isSelected}
              onChange={() => handleGroupSelect(group)}
            />
          </div>
        )}

        {/* Disabled Lock Icon */}
        {isDisabled && (
          <div className="card-lock">
            <Tooltip title="No assignment configured - Cannot auto upgrade">
              <FiLock />
            </Tooltip>
          </div>
        )}

        {/* Old Group Section */}
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

        {/* Arrow */}
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

        {/* Status Badge */}
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
              {/* Header */}
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

              {/* Body */}
              <div className="card-body">
                {/* Stats Cards */}
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

                {/* Tabs */}
                <Tabs defaultActiveKey="assigned" type="card">
                  {/* Assigned Groups Tab */}
                  <TabPane
                    tab={
                      <span>
                        <FiUnlock style={{ marginRight: 8 }} />
                        Ready for Upgrade ({assignedGroups.length})
                      </span>
                    }
                    key="assigned"
                  >
                    {/* Controls */}
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

                    {/* Groups List */}
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

                  {/* Unassigned Groups Tab */}
                  <TabPane
                    tab={
                      <span>
                        <FiLock style={{ marginRight: 8 }} />
                        Not Configured ({unassignedGroups.length})
                      </span>
                    }
                    key="unassigned"
                  >
                    {/* Info Alert */}
                    <div className="info-alert mb-4">
                      <FiAlertCircle />
                      <span>
                        These groups don't have assignment configuration and
                        cannot be auto-upgraded. Please configure their
                        assignments first.
                      </span>
                    </div>

                    {/* Search */}
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

                    {/* Groups List */}
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

      {/* Confirm Modal */}
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
