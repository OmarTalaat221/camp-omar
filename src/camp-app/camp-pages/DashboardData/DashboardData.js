import React, { useEffect, useState } from "react";
import {
  FaChartColumn,
  FaDollarSign,
  FaMoneyBill,
  FaUsers,
} from "react-icons/fa6";
import { IoMdPhonePortrait } from "react-icons/io";
import { BsCreditCard } from "react-icons/bs";
import "./style.css";
import CountUp from "react-countup";
import { Button, Input, Table } from "antd";
import * as XLSX from "xlsx";
import { BASE_URL } from "../../../Api/baseUrl";
import axios from "axios";
import { BsSearch } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";

export const DashboardData = () => {
  const [BranchsData, setBranchesData] = useState([]);
  const [DashboardData, setDashboardData] = useState({
    totalStudents: 0,
    totalGroups: 0,
    activeGroups: 0,
    finishedGroups: 0,
    totalBranches: 0,
  });

  const navigate = useNavigate();

  function handleGetStatictis() {
    axios
      .get(BASE_URL + "/admin/dashboard/new_counted_data.php")
      .then((res) => {
        console.log(res);
        if (res?.data?.status === "success" && res?.data?.message) {
          const branches = res.data.message;
          setBranchesData(branches);

          // Calculate totals from branches data
          const totals = branches.reduce(
            (acc, branch) => {
              acc.totalStudents += branch.total_students || 0;
              acc.totalGroups += branch.total_groups || 0;
              acc.activeGroups += branch.active_groups || 0;
              acc.finishedGroups += branch.finished_groups || 0;
              return acc;
            },
            {
              totalStudents: 0,
              totalGroups: 0,
              activeGroups: 0,
              finishedGroups: 0,
              totalBranches: branches.length,
            }
          );

          setDashboardData(totals);
        }
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    handleGetStatictis();
  }, []);

  const [filteredData, setFilteredData] = useState(BranchsData);

  const handleTableChange = (pagination, filters, sorter, extra) => {
    // Capture the current filtered data
    if (extra && extra.currentDataSource) {
      setFilteredData(extra.currentDataSource);
      console.log("Filtered Data:", extra.currentDataSource); // Log filtered data
    }
  };

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<BsSearch />}
          size="small"
          style={{ width: 90 }}
        >
          Search
        </Button>
        <Button
          onClick={() => handleReset(clearFilters)}
          size="small"
          style={{ width: 90, marginTop: 8 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <BsSearch style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    render: (text) =>
      searchedColumn === dataIndex ? (
        <span style={{ backgroundColor: "#ffc069", padding: 0 }}>{text}</span>
      ) : (
        text
      ),
  });

  const columns = [
    {
      key: "branch_name",
      dataIndex: "branch_name",
      title: "Branch Name",
      ...getColumnSearchProps("branch_name"),
    },
    {
      key: "location",
      dataIndex: "location",
      title: "Location",
      ...getColumnSearchProps("location"),
    },
    {
      key: "phone",
      dataIndex: "phone",
      title: "Phone",
    },
    {
      key: "total_students",
      dataIndex: "total_students",
      title: "Total Students",
      sorter: (a, b) => a.total_students - b.total_students,
      render: (text) => (
        <span style={{ color: "#4680ff", fontWeight: "bold" }}>{text}</span>
      ),
    },
    {
      key: "total_groups",
      dataIndex: "total_groups",
      title: "Total Groups",
      sorter: (a, b) => a.total_groups - b.total_groups,
    },
    {
      key: "active_groups",
      dataIndex: "active_groups",
      title: "Active Groups",
      render: (text) => (
        <span style={{ color: "green", fontWeight: "bold" }}>{text}</span>
      ),
    },
    {
      key: "finished_groups",
      dataIndex: "finished_groups",
      title: "Finished Groups",
      render: (text) => <span style={{ color: "orange" }}>{text}</span>,
    },
  ];

  const dashboardData = [
    {
      to: "/branches",
      icon: (
        <FaUsers style={{ width: "40px", height: "40px", color: "#26dad2" }} />
      ),
      value: DashboardData?.totalBranches || 0,
      label: "Total Branches",
    },
    {
      to: "/students/list",
      icon: (
        <FaUsers style={{ width: "40px", height: "40px", color: "#fc6180" }} />
      ),
      value: DashboardData?.totalStudents || 0,
      label: "Total Students",
    },
    {
      to: "/groups",
      icon: (
        <FaMoneyBill
          style={{ width: "40px", height: "40px", color: "#4680ff" }}
        />
      ),
      value: DashboardData?.totalGroups || 0,
      label: "Total Groups",
    },
    {
      to: "/groups",
      icon: (
        <FaDollarSign
          style={{ width: "40px", height: "40px", color: "#62d1f3" }}
        />
      ),
      value: DashboardData?.activeGroups || 0,
      label: "Active Groups",
    },
    {
      to: "/groups",
      icon: (
        <BsCreditCard
          style={{ width: "40px", height: "40px", color: "#fc6180" }}
        />
      ),
      value: DashboardData?.finishedGroups || 0,
      label: "Finished Groups",
    },
  ];

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredData && filteredData.length > 0 ? filteredData : BranchsData
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Branches");
    XLSX.writeFile(workbook, "branches_data.xlsx");
  };

  return (
    <>
      <div className="container-fluid dashboard_container">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div
                className="card-header"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: "15px",
                  padding: "20px",
                }}
              >
                {dashboardData.map((data, index) => {
                  return (
                    <Link to={data?.to} className="data_continer" key={index}>
                      <span>{data?.icon}</span>
                      <span>
                        <h4>
                          <CountUp
                            end={data?.value}
                            style={{ margin: "auto" }}
                            decimals={data.label.includes("%") ? 1 : 0}
                            suffix={data.label.includes("%") ? "%" : ""}
                          />
                        </h4>
                        <p>{data?.label}</p>
                      </span>
                    </Link>
                  );
                })}
              </div>

              <div className="card-body" style={{ overflowX: "auto" }}>
                <button
                  style={{
                    marginBottom: "10px",
                    width: "fit-content",
                    padding: "8px 30px",
                    backgroundColor: "#41d607",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  onMouseOver={(e) =>
                    (e.target.style.backgroundColor = "#35b005")
                  }
                  onMouseOut={(e) =>
                    (e.target.style.backgroundColor = "#41d607")
                  }
                  onClick={handleExport}
                >
                  Export to Excel
                </button>
                <Table
                  rowKey={(record) => record.branch_id}
                  onChange={handleTableChange}
                  scroll={{
                    x: "max-content",
                  }}
                  columns={columns}
                  dataSource={BranchsData}
                  pagination={{
                    responsive: true,
                    pageSize: 10,
                    showSizeChanger: true,
                    showTotal: (total, range) =>
                      `${range[0]}-${range[1]} of ${total} items`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
