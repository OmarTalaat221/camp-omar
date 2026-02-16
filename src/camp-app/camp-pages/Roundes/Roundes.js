import { Button, Dropdown, Modal, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../../component/common/breadcrumb/breadcrumb";
import { BASE_URL } from "../../../Api/baseUrl";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaEllipsisVertical } from "react-icons/fa6";
import { toast } from "react-toastify";
import "./style.css";

export const Roundes = () => {
  const { branch_id } = useParams();
  const navigate = useNavigate();
  const [Rounds, setRounds] = useState([]);
  const [Levels, setLevels] = useState([]);

  // Modal States (للفتح والإغلاق فقط)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isFinishModalOpen, setIsFinishModalOpen] = useState(false);
  const [isUpdateLevelModalOpen, setIsUpdateLevelModalOpen] = useState(false);

  // Data States (للبيانات فقط)
  const [selectedRound, setSelectedRound] = useState(null);
  const [newRoundData, setNewRoundData] = useState({ round_name: "" });
  const [editRoundData, setEditRoundData] = useState({
    round_id: null,
    round_name: "",
  });
  const [updateLevelData, setUpdateLevelData] = useState({ level_id: null });

  // Loading states
  const [loading, setLoading] = useState(false);

  // ============ Handlers for Opening Modals ============
  const openAddModal = () => {
    setNewRoundData({ round_name: "" });
    setIsAddModalOpen(true);
  };

  const openEditModal = (record) => {
    setEditRoundData({
      round_id: record.round_id,
      round_name: record.round_name,
    });
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (record) => {
    setSelectedRound(record);
    setIsDeleteModalOpen(true);
  };

  const openFinishModal = (record) => {
    setSelectedRound(record);
    setIsFinishModalOpen(true);
  };

  const openUpdateLevelModal = (record) => {
    setSelectedRound(record);
    setUpdateLevelData({ level_id: null });
    setIsUpdateLevelModalOpen(true);
  };

  // ============ Handlers for Closing Modals ============
  const closeAddModal = () => {
    setIsAddModalOpen(false);
    // تأخير مسح البيانات حتى انتهاء الـ animation
    setTimeout(() => setNewRoundData({ round_name: "" }), 300);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setTimeout(() => setEditRoundData({ round_id: null, round_name: "" }), 300);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setTimeout(() => setSelectedRound(null), 300);
  };

  const closeFinishModal = () => {
    setIsFinishModalOpen(false);
    setTimeout(() => setSelectedRound(null), 300);
  };

  const closeUpdateLevelModal = () => {
    setIsUpdateLevelModalOpen(false);
    setTimeout(() => {
      setSelectedRound(null);
      setUpdateLevelData({ level_id: null });
    }, 300);
  };

  // ============ API Calls ============
  const handleSelectLevels = () => {
    axios
      .get(BASE_URL + "/admin/content/select_levels.php")
      .then((res) => {
        if (res?.data?.status === "success") {
          setLevels(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
  };

  const handleGetRounds = () => {
    axios
      .post(
        BASE_URL + "/admin/round/select_round.php",
        JSON.stringify({ branch_id })
      )
      .then((res) => {
        if (res?.data?.status === "success") {
          setRounds(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    handleSelectLevels();
    handleGetRounds();
  }, [branch_id]);

  const handleAddNewRound = () => {
    if (!newRoundData.round_name?.trim()) {
      toast.error("Please enter round name");
      return;
    }

    setLoading(true);
    const dataSend = {
      round_name: newRoundData.round_name,
      branch_id: branch_id,
    };

    axios
      .post(BASE_URL + "/admin/round/add_round.php", JSON.stringify(dataSend))
      .then((res) => {
        if (res?.data?.status === "success") {
          toast.success(res?.data?.message);
          closeAddModal();
          handleGetRounds();
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  };

  const handleDeleteRound = () => {
    if (!selectedRound?.round_id) return;

    setLoading(true);
    axios
      .post(
        BASE_URL + "/admin/round/delete_round.php",
        JSON.stringify({ round_id: selectedRound.round_id })
      )
      .then((res) => {
        if (res?.data?.status === "success") {
          toast.success(res?.data?.message);
          closeDeleteModal();
          handleGetRounds();
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  };

  const handleFinishRound = () => {
    if (!selectedRound?.round_id) return;

    setLoading(true);
    axios
      .post(
        BASE_URL + "/admin/round/finish_round.php",
        JSON.stringify({ round_id: selectedRound.round_id })
      )
      .then((res) => {
        if (res?.data?.status === "success") {
          toast.success(res?.data?.message);
          closeFinishModal();
          handleGetRounds();
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  };

  const handleEditRound = () => {
    if (!editRoundData.round_name?.trim()) {
      toast.error("Please enter round name");
      return;
    }

    setLoading(true);
    axios
      .post(
        BASE_URL + "/admin/round/edit_round.php",
        JSON.stringify(editRoundData)
      )
      .then((res) => {
        if (res?.data?.status === "success") {
          toast.success(res?.data?.message);
          closeEditModal();
          handleGetRounds();
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  };

  const handleUpdateForLevel = () => {
    if (!updateLevelData.level_id) {
      toast.error("Please select a level");
      return;
    }

    setLoading(true);
    const dataSend = {
      round_id: selectedRound.round_id,
      level_id: updateLevelData.level_id,
    };

    axios
      .post(
        BASE_URL + "/admin/round/transfer_round.php",
        JSON.stringify(dataSend)
      )
      .then((res) => {
        if (res?.data?.status === "success") {
          toast.success(res?.data?.message);
          closeUpdateLevelModal();
          handleGetRounds();
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  };

  const levelOptions = Levels.map((level) => ({
    label: level.level_name,
    value: level.level_id,
  }));

  const columns = [
    {
      key: "round_id",
      dataIndex: "round_id",
      title: "#",
    },
    {
      key: "round_name",
      dataIndex: "round_name",
      title: "Round Name",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => {
        const items = [
          {
            key: "delete",
            label: (
              <button
                className="btn btn-primary"
                onClick={() => openDeleteModal(record)}
              >
                Delete round
              </button>
            ),
          },
          {
            key: "edit",
            label: (
              <button
                className="btn btn-primary"
                onClick={() => openEditModal(record)}
              >
                Edit round
              </button>
            ),
          },
          {
            key: "finish",
            label: (
              <button
                className="btn btn-primary"
                onClick={() => openFinishModal(record)}
              >
                Finish round
              </button>
            ),
          },
          {
            key: "update-level",
            label: (
              <button
                className="btn btn-primary"
                onClick={() => openUpdateLevelModal(record)}
              >
                Update round
              </button>
            ),
          },
          {
            key: "groups",
            label: (
              <Link
                to={`/groups?round_id=${record.round_id}`}
                className="btn btn-primary text-white"
              >
                Groups
              </Link>
            ),
          },
          {
            key: "upgrade",
            label: (
              <Link
                to={`${process.env.PUBLIC_URL}/roundes/${record.round_id}/upgrade-round`}
                className="btn btn-primary text-white"
              >
                Upgrade Rounds
              </Link>
            ),
          },
        ];

        return (
          <Dropdown menu={{ items }} placement="bottom">
            <Button
              style={{ display: "flex", flexDirection: "column", gap: "3px" }}
            >
              <FaEllipsisVertical />
            </Button>
          </Dropdown>
        );
      },
    },
  ];

  return (
    <>
      <Breadcrumbs parent="Branches" title="Rounds List" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>List Rounds</h5>
                <Button
                  color="primary btn-pill"
                  style={{ margin: "10px 0" }}
                  onClick={openAddModal}
                >
                  Add Round
                </Button>
              </div>
              <div className="card-body">
                <Table
                  scroll={{ x: "max-content" }}
                  columns={columns}
                  dataSource={Rounds}
                  rowKey="round_id"
                  rowClassName={(record) =>
                    record.finish === "1" ? "finished-row" : ""
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Round Modal */}
      <Modal
        title="Add Round"
        open={isAddModalOpen}
        onCancel={closeAddModal}
        footer={[
          <Button
            key="add"
            type="primary"
            loading={loading}
            onClick={handleAddNewRound}
          >
            Add
          </Button>,
          <Button key="cancel" onClick={closeAddModal}>
            Cancel
          </Button>,
        ]}
      >
        <div className="form_field">
          <label className="form_label">Round Name</label>
          <input
            type="text"
            className="form_input"
            value={newRoundData.round_name}
            onChange={(e) =>
              setNewRoundData({ ...newRoundData, round_name: e.target.value })
            }
          />
        </div>
      </Modal>

      {/* Edit Round Modal */}
      <Modal
        title="Edit Round"
        open={isEditModalOpen}
        onCancel={closeEditModal}
        footer={[
          <Button
            key="edit"
            type="primary"
            loading={loading}
            onClick={handleEditRound}
          >
            Edit
          </Button>,
          <Button key="cancel" onClick={closeEditModal}>
            Cancel
          </Button>,
        ]}
      >
        <div className="form_field">
          <label className="form_label">Round Name</label>
          <input
            type="text"
            className="form_input"
            value={editRoundData.round_name}
            onChange={(e) =>
              setEditRoundData({ ...editRoundData, round_name: e.target.value })
            }
          />
        </div>
      </Modal>

      {/* Delete Round Modal */}
      <Modal
        title="Delete Round"
        open={isDeleteModalOpen}
        onCancel={closeDeleteModal}
        footer={[
          <Button
            key="delete"
            danger
            loading={loading}
            onClick={handleDeleteRound}
          >
            Delete
          </Button>,
          <Button key="cancel" onClick={closeDeleteModal}>
            Cancel
          </Button>,
        ]}
      >
        <h3>Are you sure you want to delete "{selectedRound?.round_name}"?</h3>
      </Modal>

      {/* Finish Round Modal */}
      <Modal
        title="Finish Round"
        open={isFinishModalOpen}
        onCancel={closeFinishModal}
        footer={[
          <Button
            key="finish"
            type="primary"
            loading={loading}
            onClick={handleFinishRound}
          >
            Finish
          </Button>,
          <Button key="cancel" onClick={closeFinishModal}>
            Cancel
          </Button>,
        ]}
      >
        <h3>Are you sure you want to finish "{selectedRound?.round_name}"?</h3>
      </Modal>

      {/* Update Round Level Modal */}
      <Modal
        title="Update Round to Another Level"
        open={isUpdateLevelModalOpen}
        onCancel={closeUpdateLevelModal}
        footer={[
          <Button
            key="update"
            type="primary"
            loading={loading}
            onClick={handleUpdateForLevel}
          >
            Update
          </Button>,
          <Button key="cancel" onClick={closeUpdateLevelModal}>
            Cancel
          </Button>,
        ]}
      >
        <div className="form_field">
          <label className="form_label">Select Level</label>
          <Select
            style={{ width: "100%" }}
            placeholder="Select a level"
            options={levelOptions}
            value={updateLevelData.level_id}
            onChange={(value) => setUpdateLevelData({ level_id: value })}
          />
        </div>
      </Modal>
    </>
  );
};
