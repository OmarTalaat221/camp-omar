import { Table, Button, Modal, DatePicker, Input } from "antd";
import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../../component/common/breadcrumb/breadcrumb";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../../Api/baseUrl";
import { FaFileExcel, FaEye } from "react-icons/fa6";
import { BsSearch } from "react-icons/bs";
import { toast } from "react-toastify";
import ExcelJS from "exceljs";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import "./style.css";

dayjs.extend(isBetween);

const { RangePicker } = DatePicker;

const BranchDetails = () => {
  const { branch_id } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [Branches, setBranches] = useState([]);
  const [showDateModal, setShowDateModal] = useState(false);
  const [dateRange, setDateRange] = useState(null);
  const [exporting, setExporting] = useState(false);

  function handleGetBranches() {
    const dataSend = {
      branch_id: branch_id,
    };
    axios
      .post(
        BASE_URL + "/admin/branches/branch_payments.php",
        JSON.stringify(dataSend)
      )
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

  // Search handlers
  const handleSearch = (value, dataIndex) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(dataIndex, value);
    } else {
      params.delete(dataIndex);
    }
    setSearchParams(params);
  };

  const handleReset = (dataIndex) => {
    const params = new URLSearchParams(searchParams);
    params.delete(dataIndex);
    setSearchParams(params);
  };

  const getColumnSearchProps = (dataIndex) => {
    const currentValue = searchParams.get(dataIndex) || "";

    return {
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <div style={{ padding: 8 }}>
            <Input
              placeholder={`Search ${dataIndex}`}
              defaultValue={currentValue}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
              }}
              onPressEnter={() => {
                handleSearch(selectedKeys[0] || "", dataIndex);
              }}
              style={{ marginBottom: 8, display: "block" }}
            />
            <div style={{ display: "flex", gap: "8px" }}>
              <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys[0] || "", dataIndex)}
                icon={<BsSearch />}
                size="small"
                style={{ width: 90 }}
              >
                Search
              </Button>
              <Button
                onClick={() => {
                  setSelectedKeys([]);
                  handleReset(dataIndex);
                }}
                size="small"
                style={{ width: 90 }}
              >
                Reset
              </Button>
            </div>
          </div>
        );
      },
      filterIcon: (filtered) => (
        <BsSearch
          style={{
            color: currentValue ? "#1890ff" : undefined,
          }}
        />
      ),
      filtered: !!currentValue,
    };
  };

  // Filter data based on search params
  const getFilteredData = (data) => {
    if (!data || !Array.isArray(data)) return [];

    let filtered = [...data];

    searchParams.forEach((value, key) => {
      filtered = filtered.filter((item) => {
        const itemValue = item[key]?.toString().toLowerCase() || "";
        return itemValue.includes(value.toLowerCase());
      });
    });

    return filtered;
  };

  // Filter data by date range
  const filterByDateRange = (data, dateField, startDate, endDate) => {
    if (!data || !Array.isArray(data)) return [];

    return data.filter((item) => {
      const itemDate = dayjs(item[dateField]);
      return (
        itemDate.isSame(startDate, "day") ||
        itemDate.isSame(endDate, "day") ||
        itemDate.isBetween(startDate, endDate, "day")
      );
    });
  };

  // Export Depts to Excel
  const exportDeptsToExcel = async () => {
    try {
      if (!dateRange || dateRange.length !== 2) {
        toast.error("Please select a date range");
        return;
      }

      setExporting(true);

      const [startDate, endDate] = dateRange;

      // Filter depts by date range
      const filteredDepts = filterByDateRange(
        Branches[0]?.branch_depts,
        "date",
        startDate,
        endDate
      );

      // Check if there's any data
      if (filteredDepts.length === 0) {
        toast.error("No depts found in the selected date range");
        setExporting(false);
        return;
      }

      // Create workbook
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Branch Depts");

      // Get all unique keys from the data to create dynamic columns
      const allKeys = new Set();
      filteredDepts.forEach((item) => {
        Object.keys(item).forEach((key) => allKeys.add(key));
      });

      // Convert to array and create columns
      const columns = Array.from(allKeys).map((key) => {
        // Format column header (capitalize and replace underscores)
        const header = key
          .split("_")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

        return {
          header: header,
          key: key,
          width: 20,
        };
      });

      worksheet.columns = columns;

      // Style the header row
      worksheet.getRow(1).font = {
        bold: true,
        color: { argb: "FFFFFFFF" },
      };
      worksheet.getRow(1).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF295557" },
      };
      worksheet.getRow(1).alignment = {
        vertical: "middle",
        horizontal: "center",
      };

      // Add data rows
      filteredDepts.forEach((item) => {
        worksheet.addRow(item);
      });

      // Style data rows
      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber > 1) {
          row.alignment = { vertical: "middle", wrapText: true };
          row.eachCell((cell) => {
            cell.border = {
              top: { style: "thin" },
              left: { style: "thin" },
              bottom: { style: "thin" },
              right: { style: "thin" },
            };
          });
        }
      });

      // Auto-fit columns
      worksheet.columns.forEach((column) => {
        let maxLength = 0;
        column.eachCell({ includeEmpty: true }, (cell) => {
          const columnLength = cell.value ? cell.value.toString().length : 10;
          if (columnLength > maxLength) {
            maxLength = columnLength;
          }
        });
        column.width = maxLength < 10 ? 10 : maxLength + 2;
      });

      // Generate and download
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Branch_Depts_${startDate.format(
        "YYYY-MM-DD"
      )}_to_${endDate.format("YYYY-MM-DD")}.xlsx`;
      link.click();
      window.URL.revokeObjectURL(url);

      toast.success("Excel file exported successfully!");
      setShowDateModal(false);
      setDateRange(null);
    } catch (error) {
      console.error("Error exporting to Excel:", error);
      toast.error("Failed to export Excel file");
    } finally {
      setExporting(false);
    }
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
  ];

  const Refundcolumns = [
    {
      id: "id",
      dataIndex: "id",
      title: "#",
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
  ];

  const Deptscolumns = [
    {
      title: "#",
      dataIndex: "student_id",
      key: "student_id",
      ...getColumnSearchProps("student_id"),
    },
    {
      title: "Client Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Payed",
      dataIndex: "payed",
      key: "payed",
      ...getColumnSearchProps("payed"),
    },
    {
      title: "Total Price",
      dataIndex: "total_price",
      key: "total_price",
      ...getColumnSearchProps("total_price"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      ...getColumnSearchProps("status"),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      ...getColumnSearchProps("date"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Button
          type="primary"
          icon={<FaEye />}
          onClick={() =>
            window.open(
              `/students/list/${record?.student_id}/profile`,
              "_blank"
            )
          }
          style={{
            backgroundColor: "#295557",
            borderColor: "#295557",
          }}
        >
          Profile
        </Button>
      ),
    },
  ];

  return (
    <>
      <Breadcrumbs parent="Branches" title="Branches List" />
      <div className="container-fluid branch_details">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div
                className="card-header"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                <h4>
                  <b> total students:</b>
                  <b style={{ color: "green" }}>
                    {Branches[0]?.branch_total_students}
                  </b>
                </h4>
                <h4>
                  <b> total income:</b>
                  <b style={{ color: "green" }}>{Branches[0]?.branch_income}</b>
                </h4>
                <h4>
                  <b> total expenses:</b>
                  <b style={{ color: "red" }}>
                    {Branches[0]?.branch_total_expenses || 0}
                  </b>
                </h4>
                <h4>
                  <b> total refunds :</b>
                  <b style={{ color: "red" }}>
                    {Branches[0]?.branch_total_refunds || 0}
                  </b>
                </h4>
              </div>

              <div className="card">
                <div className="card-header">
                  <h5>Branch Expenses</h5>
                </div>
                <div className="card-body">
                  <Table
                    scroll={{
                      x: "max-content",
                    }}
                    columns={columns}
                    dataSource={Branches[0]?.branch_expenses}
                  />
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h5>Branch Refunds</h5>
                </div>
                <div className="card-body">
                  <Table
                    scroll={{
                      x: "max-content",
                    }}
                    columns={Refundcolumns}
                    dataSource={Branches[0]?.branch_refunds}
                  />
                </div>
              </div>

              <div className="card">
                <div className="card-header d-flex justify-content-between">
                  <h5>Branch Depts</h5>
                  <Button
                    type="primary"
                    icon={<FaFileExcel />}
                    onClick={() => setShowDateModal(true)}
                    style={{ backgroundColor: "#217346" }}
                  >
                    Export Depts
                  </Button>
                </div>
                <div className="card-body">
                  <Table
                    scroll={{
                      x: "max-content",
                    }}
                    columns={Deptscolumns}
                    dataSource={getFilteredData(Branches[0]?.branch_depts)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Date Range Modal */}
      <Modal
        title="Select Date Range for Depts Export"
        open={showDateModal}
        onOk={exportDeptsToExcel}
        onCancel={() => {
          setShowDateModal(false);
          setDateRange(null);
        }}
        okText="Export"
        cancelText="Cancel"
        confirmLoading={exporting}
      >
        <div className="mb-3">
          <label className="form-label mb-2">Select Date Range:</label>
          <RangePicker
            style={{ width: "100%" }}
            value={dateRange}
            onChange={setDateRange}
            format="YYYY-MM-DD"
          />
        </div>
      </Modal>
    </>
  );
};

export default BranchDetails;
