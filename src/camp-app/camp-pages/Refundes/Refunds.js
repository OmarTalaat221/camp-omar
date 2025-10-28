import { Button, Dropdown, Modal, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../../component/common/breadcrumb/breadcrumb";
import axios from "axios";
import { BASE_URL } from "../../../Api/baseUrl";
import CreatableSelect from "react-select/creatable";
import { toast } from "react-toastify";
import { FaEllipsisVertical } from "react-icons/fa6";

const Refunds = () => {
  const [Refunds, setRefunds] = useState([]);
  const [AddRefundsModal, setAddRefundsModal] = useState(false);
  const [EditRefundsModal, setEditRefundsModal] = useState(null);
  const [DeleteRefundModal, setDeleteRefundModal] = useState(null);

  const AdminData = JSON.parse(localStorage.getItem("AdminData"));

  const [NewRefundsData, setNewRefundsData] = useState({
    refunds_title: null,
    refunds_description: null,
    refunds_price: null,
    refunds_category: null,
    refunds_date: null,
    branch_id: null,
    admin_id: AdminData[0].admin_id,
    sub_id: null,
  });

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
        return (
          <>
            <p>{row?.student_data?.name}</p>
          </>
        );
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
            key: 5,
            label: (
              <button
                className="btn btn-primary"
                onClick={() => {
                  setDeleteRefundModal(row);
                }}
              >
                Delete Refund
              </button>
            ),
          },
          {
            key: 6,
            label: (
              <button
                className="btn btn-primary"
                onClick={() => {
                  setEditRefundsModal(row);
                }}
              >
                Edit Refund
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

  const [Category, setCategory] = useState([
    { value: "groceries", label: "Groceries" },
    { value: "electricity-bill", label: "Electricity Bill" },
    { value: "fuel", label: "Fuel" },
  ]);

  const getRefunds = async () => {
    axios
      .get(BASE_URL + `/admin/refunds/get_refund.php`)
      .then((res) => {
        console.log(res);
        if (res.data.status == "success") {
          setRefunds(res.data.message);
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

  const [students, setStudents] = useState([]);
  function handleGetStudents() {
    axios
      .get(
        BASE_URL + "/admin/subscription/select_student_to_activate_level.php"
      )
      .then((res) => {
        console.log(res);
        if (res?.data?.status == "success") {
          setStudents(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
  }

  const StudentsOptions = students.map((student) => {
    return { value: student?.subscription_id, label: student?.student_name };
  });

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

    console.log(dataSend);

    axios
      .post(
        BASE_URL + `/admin/refunds/add_refund.php`,
        JSON.stringify(dataSend)
      )
      .then((res) => {
        console.log(res);
        if (res.data.status == "success") {
          toast.success(res.data.message);
          setAddRefundsModal(false);
          getRefunds();
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((e) => console.log(e));
  };

  const handelEditRefund = async () => {
    const dataSend = {
      refunds_title: EditRefundsModal?.refunds_title,
      refunds_description: EditRefundsModal?.refunds_description,
      refunds_price: EditRefundsModal?.refunds_price,
      refunds_category: EditRefundsModal?.refunds_category,
      refunds_date: EditRefundsModal?.refunds_date,
      refunds_id: EditRefundsModal?.id,
    };

    console.log(dataSend);

    axios
      .post(
        BASE_URL + `/admin/refunds/edit_refund.php`,
        JSON.stringify(dataSend)
      )
      .then((res) => {
        console.log(res);
        if (res.data.status == "success") {
          toast.success(res.data.message);
          setEditRefundsModal(null);
          getRefunds();
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((e) => console.log(e));
  };

  const handelDeleteRefund = async (id) => {
    const dataSend = {
      refunds_id: id,
    };

    console.log(dataSend);

    axios
      .post(
        BASE_URL + `/admin/refunds/delete_refund.php`,
        JSON.stringify(dataSend)
      )
      .then((res) => {
        console.log(res);
        if (res.data.status == "success") {
          toast.success(res.data.message);
          setDeleteRefundModal(null);
          getRefunds();
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
                  onClick={() => setAddRefundsModal(true)}
                >
                  Add Refund
                </Button>
              </div>
              <div className="card-body">
                <Table
                  scroll={{
                    x: "max-content",
                  }}
                  columns={columns}
                  dataSource={Refunds}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Add Refund"
        open={AddRefundsModal}
        onCancel={() => setAddRefundsModal(false)}
        footer={[
          <Button onClick={handelAddRefund}>Add</Button>,
          <Button key="cancel" onClick={() => setAddRefundsModal(false)}>
            Cancel
          </Button>,
        ]}
      >
        <>
          <div className="form_field">
            <label className="form_label">Refund's student</label>
            <Select
              placeholder="pick Refund's student"
              options={StudentsOptions}
              onChange={(e) => {
                setNewRefundsData({
                  ...NewRefundsData,
                  sub_id: e,
                });
              }}
            />
          </div>
          <div className="form_field">
            <label className="form_label">Refund's title</label>
            <input
              type="text"
              className="form_input"
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
              onChange={(e) => {
                setNewRefundsData({
                  ...NewRefundsData,
                  refunds_description: e.target.value,
                });
              }}
            />
          </div>
          {/* <div className="form_field">
            <label className="form_label">Refund's category</label>
            <CreatableSelect
              placeholder="you can pick or write an option"
              options={Category}
              onCreateOption={handelCreatOption}
              onChange={(e) => {
                setNewRefundsData({
                  ...NewRefundsData,
                  refunds_category: e?.value,
                });
              }}
            />
          </div> */}
          <div className="form_field">
            <label className="form_label">Refund's price</label>
            <input
              type="number"
              className="form_input"
              onChange={(e) => {
                setNewRefundsData({
                  ...NewRefundsData,
                  refunds_price: e.target.value,
                });
              }}
            />
          </div>
          <div className="form_field">
            <label className="form_label">Refund's branche</label>
            <Select
              placeholder="pick Refund's branch"
              options={BranchesOptions}
              onChange={(e) => {
                setNewRefundsData({
                  ...NewRefundsData,
                  branch_id: e,
                });
              }}
            />
          </div>
          <div className="form_field">
            <label className="form_label">Refund's date</label>
            <input
              type="date"
              className="form_input"
              onChange={(e) => {
                setNewRefundsData({
                  ...NewRefundsData,
                  refunds_date: e.target.value,
                });
              }}
            />
          </div>
        </>
      </Modal>

      <Modal
        title={`Edit Refund + ${EditRefundsModal?.name}`}
        open={EditRefundsModal}
        onCancel={() => setEditRefundsModal(null)}
        footer={[
          <Button onClick={handelEditRefund}>Edit</Button>,
          <Button key="cancel" onClick={() => setEditRefundsModal(null)}>
            Cancel
          </Button>,
        ]}
      >
        <>
          <div className="form_field">
            <label className="form_label">Refund's title</label>
            <input
              type="text"
              className="form_input"
              defaultValue={EditRefundsModal?.refunds_title || ""}
              onChange={(e) => {
                setEditRefundsModal({
                  ...EditRefundsModal,
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
              defaultValue={EditRefundsModal?.refunds_description || ""}
              onChange={(e) => {
                setEditRefundsModal({
                  ...EditRefundsModal,
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
              onChange={(e) => {
                setEditRefundsModal({
                  ...EditRefundsModal,
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
              defaultValue={EditRefundsModal?.refunds_price || ""}
              onChange={(e) => {
                setEditRefundsModal({
                  ...EditRefundsModal,
                  refunds_price: e.target.value,
                });
              }}
            />
          </div>
          <div className="form_field">
            <label className="form_label">Refund's branche</label>
            <Select
              placeholder="pick Refund's branch"
              options={BranchesOptions}
              onChange={(e) => {
                setEditRefundsModal({
                  ...EditRefundsModal,
                  branch_id: e,
                });
              }}
            />
          </div>
          <div className="form_field">
            <label className="form_label">Refund's date</label>
            <input
              type="date"
              className="form_input"
              defaultValue={EditRefundsModal?.refunds_date || ""}
              onChange={(e) => {
                setEditRefundsModal({
                  ...EditRefundsModal,
                  refunds_date: e.target.value,
                });
              }}
            />
          </div>
        </>
      </Modal>

      <Modal
        title={`Delete Refund: (${DeleteRefundModal?.refunds_title || ""})`}
        open={DeleteRefundModal}
        footer={
          <>
            <Button
              style={{ margin: "0px 10px " }}
              onClick={() => handelDeleteRefund(DeleteRefundModal?.id)}
            >
              Delete
            </Button>
            <Button onClick={() => setDeleteRefundModal(null)}>Cancel</Button>
          </>
        }
        onCancel={() => setDeleteRefundModal(null)}
      >
        <h3>Are you sure that you want to delete this Refund</h3>
      </Modal>
    </>
  );
};

export default Refunds;
