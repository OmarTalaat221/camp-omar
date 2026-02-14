import { Button, Dropdown, Modal, Select, Table, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../../component/common/breadcrumb/breadcrumb";
import axios from "axios";
import { BASE_URL } from "../../../Api/baseUrl";
import { toast } from "react-toastify";
import { FaEllipsisVertical } from "react-icons/fa6";
import { AdminData } from "../../../routes/layouts-routes";

const Permessions = () => {
  // Form instances
  const [addForm] = Form.useForm();
  const [editForm] = Form.useForm();

  // ✅ Watch type field for both forms
  const addSelectedType = Form.useWatch("type", addForm);
  const editSelectedType = Form.useWatch("type", editForm);

  const accessOptions = [
    { label: "Absence", access: "absence" },
    { label: "Admins", access: "admins" },
    { label: "All Data", access: "dashboard" },
    { label: "Branches", access: "branches" },
    { label: "Complains & Exceptions", access: "notes" },
    { label: "Feedback", access: "feedback" },
    { label: "Finances", access: "expenses" },
    { label: "Forms", access: "questionnaire" },
    { label: "Groups", access: "groups" },
    { label: "Levels", access: "levels" },
    { label: "Packages", access: "subscription" },
    { label: "Posts", access: "posts" },
    { label: "Students", access: "students" },
    { label: "Technical Support", access: "tickets" },
    { label: "Tracks", access: "tracks" },
  ];

  const [Admins, setAdmins] = useState([]);
  const [allBranches, setAllBranches] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  // Modal visibility states
  const [AddAdminModal, setAddAdminModal] = useState(false);
  const [EditAdminModal, setEditAdminModal] = useState(false);
  const [AddAdminForGroupModal, setAddAdminForGroupModal] = useState(false);
  const [DeleteAdminModal, setDeleteAdminModal] = useState(false);

  // Data states
  const [EditAdminData, setEditAdminData] = useState(null);
  const [AddAdminForGroupData, setAddAdminForGroupData] = useState(null);
  const [DeleteAdminData, setDeleteAdminData] = useState(null);

  const columns = [
    {
      id: "admin_id",
      dataIndex: "admin_id",
      title: "#",
    },
    {
      id: "name",
      dataIndex: "name",
      title: "Name",
    },
    {
      id: "email",
      dataIndex: "email",
      title: "Email",
    },
    {
      id: "password",
      dataIndex: "password",
      title: "Password",
    },
    {
      id: "type",
      dataIndex: "type",
      title: "Type",
      render: (type) => (
        <span
          style={{
            padding: "4px 12px",
            borderRadius: "4px",
            background: type === "super_admin" ? "#722ed1" : "#1890ff",
            color: "white",
            fontSize: "12px",
            textTransform: "capitalize",
          }}
        >
          {type?.replace("_", " ") || "N/A"}
        </span>
      ),
    },
    {
      title: "Actions",
      render: (text, row) => {
        const items = [
          {
            key: "edit",
            label: (
              <button
                className="btn btn-primary"
                onClick={() => {
                  const accessArray = row.access
                    ? row.access.split("**").filter(Boolean)
                    : [];

                  const adminData = {
                    ...row,
                    access: accessArray,
                    branch_id: row.branch_id || null,
                  };

                  setEditAdminData(adminData);

                  // Set form values
                  editForm.setFieldsValue({
                    name: row.name,
                    email: row.email,
                    password: row.password,
                    type: row.type,
                    branch_id: row.branch_id,
                    access: accessArray,
                  });

                  setEditAdminModal(true);
                }}
              >
                Edit Admin
              </button>
            ),
          },
          {
            key: "group",
            label: (
              <button
                className="btn btn-primary"
                onClick={() => {
                  setAddAdminForGroupData(row);
                  setAddAdminForGroupModal(true);
                  handleGetGroups(row?.admin_id);
                }}
              >
                Add admin for group
              </button>
            ),
          },
          {
            key: "delete",
            label: (
              <button
                className="btn btn-primary"
                onClick={() => {
                  setDeleteAdminData(row);
                  setDeleteAdminModal(true);
                }}
              >
                Delete Admin
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

  function handleGetAllAdmins() {
    axios
      .get(BASE_URL + "/admin/permissions/select_admins.php")
      .then((res) => {
        if (res?.data?.status === "success") {
          setAdmins(res?.data?.message || []);
        }
      })
      .catch((e) => console.log(e));
  }

  function handleGetBranches() {
    axios
      .get(BASE_URL + "/admin/branches/select_branch.php")
      .then((res) => {
        if (res?.data?.status === "success") {
          setAllBranches(res?.data?.message || []);
        }
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    handleGetBranches();
    handleGetAllAdmins();
  }, []);

  const [Groups, setGroups] = useState([]);
  const [NewGroupId, setNewGroupId] = useState(null);

  function handleGetGroups(admin_id) {
    const dataSend = {
      admin_id: admin_id,
    };
    axios
      .post(
        BASE_URL + "/admin/permissions/select_groups_not_assign_to_admin.php",
        dataSend
      )
      .then((res) => {
        if (res?.data?.status === "success") {
          setGroups(res?.data?.message || []);
        }
      })
      .catch((e) => console.log(e));
  }

  const groupsOptions = Groups.map((group) => {
    return {
      value: group?.group_id,
      label: `${group?.group_name} - ${group?.branch_name}`,
    };
  });

  const [typeOptions, setTypeOptions] = useState([
    { value: "super_admin", label: "Super Admin" },
    { value: "employee", label: "Employee" },
    { value: "instructor", label: "Instructor" },
    { value: "superVisor", label: "Super Visor" },
    // { value: "Branch_manager", label: "Branch Manager" },
    // { value: "General_manager", label: "General Manager" },
  ]);

  // Handle Add Admin with Form validation
  function handleAddNewAdmin(values) {
    setSubmitting(true);

    // ✅ If super_admin, set access to all or empty
    const accessValue =
      values.type === "super_admin" ? "" : values.access?.join("**") || "";

    const dataSend = {
      admin_id: AdminData[0]?.admin_id,
      name: values.name,
      email: values.email,
      password: values.password,
      permissions: values.type,
      type: values.type,
      branch_id: values.branch_id,
      access: accessValue,
    };

    axios
      .post(BASE_URL + `/admin/permissions/add_admin.php`, dataSend)
      .then((res) => {
        if (res.data.status === "success") {
          toast.success(res.data.message);
          handleCloseAddModal();
          handleGetAllAdmins();
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((e) => {
        console.log(e);
        toast.error("An error occurred");
      })
      .finally(() => {
        setSubmitting(false);
      });
  }

  function habdelAddAdminForGroup() {
    if (!NewGroupId) {
      toast.error("Please select a group");
      return;
    }

    const dataSend = {
      admin_id: AddAdminForGroupData?.admin_id,
      group_id: NewGroupId,
    };

    axios
      .post(BASE_URL + `/admin/permissions/add_group_for_Admin.php`, dataSend)
      .then((res) => {
        if (res.data.status === "success") {
          toast.success(res.data.message);
          handleGetGroups(AddAdminForGroupData?.admin_id);
          setNewGroupId(null);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((e) => {
        console.log(e);
        toast.error("An error occurred");
      });
  }

  function handelDeleteAdmin() {
    const dataSend = {
      admin_id: DeleteAdminData?.admin_id,
    };

    axios
      .post(BASE_URL + `/admin/permissions/delete_admin.php`, dataSend)
      .then((res) => {
        if (res.data.status === "success") {
          toast.success(res.data.message);
          setDeleteAdminModal(false);
          setDeleteAdminData(null);
          handleGetAllAdmins();
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((e) => {
        console.log(e);
        toast.error("An error occurred");
      });
  }

  // Handle Edit Admin with Form validation
  function handleEditAdmin(values) {
    setSubmitting(true);

    // ✅ If super_admin, set access to all or empty
    const accessValue =
      values.type === "super_admin" ? "" : values.access?.join("**") || "";

    const dataSend = {
      name: values.name,
      email: values.email,
      password: values.password,
      permissions: values.type,
      type: values.type,
      admin_id: EditAdminData?.admin_id,
      branch_id: values.branch_id,
      access: accessValue,
    };

    axios
      .post(BASE_URL + `/admin/permissions/edit_admin.php`, dataSend)
      .then((res) => {
        if (res.data.status === "success") {
          toast.success(res.data.message);
          handleCloseEditModal();
          handleGetAllAdmins();
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((e) => {
        console.log(e);
        toast.error("An error occurred");
      })
      .finally(() => {
        setSubmitting(false);
      });
  }

  // Close modal and reset form
  const handleCloseAddModal = () => {
    setAddAdminModal(false);
    addForm.resetFields();
  };

  const handleCloseEditModal = () => {
    setEditAdminModal(false);
    setEditAdminData(null);
    editForm.resetFields();
  };

  const handleCloseGroupModal = () => {
    setAddAdminForGroupModal(false);
    setAddAdminForGroupData(null);
    setNewGroupId(null);
  };

  const handleCloseDeleteModal = () => {
    setDeleteAdminModal(false);
    setDeleteAdminData(null);
  };

  // ✅ Handle type change - clear access when super_admin is selected
  const handleAddTypeChange = (value) => {
    if (value === "super_admin") {
      addForm.setFieldValue("access", undefined);
    }
  };

  const handleEditTypeChange = (value) => {
    if (value === "super_admin") {
      editForm.setFieldValue("access", undefined);
    }
  };

  return (
    <>
      <Breadcrumbs parent="Admin" title="Admin List" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5>Admin List</h5>
                <button
                  className="btn btn-primary"
                  // type="primary"
                  // style={{ margin: "10px 0" }}
                  onClick={() => setAddAdminModal(true)}
                >
                  Add Admin
                </button>
              </div>
              <div className="card-body">
                <Table
                  scroll={{
                    x: "max-content",
                  }}
                  columns={columns}
                  dataSource={Admins}
                  rowKey="admin_id"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Add Admin Modal */}
      <Modal
        title="Add new Admin"
        open={AddAdminModal}
        onCancel={handleCloseAddModal}
        footer={null}
        destroyOnClose
      >
        <Form
          form={addForm}
          layout="vertical"
          onFinish={handleAddNewAdmin}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Please enter name" },
              { min: 2, message: "Name must be at least 2 characters" },
            ]}
          >
            <Input placeholder="Enter name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter password" }]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>

          <Form.Item
            label="Type"
            name="type"
            rules={[{ required: true, message: "Please select type" }]}
          >
            <Select
              placeholder="Select type"
              options={typeOptions}
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              onChange={handleAddTypeChange}
            />
          </Form.Item>

          <Form.Item
            label="Branch"
            name="branch_id"
            rules={[{ required: true, message: "Please select branch" }]}
          >
            <Select
              placeholder="Select Branch"
              options={allBranches.map((branch) => ({
                value: branch.branch_id,
                label: branch.branch_name,
              }))}
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
            />
          </Form.Item>

          {/* ✅ Hide Access when super_admin is selected */}
          {addSelectedType !== "super_admin" && (
            <Form.Item
              label={
                <span>
                  Access
                  {addSelectedType === "instructor" && (
                    <span
                      style={{
                        color: "#52c41a",
                        fontSize: "12px",
                        marginLeft: "8px",
                      }}
                    >
                      (Absence, Groups, Students recommended)
                    </span>
                  )}
                </span>
              }
              name="access"
              rules={[
                {
                  required: addSelectedType !== "super_admin",
                  message: "Please select at least one access",
                },
              ]}
            >
              <Select
                mode="multiple"
                placeholder="Select Access"
                options={accessOptions.map((access) => ({
                  value: access.access,
                  label: access.label,
                }))}
              />
            </Form.Item>
          )}

          {/* ✅ Show info message when super_admin is selected */}
          {addSelectedType === "super_admin" && (
            <div
              style={{
                padding: "12px 16px",
                background: "#f6ffed",
                border: "1px solid #b7eb8f",
                borderRadius: "8px",
                marginBottom: "16px",
              }}
            >
              <span style={{ color: "#52c41a", fontWeight: 500 }}>
                ✓ Super Admin has full access to all features
              </span>
            </div>
          )}

          <Form.Item style={{ marginBottom: 0, textAlign: "right" }}>
            <Button
              style={{ marginRight: 8 }}
              onClick={handleCloseAddModal}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" loading={submitting}>
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* ✅ Edit Admin Modal */}
      <Modal
        title="Edit Admin"
        open={EditAdminModal}
        onCancel={handleCloseEditModal}
        footer={null}
        destroyOnClose
      >
        <Form
          form={editForm}
          layout="vertical"
          onFinish={handleEditAdmin}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Please enter name" },
              { min: 2, message: "Name must be at least 2 characters" },
            ]}
          >
            <Input placeholder="Enter name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter password" }]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>

          <Form.Item
            label="Type"
            name="type"
            rules={[{ required: true, message: "Please select type" }]}
          >
            <Select
              placeholder="Select type"
              options={typeOptions}
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              onChange={handleEditTypeChange}
            />
          </Form.Item>

          <Form.Item
            label="Branch"
            name="branch_id"
            rules={[{ required: true, message: "Please select branch" }]}
          >
            <Select
              placeholder="Select Branch"
              options={allBranches.map((branch) => ({
                value: branch.branch_id,
                label: branch.branch_name,
              }))}
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
            />
          </Form.Item>

          {/* ✅ Hide Access when super_admin is selected */}
          {editSelectedType !== "super_admin" && (
            <Form.Item
              label={
                <span>
                  Access
                  {editSelectedType === "instructor" && (
                    <span
                      style={{
                        color: "#52c41a",
                        fontSize: "12px",
                        marginLeft: "8px",
                      }}
                    >
                      (Absence, Groups, Students recommended)
                    </span>
                  )}
                </span>
              }
              name="access"
              rules={[
                {
                  required: editSelectedType !== "super_admin",
                  message: "Please select at least one access",
                },
              ]}
            >
              <Select
                mode="multiple"
                placeholder="Select Access"
                options={accessOptions.map((access) => ({
                  value: access.access,
                  label: access.label,
                }))}
              />
            </Form.Item>
          )}

          {/* ✅ Show info message when super_admin is selected */}
          {editSelectedType === "super_admin" && (
            <div
              style={{
                padding: "12px 16px",
                background: "#f6ffed",
                border: "1px solid #b7eb8f",
                borderRadius: "8px",
                marginBottom: "16px",
              }}
            >
              <span style={{ color: "#52c41a", fontWeight: 500 }}>
                ✓ Super Admin has full access to all features
              </span>
            </div>
          )}

          <Form.Item style={{ marginBottom: 0, textAlign: "right" }}>
            <Button
              style={{ marginRight: 8 }}
              onClick={handleCloseEditModal}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" loading={submitting}>
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Add Admin For Group Modal */}
      <Modal
        title="Add Admin For Group"
        open={AddAdminForGroupModal}
        onCancel={handleCloseGroupModal}
        footer={[
          <Button key="cancel" onClick={handleCloseGroupModal}>
            Cancel
          </Button>,
          <Button
            key="add"
            type="primary"
            onClick={() => habdelAddAdminForGroup()}
          >
            Add
          </Button>,
        ]}
      >
        <div style={{ marginBottom: "16px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: 500,
            }}
          >
            Select Group
          </label>
          <Select
            showSearch
            style={{ width: "100%" }}
            value={NewGroupId}
            placeholder="Select a group"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={groupsOptions}
            onChange={(e) => {
              setNewGroupId(e);
            }}
          />
        </div>
      </Modal>

      {/* Delete Admin Modal */}
      <Modal
        title={`Delete Admin: ${DeleteAdminData?.name || ""}`}
        open={DeleteAdminModal}
        onCancel={handleCloseDeleteModal}
        footer={[
          <Button key="cancel" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>,
          <Button
            key="delete"
            type="primary"
            danger
            onClick={() => handelDeleteAdmin()}
          >
            Delete
          </Button>,
        ]}
      >
        <div
          style={{
            padding: "20px",
            textAlign: "center",
          }}
        >
          <h3 style={{ marginBottom: "8px" }}>
            Are you sure you want to delete this admin?
          </h3>
          <p style={{ color: "#666" }}>
            This action cannot be undone. Admin "{DeleteAdminData?.name}" will
            be permanently removed.
          </p>
        </div>
      </Modal>
    </>
  );
};

export default Permessions;
