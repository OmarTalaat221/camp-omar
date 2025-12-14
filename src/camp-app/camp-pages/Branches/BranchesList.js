import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../../component/common/breadcrumb/breadcrumb";
import { Button, Dropdown, Modal, Table } from "antd";
import { render } from "@testing-library/react";
import { BASE_URL } from "../../../Api/baseUrl";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEllipsisVertical } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

const BranchesList = () => {
  const [Branches, setBranches] = useState([]);
  const [AddBranchModal, setAddBranchModal] = useState(false);
  const [NewBranchData, setNewBranchData] = useState({
    branch_name: null,
    phone: null,
    location: "",
  });

  const [DeleteBranchModal, setDeleteBranchModal] = useState(null);
  const [EditBranchModal, setEditBranchModal] = useState(null);

  const navigate = useNavigate();

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
                // onClick={() => {
                //   // setDeleteBranchModal(row);
                //   navigate(

                //   );
                // }}
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
                onClick={() => {
                  // setDeleteBranchModal(row);
                  // navigate(
                  //
                  // );
                }}
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
                onClick={() => {
                  setDeleteBranchModal(row);
                }}
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
                onClick={() => {
                  setEditBranchModal(row);
                }}
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

  useEffect(() => {
    handleGetBranches();
  }, []);

  function handleAddNewBranch() {
    const dataSend = {
      branch_name: NewBranchData.branch_name,
      phone: NewBranchData.phone,
      location: NewBranchData?.location,
    };
    axios
      .post(
        BASE_URL + "/admin/branches/add_branch.php",
        JSON.stringify(dataSend)
      )
      .then((res) => {
        console.log(res);
        if (res?.data?.status == "success") {
          toast.success(res?.data?.message);
          setAddBranchModal(false);
          handleGetBranches();
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
  }

  function handleDeleteBranch() {
    const dataSend = {
      branch_id: DeleteBranchModal.branch_id,
    };
    axios
      .post(
        BASE_URL + "/admin/branches/delete_branch.php",
        JSON.stringify(dataSend)
      )
      .then((res) => {
        console.log(res);
        if (res?.data?.status == "success") {
          toast.success(res?.data?.message);
          setDeleteBranchModal(null);
          handleGetBranches();
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
  }

  function handelEditBranch() {
    const dataSend = {
      branch_id: EditBranchModal.branch_id,
      branch_name: EditBranchModal.branch_name,
      phone: EditBranchModal.phone,
      location: EditBranchModal.location,
    };
    axios
      .post(
        BASE_URL + "/admin/branches/edit_branch.php",
        JSON.stringify(dataSend)
      )
      .then((res) => {
        console.log(res);
        if (res?.data?.status == "success") {
          toast.success(res?.data?.message);
          setEditBranchModal(null);
          handleGetBranches();
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
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
                  onClick={() => setAddBranchModal(true)}
                >
                  Add Branche
                </Button>
              </div>
              <div className="card-body">
                <Table
                  scroll={{
                    x: "max-content",
                  }}
                  columns={columns}
                  dataSource={Branches}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= Add Modal========================== */}

      <Modal
        title="Add Branch"
        open={AddBranchModal}
        footer={
          <>
            <Button
              style={{ margin: "0px 10px " }}
              onClick={() => handleAddNewBranch()}
            >
              Add
            </Button>
            <Button onClick={() => setAddBranchModal(false)}>Cancel</Button>
          </>
        }
        onCancel={() => setAddBranchModal(false)}
      >
        <>
          <div className="form_field">
            <label className="form_label">Branch Name</label>
            <input
              type="text"
              className="form_input"
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
        open={DeleteBranchModal}
        footer={
          <>
            <Button
              style={{ margin: "0px 10px " }}
              onClick={() => handleDeleteBranch(DeleteBranchModal?.branch_id)}
            >
              Delete
            </Button>
            <Button onClick={() => setDeleteBranchModal(null)}>Cancel</Button>
          </>
        }
        onCancel={() => setDeleteBranchModal(null)}
      >
        <h3>Are you sure that you want to delete this branch</h3>
      </Modal>

      {/* ========================= Edit Modal ======================================= */}

      <Modal
        title="Edit Branch"
        open={EditBranchModal}
        footer={
          <>
            <Button
              style={{ margin: "0px 10px " }}
              onClick={() => handelEditBranch()}
            >
              Edit
            </Button>
            <Button onClick={() => setEditBranchModal(null)}>Cancel</Button>
          </>
        }
        onCancel={() => setEditBranchModal(null)}
      >
        <>
          <div className="form_field">
            <label className="form_label">Branch Name</label>
            <input
              type="text"
              className="form_input"
              value={EditBranchModal?.branch_name || ""}
              onChange={(e) => {
                setEditBranchModal({
                  ...EditBranchModal,
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
              value={EditBranchModal?.location || ""}
              onChange={(e) => {
                setEditBranchModal({
                  ...EditBranchModal,
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
              value={EditBranchModal?.phone || ""}
              onChange={(e) => {
                setEditBranchModal({
                  ...EditBranchModal,
                  phone: e.target.value,
                });
              }}
            />
          </div>
        </>
      </Modal>
    </>
  );
};

export default BranchesList;
