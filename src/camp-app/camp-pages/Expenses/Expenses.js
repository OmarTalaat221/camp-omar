import { Button, Dropdown, Modal, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../../component/common/breadcrumb/breadcrumb";
import { FaEllipsisVertical } from "react-icons/fa6";
import CreatableSelect from "react-select/creatable";
import axios from "axios";
import { BASE_URL } from "../../../Api/baseUrl";
import { toast } from "react-toastify";

const Expenses = () => {
  // Modal States (للتحكم في فتح/إغلاق المودال فقط)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [editLoading, setEditLoading] = useState(false);

  // Data States (للبيانات)
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [Expenses, setExpenses] = useState([]);
  const [Branches, setBranches] = useState([]);

  const AdminData = JSON.parse(localStorage.getItem("AdminData"));

  const initialExpenseData = {
    title: null,
    description: null,
    price: null,
    category: null,
    date: null,
    branch_id: null,
    admin_id: AdminData[0].admin_id,
  };

  const [NewExpensesData, setNewExpensesData] = useState(initialExpenseData);

  const [Category, setCategory] = useState([
    { value: "groceries", label: "Groceries" },
    { value: "electricity-bill", label: "Electricity Bill" },
    { value: "fuel", label: "Fuel" },
  ]);

  // فتح مودال التعديل
  const openEditModal = (row) => {
    setSelectedExpense({ ...row });
    setIsEditModalOpen(true);
  };

  // إغلاق مودال التعديل
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedExpense(null);
  };

  // فتح مودال الحذف
  const openDeleteModal = (row) => {
    setSelectedExpense(row);
    setIsDeleteModalOpen(true);
  };

  // إغلاق مودال الحذف
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedExpense(null);
  };

  // فتح مودال الإضافة
  const openAddModal = () => {
    setNewExpensesData(initialExpenseData);
    setIsAddModalOpen(true);
  };

  // إغلاق مودال الإضافة
  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setNewExpensesData(initialExpenseData);
  };

  const columns = [
    {
      id: "id",
      dataIndex: "id",
      title: "#",
    },
    {
      id: "expenses_title",
      dataIndex: "expenses_title",
      title: "title",
    },
    {
      id: "expenses_price",
      dataIndex: "expenses_price",
      title: "price",
      render: (text, row) => {
        return <p style={{ color: "green" }}>{row?.expenses_price}</p>;
      },
    },
    {
      id: "expenses_description",
      dataIndex: "expenses_description",
      title: "description",
    },
    {
      id: "expenses_category",
      dataIndex: "expenses_category",
      title: "category",
    },
    {
      id: "expenses_date",
      dataIndex: "expenses_date",
      title: "date",
    },
    {
      title: "Actions",
      render: (text, row) => {
        const items = [
          {
            key: 5,
            label: (
              <button
                className="btn btn-primary"
                onClick={() => openDeleteModal(row)}
              >
                Delete Expense
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
                Edit Expense
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

  const getExpenses = async () => {
    axios
      .get(BASE_URL + `/admin/Expenses/get_expenses.php`)
      .then((res) => {
        if (res.data.status === "success") {
          setExpenses(res.data.message);
        }
      })
      .catch((e) => console.log(e));
  };

  function handleGetBranches() {
    axios
      .get(BASE_URL + "/admin/branches/select_branch.php")
      .then((res) => {
        if (res?.data?.status === "success") {
          setBranches(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
  }

  const BranchesOptions = Branches.map((branche) => {
    return { value: branche?.branch_id, label: branche?.branch_name };
  });

  useEffect(() => {
    getExpenses();
    handleGetBranches();
  }, []);

  const handelAddExpense = async () => {
    const dataSend = {
      expenses_title: NewExpensesData?.title,
      expenses_description: NewExpensesData?.description,
      expenses_price: NewExpensesData?.price,
      expenses_category: NewExpensesData?.category,
      expenses_date: NewExpensesData?.date,
      branch_id: NewExpensesData?.branch_id,
      admin_id: NewExpensesData?.admin_id,
    };

    axios
      .post(
        BASE_URL + `/admin/Expenses/add_expenses.php`,
        JSON.stringify(dataSend)
      )
      .then((res) => {
        if (res.data.status === "success") {
          toast.success(res.data.message);
          closeAddModal();
          getExpenses();
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((e) => console.log(e));
  };

  const handelEditExpense = async () => {
    setEditLoading(true);
    const dataSend = {
      expenses_title: selectedExpense?.expenses_title,
      expenses_description: selectedExpense?.expenses_description,
      expenses_price: selectedExpense?.expenses_price,
      expenses_category: selectedExpense?.expenses_category,
      expenses_date: selectedExpense?.expenses_date,
      expenses_id: selectedExpense?.id,
      branch_id: selectedExpense?.branch_id,
    };

    axios
      .post(
        BASE_URL + `/admin/Expenses/edit_expenses.php`,
        JSON.stringify(dataSend)
      )
      .then((res) => {
        if (res.data.status === "success") {
          toast.success(res.data.message);
          closeEditModal();
          getExpenses();
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setEditLoading(false);
      });
  };

  const handelDeleteExpense = async () => {
    const dataSend = {
      expenses_id: selectedExpense?.id,
    };

    axios
      .post(
        BASE_URL + `/admin/Expenses/delete_expenses.php`,
        JSON.stringify(dataSend)
      )
      .then((res) => {
        if (res.data.status === "success") {
          toast.success(res.data.message);
          closeDeleteModal();
          getExpenses();
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((e) => console.log(e));
  };

  function handelCreatOption(inputValue) {
    const newCategory = { value: inputValue.toLowerCase(), label: inputValue };
    setCategory((prevCategory) => [...prevCategory, newCategory]);
  }

  // Helper function to get category option
  const getCategoryOption = (categoryValue) => {
    if (!categoryValue) return null;
    const found = Category.find((cat) => cat.value === categoryValue);
    if (found) return found;
    return { value: categoryValue, label: categoryValue };
  };

  // Helper function to get branch option
  const getBranchOption = (branchId) => {
    if (!branchId) return null;
    return BranchesOptions.find((branch) => branch.value === branchId) || null;
  };

  return (
    <>
      <Breadcrumbs parent="Expenses" title="Expenses List" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>List Expenses</h5>
                <Button
                  color="primary btn-pill"
                  style={{ margin: "10px 0" }}
                  onClick={openAddModal}
                >
                  Add Expenses
                </Button>
              </div>
              <div className="card-body">
                <Table
                  scroll={{ x: "max-content" }}
                  columns={columns}
                  dataSource={Expenses}
                  rowKey="id"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Modal */}
      <Modal
        title="Add Expense"
        open={isAddModalOpen}
        onCancel={closeAddModal}
        footer={[
          <Button key="add" onClick={handelAddExpense}>
            Add
          </Button>,
          <Button key="cancel" onClick={closeAddModal}>
            Cancel
          </Button>,
        ]}
      >
        <div className="form_field">
          <label className="form_label">Expense's title</label>
          <input
            type="text"
            className="form_input"
            value={NewExpensesData.title || ""}
            onChange={(e) =>
              setNewExpensesData({ ...NewExpensesData, title: e.target.value })
            }
          />
        </div>
        <div className="form_field">
          <label className="form_label">Expense's description</label>
          <input
            type="text"
            className="form_input"
            value={NewExpensesData.description || ""}
            onChange={(e) =>
              setNewExpensesData({
                ...NewExpensesData,
                description: e.target.value,
              })
            }
          />
        </div>
        <div className="form_field">
          <label className="form_label">Expense's category</label>
          <CreatableSelect
            placeholder="you can pick or write an option"
            options={Category}
            onCreateOption={handelCreatOption}
            value={getCategoryOption(NewExpensesData.category)}
            onChange={(e) =>
              setNewExpensesData({ ...NewExpensesData, category: e?.value })
            }
          />
        </div>
        <div className="form_field">
          <label className="form_label">Expense's price</label>
          <input
            type="number"
            className="form_input"
            value={NewExpensesData.price || ""}
            onChange={(e) =>
              setNewExpensesData({ ...NewExpensesData, price: e.target.value })
            }
          />
        </div>
        <div className="form_field">
          <label className="form_label">Expense's branch</label>
          <Select
            placeholder="pick expense's branch"
            options={BranchesOptions}
            value={NewExpensesData.branch_id}
            onChange={(e) =>
              setNewExpensesData({ ...NewExpensesData, branch_id: e })
            }
          />
        </div>
        <div className="form_field">
          <label className="form_label">Expense's date</label>
          <input
            type="date"
            className="form_input"
            value={NewExpensesData.date || ""}
            onChange={(e) =>
              setNewExpensesData({ ...NewExpensesData, date: e.target.value })
            }
          />
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal
        title="Edit Expense"
        open={isEditModalOpen}
        onCancel={closeEditModal}
        footer={[
          <Button loading={editLoading} key="edit" onClick={handelEditExpense}>
            Edit
          </Button>,
          <Button key="cancel" onClick={closeEditModal}>
            Cancel
          </Button>,
        ]}
      >
        {selectedExpense && (
          <>
            <div className="form_field">
              <label className="form_label">Expense's title</label>
              <input
                type="text"
                className="form_input"
                value={selectedExpense.expenses_title || ""}
                onChange={(e) =>
                  setSelectedExpense({
                    ...selectedExpense,
                    expenses_title: e.target.value,
                  })
                }
              />
            </div>
            <div className="form_field">
              <label className="form_label">Expense's description</label>
              <input
                type="text"
                className="form_input"
                value={selectedExpense.expenses_description || ""}
                onChange={(e) =>
                  setSelectedExpense({
                    ...selectedExpense,
                    expenses_description: e.target.value,
                  })
                }
              />
            </div>
            <div className="form_field">
              <label className="form_label">Expense's category</label>
              <CreatableSelect
                placeholder="you can pick or write an option"
                options={Category}
                onCreateOption={handelCreatOption}
                value={getCategoryOption(selectedExpense.expenses_category)}
                onChange={(e) =>
                  setSelectedExpense({
                    ...selectedExpense,
                    expenses_category: e?.value,
                  })
                }
              />
            </div>
            <div className="form_field">
              <label className="form_label">Expense's branch</label>
              <Select
                placeholder="pick expense's branch"
                options={BranchesOptions}
                value={selectedExpense.branch_id}
                onChange={(e) =>
                  setSelectedExpense({
                    ...selectedExpense,
                    branch_id: e,
                  })
                }
              />
            </div>
            <div className="form_field">
              <label className="form_label">Expense's price</label>
              <input
                type="number"
                className="form_input"
                value={selectedExpense.expenses_price || ""}
                onChange={(e) =>
                  setSelectedExpense({
                    ...selectedExpense,
                    expenses_price: e.target.value,
                  })
                }
              />
            </div>
            <div className="form_field">
              <label className="form_label">Expense's date</label>
              <input
                type="date"
                className="form_input"
                value={selectedExpense.expenses_date || ""}
                onChange={(e) =>
                  setSelectedExpense({
                    ...selectedExpense,
                    expenses_date: e.target.value,
                  })
                }
              />
            </div>
          </>
        )}
      </Modal>

      {/* Delete Modal */}
      <Modal
        title={`Delete Expense: (${selectedExpense?.expenses_title || ""})`}
        open={isDeleteModalOpen}
        onCancel={closeDeleteModal}
        footer={[
          <Button key="delete" danger onClick={handelDeleteExpense}>
            Delete
          </Button>,
          <Button key="cancel" onClick={closeDeleteModal}>
            Cancel
          </Button>,
        ]}
      >
        <h3>Are you sure that you want to delete this Expense?</h3>
      </Modal>
    </>
  );
};

export default Expenses;
