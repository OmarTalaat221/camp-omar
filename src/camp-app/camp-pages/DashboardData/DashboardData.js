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


export const DashboardData = () => {
  const[BranchsData,setBranchesData]=useState([])
  const[DashboardData,setDashboardData]=useState([])


  
  function handleGetStatictis() {
    axios
      .get(BASE_URL + "/admin/dashboard/stats.php")
      .then((res) => {
        console.log(res);
        setDashboardData(res?.data)
        setBranchesData(res?.data?.branches);
        
      })
      .catch((e) => console.log(e));
  }  

  useEffect(()=>{
    handleGetStatictis()
  },[])
  
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
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
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
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
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
      id: "branch_name",
      dataIndex: "branch_name",
      title: "branches",
      ...getColumnSearchProps("branch_name")
    },
    {
      id: "new_students",
      dataIndex: "new_students",
      title: "New Members",
    },
    {
      id: "total_students",
      dataIndex: "total_students",
      title: "total students",
    },
    {
      id: "total",
      dataIndex: "total",
      title: "income",
      render: (text, row) => {
        return <p style={{ color: "green" }}>{row?.total}</p>;
      },
    },
    // {
    //   id: "revenue",
    //   dataIndex: "revenue",
    //   title: "Revenue",
    //   render: (text, row) => {
    //     return <p style={{ color: "green" }}>{row?.revenue}</p>;
    //   },
    // },
    {
      id: "refunds",
      dataIndex: "refunds",
      title: "Refunds",
      render: (text, row) => {
        return <p style={{ color: "red" }}>{row?.refunds}</p>;
      },
    },
    {
      id: "expenses",
      dataIndex: "expenses",
      title: "Expenses",
      render: (text, row) => {
        return <p style={{ color: "red" }}>{row?.expenses}</p>;
      },
    },
    // {
    //   id: "profitLoss",
    //   dataIndex: "profitLoss",
    //   title: "Net income",
    //   render: (text, row) => {
    //     return <p style={{ color: "blue" }}>{row?.net_income}</p>;
    //   },
    // },
    {
      id: "total",
      dataIndex: "total",
      title: "Total",
      render: (text, row) => {
        return (
          <p style={{ color: "blue" }}>
            { row.total -  row?.expenses - row?.refunds}
          </p>
        );
      },
    },
  ];

  const dashboardData = [
    {
      icon: (
        <IoMdPhonePortrait
          style={{ width: "40px", height: "40px", color: "#26dad2" }}
        />
      ),
      value: DashboardData?.leeds || 0,
      label: "New Leads",
    },
    {
      icon: (
        <FaUsers style={{ width: "40px", height: "40px", color: "#fc6180" }} />
      ),
      value: DashboardData?.clients || 0,
      label: "Clients",
    },
    {
      icon: (
        <FaMoneyBill
          style={{ width: "40px", height: "40px", color: "#4680ff" }}
        />
      ),
      value: DashboardData?.income || 0,
      label: "Income",
    },
    {
      icon: (
        <FaDollarSign
          style={{ width: "40px", height: "40px", color: "#62d1f3" }}
        />
      ),
      value: DashboardData?.expenses || 0,
      label: "Expenses",
    },
    {
      icon: (
        <BsCreditCard
          style={{ width: "40px", height: "40px", color: "#fc6180" }}
        />
      ),
      value: DashboardData?.refunds || 0,
      label: "Refunds",
    },
    {
      icon: (
        <FaChartColumn
          style={{ width: "40px", height: "40px", color: "#ffb64d" }}
        />
      ),
      value: DashboardData?.profitLoss || 0,
      label: "Profit / Loss",
    },
  ];



  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData && filteredData.length > 0 ? filteredData : BranchsData); // Convert JSON to Excel sheet
    const workbook = XLSX.utils.book_new(); // Create a new workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students"); // Append the sheet
    XLSX.writeFile(workbook, "students_data.xlsx"); // Export the workbook as a file
  };

  return (
    <>
      {/* <Breadcrumbs parent="Branches" title="Rounds List" /> */}
      <div className="container-fluid dashboard_container">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div
                className="card-header"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "15px",
                  padding: "20px"
                }}
              >
                {dashboardData.map((data) => {
                  return (
                    <>
                      <div className="data_continer">
                        <span>{data?.icon}</span>
                        <span>
                          <h4>
                            <CountUp
                              end={data?.value}
                              style={{ margin: "auto" }}
                            />
                          </h4>
                          <p>{data?.label}</p>
                        </span>
                      </div>
                    </>
                  );
                })}
              </div>

                <button
                  style={{ 
                    marginTop: "10px",
                    width: "fit-content",
                    padding: "8px 30px",
                    backgroundColor: "#41d607",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    transition: "all 0.3s ease"
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = "#35b005"}
                  onMouseOut={(e) => e.target.style.backgroundColor = "#41d607"}
                  onClick={handleExport}
                >
                  Export to Excel
                </button>
   
              <div className="card-body" style={{ overflowX: "auto" }}>
                <Table
                  rowKey={(record) => record.student_id}
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
                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
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
