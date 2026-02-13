import { Button, Dropdown, Modal, Select, Table, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../../component/common/breadcrumb/breadcrumb";
import axios from "axios";
import { BASE_URL } from "../../../Api/baseUrl";
import CreatableSelect from "react-select/creatable";
import { toast } from "react-toastify";
import { FaEllipsisVertical } from "react-icons/fa6";

const Permessions = () => {
  // ✅ NEW: Form instances
  const [addForm] = Form.useForm();
  const [editForm] = Form.useForm();

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
      title: "name",
    },
    {
      id: "email",
      dataIndex: "email",
      title: "email",
    },
    {
      id: "password",
      dataIndex: "password",
      title: "password",
    },
    {
      id: "type",
      dataIndex: "type",
      title: "type",
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
                  setDeleteAdminData(row);
                  setDeleteAdminModal(true);
                }}
              >
                Delete Admin
              </button>
            ),
          },
          {
            key: 6,
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

                  // ✅ NEW: Set form values
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
            key: 7,
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
        if (res?.data?.status == "success") {
          setAdmins(res?.data?.message || []);
        }
      })
      .catch((e) => console.log(e));
  }

  function handleGetBranches() {
    axios
      .get(BASE_URL + "/admin/branches/select_branch.php")
      .then((res) => {
        if (res?.data?.status == "success") {
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
        if (res?.data?.status == "success") {
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
    { value: "employee", label: "employee" },
    { value: "instructor", label: "instructor" },
    { value: "superVisor", label: "Super Visor" },
    { value: "Branch_manager", label: "Branch manager" },
    { value: "General_manager", label: "General manager" },
  ]);

  function handelCreatOption(inputValue) {
    const newCategory = { value: inputValue.toLowerCase(), label: inputValue };
    setTypeOptions((prevCategory) => [...prevCategory, newCategory]);
  }

  // ✅ NEW: Handle Add Admin with Form validation
  function handleAddNewAdmin(values) {
    setSubmitting(true);

    const dataSend = {
      name: values.name,
      email: values.email,
      password: values.password,
      permissions: values.type,
      type: values.type,
      branch_id: values.branch_id,
      access: values.access?.join("**"),
    };

    axios
      .post(BASE_URL + `/admin/permissions/add_admin.php`, dataSend)
      .then((res) => {
        if (res.data.status == "success") {
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
        if (res.data.status == "success") {
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
        if (res.data.status == "success") {
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

  // ✅ NEW: Handle Edit Admin with Form validation
  function handleEditAdmin(values) {
    setSubmitting(true);

    const dataSend = {
      name: values.name,
      email: values.email,
      password: values.password,
      permissions: values.type,
      type: values.type,
      admin_id: EditAdminData?.admin_id,
      branch_id: values.branch_id,
      access: values.access?.join("**"),
    };

    axios
      .post(BASE_URL + `/admin/permissions/edit_admin.php`, dataSend)
      .then((res) => {
        if (res.data.status == "success") {
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

  // ✅ NEW: Close modal and reset form
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

  return (
    <>
      <Breadcrumbs parent="Admin" title="Admin List" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>Admin List</h5>
                <Button
                  color="primary btn-pill"
                  style={{ margin: "10px 0" }}
                  onClick={() => setAddAdminModal(true)}
                >
                  Add Admin
                </Button>
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

      {/* ✅ NEW: Add Admin Modal with Ant Design Form */}
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

          <Form.Item
            label="Access"
            name="access"
            rules={[
              { required: true, message: "Please select at least one access" },
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

      {/* ✅ NEW: Edit Admin Modal with Ant Design Form */}
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

          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.type !== currentValues.type
            }
          >
            {({ getFieldValue }) =>
              getFieldValue("type") !== "super_admin" && (
                <Form.Item
                  label={
                    <span>
                      Access
                      {getFieldValue("type") === "instructor" && (
                        <span
                          style={{
                            color: "#52c41a",
                            fontSize: "12px",
                            marginLeft: "5px",
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
                      required: true,
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
              )
            }
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, textAlign: "right" }}>
            <Button
              style={{ marginRight: 8 }}
              onClick={handleCloseEditModal}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" loading={submitting}>
              Edit
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
          <Button
            key="add"
            type="primary"
            onClick={() => habdelAddAdminForGroup()}
          >
            Add
          </Button>,
          <Button key="cancel" onClick={handleCloseGroupModal}>
            Cancel
          </Button>,
        ]}
      >
        <div className="form_field">
          <label className="form_label">Select Group</label>
          <Select
            showSearch
            style={{ width: "100%" }}
            value={NewGroupId}
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
          <Button
            key="delete"
            type="primary"
            danger
            onClick={() => handelDeleteAdmin()}
          >
            Delete
          </Button>,
          <Button key="cancel" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>,
        ]}
      >
        <h3>Are you sure that you want to Delete this admin?</h3>
      </Modal>
    </>
  );
};

export default Permessions;
