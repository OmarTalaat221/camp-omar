import { Button, Dropdown, Modal, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../../component/common/breadcrumb/breadcrumb";
import { FaEllipsisVertical } from "react-icons/fa6";
import CreatableSelect from "react-select/creatable";
import axios from "axios";
import { BASE_URL } from "../../../Api/baseUrl";
import { toast } from "react-toastify";

const Expenses = () => {
  const [AddExpensesModal, setAddExpensesModal] = useState(false);
  const [EditExpensesModal, setEditExpensesModal] = useState(null);
  const [DeleteExpensesModal, setDeleteExpensesModal] = useState(null);
  const [Expenses, setExpenses] = useState([]);

  const AdminData = JSON.parse(localStorage.getItem("AdminData"));

  const [NewExpensesData, setNewExpensesData] = useState({
    title: null,
    description: null,
    price: null,
    category: null,
    date: null,
    branch_id: null,
    admin_id: AdminData[0].admin_id,
  });

  const [Category, setCategory] = useState([
    { value: "groceries", label: "Groceries" },
    { value: "electricity-bill", label: "Electricity Bill" },
    { value: "fuel", label: "Fuel" },
  ]);

  //   const expenses = [
  //     {
  //       id: 1,
  //       title: "Groceries",
  //       price: 50.75,
  //       date: "2025-01-15",
  //       category: "Food & Drinks",
  //       description: "Weekly groceries from the local supermarket.",
  //     },
  //     {
  //       id: 2,
  //       title: "Electricity Bill",
  //       price: 100.5,
  //       date: "2025-01-10",
  //       category: "Utilities",
  //       description: "Monthly electricity bill payment.",
  //     },
  //     {
  //       id: 3,
  //       title: "Gym Membership",
  //       price: 30.0,
  //       date: "2025-01-05",
  //       category: "Health & Fitness",
  //       description: "Monthly gym membership renewal.",
  //     },
  //     {
  //       id: 4,
  //       title: "Netflix Subscription",
  //       price: 15.99,
  //       date: "2025-01-01",
  //       category: "Entertainment",
  //       description: "Monthly Netflix streaming service subscription.",
  //     },
  //     {
  //       id: 5,
  //       title: "Fuel",
  //       price: 40.0,
  //       date: "2025-01-14",
  //       category: "Transportation",
  //       description: "Fuel for the car filled at the gas station.",
  //     },
  //   ];

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
        return (
          <>
            <p style={{ color: "green" }}>{row?.expenses_price}</p>
          </>
        );
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
                onClick={() => {
                  setDeleteExpensesModal(row);
                }}
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
                onClick={() => {
                  setEditExpensesModal(row);
                }}
              >
                Edit Expense
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

  const getExpenses = async () => {
    axios
      .get(BASE_URL + `/admin/Expenses/get_expenses.php`)
      .then((res) => {
        console.log(res);
        if (res.data.status == "success") {
          setExpenses(res.data.message);
        }
      })
      .catch((e) => console.log(e));
  };

  const [Branches, setBranches] = useState([]);

  function handleGetBranches() {
    axios
      .get(BASE_URL + "/admin/branches/select_branch.php")
      .then((res) => {
        console.log(res);
        if (res?.data?.status == "success") {
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

    console.log(dataSend);

    axios
      .post(
        BASE_URL + `/admin/Expenses/add_expenses.php`,
        JSON.stringify(dataSend)
      )
      .then((res) => {
        console.log(res);
        if (res.data.status == "success") {
          toast.success(res.data.message);
          setAddExpensesModal(false);
          getExpenses();
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((e) => console.log(e));
  };

  const handelEditExpense = async () => {
    const dataSend = {
      expenses_title: EditExpensesModal?.expenses_title,
      expenses_description: EditExpensesModal?.expenses_description,
      expenses_price: EditExpensesModal?.expenses_price,
      expenses_category: EditExpensesModal?.expenses_category,
      expenses_date: EditExpensesModal?.expenses_date,
      expenses_id: EditExpensesModal?.id,
      branch_id: EditExpensesModal?.branch_id,
    };
    console.log(dataSend);

    axios
      .post(
        BASE_URL + `/admin/Expenses/edit_expenses.php`,
        JSON.stringify(dataSend)
      )
      .then((res) => {
        console.log(res);
        if (res.data.status == "success") {
          toast.success(res.data.message);
          setEditExpensesModal(null);
          getExpenses();
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((e) => console.log(e));
  };

  const handelDeleteExpense = async (id) => {
    const dataSend = {
      expenses_id: id,
    };

    console.log(dataSend);

    axios
      .post(
        BASE_URL + `/admin/Expenses/delete_expenses.php`,
        JSON.stringify(dataSend)
      )
      .then((res) => {
        console.log(res);
        if (res.data.status == "success") {
          toast.success(res.data.message);
          setDeleteExpensesModal(null);
          getExpenses();
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((e) => console.log(e));
  };

  function handelCreatOption(inputValue) {
    const newCategory = { value: inputValue.toLowerCase(), label: inputValue };
    console.log(newCategory, inputValue);

    setCategory((prevCategory) => [...prevCategory, newCategory]);
  }

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
                  onClick={() => setAddExpensesModal(true)}
                >
                  Add Expenses
                </Button>
              </div>
              <div className="card-body">
                <Table
                  scroll={{
                    x: "max-content",
                  }}
                  columns={columns}
                  dataSource={Expenses}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Add Expense"
        open={AddExpensesModal}
        onCancel={() => setAddExpensesModal(false)}
        footer={[
          <Button onClick={handelAddExpense}>Add</Button>,
          <Button key="cancel" onClick={() => setAddExpensesModal(false)}>
            Cancel
          </Button>,
        ]}
      >
        <>
          <div className="form_field">
            <label className="form_label">Expense's title</label>
            <input
              type="text"
              className="form_input"
              onChange={(e) => {
                setNewExpensesData({
                  ...NewExpensesData,
                  title: e.target.value,
                });
              }}
            />
          </div>
          <div className="form_field">
            <label className="form_label">Expense's description</label>
            <input
              type="text"
              className="form_input"
              onChange={(e) => {
                setNewExpensesData({
                  ...NewExpensesData,
                  description: e.target.value,
                });
              }}
            />
          </div>
          <div className="form_field">
            <label className="form_label">Expense's category</label>
            <CreatableSelect
              placeholder="you can pick or write an option"
              options={Category}
              onCreateOption={handelCreatOption}
              onChange={(e) => {
                setNewExpensesData({
                  ...NewExpensesData,
                  category: e?.value,
                });
              }}
            />
          </div>
          <div className="form_field">
            <label className="form_label">Expense's price</label>
            <input
              type="number"
              className="form_input"
              onChange={(e) => {
                setNewExpensesData({
                  ...NewExpensesData,
                  price: e.target.value,
                });
              }}
            />
          </div>
          <div className="form_field">
            <label className="form_label">Expense's branche</label>
            <Select
              placeholder="pick expense's branch"
              options={BranchesOptions}
              onChange={(e) => {
                setNewExpensesData({
                  ...NewExpensesData,
                  branch_id: e,
                });
              }}
            />
          </div>
          <div className="form_field">
            <label className="form_label">Expense's date</label>
            <input
              type="date"
              className="form_input"
              onChange={(e) => {
                setNewExpensesData({
                  ...NewExpensesData,
                  date: e.target.value,
                });
              }}
            />
          </div>
        </>
      </Modal>

      <Modal
        title="Edit Expense"
        open={EditExpensesModal}
        onCancel={() => setEditExpensesModal(null)}
        footer={[
          <Button onClick={handelEditExpense}>Edit</Button>,
          <Button key="cancel" onClick={() => setEditExpensesModal(null)}>
            Cancel
          </Button>,
        ]}
      >
        <>
          <div className="form_field">
            <label className="form_label">Expense's title</label>
            <input
              type="text"
              className="form_input"
              defaultValue={EditExpensesModal?.expenses_title || ""}
              onChange={(e) => {
                setEditExpensesModal({
                  ...EditExpensesModal,
                  expenses_title: e.target.value,
                });
              }}
            />
          </div>
          <div className="form_field">
            <label className="form_label">Expense's description</label>
            <input
              type="text"
              className="form_input"
              defaultValue={EditExpensesModal?.expenses_description || ""}
              onChange={(e) => {
                setEditExpensesModal({
                  ...EditExpensesModal,
                  expenses_description: e.target.value,
                });
              }}
            />
          </div>
          <div className="form_field">
            <label className="form_label">Expense's category</label>
            <CreatableSelect
              placeholder="you can pick or write an option"
              options={Category}
              onCreateOption={handelCreatOption}
              defaultValue={EditExpensesModal?.expenses_category || ""}
              onChange={(e) => {
                setEditExpensesModal({
                  ...EditExpensesModal,
                  expenses_category: e?.value,
                });
              }}
            />
          </div>
          <div className="form_field">
            <label className="form_label">Expense's branche</label>
            <Select
              placeholder="pick expense's branch"
              options={BranchesOptions}
              onChange={(e) => {
                setEditExpensesModal({
                  ...EditExpensesModal,
                  branch_id: e,
                });
              }}
            />
          </div>
          <div className="form_field">
            <label className="form_label">Expense's price</label>
            <input
              type="number"
              className="form_input"
              defaultValue={EditExpensesModal?.expenses_price || ""}
              onChange={(e) => {
                setEditExpensesModal({
                  ...EditExpensesModal,
                  expenses_price: e.target.value,
                });
              }}
            />
          </div>
          <div className="form_field">
            <label className="form_label">Expense's date</label>
            <input
              type="date"
              className="form_input"
              defaultValue={EditExpensesModal?.expenses_date || ""}
              onChange={(e) => {
                setEditExpensesModal({
                  ...EditExpensesModal,
                  expenses_date: e.target.value,
                });
              }}
            />
          </div>
        </>
      </Modal>

      <Modal
        title={`Delete Expense: (${DeleteExpensesModal?.expenses_title || ""})`}
        open={DeleteExpensesModal}
        footer={
          <>
            <Button
              style={{ margin: "0px 10px " }}
              onClick={() => handelDeleteExpense(DeleteExpensesModal?.id)}
            >
              Delete
            </Button>
            <Button onClick={() => setDeleteExpensesModal(null)}>Cancel</Button>
          </>
        }
        onCancel={() => setDeleteExpensesModal(null)}
      >
        <h3>Are you sure that you want to delete this Expense</h3>
      </Modal>
    </>
  );
};

export default Expenses;
