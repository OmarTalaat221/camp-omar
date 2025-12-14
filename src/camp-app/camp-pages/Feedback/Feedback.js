import { Button, Table, Modal } from "antd";
import Breadcrumbs from "../../../component/common/breadcrumb/breadcrumb";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaFileExcel } from "react-icons/fa6";
import axios from "axios";
import { BASE_URL } from "../../../Api/baseUrl";
import { toast } from "react-toastify";
import ExcelJS from "exceljs";

export default function Feedback() {
  const [feedback, setFeedback] = useState([]);
  const [rowData, setRowData] = useState({});
  const [showHideModal, setShowHideModal] = useState(false);
  const [exporting, setExporting] = useState(false);

  const columns = [
    {
      id: "feedback_id",
      dataIndex: "feedback_id",
      title: "ID",
    },
    {
      id: "feedback_text",
      dataIndex: "feedback_text",
      title: "Feedback Text",
    },
    {
      id: "rate",
      dataIndex: "rate",
      title: "Rate",
    },
    {
      id: "name",
      dataIndex: "name",
      title: "Student Name",
      render: (text, row) => <p>{row?.student_data?.name}</p>,
    },
    {
      title: "Actions",
      render: (text, row) => (
        <div>
          {row?.hidden == "1" ? (
            <FaEyeSlash
              onClick={() => {
                setRowData(row);
                setShowHideModal(true);
              }}
              className="hide_content"
            />
          ) : (
            <FaEye
              onClick={() => {
                setRowData(row);
                setShowHideModal(true);
              }}
              className="visible_content"
            />
          )}
        </div>
      ),
    },
  ];

  function handleGetAllFeedbacks() {
    axios
      .get(BASE_URL + "/admin/home/select_feedback.php")
      .then((res) => {
        if (res?.data?.status == "success") {
          setFeedback(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
  }

  function handleShowHideFeedback() {
    const data_send = {
      feedback_id: rowData?.feedback_id,
    };

    axios
      .post(BASE_URL + "/admin/home/show_hide_feedback.php", data_send)
      .then((res) => {
        if (res?.data?.status == "success") {
          toast.success(res?.data?.message);
          handleGetAllFeedbacks();
          setShowHideModal(false);
        } else {
          toast.error(res?.data?.message || "There's a problem");
        }
      })
      .catch((e) => console.log(e))
      .finally(() => setShowHideModal(false));
  }

  // Export to Excel function
  const handleExportToExcel = async () => {
    try {
      setExporting(true);

      // Create a new workbook
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Feedback");

      // Define columns
      worksheet.columns = [
        { header: "ID", key: "feedback_id", width: 10 },
        { header: "Feedback Text", key: "feedback_text", width: 50 },
        { header: "Rate", key: "rate", width: 10 },
        { header: "Student Name", key: "student_name", width: 25 },
        // { header: "Status", key: "status", width: 15 },
      ];

      // Style the header row
      worksheet.getRow(1).font = { bold: true, color: { argb: "FFFFFFFF" } };
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
      feedback.forEach((item) => {
        worksheet.addRow({
          feedback_id: item.feedback_id,
          feedback_text: item.feedback_text,
          rate: item.rate,
          student_name: item.student_data?.name || "N/A",
          status: item.hidden == "1" ? "Hidden" : "Visible",
        });
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

      // Generate Excel file
      const buffer = await workbook.xlsx.writeBuffer();

      // Create blob and download
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Feedback_${new Date().toISOString().split("T")[0]}.xlsx`;
      link.click();

      // Cleanup
      window.URL.revokeObjectURL(url);

      toast.success("Excel file exported successfully!");
    } catch (error) {
      console.error("Error exporting to Excel:", error);
      toast.error("Failed to export Excel file");
    } finally {
      setExporting(false);
    }
  };

  useEffect(() => {
    handleGetAllFeedbacks();
  }, []);

  return (
    <>
      <Breadcrumbs parent="Home" title="Feedback" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between ">
                <h5>Feedback</h5>
                <Button
                  type="primary"
                  icon={<FaFileExcel />}
                  onClick={handleExportToExcel}
                  loading={exporting}
                  style={{ backgroundColor: "#217346" }}
                >
                  Export to Excel
                </Button>
              </div>

              <div className="card-body">
                <Table dataSource={feedback} columns={columns} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        title="Show/ Hide Feedback"
        open={showHideModal}
        footer={[
          <Button type="primary" key="submit" onClick={handleShowHideFeedback}>
            Yes
          </Button>,
          <Button type="" key="cancel" onClick={() => setShowHideModal(false)}>
            No
          </Button>,
        ]}
      >
        <p>
          Are you sure you want to {rowData?.hidden == "1" ? "show" : "hide"}{" "}
          the Following feedback:
          <br />
          <strong>{rowData?.feedback_text}</strong>
        </p>
      </Modal>
    </>
  );
}
