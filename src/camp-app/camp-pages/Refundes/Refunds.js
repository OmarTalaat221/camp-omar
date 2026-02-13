import { Button, Dropdown, Modal, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../../component/common/breadcrumb/breadcrumb";
import axios from "axios";
import { BASE_URL } from "../../../Api/baseUrl";
import CreatableSelect from "react-select/creatable";
import { toast } from "react-toastify";
import { FaEllipsisVertical } from "react-icons/fa6";

const Refunds = () => {
  // Data States
  const [Refunds, setRefunds] = useState([]);
  const [Branches, setBranches] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedRefund, setSelectedRefund] = useState(null);

  // Modal States (boolean only)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Loading States
  const [addLoading, setAddLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);

  const AdminData = JSON.parse(localStorage.getItem("AdminData"));

  const initialRefundData = {
    refunds_title: null,
    refunds_description: null,
    refunds_price: null,
    refunds_category: null,
    refunds_date: null,
    branch_id: null,
    admin_id: AdminData[0].admin_id,
    sub_id: null,
  };

  const [NewRefundsData, setNewRefundsData] = useState(initialRefundData);

  const [Category, setCategory] = useState([
    { value: "groceries", label: "Groceries" },
    { value: "electricity-bill", label: "Electricity Bill" },
    { value: "fuel", label: "Fuel" },
  ]);

  // Modal Control Functions
  const openAddModal = () => {
    setNewRefundsData(initialRefundData);
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setNewRefundsData(initialRefundData);
  };

  const openEditModal = (row) => {
    setSelectedRefund({ ...row });
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedRefund(null);
  };

  const openDeleteModal = (row) => {
    setSelectedRefund(row);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedRefund(null);
  };

  // Helper Functions
  const getCategoryOption = (categoryValue) => {
    if (!categoryValue) return null;
    const found = Category.find((cat) => cat.value === categoryValue);
    if (found) return found;
    return { value: categoryValue, label: categoryValue };
  };

  const getBranchOption = (branchId) => {
    if (!branchId) return null;
    return BranchesOptions.find((branch) => branch.value === branchId) || null;
  };

  const getStudentOption = (subId) => {
    if (!subId) return null;
    return StudentsOptions.find((student) => student.value === subId) || null;
  };

  const columns = [
    {
      id: "id",
      dataIndex: "id",
      title: "#",
    },
    {
      id: "name",
      dataIndex: "name",
      title: "student name",
      render: (text, row) => {
        return <p>{row?.student_data?.name}</p>;
      },
    },
    {
      id: "refunds_title",
      dataIndex: "refunds_title",
      title: "Title",
    },
    {
      id: "refunds_description",
      dataIndex: "refunds_description",
      title: "description",
    },
    {
      id: "refunds_category",
      dataIndex: "refunds_category",
      title: "category",
    },
    {
      id: "refunds_price",
      dataIndex: "refunds_price",
      title: "refunds price",
      render: (text) => <p style={{ color: "red" }}>{text}</p>,
    },
    {
      id: "refunds_date",
      dataIndex: "refunds_date",
      title: "refunds date",
    },
    {
      title: "Actions",
      render: (text, row) => {
        const items = [
          {
            key: "delete",
            label: (
              <button
                className="btn btn-primary"
                onClick={() => openDeleteModal(row)}
              >
                Delete Refund
              </button>
            ),
          },
          {
            key: "edit",
            label: (
              <button
                className="btn btn-primary"
                onClick={() => openEditModal(row)}
              >
                Edit Refund
              </button>
            ),
          },
        ];
        return (
          <div className="d-flex gap-2 align-items-center">
            <Dropdown menu={{ items }} placement="bottom">
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

  // API Calls
  const getRefunds = async () => {
    setFetchLoading(true);
    axios
      .get(BASE_URL + `/admin/refunds/get_refund.php`)
      .then((res) => {
        if (res.data.status === "success") {
          setRefunds(res.data.message);
        }
      })
      .catch((e) => console.log(e))
      .finally(() => setFetchLoading(false));
  };

  const handleGetBranches = () => {
    axios
      .get(BASE_URL + "/admin/branches/select_branch.php")
      .then((res) => {
        if (res?.data?.status === "success") {
          setBranches(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
  };

  const handleGetStudents = () => {
    axios
      .get(
        BASE_URL + "/admin/subscription/select_student_to_activate_level.php"
      )
      .then((res) => {
        if (res?.data?.status === "success") {
          setStudents(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
  };

  const BranchesOptions = Branches.map((branche) => ({
    value: branche?.branch_id,
    label: branche?.branch_name,
  }));

  const StudentsOptions = students.map((student) => ({
    value: student?.subscription_id,
    label: student?.student_name,
  }));

  useEffect(() => {
    getRefunds();
    handleGetBranches();
    handleGetStudents();
  }, []);

  const handelAddRefund = async () => {
    const dataSend = {
      refunds_title: NewRefundsData?.refunds_title,
      refunds_description: NewRefundsData?.refunds_description,
      refunds_price: NewRefundsData?.refunds_price,
      refunds_category: NewRefundsData?.refunds_category,
      refunds_date: NewRefundsData?.refunds_date,
      branch_id: NewRefundsData?.branch_id,
      admin_id: NewRefundsData?.admin_id,
      sub_id: NewRefundsData?.sub_id,
    };

    setAddLoading(true);
    axios
      .post(
        BASE_URL + `/admin/refunds/add_refund.php`,
        JSON.stringify(dataSend)
      )
      .then((res) => {
        if (res.data.status === "success") {
          toast.success(res.data.message);
          closeAddModal();
          getRefunds();
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((e) => {
        console.log(e);
        toast.error("Something went wrong!");
      })
      .finally(() => setAddLoading(false));
  };

  const handelEditRefund = async () => {
    const dataSend = {
      refunds_title: selectedRefund?.refunds_title,
      refunds_description: selectedRefund?.refunds_description,
      refunds_price: selectedRefund?.refunds_price,
      refunds_category: selectedRefund?.refunds_category,
      refunds_date: selectedRefund?.refunds_date,
      refunds_id: selectedRefund?.id,
      branch_id: selectedRefund?.branch_id,
    };

    setEditLoading(true);
    axios
      .post(
        BASE_URL + `/admin/refunds/edit_refund.php`,
        JSON.stringify(dataSend)
      )
      .then((res) => {
        if (res.data.status === "success") {
          toast.success(res.data.message);
          closeEditModal();
          getRefunds();
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((e) => {
        console.log(e);
        toast.error("Something went wrong!");
      })
      .finally(() => setEditLoading(false));
  };

  const handelDeleteRefund = async () => {
    const dataSend = {
      refunds_id: selectedRefund?.id,
    };

    setDeleteLoading(true);
    axios
      .post(
        BASE_URL + `/admin/refunds/delete_refund.php`,
        JSON.stringify(dataSend)
      )
      .then((res) => {
        if (res.data.status === "success") {
          toast.success(res.data.message);
          closeDeleteModal();
          getRefunds();
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((e) => {
        console.log(e);
        toast.error("Something went wrong!");
      })
      .finally(() => setDeleteLoading(false));
  };

  const handelCreatOption = (inputValue) => {
    const newCategory = { value: inputValue.toLowerCase(), label: inputValue };
    setCategory((prevCategory) => [...prevCategory, newCategory]);
  };

  return (
    <>
      <Breadcrumbs parent="Refund" title="Refund List" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>List Refunds</h5>
                <Button
                  color="primary btn-pill"
                  style={{ margin: "10px 0" }}
                  onClick={openAddModal}
                >
                  Add Refund
                </Button>
              </div>
              <div className="card-body">
                <Table
                  loading={fetchLoading}
                  scroll={{ x: "max-content" }}
                  columns={columns}
                  dataSource={Refunds}
                  rowKey="id"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Modal */}
      <Modal
        title="Add Refund"
        open={isAddModalOpen}
        onCancel={closeAddModal}
        footer={[
          <Button
            key="add"
            type="primary"
            loading={addLoading}
            onClick={handelAddRefund}
          >
            Add
          </Button>,
          <Button key="cancel" onClick={closeAddModal} disabled={addLoading}>
            Cancel
          </Button>,
        ]}
      >
        <div className="form_field">
          <label className="form_label">Refund's student</label>
          <Select
            showSearch={true}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            placeholder="pick Refund's student"
            options={StudentsOptions}
            value={NewRefundsData.sub_id}
            onChange={(e) => {
              setNewRefundsData({
                ...NewRefundsData,
                sub_id: e,
              });
            }}
            style={{ width: "100%" }}
          />
        </div>
        <div className="form_field">
          <label className="form_label">Refund's title</label>
          <input
            type="text"
            className="form_input"
            value={NewRefundsData.refunds_title || ""}
            onChange={(e) => {
              setNewRefundsData({
                ...NewRefundsData,
                refunds_title: e.target.value,
              });
            }}
          />
        </div>
        <div className="form_field">
          <label className="form_label">Refund's description</label>
          <input
            type="text"
            className="form_input"
            value={NewRefundsData.refunds_description || ""}
            onChange={(e) => {
              setNewRefundsData({
                ...NewRefundsData,
                refunds_description: e.target.value,
              });
            }}
          />
        </div>
        <div className="form_field">
          <label className="form_label">Refund's price</label>
          <input
            type="number"
            className="form_input"
            value={NewRefundsData.refunds_price || ""}
            onChange={(e) => {
              setNewRefundsData({
                ...NewRefundsData,
                refunds_price: e.target.value,
              });
            }}
          />
        </div>
        <div className="form_field">
          <label className="form_label">Refund's branch</label>
          <Select
            showSearch={true}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            placeholder="pick Refund's branch"
            options={BranchesOptions}
            value={NewRefundsData.branch_id}
            onChange={(e) => {
              setNewRefundsData({
                ...NewRefundsData,
                branch_id: e,
              });
            }}
            style={{ width: "100%" }}
          />
        </div>
        <div className="form_field">
          <label className="form_label">Refund's date</label>
          <input
            type="date"
            className="form_input"
            value={NewRefundsData.refunds_date || ""}
            onChange={(e) => {
              setNewRefundsData({
                ...NewRefundsData,
                refunds_date: e.target.value,
              });
            }}
          />
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal
        title={`Edit Refund - ${selectedRefund?.student_data?.name || ""}`}
        open={isEditModalOpen}
        onCancel={closeEditModal}
        footer={[
          <Button
            key="edit"
            type="primary"
            loading={editLoading}
            onClick={handelEditRefund}
          >
            Edit
          </Button>,
          <Button key="cancel" onClick={closeEditModal} disabled={editLoading}>
            Cancel
          </Button>,
        ]}
      >
        {selectedRefund && (
          <>
            <div className="form_field">
              <label className="form_label">Refund's title</label>
              <input
                type="text"
                className="form_input"
                value={selectedRefund.refunds_title || ""}
                onChange={(e) => {
                  setSelectedRefund({
                    ...selectedRefund,
                    refunds_title: e.target.value,
                  });
                }}
              />
            </div>
            <div className="form_field">
              <label className="form_label">Refund's description</label>
              <input
                type="text"
                className="form_input"
                value={selectedRefund.refunds_description || ""}
                onChange={(e) => {
                  setSelectedRefund({
                    ...selectedRefund,
                    refunds_description: e.target.value,
                  });
                }}
              />
            </div>
            <div className="form_field">
              <label className="form_label">Refund's category</label>
              <CreatableSelect
                placeholder="you can pick or write an option"
                options={Category}
                onCreateOption={handelCreatOption}
                value={getCategoryOption(selectedRefund.refunds_category)}
                onChange={(e) => {
                  setSelectedRefund({
                    ...selectedRefund,
                    refunds_category: e?.value,
                  });
                }}
              />
            </div>
            <div className="form_field">
              <label className="form_label">Refund's price</label>
              <input
                type="number"
                className="form_input"
                value={selectedRefund.refunds_price || ""}
                onChange={(e) => {
                  setSelectedRefund({
                    ...selectedRefund,
                    refunds_price: e.target.value,
                  });
                }}
              />
            </div>
            <div className="form_field">
              <label className="form_label">Refund's branch</label>
              <Select
                showSearch={true}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                placeholder="pick Refund's branch"
                options={BranchesOptions}
                value={selectedRefund.branch_id}
                onChange={(e) => {
                  setSelectedRefund({
                    ...selectedRefund,
                    branch_id: e,
                  });
                }}
                style={{ width: "100%" }}
              />
            </div>
            <div className="form_field">
              <label className="form_label">Refund's date</label>
              <input
                type="date"
                className="form_input"
                value={selectedRefund.refunds_date || ""}
                onChange={(e) => {
                  setSelectedRefund({
                    ...selectedRefund,
                    refunds_date: e.target.value,
                  });
                }}
              />
            </div>
          </>
        )}
      </Modal>

      {/* Delete Modal */}
      <Modal
        title={`Delete Refund: (${selectedRefund?.refunds_title || ""})`}
        open={isDeleteModalOpen}
        onCancel={closeDeleteModal}
        footer={[
          <Button
            key="delete"
            danger
            type="primary"
            loading={deleteLoading}
            onClick={handelDeleteRefund}
          >
            Delete
          </Button>,
          <Button
            key="cancel"
            onClick={closeDeleteModal}
            disabled={deleteLoading}
          >
            Cancel
          </Button>,
        ]}
      >
        <h3>Are you sure that you want to delete this Refund?</h3>
      </Modal>
    </>
  );
};

export default Refunds;
