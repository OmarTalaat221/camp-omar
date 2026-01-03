import { Button, Dropdown, Input, Modal, Select, Table } from "antd";
import React, { useEffect, useState, useCallback, useRef } from "react";
import Breadcrumbs from "../../../component/common/breadcrumb/breadcrumb";
import axios from "axios";
import { BASE_URL } from "../../../Api/baseUrl";
import { toast } from "react-toastify";
import { FaEllipsisVertical } from "react-icons/fa6";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import * as XLSX from "xlsx";

const GroupsList = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [Groups, setGroups] = useState([]);
  const [GroupSelection, setGroupSelection] = useState([]);
  const [AddGroupModal, setAddGroupModal] = useState(false);
  const [AssignStudentModal, setAssignStudentModal] = useState(false);
  const [DeleteGroupModal, setDeleteGroupModal] = useState(null);
  const [EditGroupModal, setEditGroupModal] = useState(null);
  const [SendNotificationModa, setSendNotificationModa] = useState(null);
  const [rowData, setRowData] = useState(false);
  const [openGroupLevelModal, setOpenGroupLevelModal] = useState(false);
  const [selectGroups, setSelectGroups] = useState([]);
  const [assignGroupModal, setAssignGroupModal] = useState(false);
  const [UpdateStudentLevelModal, setUpdateStudentLevelModal] = useState(false);
  const [allLevels, setAllLevels] = useState([]);
  const [loading, setLoading] = useState(false);

  // Group Admin states
  const [GroupAdminModal, setGroupAdminModal] = useState(false);
  const [GroupAdmins, setGroupAdmins] = useState([]);
  const [currentGroupData, setCurrentGroupData] = useState(null);

  const getFiltersFromUrl = () => {
    const urlFilters = {};
    const filterKeys = [
      "group_name",
      "branch_name",
      "round_name",
      "instructor_name",
      "start_time",
      "end_time",
    ];

    filterKeys.forEach((key) => {
      const value = searchParams.get(key);
      if (value) {
        urlFilters[key] = [value]; // Ant Design expects array format
      }
    });

    return urlFilters;
  };

  // ✅ NEW: Get sort from URL
  const getSortFromUrl = () => {
    const sortField = searchParams.get("sort_field");
    const sortOrder = searchParams.get("sort_order");

    if (sortField && sortOrder) {
      return { [sortField]: sortOrder };
    }
    return {};
  };

  const [assignData, setAssignData] = useState({
    level_id: "",
    student_max: null,
  });

  const [NewGroupData, setNewGroupData] = useState({
    group_name: null,
    start_time: null,
    end_time: null,
    track_id: null,
    branch_id: null,
    round_id: null,
    gender: null,
    time: null,
    group_time: null,
  });

  const AdminData = JSON.parse(localStorage.getItem("AdminData"));
  const adminId = AdminData?.[0]?.admin_id;

  // Get values from URL
  const roundId = searchParams.get("round_id");
  const pageFromUrl = Number(searchParams.get("page")) || 1;
  const limitFromUrl = Number(searchParams.get("limit")) || 10;

  const [currentPage, setCurrentPage] = useState(pageFromUrl);
  const [pageSize, setPageSize] = useState(limitFromUrl);
  const [totalGroups, setTotalGroups] = useState(0);

  const [filters, setFilters] = useState(getFiltersFromUrl());
  const [sortOrder, setSortOrder] = useState(getSortFromUrl());

  // Refs to prevent infinite loops
  const isInitialMount = useRef(true);
  const prevParamsRef = useRef({
    roundId,
    currentPage,
    pageSize,
    filters: {},
    sortOrder: {},
  });

  // ✅ FIXED: Prevent infinite loop by using a ref to track changes
  useEffect(() => {
    const urlPage = Number(searchParams.get("page")) || 1;
    const urlLimit = Number(searchParams.get("limit")) || 10;
    const urlFilters = getFiltersFromUrl();
    const urlSort = getSortFromUrl();

    // ✅ Only update if values actually changed
    let hasChanges = false;

    if (urlPage !== currentPage) {
      setCurrentPage(urlPage);
      hasChanges = true;
    }
    if (urlLimit !== pageSize) {
      setPageSize(urlLimit);
      hasChanges = true;
    }
    if (JSON.stringify(urlFilters) !== JSON.stringify(filters)) {
      setFilters(urlFilters);
      hasChanges = true;
    }
    if (JSON.stringify(urlSort) !== JSON.stringify(sortOrder)) {
      setSortOrder(urlSort);
      hasChanges = true;
    }

    // ✅ Log for debugging
    if (hasChanges) {
      console.log("URL params changed:", {
        urlPage,
        urlLimit,
        urlFilters,
        urlSort,
      });
    }
  }, [searchParams]); // Only depend on searchParams

  // Fetch Group Admins
  const handleGetGroupAdmins = useCallback((group_id) => {
    axios
      .get(BASE_URL + "/admin/home/select_admin_groups.php")
      .then((res) => {
        console.log(res);
        if (res?.data?.status === "success") {
          const filteredAdmins = res?.data?.message?.filter(
            (item) => item.group_id === String(group_id)
          );
          setGroupAdmins(filteredAdmins);
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((e) => {
        console.log(e);
        toast.error("Failed to fetch group admins");
      });
  }, []);

  // Remove admin from group
  const handleRemoveAdminFromGroup = useCallback(
    (admin_id, group_id) => {
      const dataSend = {
        admin_id: admin_id,
        group_id: group_id,
      };

      axios
        .post(
          BASE_URL + "/admin/permissions/remove_admin_from_group.php",
          JSON.stringify(dataSend)
        )
        .then((res) => {
          console.log(res);
          if (res?.data?.status === "success") {
            toast.success(res?.data?.message);
            handleGetGroupAdmins(group_id);
          } else {
            toast.error(res?.data?.message);
          }
        })
        .catch((e) => {
          console.log(e);
          toast.error("Failed to remove admin from group");
        });
    },
    [handleGetGroupAdmins]
  );

  // Group Admin Table Columns
  const groupAdminColumns = [
    {
      id: "admin_id",
      dataIndex: "admin_id",
      title: "Admin ID",
    },
    {
      id: "admin_name",
      dataIndex: "admin_name",
      title: "Admin Name",
    },
    {
      id: "group_name",
      dataIndex: "group_name",
      title: "Group Name",
    },
    {
      title: "Actions",
      render: (text, row) => (
        <Button
          danger
          onClick={() =>
            handleRemoveAdminFromGroup(row?.admin_id, row?.group_id)
          }
        >
          Remove
        </Button>
      ),
    },
  ];

  const Studcolumns = [
    {
      id: "student_id",
      dataIndex: "student_id",
      title: "student_id",
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
      render: (text, row) => (
        <a href={`mailto:${row?.email}`} target="_blank" rel="noreferrer">
          {row?.email}
        </a>
      ),
    },
    {
      id: "phone",
      dataIndex: "phone",
      title: "phone",
    },
    {
      id: "remaining_sub_count",
      dataIndex: "remaining_sub_count",
      title: "remaining sub count",
    },
  ];

  function handleSelectGroup(group_id) {
    const data_send = {
      group_id,
    };
    axios
      .post(
        "http://camp-coding.online/camp-for-english/admin/home/select_group_levels.php",
        data_send
      )
      .then((res) => {
        console.log(res);
        if (res?.data?.status === "success") {
          setSelectGroups(res?.data?.message);
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
  }

  // ✅ Memoized GET GROUPS function with filters
  const handleGetGroups = useCallback(
    async (
      page = currentPage,
      limit = pageSize,
      currentFilters = filters,
      currentSort = sortOrder
    ) => {
      if (!adminId) return;

      setLoading(true);
      let dataSend, endpoint;

      // Build filter object for API
      const apiFilters = {};
      Object.keys(currentFilters).forEach((key) => {
        if (currentFilters[key] && currentFilters[key].length > 0) {
          apiFilters[key] = currentFilters[key][0];
        }
      });

      // Build sort object for API
      let sortField = null;
      let sortDirection = null;
      Object.keys(currentSort).forEach((key) => {
        if (currentSort[key]) {
          sortField = key;
          sortDirection = currentSort[key] === "ascend" ? "ASC" : "DESC";
        }
      });

      if (roundId) {
        dataSend = {
          round_id: roundId,
          admin_id: adminId,
          page,
          limit,
          ...apiFilters,
          ...(sortField && {
            sort_field: sortField,
            sort_direction: sortDirection,
          }),
        };
        endpoint = BASE_URL + "/admin/groups/select_groups_by_round.php";
      } else {
        dataSend = {
          admin_id: adminId,
          page,
          limit,
          ...apiFilters,
          ...(sortField && {
            sort_field: sortField,
            sort_direction: sortDirection,
          }),
        };
        endpoint = BASE_URL + "/admin/groups/get_groups_with_pagination.php";
      }

      try {
        const res = await axios.post(endpoint, JSON.stringify(dataSend));
        console.log("Groups response:", res);

        if (res?.data?.status === "success") {
          // ✅ NEW: Set groups data
          setGroups(res?.data?.message || []);

          // ✅ NEW: Parse pagination - use 'total' field directly
          const total = parseInt(res?.data?.total) || 0;
          setTotalGroups(total);

          console.log("Pagination info:", {
            total: res?.data?.total,
            page: res?.data?.page,
            limit: res?.data?.limit,
            pages: res?.data?.pages,
          });
        } else {
          toast.error(res?.data?.message || "Error loading groups");
          setGroups([]);
          setTotalGroups(0);
        }
      } catch (e) {
        console.log(e);
        toast.error("Error loading groups");
        setGroups([]);
        setTotalGroups(0);
      } finally {
        setLoading(false);
      }
    },
    [adminId, roundId, currentPage, pageSize, filters, sortOrder]
  );
  const handleGetGroupsSelection = useCallback(async () => {
    if (!adminId) return;

    const dataSend = {
      admin_id: adminId,
    };
    const endpoint = BASE_URL + "/admin/groups/select_groups.php";

    try {
      const res = await axios.post(endpoint, JSON.stringify(dataSend));
      console.log(res);
      if (res?.data?.status === "success") {
        setGroupSelection(res?.data?.message);
      }
    } catch (e) {
      console.log(e);
    }
  }, [adminId]);

  useEffect(() => {
    if (!adminId) return;

    const urlFilters = getFiltersFromUrl();
    const urlSort = getSortFromUrl();

    const prevParams = prevParamsRef.current;
    const paramsChanged =
      prevParams.roundId !== roundId ||
      prevParams.currentPage !== currentPage ||
      prevParams.pageSize !== pageSize ||
      JSON.stringify(prevParams.filters) !== JSON.stringify(filters) ||
      JSON.stringify(prevParams.sortOrder) !== JSON.stringify(sortOrder);

    if (isInitialMount.current || paramsChanged) {
      handleGetGroups(currentPage, pageSize, filters, sortOrder);

      if (isInitialMount.current) {
        handleGetGroupsSelection();
      }

      prevParamsRef.current = {
        roundId,
        currentPage,
        pageSize,
        filters,
        sortOrder,
      };
      isInitialMount.current = false;
    }
  }, [
    roundId,
    currentPage,
    pageSize,
    filters,
    sortOrder,
    adminId,
    handleGetGroups,
    handleGetGroupsSelection,
  ]);

  // ✅ Update URL with pagination
  // ✅ UPDATED: Include filters and sort in URL
  const updateSearchParams = useCallback(
    (newPage, newLimit, newFilters = filters, newSort = sortOrder) => {
      const params = new URLSearchParams();

      // Add round_id if exists
      if (roundId) params.set("round_id", roundId);

      // Add pagination
      params.set("page", String(newPage));
      params.set("limit", String(newLimit));

      // ✅ NEW: Add filters to URL
      Object.keys(newFilters).forEach((key) => {
        if (newFilters[key] && newFilters[key].length > 0) {
          params.set(key, newFilters[key][0]);
        }
      });

      // ✅ NEW: Add sort to URL
      Object.keys(newSort).forEach((key) => {
        if (newSort[key]) {
          params.set("sort_field", key);
          params.set("sort_order", newSort[key]);
        }
      });

      const currentParams = searchParams.toString();
      const newParams = params.toString();

      if (currentParams !== newParams) {
        setSearchParams(params, { replace: true });
      }
    },
    [roundId, searchParams, setSearchParams, filters, sortOrder]
  );

  const handleTableChange = useCallback(
    (pagination, tableFilters, sorter) => {
      console.log("Table change:", { pagination, tableFilters, sorter });

      const newPage = pagination.current || 1;
      const newLimit = pagination.pageSize || 10;

      // Build new sort object
      const newSort =
        sorter && sorter.field && sorter.order
          ? { [sorter.field]: sorter.order }
          : {};

      // Update state
      setCurrentPage(newPage);
      setPageSize(newLimit);
      setFilters(tableFilters);
      setSortOrder(newSort);

      // ✅ NEW: Update URL with filters and sort
      updateSearchParams(newPage, newLimit, tableFilters, newSort);
    },
    [updateSearchParams]
  );

  function handleAddGroup() {
    const dataSend = {
      ...NewGroupData,
    };

    console.log(dataSend);

    axios
      .post(BASE_URL + "/admin/groups/add_group.php", JSON.stringify(dataSend))
      .then((res) => {
        console.log(res);
        if (res?.data?.status === "success") {
          toast.success(res?.data?.message);
          setAddGroupModal(false);
          handleGetGroups(currentPage, pageSize, filters, sortOrder);
          handleGetGroupsSelection();
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
  }

  function handleDeleteGroup(group_id) {
    const dataSend = {
      group_id: group_id,
    };

    console.log(dataSend);

    axios
      .post(
        BASE_URL + "/admin/groups/delete_group.php",
        JSON.stringify(dataSend)
      )
      .then((res) => {
        console.log(res);
        if (res?.data?.status === "success") {
          toast.success(res?.data?.message);
          setDeleteGroupModal(false);
          handleGetGroups(currentPage, pageSize, filters, sortOrder);
          handleGetGroupsSelection();
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
  }

  function handleEditGroup() {
    const dataSend = {
      group_id: EditGroupModal.group_id,
      group_name: EditGroupModal.group_name,
      start_time: EditGroupModal.start_time,
      end_time: EditGroupModal.end_time,
    };

    console.log(dataSend);

    axios
      .post(BASE_URL + "/admin/groups/edit_group.php", JSON.stringify(dataSend))
      .then((res) => {
        console.log(res);
        if (res?.data?.status === "success") {
          toast.success(res?.data?.message);
          setEditGroupModal(false);
          handleGetGroups(currentPage, pageSize, filters, sortOrder);
          handleGetGroupsSelection();
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
  }

  const [NotificationBody, setNotificationBody] = useState({
    notification_body: null,
  });

  function handelSendNotification() {
    const dataSend = {
      group_id: SendNotificationModa?.group_id,
      notification_body: NotificationBody?.notification_body,
    };

    console.log(dataSend);

    axios
      .post(
        BASE_URL + "/admin/notification/send_notification.php",
        JSON.stringify(dataSend)
      )
      .then((res) => {
        console.log(res);
        if (res?.data?.status === "success") {
          toast.success(res?.data?.message);
          setSendNotificationModa(null);
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
  }

  const [Trackes, setTrackes] = useState([]);
  function handleSelectTracks() {
    axios
      .get(BASE_URL + "/admin/tracks/select_active_tracks.php")
      .then((res) => {
        console.log(res);
        if (res?.data?.status === "success") {
          setTrackes(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
  }

  const trackOptions = Trackes.map((track) => {
    return { label: track?.name, value: track?.id };
  });

  const [Branches, setBranches] = useState([]);
  function handleSelectBranches() {
    axios
      .get(BASE_URL + "/admin/branches/select_branch.php")
      .then((res) => {
        console.log(res);
        if (res?.data?.status === "success") {
          setBranches(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
  }

  const BranchOptions = Branches.map((branch) => {
    return { label: branch?.branch_name, value: branch?.branch_id };
  });

  const [Rounds, setRounds] = useState([]);

  function handleSelectRounds(branch_id) {
    const dtaSend = {
      branch_id: branch_id,
    };
    axios
      .post(BASE_URL + "/admin/round/select_round.php", JSON.stringify(dtaSend))
      .then((res) => {
        console.log(res);
        if (res?.data?.status === "success") {
          setRounds(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
  }

  const RoundsOptions = Rounds.map((Round) => {
    return { label: Round?.round_name, value: Round?.round_id };
  });

  const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "mix", value: "mix" },
  ];

  useEffect(() => {
    handleSelectTracks();
    handleSelectBranches();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleGetLevels() {
    axios
      .get(
        "http://camp-coding.online/camp-for-english/admin/content/select_levels.php"
      )
      .then((res) => {
        console.log(res);
        if (res?.data?.status === "success") {
          setAllLevels(res?.data?.message);
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
  }

  const [Students, setStudents] = useState([]);

  function handleGetStudents(branch_id) {
    axios
      .post(
        "http://camp-coding.online/camp-for-english/admin/home/select_student_with_remaining_sub.php",
        {
          branch_id: branch_id,
          admin_type: AdminData[0]?.type,
        }
      )
      .then((res) => {
        console.log(res);
        if (res?.data?.status === "success") {
          setStudents(res?.data?.message);
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
  }

  const [AllStudents, setAllStudents] = useState([]);

  function handleGroupGetStudents(group_id) {
    axios
      .post(
        "http://camp-coding.online/camp-for-english/admin/absence/select_student_to_chat.php",
        {
          group_id: group_id,
        }
      )
      .then((res) => {
        console.log(res);
        if (res?.data?.status === "success") {
          setAllStudents(res?.data?.message);
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    handleGetLevels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleAssignGroupToLevel() {
    if (!assignData.level_id || !assignData.student_max) {
      toast.error("Please fill all required fields");
      return;
    }

    const dataSend = {
      level_id: assignData.level_id,
      group_id: rowData?.group_id,
      max_student: assignData.student_max,
    };

    axios
      .post(
        "http://camp-coding.online/camp-for-english/admin/home/assign_level_group.php",
        dataSend
      )
      .then((res) => {
        console.log(res);
        if (res?.data?.status === "success") {
          toast.success(res?.data?.message);
          setAssignGroupModal(false);
          handleSelectGroup(rowData?.group_id);
          setAssignData({ level_id: "", student_max: null });
          handleGetGroups(currentPage, pageSize, filters, sortOrder);
          handleGetGroupsSelection();
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((e) => {
        console.log(e);
        toast.error("Error assigning group to level");
      });
  }

  const [student, setStudent] = useState(null);
  const [group, setGroup] = useState(null);

  const handelAddNotSubscriebedStudentSub = async () => {
    const packId = Students.find((std) => std?.student_id === student);

    const dataSend = {
      type: "level",
      level_id: rowData?.group_levels?.level_id,
      group_id: rowData?.group_id,
      student_id: student,
      admin_id: AdminData[0].admin_id,
      package_id: packId?.package_id,
    };

    console.log(dataSend);

    axios
      .post(
        BASE_URL + "/admin/subscription/make_subscription_to_student.php",
        JSON.stringify(dataSend)
      )
      .then((res) => {
        console.log(res);
        if (res?.data?.status === "success") {
          toast.success(res?.data?.message);
          setAssignStudentModal(false);
          setStudent(null);
          handleGetStudents(rowData?.branch_id);
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
  };

  const handelUpdateGroupStudents = async () => {
    const studentData = AllStudents.map(
      (student) => `${student.student_id}**${student.package_id}`
    ).join("**camp**");

    const dataSend = {
      level_id: group?.split("_")[1],
      group_id: group?.split("_")[0],
      admin_id: AdminData[0].admin_id,
      student_data: studentData,
    };

    axios
      .post(
        BASE_URL + "/admin/subscription/upgrade_all_student.php",
        JSON.stringify(dataSend)
      )
      .then((res) => {
        console.log(res);
        if (res?.data?.status === "success") {
          exportStudentsToExcel(false);
          toast.success(res?.data?.message);
          setUpdateStudentLevelModal(false);
          setGroup(null);
          handleGetGroups(currentPage, pageSize, filters, sortOrder);
          handleGetGroupsSelection();
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
  };

  // Function to export students to Excel
  const exportStudentsToExcel = (showToast = true) => {
    const studentsWithRemainingCount = AllStudents;

    if (studentsWithRemainingCount.length === 0) {
      if (showToast) {
        toast.warning("No students found!");
      }
      return;
    }

    const excelData = studentsWithRemainingCount.map((student) => ({
      "Student ID": student.student_id,
      Name: student.name,
      Email: student.email,
      Phone: student.phone,
      "Remaining Sub Count": student.remaining_sub_count,
      Updated: student.remaining_sub_count > 0 ? "Yes" : "No",
      ...(student.gender && { Gender: student.gender }),
      ...(student.birth_date && { "Birth Date": student.birth_date }),
      ...(student.address && { Address: student.address }),
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);

    const columnWidths = [
      { wch: 12 },
      { wch: 25 },
      { wch: 30 },
      { wch: 15 },
      { wch: 20 },
      { wch: 15 },
    ];
    worksheet["!cols"] = columnWidths;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

    const currentDate = new Date().toISOString().split("T")[0];
    const selectedGroupName =
      GroupSelection.find((g) => g.group_id === parseInt(group?.split("_")[0]))
        ?.group_name || "Group";
    const filename = `Students_Remaining_Sub_${selectedGroupName}_${currentDate}.xlsx`;

    XLSX.writeFile(workbook, filename);

    if (showToast) {
      toast.success(
        `Excel file downloaded with ${studentsWithRemainingCount.length} students!`
      );
    }
  };

  // ✅ Columns with built-in filters
  const columns = [
    {
      id: "group_id",
      dataIndex: "group_id",
      title: "#",
      width: 80,
    },
    {
      id: "group_name",
      dataIndex: "group_name",
      title: "Group Name",
      width: 150,
      filteredValue: filters.group_name || null,
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search group name"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => confirm()}
            style={{ marginBottom: 8, display: "block" }}
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              type="primary"
              onClick={() => confirm()}
              icon={<BsSearch />}
              size="small"
              style={{ width: 85 }}
            >
              Search
            </Button>
            <Button
              onClick={() => {
                clearFilters();
                confirm();
              }}
              size="small"
              style={{ width: 85 }}
            >
              Reset
            </Button>
          </div>
        </div>
      ),
      filterIcon: (filtered) => (
        <BsSearch style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
      onFilter: (value, record) => true, // Handled by backend
    },
    {
      id: "branch_name",
      dataIndex: "branch_name",
      title: "Branch",
      width: 150,
      filteredValue: filters.branch_name || null,
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search branch"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => confirm()}
            style={{ marginBottom: 8, display: "block" }}
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              type="primary"
              onClick={() => confirm()}
              icon={<BsSearch />}
              size="small"
              style={{ width: 85 }}
            >
              Search
            </Button>
            <Button
              onClick={() => {
                clearFilters();
                confirm();
              }}
              size="small"
              style={{ width: 85 }}
            >
              Reset
            </Button>
          </div>
        </div>
      ),
      filterIcon: (filtered) => (
        <BsSearch style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
      onFilter: (value, record) => true, // Handled by backend
    },
    {
      id: "round_name",
      dataIndex: "round_name",
      title: "Round",
      width: 150,
      filteredValue: filters.round_name || null,
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search round"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => confirm()}
            style={{ marginBottom: 8, display: "block" }}
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              type="primary"
              onClick={() => confirm()}
              icon={<BsSearch />}
              size="small"
              style={{ width: 85 }}
            >
              Search
            </Button>
            <Button
              onClick={() => {
                clearFilters();
                confirm();
              }}
              size="small"
              style={{ width: 85 }}
            >
              Reset
            </Button>
          </div>
        </div>
      ),
      filterIcon: (filtered) => (
        <BsSearch style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
      onFilter: (value, record) => true, // Handled by backend
    },
    {
      id: "instructor_name",
      dataIndex: "instructor_name",
      title: "Instructor Name",
      width: 150,
      filteredValue: filters.instructor_name || null,
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search instructor"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => confirm()}
            style={{ marginBottom: 8, display: "block" }}
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              type="primary"
              onClick={() => confirm()}
              icon={<BsSearch />}
              size="small"
              style={{ width: 85 }}
            >
              Search
            </Button>
            <Button
              onClick={() => {
                clearFilters();
                confirm();
              }}
              size="small"
              style={{ width: 85 }}
            >
              Reset
            </Button>
          </div>
        </div>
      ),
      filterIcon: (filtered) => (
        <BsSearch style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
      onFilter: (value, record) => true, // Handled by backend
    },
    {
      id: "start_time",
      dataIndex: "start_time",
      title: "Start Time",
      width: 130,
      sorter: true,
      sortOrder: sortOrder.start_time || null,
    },
    {
      id: "end_time",
      dataIndex: "end_time",
      title: "End Time",
      width: 130,
      sorter: true,
      sortOrder: sortOrder.end_time || null,
    },
    {
      title: "Actions",
      fixed: "right",
      width: 400,
      render: (text, row) => {
        const items = [
          {
            key: "1",
            label: (
              <button
                className="btn btn-primary"
                style={{ width: "100%" }}
                onClick={() => {
                  handleSelectGroup(row?.group_id);
                  setRowData(row);
                  setOpenGroupLevelModal(true);
                }}
              >
                Group Levels
              </button>
            ),
          },
          {
            key: "2",
            label: (
              <button
                className="btn btn-primary"
                style={{ width: "100%" }}
                onClick={() => {
                  setAssignGroupModal(true);
                  setRowData(row);
                }}
              >
                Assign Group To Level
              </button>
            ),
          },
          {
            key: "3",
            label: (
              <button
                className="btn btn-primary"
                style={{ width: "100%" }}
                onClick={() => setSendNotificationModa(row)}
              >
                send notification
              </button>
            ),
          },
          {
            key: "8",
            label: (
              <button
                className="btn btn-primary"
                style={{ width: "100%" }}
                onClick={() =>
                  navigate(`/instructions?group_id=${row?.group_id}`)
                }
              >
                Instructions
              </button>
            ),
          },
          {
            key: "4",
            label: (
              <Link
                to={`${process.env.PUBLIC_URL}/groups/${row?.group_id}/students`}
                className="btn btn-primary text-white"
                style={{
                  width: "100%",
                  textDecoration: "none",
                  color: "inherit",
                }}
                onClick={(e) => {
                  if (e.ctrlKey || e.metaKey) {
                    return;
                  }
                  e.preventDefault();
                  navigate(
                    `${process.env.PUBLIC_URL}/groups/${row?.group_id}/students`
                  );
                }}
              >
                group's students
              </Link>
            ),
          },
          {
            key: "5",
            label: (
              <Link
                to={`${process.env.PUBLIC_URL}/groups/${row?.group_id}/sessions`}
                className="btn btn-primary text-white"
                style={{
                  width: "100%",
                  textDecoration: "none",
                  color: "inherit",
                }}
                onClick={(e) => {
                  if (e.ctrlKey || e.metaKey) {
                    return;
                  }
                  e.preventDefault();
                  navigate(
                    `${process.env.PUBLIC_URL}/groups/${row?.group_id}/sessions`
                  );
                }}
              >
                Sessions
              </Link>
            ),
          },
          ...(AdminData?.length > 0 && AdminData[0]?.type === "super_admin"
            ? [
              {
                key: "6",
                label: (
                  <button
                    className="btn btn-primary"
                    style={{ width: "100%" }}
                    onClick={() => setDeleteGroupModal(row)}
                  >
                    Delete group
                  </button>
                ),
              },
            ]
            : []),
          ...(AdminData?.length > 0 && AdminData[0]?.type === "super_admin"
            ? [
              {
                key: "7",
                label: (
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setEditGroupModal(row);
                    }}
                  >
                    Edit
                  </button>
                ),
              },
            ]
            : []),
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
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "3px",
                }}
              >
                <FaEllipsisVertical />
              </Button>
            </Dropdown>
            <Button
              onClick={() => {
                setAssignStudentModal(true);
                setRowData(row);
                handleGetStudents(row?.branch_id);
              }}
            >
              assign students
            </Button>
            <Button
              onClick={() => {
                setUpdateStudentLevelModal(true);
                setRowData(row);
                handleGroupGetStudents(row?.group_id);
              }}
            >
              upgrade student level
            </Button>
            <Button
              onClick={() => {
                setCurrentGroupData(row);
                handleGetGroupAdmins(row?.group_id);
                setGroupAdminModal(true);
              }}
            >
              Group Admin
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Breadcrumbs
        parent="Groups"
        title={roundId ? `Groups - Round ${roundId}` : "Groups List"}
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>List Groups</h5>
                <div className="d-flex gap-2">
                  {(Object.keys(filters).length > 0 ||
                    Object.keys(sortOrder).length > 0) && (
                      <Button
                        onClick={() => {
                          setFilters({});
                          setSortOrder({});
                          setCurrentPage(1);
                          updateSearchParams(1, pageSize, {}, {});
                        }}
                        style={{ margin: "10px 0" }}
                      >
                        Clear Filters
                      </Button>
                    )}
                  {roundId && (
                    <Button
                      onClick={() => {
                        setCurrentPage(1);
                        setFilters({});
                        setSortOrder({});
                        navigate("/groups?page=1&limit=10");
                      }}
                      style={{ margin: "10px 0" }}
                    >
                      Show All Groups
                    </Button>
                  )}
                  {((AdminData?.length > 0 &&
                    AdminData[0]?.type === "super_admin") ||
                    AdminData[0]?.type === "employee") && (
                      <Button
                        color="primary btn-pill"
                        style={{ margin: "10px 0" }}
                        onClick={() => setAddGroupModal(true)}
                      >
                        Add group
                      </Button>
                    )}
                </div>
              </div>
              <div className="card-body bg-red">
                <Table
                  loading={loading}
                  scroll={{
                    x: "max-content",
                  }}
                  rowKey="group_id"
                  columns={columns}
                  dataSource={Groups}
                  pagination={{
                    current: currentPage,
                    pageSize: pageSize,
                    total: totalGroups, // ✅ This now uses the 'total' field from API
                    showSizeChanger: true,
                    pageSizeOptions: ["5", "10", "20", "50", "100"],
                    showTotal: (total, range) =>
                      `Showing ${range[0]}-${range[1]} of ${total} groups`, // ✅ Better display
                  }}
                  onChange={handleTableChange}
                  rowClassName={(record) => {
                    if (record.finished == "1") return "finished-row";
                    return "";
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* All modals remain the same as previous code... */}
      {/* Add Group Modal */}
      <Modal
        title="Add group"
        open={AddGroupModal}
        footer={
          <>
            <Button style={{ margin: "0px 10px " }} onClick={handleAddGroup}>
              Add
            </Button>
            <Button onClick={() => setAddGroupModal(false)}>Cancel</Button>
          </>
        }
        onCancel={() => setAddGroupModal(false)}
      >
        <>
          <div className="form_field">
            <label className="form_label">group track</label>
            <Select
              options={trackOptions}
              onChange={(e) => {
                setNewGroupData({ ...NewGroupData, track_id: e });
              }}
            />
          </div>
          <div className="form_field">
            <label className="form_label">group location</label>
            <Select
              options={BranchOptions}
              onChange={(e) => {
                setNewGroupData({ ...NewGroupData, branch_id: e });
                handleSelectRounds(e);
              }}
            />
          </div>
          <div className="form_field">
            <label className="form_label">group round</label>
            <Select
              options={RoundsOptions}
              onChange={(e) => {
                setNewGroupData({ ...NewGroupData, round_id: e });
              }}
            />
          </div>

          <div className="form_field">
            <label className="form_label">group gender</label>
            <Select
              options={genderOptions}
              onChange={(e) => {
                setNewGroupData({ ...NewGroupData, gender: e });
              }}
            />
          </div>
          <div className="form_field">
            <label className="form_label">group name</label>
            <input
              type="text"
              className="form_input"
              onChange={(e) => {
                setNewGroupData({
                  ...NewGroupData,
                  group_name: e.target.value,
                });
              }}
            />
          </div>
          <div className="form_field">
            <label className="form_label">time</label>
            <input
              type="time"
              className="form_input"
              onChange={(e) => {
                setNewGroupData({
                  ...NewGroupData,
                  group_time: e.target.value,
                });
              }}
            />
          </div>
          <div className="form_field">
            <label className="form_label">time</label>
            <Select
              options={[
                { label: "saturday_tuesday", value: "saturday_tuesday" },
                { label: "sunday_wednesday", value: "sunday_wednesday" },
                { label: "monday_thursday", value: "monday_thursday" },
              ]}
              onChange={(e) => {
                setNewGroupData({
                  ...NewGroupData,
                  time: e,
                });
              }}
            />
          </div>
          <div className="form_field">
            <label className="form_label">start date</label>
            <input
              type="date"
              className="form_input"
              onChange={(e) => {
                setNewGroupData({
                  ...NewGroupData,
                  start_time: e.target.value,
                });
              }}
            />
          </div>
          <div className="form_field">
            <label className="form_label">end date</label>
            <input
              type="date"
              className="form_input"
              onChange={(e) => {
                setNewGroupData({
                  ...NewGroupData,
                  end_time: e.target.value,
                });
              }}
            />
          </div>
        </>
      </Modal>

      {/* Edit Group Modal */}
      <Modal
        title="Edit group"
        open={EditGroupModal}
        footer={
          <>
            <Button style={{ margin: "0px 10px " }} onClick={handleEditGroup}>
              Edit
            </Button>
            <Button onClick={() => setEditGroupModal(null)}>Cancel</Button>
          </>
        }
        onCancel={() => setEditGroupModal(null)}
      >
        <>
          <div className="form_field">
            <label className="form_label">group name</label>
            <input
              type="text"
              className="form_input"
              value={EditGroupModal?.group_name || ""}
              onChange={(e) => {
                setEditGroupModal({
                  ...EditGroupModal,
                  group_name: e.target.value,
                });
              }}
            />
          </div>
          <div className="form_field">
            <label className="form_label">start date</label>
            <input
              type="date"
              className="form_input"
              value={EditGroupModal?.start_time || ""}
              onChange={(e) => {
                setEditGroupModal({
                  ...EditGroupModal,
                  start_time: e.target.value,
                });
              }}
            />
          </div>
          <div className="form_field">
            <label className="form_label">end date</label>
            <input
              type="date"
              className="form_input"
              value={EditGroupModal?.end_time || ""}
              onChange={(e) => {
                setEditGroupModal({
                  ...EditGroupModal,
                  end_time: e.target.value,
                });
              }}
            />
          </div>
        </>
      </Modal>

      {/* Delete Group Modal */}
      <Modal
        title="Delete group"
        open={DeleteGroupModal}
        footer={
          <>
            <Button
              style={{ margin: "0px 10px " }}
              onClick={() => handleDeleteGroup(DeleteGroupModal?.group_id)}
            >
              Delete
            </Button>
            <Button onClick={() => setDeleteGroupModal(null)}>Cancel</Button>
          </>
        }
        onCancel={() => setDeleteGroupModal(null)}
      >
        <h3>Are you sure that you want to delete this group?</h3>
      </Modal>

      {/* Send Notification Modal */}
      <Modal
        title="send notification to group"
        open={SendNotificationModa}
        footer={
          <>
            <Button
              style={{ margin: "0px 10px " }}
              onClick={() =>
                handelSendNotification(SendNotificationModa?.group_id)
              }
            >
              Send
            </Button>
            <Button onClick={() => setSendNotificationModa(null)}>
              Cancel
            </Button>
          </>
        }
        onCancel={() => setSendNotificationModa(null)}
      >
        <div className="form_field">
          <label className="form_label">notification text</label>
          <input
            type="text"
            className="form_input"
            value={NotificationBody?.notification_body || ""}
            onChange={(e) => {
              setNotificationBody({
                ...NotificationBody,
                notification_body: e.target.value,
              });
            }}
          />
        </div>
      </Modal>

      {/* Group Levels Modal */}
      <Modal
        title="Group Levels"
        open={openGroupLevelModal}
        footer={
          <>
            <Button onClick={() => setOpenGroupLevelModal(false)}>Close</Button>
          </>
        }
        onCancel={() => setOpenGroupLevelModal(false)}
      >
        <Table
          columns={[
            {
              dataIndex: "level_id",
              key: "level_id",
              title: "#",
            },
            {
              title: "Level Name",
              dataIndex: "level_name",
              key: "level_name",
            },
            {
              title: "Max Students",
              dataIndex: "max_student",
              key: "max_student",
            },
          ]}
          dataSource={selectGroups}
          rowKey="level_id"
        />
      </Modal>

      {/* Assign Group To Level Modal */}
      <Modal
        title="Assign Group To Level"
        open={assignGroupModal}
        footer={
          <>
            <Button
              style={{ margin: "0px 10px" }}
              onClick={handleAssignGroupToLevel}
            >
              Assign
            </Button>
            <Button
              onClick={() => {
                setAssignGroupModal(false);
                setAssignData({ level_id: "", student_max: null });
              }}
            >
              Cancel
            </Button>
          </>
        }
        onCancel={() => {
          setAssignGroupModal(false);
          setAssignData({ level_id: "", student_max: null });
        }}
      >
        <div className="form_field">
          <label className="form_label">Select Level</label>
          <Select
            className="w-100"
            placeholder="Choose Level"
            value={assignData.level_id}
            onChange={(value) =>
              setAssignData({ ...assignData, level_id: value })
            }
            options={allLevels?.map((level) => ({
              label: level?.level_name,
              value: level?.level_id,
            }))}
          />
        </div>

        <div className="form_field">
          <label className="form_label">Maximum Students</label>
          <input
            type="number"
            className="form_input"
            value={assignData.student_max || ""}
            onChange={(e) =>
              setAssignData({ ...assignData, student_max: e.target.value })
            }
            placeholder="Enter maximum number of students"
          />
        </div>
      </Modal>

      {/* Assign Student Modal */}
      <Modal
        title={`Assign student To group -> level -> ${rowData?.group_levels?.level_name || ""
          }`}
        open={AssignStudentModal}
        footer={
          <>
            <Button
              style={{ margin: "0px 10px" }}
              onClick={handelAddNotSubscriebedStudentSub}
            >
              Assign
            </Button>
            <Button
              onClick={() => {
                setAssignStudentModal(false);
                setStudent(null);
              }}
            >
              Cancel
            </Button>
          </>
        }
        onCancel={() => {
          setAssignStudentModal(false);
          setStudent(null);
        }}
      >
        <div className="form_field">
          <label className="form_label">Select student</label>
          <Select
            showSearch
            className="w-100"
            placeholder="Choose student"
            value={student}
            filterOption={(input, option) =>
              option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            onChange={(e) => setStudent(e)}
            options={Students.map((student) => {
              return {
                label: `${student?.name} -> ${student?.phone} -> ${student?.email} `,
                value: student?.student_id,
              };
            })}
          />
        </div>
      </Modal>

      {/* Update Student Level Modal */}
      <Modal
        title={` Update group students from -> level  -> ${rowData?.group_levels?.level_name || ""
          }`}
        width={800}
        open={UpdateStudentLevelModal}
        footer={
          <>
            <Button
              style={{ margin: "0px 10px" }}
              onClick={handelUpdateGroupStudents}
              disabled={!group}
            >
              Update
            </Button>
            <Button
              onClick={() => {
                setUpdateStudentLevelModal(false);
                setGroup(null);
              }}
            >
              Cancel
            </Button>
          </>
        }
        onCancel={() => {
          setUpdateStudentLevelModal(false);
          setGroup(null);
        }}
      >
        <div className="form_field">
          <label className="form_label">Select group</label>
          <Select
            className="w-100"
            placeholder="Choose group"
            value={group}
            onChange={(e) => setGroup(e)}
            options={GroupSelection.filter(
              (item) => item.group_levels?.level_id != null
            ).map((group) => {
              return {
                label: `${group?.group_name} -> ${group?.group_levels?.level_name} `,
                value: `${group?.group_id}_${group?.group_levels?.level_id}`,
              };
            })}
          />
        </div>
        <div className="card-body">
          <Table
            scroll={{
              x: "max-content",
            }}
            columns={Studcolumns}
            dataSource={AllStudents}
          />
        </div>
      </Modal>

      {/* Group Admin Modal */}
      <Modal
        title={`Group Admins - ${currentGroupData?.group_name || ""}`}
        open={GroupAdminModal}
        width={800}
        footer={
          <>
            <Button
              onClick={() => {
                setGroupAdminModal(false);
                setGroupAdmins([]);
                setCurrentGroupData(null);
              }}
            >
              Close
            </Button>
          </>
        }
        onCancel={() => {
          setGroupAdminModal(false);
          setGroupAdmins([]);
          setCurrentGroupData(null);
        }}
      >
        <div className="card-body">
          <Table
            scroll={{
              x: "max-content",
            }}
            columns={groupAdminColumns}
            dataSource={GroupAdmins}
            rowKey={(record) => `${record.admin_id}_${record.group_id}`}
            pagination={{ pageSize: 10 }}
          />
        </div>
      </Modal>
    </>
  );
};

export default GroupsList;
