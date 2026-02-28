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
  const [DetailsDebtorModal, setDetailsDebtorModal] = useState(null);
  const [packageData, setPackageData] = useState([]);
  const [stats, setStats] = useState({});
  const [packageLoading, setPackageLoading] = useState(false);
  const AdminData = JSON.parse(localStorage.getItem("AdminData"));
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  // ✅ Payment Modal States
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentSubmitting, setPaymentSubmitting] = useState(false);
  const [currentStudentForPayment, setCurrentStudentForPayment] =
    useState(null);

  const [Branches, setBranches] = useState([]);

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
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Amount",
      dataIndex: "remaining_money",
      key: "remaining_money",
      render: (amount) => (
        <span
          style={{
            color: amount > 0 ? "#faad14" : "#52c41a",
            fontWeight: "bold",
          }}
        >
          {amount} EGP
        </span>
      ),
    },
    {
      title: "Admin",
      dataIndex: "admin_name",
      key: "admin_name",
    },
    {
      title: "Location",
      dataIndex: "branch_name",
      key: "branch_name",
    },
    {
      title: "Date",
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
            danger
            onClick={() => setDeleteDebtorModal(row)}
          >
            Delete
          </Button>
          <Button
            type="primary"
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

  // ✅ Open Payment Modal
  const handleOpenPaymentModal = (studentData) => {
    setCurrentStudentForPayment(studentData);
    setPaymentAmount("");
    setPaymentModalOpen(true);
  };

  // ✅ Close Payment Modal
  const handleClosePaymentModal = () => {
    setPaymentModalOpen(false);
    setPaymentAmount("");
    setCurrentStudentForPayment(null);
    setPaymentSubmitting(false);
  };

  // ✅ Payment Submit Function
  const handlePaymentSubmit = async () => {
    if (!paymentAmount || paymentAmount <= 0) {
      toast.error("Please enter a valid payment amount");
      return;
    }

    const remainingMoney =
      stats?.student_remaining_money ||
      currentStudentForPayment?.remaining_money;

    if (Number(paymentAmount) > Number(remainingMoney)) {
      toast.error("Payment amount cannot be greater than remaining money");
      return;
    }

    setPaymentSubmitting(true);

    const dataSend = {
      student_id:
        currentStudentForPayment?.student_id || DetailsDebtorModal?.student_id,
      admin_id: AdminData[0]?.admin_id,
      payed: paymentAmount,
    };

    try {
      const res = await axios.post(
        BASE_URL + "/admin/home/add_payment_to_package_new_server.php",
        dataSend
      );

      if (res?.data?.status === "success") {
        toast.success(res?.data?.message || "Payment added successfully");
        handleClosePaymentModal();
        handleGetStudentPackageData(
          currentStudentForPayment?.student_id || DetailsDebtorModal?.student_id
        );

        // Refresh data
        handleGetDebtors();

        // If details modal is open, refresh package data
        if (DetailsDebtorModal) {
          handleGetStudentPackageData(DetailsDebtorModal.student_id);
        }
      } else {
        toast.error(res?.data?.message || "Failed to process payment");
      }
    } catch (e) {
      console.log(e);
      toast.error("Error processing payment");
    } finally {
      setPaymentSubmitting(false);
    }
  };

  function handleGetDebtors() {
    axios
      .get(BASE_URL + "/admin/home/select_debt.php")
      .then((res) => {
        console.log(res);
        if (res?.data?.status === "success") {
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
        if (res?.data?.status === "success") {
          setStats(res?.data?.message);
          setPackageData(res?.data?.message?.payment_data || []);
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

  function handleGetBranches() {
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
        if (res?.data?.status === "success") {
          toast.success(res?.data?.message);
          setDeleteDebtorModal(null);
          handleGetDebtors();
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
  };

  const packageColumns = [
    {
      title: "Paid Amount",
      dataIndex: "payed",
      key: "payed",
      render: (paid) => (
        <span style={{ color: "#52c41a", fontWeight: "bold" }}>{paid} EGP</span>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
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

      {/* Delete Modal */}
      <Modal
        title={`Delete debtor: (${DeleteDebtorModal?.name || ""})`}
        open={!!DeleteDebtorModal}
        footer={
          <>
            <Button
              danger
              style={{ margin: "0px 10px" }}
              onClick={() => handelDeleteDebtor(DeleteDebtorModal?.student_id)}
            >
              Delete
            </Button>
            <Button onClick={() => setDeleteDebtorModal(null)}>Cancel</Button>
          </>
        }
        onCancel={() => setDeleteDebtorModal(null)}
      >
        <h3>Are you sure you want to delete this Debtor?</h3>
      </Modal>

      {/* Details Modal */}
      <Modal
        title={`Details for: ${DetailsDebtorModal?.name || ""}`}
        open={!!DetailsDebtorModal}
        onCancel={() => {
          setDetailsDebtorModal(null);
          setPackageData([]);
          setStats({});
        }}
        footer={[
          <Button
            key="close"
            onClick={() => {
              setDetailsDebtorModal(null);
              setPackageData([]);
              setStats({});
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
              <label className="form_label">Name:</label>
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
              <label className="form_label">Phone:</label>
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
              <label className="form_label">Branch:</label>
              <span style={{ marginLeft: "10px", fontWeight: "bold" }}>
                {DetailsDebtorModal?.branch_name}
              </span>
            </div>
          </div>

          {/* Package Information */}
          <div>
            <h4 style={{ marginBottom: "15px", color: "#eb5d22" }}>
              Payment History
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
                rowKey={(record, index) => index}
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
                  No payment history found for this student
                </div>
              </div>
            )}
          </div>

          {/* Summary Section */}
          <div
            style={{
              marginTop: "20px",
              padding: "15px",
              backgroundColor: "#fff7e6",
              borderRadius: "8px",
              border: "1px solid #ffd591",
            }}
          >
            <h4 style={{ marginBottom: "10px", color: "#fa8c16" }}>Summary</h4>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "15px",
              }}
            >
              <div className="form_field">
                <label className="form_label">Total Price:</label>
                <span style={{ marginLeft: "5px", fontWeight: "bold" }}>
                  {stats?.student_total_payment ||
                    DetailsDebtorModal?.total_payment ||
                    0}{" "}
                  EGP
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
                  {stats?.student_payed || 0} EGP
                </span>
              </div>
              <div className="form_field">
                <label className="form_label">Total Remaining:</label>
                <span
                  style={{
                    marginLeft: "5px",
                    fontWeight: "bold",
                    color:
                      (stats?.student_remaining_money ||
                        DetailsDebtorModal?.remaining_money) > 0
                        ? "#faad14"
                        : "#52c41a",
                  }}
                >
                  {stats?.student_remaining_money ||
                    DetailsDebtorModal?.remaining_money ||
                    0}{" "}
                  EGP
                </span>
              </div>
            </div>

            {/* Pay Button */}
            {(stats?.student_remaining_money > 0 ||
              DetailsDebtorModal?.remaining_money > 0) && (
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ marginTop: "20px" }}
              >
                <Button
                  type="primary"
                  size="large"
                  style={{
                    padding: "10px 30px",
                    height: "auto",
                    fontSize: "16px",
                    // backgroundColor: "#52c41a",
                    borderColor: "#52c41a",
                  }}
                  onClick={() => handleOpenPaymentModal(DetailsDebtorModal)}
                >
                  Pay Now
                </Button>
              </div>
            )}
          </div>
        </div>
      </Modal>

      {/* ✅ Payment Modal */}
      <Modal
        title={
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span>Add Payment for: {currentStudentForPayment?.name || ""}</span>
          </div>
        }
        open={paymentModalOpen}
        onCancel={handleClosePaymentModal}
        footer={null}
        width={500}
      >
        <div style={{ padding: "20px 0" }}>
          {/* Payment Info */}
          <div
            style={{
              marginBottom: "20px",
              padding: "15px",
              backgroundColor: "#f0f5ff",
              borderRadius: "8px",
              border: "1px solid #adc6ff",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <span>Student Name:</span>
              <span style={{ fontWeight: "bold" }}>
                {currentStudentForPayment?.name}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <span>Phone:</span>
              <span style={{ fontWeight: "bold" }}>
                {currentStudentForPayment?.phone}
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Remaining Amount:</span>
              <span
                style={{
                  fontWeight: "bold",
                  color: "#faad14",
                  fontSize: "18px",
                }}
              >
                {stats?.student_remaining_money ||
                  currentStudentForPayment?.remaining_money ||
                  0}{" "}
                EGP
              </span>
            </div>
          </div>

          {/* Payment Input */}
          <div className="form_field" style={{ marginBottom: "20px" }}>
            <label
              className="form_label"
              style={{
                marginBottom: "8px",
                display: "block",
                fontWeight: "bold",
              }}
            >
              Payment Amount (EGP)
            </label>
            <Input
              type="number"
              size="large"
              placeholder="Enter payment amount"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
              style={{ fontSize: "16px" }}
              min={0}
              max={
                stats?.student_remaining_money ||
                currentStudentForPayment?.remaining_money
              }
            />
            {paymentAmount &&
              Number(paymentAmount) >
                (stats?.student_remaining_money ||
                  currentStudentForPayment?.remaining_money) && (
                <span
                  style={{
                    color: "#ff4d4f",
                    fontSize: "12px",
                    marginTop: "5px",
                    display: "block",
                  }}
                >
                  Amount cannot exceed remaining money
                </span>
              )}
          </div>

          {/* Quick Amount Buttons */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{ marginBottom: "8px", display: "block", color: "#666" }}
            >
              Quick Select:
            </label>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {[100, 200, 500, 1000].map((amount) => (
                <Button
                  key={amount}
                  onClick={() => setPaymentAmount(amount.toString())}
                  disabled={
                    amount >
                    (stats?.student_remaining_money ||
                      currentStudentForPayment?.remaining_money)
                  }
                >
                  {amount} EGP
                </Button>
              ))}
              <Button
                type="dashed"
                onClick={() =>
                  setPaymentAmount(
                    (
                      stats?.student_remaining_money ||
                      currentStudentForPayment?.remaining_money ||
                      0
                    ).toString()
                  )
                }
              >
                Pay All
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "10px",
              marginTop: "30px",
            }}
          >
            <Button
              onClick={handleClosePaymentModal}
              disabled={paymentSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              onClick={handlePaymentSubmit}
              loading={paymentSubmitting}
              disabled={
                !paymentAmount ||
                paymentAmount <= 0 ||
                Number(paymentAmount) >
                  (stats?.student_remaining_money ||
                    currentStudentForPayment?.remaining_money)
              }
              style={{
                backgroundColor: "#52c41a",
                borderColor: "#52c41a",
              }}
            >
              {paymentSubmitting ? "Processing..." : "Confirm Payment"}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Debtors;
