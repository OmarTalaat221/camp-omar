import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../../../component/common/breadcrumb/breadcrumb";
import { Button, Dropdown, Input, Modal, Table } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../../../Api/baseUrl";
import { render } from "@testing-library/react";
import { FaEllipsisVertical, FaTrashCan } from "react-icons/fa6";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import { BsSearch } from "react-icons/bs";

const LevelStudents = () => {
  const navigate = useNavigate();
  const [Students, setStudents] = useState([]);
  const [ResetScoreModal, setResetScoreModal] = useState(null);

  const { level_id } = useParams();

  const [filteredData, setFilteredData] = useState(Students);

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
      id: "student_id",
      dataIndex: "student_id",
      title: "student_id",
      ...getColumnSearchProps("student_id"),
    },
    {
      id: "student_name",
      dataIndex: "student_name",
      ...getColumnSearchProps("student_name"),
    },
    {
      id: "student_score",
      title: "score",
      dataIndex: "score_value",
      ...getColumnSearchProps("score"),
    },
    {
      id: "student_score",
      title: "solve date",
      dataIndex: "date_solve",
    },
    {
      title: "Actions",
      render: (text, row) => {
        const items = [
          {
            key: 1,
            label: (
              <button
                className="btn btn-primary"
                style={{ width: "100%" }}
                onClick={() => {
                  setResetScoreModal(row);
                }}
              >
                reset score
              </button>
            ),
          },
          {
            key: 2,
            label: (
              <Link
                to={`${process.env.PUBLIC_URL}/levels/${level_id}/students/${row?.student_id}/answers`}
                className="btn btn-primary"
                style={{ width: "100%" }}
                // onClick={() => {
                //   navigate(
                //     `${process.env.PUBLIC_URL}/levels/${level_id}/students/${row?.student_id}/answers`
                //   );
                // }}
              >
                student answers
              </Link>
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
                className="btn btn-primary"
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

  function handleGetAllStudents() {
    const data_send = {
      level_id: level_id,
    };
    console.log(data_send);
    axios
      .post(
        BASE_URL + "/admin/level_exam/select_student_solved_exam.php",
        data_send
      )
      .then((res) => {
        if (res?.data?.status == "success") {
          setStudents(res?.data?.message);
        }
      });
  }

  useEffect(() => {
    handleGetAllStudents();
  }, []);

  function handelResetStudentScore() {
    const data_send = {
      level_id: level_id,
      score_id: ResetScoreModal?.score_id,
      student_id: ResetScoreModal?.student_id,
    };
    console.log(data_send);
    axios
      .post(
        BASE_URL + "/admin/level_exam/reset_student_exam_level.php",
        data_send
      )
      .then((res) => {
        if (res?.data?.status == "success") {
          toast.success(res?.data?.message);
          setResetScoreModal(null);
          handleGetAllStudents();
        } else {
          toast.error(res?.data?.message || "Some thing went wrong");
        }
      })
      .catch((e) => console.log(e));
  }

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredData && filteredData.length > 0 ? filteredData : Students
    ); // Convert JSON to Excel sheet
    const workbook = XLSX.utils.book_new(); // Create a new workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students"); // Append the sheet
    XLSX.writeFile(workbook, "Level's Exam students List .xlsx"); // Export the workbook as a file
  };

  return (
    <>
      <Breadcrumbs parent="Levels" title="Level's Exam students" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>Level's Exam students List</h5>
                <button
                  className="btn btn-success"
                  style={{ marginTop: "10px" }}
                  onClick={handleExport}
                >
                  Export to Exel
                </button>
              </div>
              <div className="card-body">
                <Table
                  columns={columns}
                  dataSource={Students}
                  rowKey={(record) => record.student_id} // Ensure a unique key
                  onChange={handleTableChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Reset score"
        open={ResetScoreModal}
        onCancel={() => setResetScoreModal(null)}
        footer={[
          <Button
            type="primary"
            key="submit"
            onClick={() => handelResetStudentScore()}
          >
            Reset
          </Button>,
          <Button key="cancel" onClick={() => setResetScoreModal(null)}>
            Cancel
          </Button>,
        ]}
      >
        <h3>Are you sure you want to Reset this student's Score?</h3>
        <p>
          <strong>Student name:</strong> {ResetScoreModal?.student_name}
        </p>
      </Modal>
    </>
  );
};

export default LevelStudents;
