import { Button, Input, Modal, Table } from "antd";
import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../component/common/breadcrumb/breadcrumb";
import axios from "axios";
import { BASE_URL } from "../../Api/baseUrl";
import { toast } from "react-toastify";
import { BsSearch } from "react-icons/bs";

const Debtors = () => {
  const [Debtors, setDebtors] = useState([]);
  const [DeleteDebtorModal, setDeleteDebtorModal] = useState(null);
  const [UpdateDebtorModal, setUpdateDebtorModal] = useState(null);
  const [DetailsDebtorModal, setDetailsDebtorModal] = useState(null);
  const [UpdateDebtorData, setUpdateDebtorData] = useState({
    pay_now: "",
  });
  const [packageData, setPackageData] = useState([]);
  const [packageLoading, setPackageLoading] = useState(false);
  const AdminData = JSON.parse(localStorage.getItem("AdminData"));
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
        <div className="flex gap-2">
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
      title: "phone",
      dataIndex: "phone",
      key: "phone",
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Amount",
      dataIndex: "remaining_money",
      key: "remaining_money",
    },
    {
      title: "admin",
      dataIndex: "admin_name",
      key: "admin_name",
    },
    {
      title: "Location",
      dataIndex: "branch_name",
      key: "branch_name",
    },
    {
      title: "date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Action",
      dataIndex: "x",
      key: "x",
      render: (text, row) => (
        <>
          <Button
            style={{ marginRight: "10px" }}
            onClick={() => setDeleteDebtorModal(row)}
          >
            Delete{" "}
          </Button>

          <Button
            onClick={() => {
              setDetailsDebtorModal(row);
              handleGetStudentPackageData(row.student_id);
            }}
          >
            Details
          </Button>
        </>
      ),
    },
  ];

  function handleGetDebtors() {
    axios
      .get(BASE_URL + "/admin/home/select_debt.php")
      .then((res) => {
        console.log(res);
        if (res?.data?.status == "success") {
          setDebtors(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
  }

  function handleGetStudentPackageData(student_id) {
    const dataSend = { student_id: student_id };
    setPackageLoading(true);

    axios
      .post(
        BASE_URL + "/admin/home/select_student_package_money.php",
        JSON.stringify(dataSend)
      )
      .then((res) => {
        console.log(res);
        if (res?.data?.status == "success") {
          setPackageData(res?.data?.packages || []);
        } else {
          toast.error(res?.data?.message || "Failed to fetch package data");
          setPackageData([]);
        }
      })
      .catch((e) => {
        console.log(e);
        toast.error("Error fetching package data");
        setPackageData([]);
      })
      .finally(() => setPackageLoading(false));
  }

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

  useEffect(() => {
    handleGetDebtors();
    handleGetBranches();
  }, []);

  const handelDeleteDebtor = (student_id) => {
    const dataSend = { student_id: student_id };

    axios
      .post(
        BASE_URL + "/admin/home/reset_student_data.php",
        JSON.stringify(dataSend)
      )
      .then((res) => {
        console.log(res);
        if (res?.data?.status == "success") {
          toast.success(res?.data?.message);
          setDeleteDebtorModal(null);
          handleGetDebtors();
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
  };

  const handelUpdateDebtor = () => {
    if (!UpdateDebtorData?.pay_now) {
      toast.error("Please enter a paid amount");
      return;
    }
    if (UpdateDebtorData?.pay_now > UpdateDebtorModal?.remaining) {
      toast.error("Paid amount is greater than remaining money");
      return;
    }
    const dataSend = {
      student_id: DetailsDebtorModal?.student_id,
      admin_id: AdminData[0]?.admin_id,
      package_id: UpdateDebtorModal?.package_id,
      payed: UpdateDebtorData?.pay_now,
    };

    axios
      .post(BASE_URL + "/admin/home/add_payment_to_package.php", dataSend)
      .then((res) => {
        console.log(res);
        if (res?.status == 200) {
          toast.success(res?.data?.message);
          setUpdateDebtorData({
            pay_now: "",
          });
          setUpdateDebtorModal(null);
          setDetailsDebtorModal(null);

          handleGetDebtors();
          handleGetStudentPackageData(DetailsDebtorModal?.student_id);
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
  };

  const packageColumns = [
    {
      title: "Package ID",
      dataIndex: "package_id",
      key: "package_id",
    },
    {
      title: "Number of Levels",
      dataIndex: "num_of_levels",
      key: "num_of_levels",
    },
    {
      title: "Total Price",
      dataIndex: "total_price",
      key: "total_price",
      render: (price) => `$${price}`,
    },
    {
      title: "Paid Amount",
      dataIndex: "payed",
      key: "payed",
      render: (paid) => `$${paid}`,
    },
    {
      title: "Remaining",
      dataIndex: "remaining",
      key: "remaining",
      render: (remaining) => (
        <span
          style={{
            color:
              remaining < 0 ? "#ff4d4f" : remaining > 0 ? "#faad14" : "#52c41a",
            fontWeight: "bold",
          }}
        >
          ${remaining}
        </span>
      ),
    },
    {
      title: "Action",
      dataIndex: "x",
      key: "x",
      render: (text, row) => (
        <>
          {row?.remaining > 0 ? (
            <Button onClick={() => setUpdateDebtorModal(row)}>Update</Button>
          ) : null}
        </>
      ),
    },
  ];

  return (
    <>
      <Breadcrumbs parent="Debtors" title="Debtors List" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>List Debtors</h5>
              </div>
              <div className="card-body">
                <Table
                  scroll={{
                    x: "max-content",
                  }}
                  columns={columns}
                  dataSource={Debtors}
                  rowKey="student_id"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        title={`Delete debtor: (${DeleteDebtorModal?.name || ""})`}
        open={DeleteDebtorModal}
        footer={
          <>
            <Button
              style={{ margin: "0px 10px " }}
              onClick={() => handelDeleteDebtor(DeleteDebtorModal?.student_id)}
            >
              Delete
            </Button>
            <Button onClick={() => setDeleteDebtorModal(null)}>Cancel</Button>
          </>
        }
        onCancel={() => setDeleteDebtorModal(null)}
      >
        <h3>Are you sure that you want to delete this Debtor</h3>
      </Modal>

      <Modal
        title={`Update debtor: (${DetailsDebtorModal?.name || ""})`}
        open={UpdateDebtorModal}
        footer={
          <>
            <Button
              style={{ margin: "0px 10px " }}
              onClick={() => handelUpdateDebtor()}
            >
              Update
            </Button>
            <Button onClick={() => setUpdateDebtorModal(null)}>Cancel</Button>
          </>
        }
        onCancel={() => setUpdateDebtorModal(null)}
      >
        <div className="form_field">
          <label className="form_label">Paid Amount</label>
          <input
            type="number"
            className="form_input"
            placeholder="Enter paid amount"
            value={UpdateDebtorData?.pay_now}
            onChange={(e) => {
              setUpdateDebtorData({
                ...UpdateDebtorData,
                pay_now: e.target.value,
              });
            }}
          />
        </div>
      </Modal>

      <Modal
        title={`Details for: ${DetailsDebtorModal?.name || ""}`}
        open={DetailsDebtorModal}
        onCancel={() => {
          setDetailsDebtorModal(null);
          setPackageData([]);
        }}
        footer={[
          <Button
            key="close"
            onClick={() => {
              setDetailsDebtorModal(null);
              setPackageData([]);
            }}
          >
            Close
          </Button>,
        ]}
        width={800}
      >
        <div>
          {/* Student Basic Info */}
          <div
            style={{
              marginBottom: "20px",
              padding: "15px",
              backgroundColor: "#f5f5f5",
              borderRadius: "8px",
            }}
          >
            <h4 style={{ marginBottom: "15px", color: "#eb5d22" }}>
              Student Information
            </h4>

            <div
              className="form_field"
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <label className="form_label ">Name:</label>
              <span style={{ marginLeft: "10px", fontWeight: "bold" }}>
                {DetailsDebtorModal?.name}
              </span>
            </div>
            <div
              className="form_field"
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <label className="form_label ">Phone:</label>
              <span style={{ marginLeft: "10px", fontWeight: "bold" }}>
                {DetailsDebtorModal?.phone}
              </span>
            </div>
            <div
              className="form_field"
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <label className="form_label ">Branch:</label>
              <span style={{ marginLeft: "10px", fontWeight: "bold" }}>
                {DetailsDebtorModal?.branch_name}
              </span>
            </div>
          </div>

          {/* Package Information */}
          <div>
            <h4 style={{ marginBottom: "15px", color: "#eb5d22" }}>
              Package Details
            </h4>
            {packageLoading ? (
              <div style={{ textAlign: "center", padding: "20px" }}>
                <div style={{ fontSize: "16px" }}>Loading package data...</div>
              </div>
            ) : packageData.length > 0 ? (
              <Table
                columns={packageColumns}
                dataSource={packageData}
                pagination={false}
                size="small"
                rowKey="package_id"
                scroll={{ x: "max-content" }}
                style={{ marginTop: "10px" }}
              />
            ) : (
              <div
                style={{
                  textAlign: "center",
                  padding: "20px",
                  backgroundColor: "#f9f9f9",
                  borderRadius: "8px",
                  border: "1px dashed #d9d9d9",
                }}
              >
                <div style={{ fontSize: "16px", color: "#666" }}>
                  No package data found for this student
                </div>
              </div>
            )}
          </div>

          {/* Summary Section */}
          {packageData.length > 0 && (
            <div
              style={{
                marginTop: "20px",
                padding: "15px",
                backgroundColor: "#fff7e6",
                borderRadius: "8px",
                border: "1px solid #ffd591",
              }}
            >
              <h4 style={{ marginBottom: "10px", color: "#fa8c16" }}>
                Summary
              </h4>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                }}
              >
                <div className="form_field">
                  <label className="form_label">Total Packages:</label>
                  <span style={{ marginLeft: "5px", fontWeight: "bold" }}>
                    {packageData.length}
                  </span>
                </div>
                <div className="form_field">
                  <label className="form_label">Total Price:</label>
                  <span style={{ marginLeft: "5px", fontWeight: "bold" }}>
                    $
                    {packageData.reduce((sum, pkg) => sum + pkg.total_price, 0)}
                  </span>
                </div>
                <div className="form_field">
                  <label className="form_label">Total Paid:</label>
                  <span
                    style={{
                      marginLeft: "5px",
                      fontWeight: "bold",
                      color: "#52c41a",
                    }}
                  >
                    ${packageData.reduce((sum, pkg) => sum + pkg.payed, 0)}
                  </span>
                </div>
                <div className="form_field">
                  <label className="form_label">Total Remaining:</label>
                  <span
                    style={{
                      marginLeft: "5px",
                      fontWeight: "bold",
                      color:
                        packageData.reduce(
                          (sum, pkg) => sum + pkg.remaining,
                          0
                        ) > 0
                          ? "#faad14"
                          : "#52c41a",
                    }}
                  >
                    ${packageData.reduce((sum, pkg) => sum + pkg.remaining, 0)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default Debtors;
