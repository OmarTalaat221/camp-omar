import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../../component/common/breadcrumb/breadcrumb";
import { Button, Dropdown, Modal, Table } from "antd";
import { BASE_URL } from "../../../Api/baseUrl";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEllipsisVertical } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

const BranchesList = () => {
  // Data States
  const [Branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);

  // Modal States (boolean only)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Loading States
  const [fetchLoading, setFetchLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const initialBranchData = {
    branch_name: null,
    phone: null,
    location: "",
  };

  const [NewBranchData, setNewBranchData] = useState(initialBranchData);

  const navigate = useNavigate();

  // Modal Control Functions
  const openAddModal = () => {
    setNewBranchData(initialBranchData);
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setNewBranchData(initialBranchData);
  };

  const openEditModal = (row) => {
    setSelectedBranch({ ...row });
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedBranch(null);
  };

  const openDeleteModal = (row) => {
    setSelectedBranch(row);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedBranch(null);
  };

  const columns = [
    {
      id: "branch_id",
      dataIndex: "branch_id",
      title: "#",
    },
    {
      id: "branch_name",
      dataIndex: "branch_name",
      title: "branch name",
    },
    {
      id: "location",
      dataIndex: "location",
      title: "location name",
    },
    {
      id: "phone",
      dataIndex: "phone",
      title: "phone",
    },
    {
      title: "Actions",
      render: (text, row) => {
        const items = [
          {
            key: 3,
            label: (
              <Link
                to={`${process.env.PUBLIC_URL}/branches/${row?.branch_id}/students`}
                className="btn btn-primary text-white"
              >
                Branch students
              </Link>
            ),
          },
          {
            key: 4,
            label: (
              <Link
                to={`${process.env.PUBLIC_URL}/branches/${row?.branch_id}/Roundes`}
                className="btn btn-primary text-white"
              >
                Branch Rounds
              </Link>
            ),
          },
          {
            key: 5,
            label: (
              <button
                className="btn btn-primary"
                onClick={() => openDeleteModal(row)}
              >
                Delete branch
              </button>
            ),
          },
          {
            key: 6,
            label: (
              <button
                className="btn btn-primary"
                onClick={() => openEditModal(row)}
              >
                Edit branch
              </button>
            ),
          },
        ];
        return (
          <div className="d-flex gap-2 align-items-center">
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

  function handleGetBranches() {
    setFetchLoading(true);
    axios
      .get(BASE_URL + "/admin/branches/select_branch.php")
      .then((res) => {
        console.log(res);
        if (res?.data?.status == "success") {
          setBranches(res?.data?.message);
        }
      })
      .catch((e) => console.log(e))
      .finally(() => setFetchLoading(false));
  }

  useEffect(() => {
    handleGetBranches();
  }, []);

  function handleAddNewBranch() {
    const dataSend = {
      branch_name: NewBranchData.branch_name,
      phone: NewBranchData.phone,
      location: NewBranchData?.location,
    };

    setAddLoading(true);
    axios
      .post(
        BASE_URL + "/admin/branches/add_branch.php",
        JSON.stringify(dataSend)
      )
      .then((res) => {
        console.log(res);
        if (res?.data?.status == "success") {
          toast.success(res?.data?.message);
          closeAddModal();
          handleGetBranches();
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((e) => {
        console.log(e);
        toast.error("Something went wrong!");
      })
      .finally(() => setAddLoading(false));
  }

  function handleDeleteBranch() {
    const dataSend = {
      branch_id: selectedBranch?.branch_id,
    };

    setDeleteLoading(true);
    axios
      .post(
        BASE_URL + "/admin/branches/delete_branch.php",
        JSON.stringify(dataSend)
      )
      .then((res) => {
        console.log(res);
        if (res?.data?.status == "success") {
          toast.success(res?.data?.message);
          closeDeleteModal();
          handleGetBranches();
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((e) => {
        console.log(e);
        toast.error("Something went wrong!");
      })
      .finally(() => setDeleteLoading(false));
  }

  function handelEditBranch() {
    const dataSend = {
      branch_id: selectedBranch?.branch_id,
      branch_name: selectedBranch?.branch_name,
      phone: selectedBranch?.phone,
      location: selectedBranch?.location,
    };

    setEditLoading(true);
    axios
      .post(
        BASE_URL + "/admin/branches/edit_branch.php",
        JSON.stringify(dataSend)
      )
      .then((res) => {
        console.log(res);
        if (res?.data?.status == "success") {
          toast.success(res?.data?.message);
          closeEditModal();
          handleGetBranches();
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((e) => {
        console.log(e);
        toast.error("Something went wrong!");
      })
      .finally(() => setEditLoading(false));
  }

  return (
    <>
      <Breadcrumbs parent="Branches" title="Branches List" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>List Branches</h5>
                <Button
                  color="primary btn-pill"
                  style={{ margin: "10px 0" }}
                  onClick={openAddModal}
                >
                  Add Branch
                </Button>
              </div>
              <div className="card-body">
                <Table
                  loading={fetchLoading}
                  scroll={{
                    x: "max-content",
                  }}
                  columns={columns}
                  dataSource={Branches}
                  rowKey="branch_id"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= Add Modal========================== */}

      <Modal
        title="Add Branch"
        open={isAddModalOpen}
        footer={
          <>
            <Button
              type="primary"
              style={{ margin: "0px 10px " }}
              loading={addLoading}
              onClick={() => handleAddNewBranch()}
            >
              Add
            </Button>
            <Button onClick={closeAddModal} disabled={addLoading}>
              Cancel
            </Button>
          </>
        }
        onCancel={closeAddModal}
      >
        <>
          <div className="form_field">
            <label className="form_label">Branch Name</label>
            <input
              type="text"
              className="form_input"
              value={NewBranchData.branch_name || ""}
              onChange={(e) => {
                setNewBranchData({
                  ...NewBranchData,
                  branch_name: e.target.value,
                });
              }}
            />
          </div>
          <div className="form_field">
            <label className="form_label">Branch location</label>
            <input
              type="text"
              className="form_input"
              value={NewBranchData.location || ""}
              onChange={(e) => {
                setNewBranchData({
                  ...NewBranchData,
                  location: e.target.value,
                });
              }}
            />
          </div>
          <div className="form_field">
            <label className="form_label">phone</label>
            <input
              type="number"
              className="form_input"
              value={NewBranchData.phone || ""}
              onChange={(e) => {
                setNewBranchData({
                  ...NewBranchData,
                  phone: e.target.value,
                });
              }}
            />
          </div>
        </>
      </Modal>

      {/* ======================= Delete Modal ================================ */}

      <Modal
        title="Delete branch"
        open={isDeleteModalOpen}
        footer={
          <>
            <Button
              type="primary"
              danger
              style={{ margin: "0px 10px " }}
              loading={deleteLoading}
              onClick={handleDeleteBranch}
            >
              Delete
            </Button>
            <Button onClick={closeDeleteModal} disabled={deleteLoading}>
              Cancel
            </Button>
          </>
        }
        onCancel={closeDeleteModal}
      >
        <h3>Are you sure that you want to delete this branch</h3>
      </Modal>

      {/* ========================= Edit Modal ======================================= */}

      <Modal
        title="Edit Branch"
        open={isEditModalOpen}
        footer={
          <>
            <Button
              type="primary"
              style={{ margin: "0px 10px " }}
              loading={editLoading}
              onClick={() => handelEditBranch()}
            >
              Edit
            </Button>
            <Button onClick={closeEditModal} disabled={editLoading}>
              Cancel
            </Button>
          </>
        }
        onCancel={closeEditModal}
      >
        {selectedBranch && (
          <>
            <div className="form_field">
              <label className="form_label">Branch Name</label>
              <input
                type="text"
                className="form_input"
                value={selectedBranch?.branch_name || ""}
                onChange={(e) => {
                  setSelectedBranch({
                    ...selectedBranch,
                    branch_name: e.target.value,
                  });
                }}
              />
            </div>
            <div className="form_field">
              <label className="form_label">Branch location</label>
              <input
                type="text"
                className="form_input"
                value={selectedBranch?.location || ""}
                onChange={(e) => {
                  setSelectedBranch({
                    ...selectedBranch,
                    location: e.target.value,
                  });
                }}
              />
            </div>
            <div className="form_field">
              <label className="form_label">phone</label>
              <input
                type="text"
                className="form_input"
                value={selectedBranch?.phone || ""}
                onChange={(e) => {
                  setSelectedBranch({
                    ...selectedBranch,
                    phone: e.target.value,
                  });
                }}
              />
            </div>
          </>
        )}
      </Modal>
    </>
  );
};

export default BranchesList;
