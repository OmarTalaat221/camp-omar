import { Button, Dropdown, Modal, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../../component/common/breadcrumb/breadcrumb";
import axios from "axios";
import { BASE_URL } from "../../../Api/baseUrl";
import CreatableSelect from "react-select/creatable";
import { toast } from "react-toastify";
import { FaEllipsisVertical } from "react-icons/fa6";

const Permessions = () => {
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

  const INSTRUCTOR_DEFAULT_ACCESS = ["absence", "groups", "students"];

  const [Admins, setAdmins] = useState([]);
  const [allBranches, setAllBranches] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  // ✅ SEPARATED: Modal visibility states
  const [AddAdminModal, setAddAdminModal] = useState(false);
  const [EditAdminModal, setEditAdminModal] = useState(false);
  const [AddAdminForGroupModal, setAddAdminForGroupModal] = useState(false);
  const [DeleteAdminModal, setDeleteAdminModal] = useState(false);

  // ✅ SEPARATED: Data states
  const [AddAdminData, setAddAdminData] = useState({
    name: null,
    email: null,
    password: null,
    permissions: null,
    type: null,
    admin_branch: "",
    access: [],
  });

  const [EditAdminData, setEditAdminData] = useState(null);
  const [AddAdminForGroupData, setAddAdminForGroupData] = useState(null);
  const [DeleteAdminData, setDeleteAdminData] = useState(null);

  // ✅ Auto-assign instructor permissions when type changes
  useEffect(() => {
    if (AddAdminData?.type === "instructor") {
      const currentAccess = AddAdminData?.access || [];
      const hasAllDefaults = INSTRUCTOR_DEFAULT_ACCESS.every((access) =>
        currentAccess.includes(access)
      );

      if (!hasAllDefaults) {
        setAddAdminData((prev) => ({
          ...prev,
          access: [
            ...new Set([...INSTRUCTOR_DEFAULT_ACCESS, ...currentAccess]),
          ],
        }));
      }
    }
  }, [AddAdminData?.type]);

  useEffect(() => {
    if (EditAdminData?.type === "instructor") {
      const currentAccess = EditAdminData?.access || [];
      const hasAllDefaults = INSTRUCTOR_DEFAULT_ACCESS.every((access) =>
        currentAccess.includes(access)
      );

      if (!hasAllDefaults) {
        setEditAdminData((prev) => ({
          ...prev,
          access: [
            ...new Set([...INSTRUCTOR_DEFAULT_ACCESS, ...currentAccess]),
          ],
        }));
      }
    }
  }, [EditAdminData?.type]);

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
                  // ✅ FIXED: Set data and open modal separately
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

                  // ✅ FIXED: Set data and open modal separately
                  setEditAdminData({
                    ...row,
                    access: accessArray,
                    branch_id: row.branch_id || null,
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
                  // ✅ FIXED: Set data and open modal separately
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
        JSON.stringify(dataSend)
      )
      .then((res) => {
        if (res?.data?.status == "success") {
          setGroups(res?.data?.message || []);
        }
      })
      .catch((e) => console.log(e));
  }

  const groupsOptions = Groups.map((group) => {
    return { value: group?.group_id, label: group?.group_name };
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

  function validateAdminData(data) {
    if (!data.name || !data.name.trim()) {
      toast.error("Name is required");
      return false;
    }
    if (!data.email || !data.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!data.password || !data.password.trim()) {
      toast.error("Password is required");
      return false;
    }
    if (!data.type) {
      toast.error("Type is required");
      return false;
    }
    if (!data.branch_id) {
      toast.error("Branch is required");
      return false;
    }
    if (!data.access || data.access.length === 0) {
      toast.error("At least one access permission is required");
      return false;
    }
    return true;
  }

  function habdelAddNewAdmin() {
    if (!validateAdminData(AddAdminData)) {
      return;
    }

    setSubmitting(true);

    const dataSend = {
      name: AddAdminData?.name,
      email: AddAdminData?.email,
      password: AddAdminData?.password,
      permissions: AddAdminData?.type,
      type: AddAdminData?.type,
      branch_id: AddAdminData?.branch_id,
      access: AddAdminData?.access?.join("**"),
    };

    axios
      .post(
        BASE_URL + `/admin/permissions/add_admin.php`,
        JSON.stringify(dataSend)
      )
      .then((res) => {
        if (res.data.status == "success") {
          toast.success(res.data.message);
          // ✅ FIXED: Close modal and reset data separately
          setAddAdminModal(false);
          setAddAdminData({
            name: null,
            email: null,
            password: null,
            permissions: null,
            type: null,
            admin_branch: "",
            access: [],
          });
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
      .post(
        BASE_URL + `/admin/permissions/add_group_for_Admin.php`,
        JSON.stringify(dataSend)
      )
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
      .post(
        BASE_URL + `/admin/permissions/delete_admin.php`,
        JSON.stringify(dataSend)
      )
      .then((res) => {
        if (res.data.status == "success") {
          toast.success(res.data.message);
          // ✅ FIXED: Close modal and reset data separately
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

  function handelEditAdmin() {
    if (!validateAdminData(EditAdminData)) {
      return;
    }

    setSubmitting(true);
    const dataSend = {
      name: EditAdminData?.name,
      email: EditAdminData?.email,
      password: EditAdminData?.password,
      permissions: EditAdminData?.type,
      type: EditAdminData?.type,
      admin_id: EditAdminData?.admin_id,
      branch_id: EditAdminData?.branch_id,
      access: EditAdminData?.access?.join("**"),
    };

    axios
      .post(
        BASE_URL + `/admin/permissions/edit_admin.php`,
        JSON.stringify(dataSend)
      )
      .then((res) => {
        if (res.data.status == "success") {
          toast.success(res.data.message);
          // ✅ FIXED: Close modal and reset data separately
          setEditAdminModal(false);
          setEditAdminData(null);
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

  const handleAddAdminAccessChange = (selectedAccess) => {
    setAddAdminData({
      ...AddAdminData,
      access: selectedAccess,
    });
  };

  const handleEditAdminAccessChange = (selectedAccess) => {
    setEditAdminData({
      ...EditAdminData,
      access: selectedAccess,
    });
  };

  // ✅ FIXED: Close modal handlers that also reset data
  const handleCloseAddModal = () => {
    setAddAdminModal(false);
    setAddAdminData({
      name: null,
      email: null,
      password: null,
      permissions: null,
      type: null,
      admin_branch: "",
      access: [],
    });
  };

  const handleCloseEditModal = () => {
    setEditAdminModal(false);
    setEditAdminData(null);
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
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ FIXED: Modal controlled by boolean state */}
      <Modal
        title="Add new Admin"
        open={AddAdminModal}
        onCancel={handleCloseAddModal}
        footer={[
          <Button
            type="primary"
            onClick={() => habdelAddNewAdmin()}
            loading={submitting}
            disabled={submitting}
          >
            Add
          </Button>,
          <Button key="cancel" onClick={handleCloseAddModal}>
            Cancel
          </Button>,
        ]}
      >
        <div className="form_field">
          <label className="form_label">Name</label>
          <input
            type="text"
            className="form_input"
            value={AddAdminData.name || ""}
            onChange={(e) => {
              setAddAdminData({
                ...AddAdminData,
                name: e.target.value,
              });
            }}
          />
        </div>

        <div className="form_field">
          <label className="form_label">Email</label>
          <input
            type="text"
            className="form_input"
            value={AddAdminData.email || ""}
            onChange={(e) => {
              setAddAdminData({
                ...AddAdminData,
                email: e.target.value,
              });
            }}
          />
        </div>

        <div className="form_field">
          <label className="form_label">password</label>
          <input
            type="text"
            className="form_input"
            value={AddAdminData.password || ""}
            onChange={(e) => {
              setAddAdminData({
                ...AddAdminData,
                password: e.target.value,
              });
            }}
          />
        </div>

        <div className="form_field">
          <label className="form_label">Type</label>
          <CreatableSelect
            placeholder="you can pick or write an option"
            options={typeOptions}
            value={typeOptions.find((opt) => opt.value === AddAdminData.type)}
            onCreateOption={handelCreatOption}
            onChange={(e) => {
              setAddAdminData({
                ...AddAdminData,
                type: e?.value,
              });
            }}
          />
        </div>

        <div className="form_field">
          <label className="form_label">Branch</label>
          <Select
            placeholder="Select Branch"
            style={{ width: "100%" }}
            value={AddAdminData.branch_id}
            options={allBranches.map((branch) => ({
              value: branch.branch_id,
              label: branch.branch_name,
            }))}
            onChange={(e) => {
              setAddAdminData({
                ...AddAdminData,
                branch_id: e,
              });
            }}
          />
        </div>

        <div className="form_field">
          <label className="form_label">
            Access
            {AddAdminData?.type === "instructor" && (
              <span
                style={{
                  color: "#52c41a",
                  fontSize: "12px",
                  marginLeft: "5px",
                }}
              >
                (Absence, Groups, Students recommended for Instructors)
              </span>
            )}
          </label>
          <Select
            mode="multiple"
            placeholder="Select Access"
            style={{ width: "100%" }}
            value={AddAdminData?.access}
            options={accessOptions.map((access) => ({
              value: access.access,
              label: access.label,
            }))}
            onChange={handleAddAdminAccessChange}
          />
        </div>
      </Modal>

      {/* ✅ FIXED: Modal controlled by boolean state */}
      <Modal
        title="Edit Admin"
        open={EditAdminModal}
        onCancel={handleCloseEditModal}
        footer={[
          <Button
            loading={submitting}
            type="primary"
            onClick={() => handelEditAdmin()}
            disabled={submitting}
          >
            Edit
          </Button>,
          <Button key="cancel" onClick={handleCloseEditModal}>
            Cancel
          </Button>,
        ]}
      >
        <div className="form_field">
          <label className="form_label">Name</label>
          <input
            type="text"
            className="form_input"
            value={EditAdminData?.name || ""}
            onChange={(e) => {
              setEditAdminData({
                ...EditAdminData,
                name: e.target.value,
              });
            }}
          />
        </div>

        <div className="form_field">
          <label className="form_label">Email</label>
          <input
            type="text"
            className="form_input"
            value={EditAdminData?.email || ""}
            onChange={(e) => {
              setEditAdminData({
                ...EditAdminData,
                email: e.target.value,
              });
            }}
          />
        </div>

        <div className="form_field">
          <label className="form_label">password</label>
          <input
            type="text"
            className="form_input"
            value={EditAdminData?.password || ""}
            onChange={(e) => {
              setEditAdminData({
                ...EditAdminData,
                password: e.target.value,
              });
            }}
          />
        </div>

        <div className="form_field">
          <label className="form_label">Type</label>
          <Select
            placeholder="you can pick or write an option"
            style={{ width: "100%" }}
            options={typeOptions}
            value={EditAdminData?.type}
            onChange={(e) => {
              setEditAdminData({
                ...EditAdminData,
                type: e,
              });
            }}
          />
        </div>

        <div className="form_field">
          <label className="form_label">Branch</label>
          <Select
            placeholder="Select Branch"
            style={{ width: "100%" }}
            options={allBranches.map((branch) => ({
              value: branch.branch_id,
              label: branch.branch_name,
            }))}
            value={EditAdminData?.branch_id}
            onChange={(e) => {
              setEditAdminData({
                ...EditAdminData,
                branch_id: e,
              });
            }}
          />
        </div>

        <div className="form_field">
          <label className="form_label">
            Access
            {EditAdminData?.type === "instructor" && (
              <span
                style={{
                  color: "#52c41a",
                  fontSize: "12px",
                  marginLeft: "5px",
                }}
              >
                (Absence, Groups, Students recommended for Instructors)
              </span>
            )}
          </label>
          <Select
            mode="multiple"
            placeholder="Select Access"
            style={{ width: "100%" }}
            value={EditAdminData?.access}
            options={accessOptions.map((access) => ({
              value: access.access,
              label: access.label,
            }))}
            onChange={handleEditAdminAccessChange}
          />
        </div>
      </Modal>

      {/* ✅ FIXED: Modal controlled by boolean state */}
      <Modal
        title="Add Admin For Group"
        open={AddAdminForGroupModal}
        onCancel={handleCloseGroupModal}
        footer={[
          <Button type="primary" onClick={() => habdelAddAdminForGroup()}>
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
            type="text"
            style={{ width: "100%" }}
            value={NewGroupId}
            options={groupsOptions}
            onChange={(e) => {
              setNewGroupId(e);
            }}
          />
        </div>
      </Modal>

      {/* ✅ FIXED: Modal controlled by boolean state */}
      <Modal
        title={`"Delete Admin" ${DeleteAdminData?.name}`}
        open={DeleteAdminModal}
        footer={
          <>
            <Button
              style={{ margin: "0px 10px " }}
              onClick={() => handelDeleteAdmin()}
            >
              Delete
            </Button>
            <Button onClick={handleCloseDeleteModal}>Cancel</Button>
          </>
        }
        onCancel={handleCloseDeleteModal}
      >
        <h3>Are you sure that you want to Delete this admin</h3>
      </Modal>
    </>
  );
};

export default Permessions;
