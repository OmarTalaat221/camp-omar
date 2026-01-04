import React, { useEffect, useRef, useState } from "react";
import Breadcrumbs from "../../../component/common/breadcrumb/breadcrumb";
import { Button, Modal, Table } from "antd";
import { FaCertificate, FaTrashCan } from "react-icons/fa6";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../../Api/baseUrl";
import axios from "axios";
import { Spinner } from "reactstrap";
import { toast } from "react-toastify";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Certification from "../../../component/common/Certeficate/Certification";
import { createPortal } from "react-dom";

export const StudentCertificates = () => {
  const [StudentCertificates, setStudentCertificates] = useState([]);
  const { student_id, level_id } = useParams();
  // const navigate=useNavigate()

  const [AddcertificateModal, setAddcertificateModal] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [NewPdf, setNewPdf] = useState(null);
  const [DeleteModal, setDeleteModal] = useState(null);

  const [NewCertificateData, setNewCertificateData] = useState({
    student_id: student_id,
    certificate_link: null,
    level_id: level_id,
  });

  const columns = [
    {
      id: "certificate_id",
      dataIndex: "certificate_id",
      title: "#",
    },
    {
      id: "certificate_link",
      dataIndex: "certificate_link",
      title: "certificate",
      render: (text, row) => (
        <>
          <FaCertificate
            style={{
              width: "30px",
              height: "30px",
              color: "orange",
              cursor: "pointer",
            }}
            onClick={() => {
              window.open(row?.certificate_link);
            }}
          />
        </>
      ),
    },
    {
      id: "Actions",
      dataIndex: "Actions",
      title: "Actions",
      render: (text, row) => (
        <>
          <FaTrashCan
            className="del_icon"
            style={{ cursor: "pointer" }}
            onClick={() => setDeleteModal(row)}
          />
        </>
      ),
    },
  ];

  function handleGetAllStudentsCertificates() {
    const dataSend = {
      student_id: student_id,
    };
    axios
      .post(BASE_URL + "/admin/certificates/select_certificates.php", dataSend)
      .then((res) => {
        if (res?.data?.status == "success") {
          setStudentCertificates(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    handleGetAllStudentsCertificates();
  }, []);

  async function handleAddCertificate() {
    setLoading(true);
    const formData = new FormData();
    formData.append("file_attachment", NewPdf);
    await axios
      .post(
        "https://camp-coding.online/camp-for-english/admin/upload_pdf.php",
        formData
      )
      .then((resPdf) => {
        console.log(resPdf);

        if (resPdf?.data?.status == "success") {
          const dataSend = {
            student_id: NewCertificateData.student_id,
            certificate_link: resPdf.data.message,
            level_id: NewCertificateData?.level_id,
          };

          console.log(dataSend);

          axios
            .post(
              BASE_URL + "/admin/certificates/add_certificates.php",
              JSON.stringify(dataSend)
            )
            .then((res) => {
              if (res?.data?.status == "success") {
                toast.success(res?.data?.message);
                handleGetAllStudentsCertificates();
                setAddcertificateModal(false);
              } else {
                toast.error(res?.data.message);
              }
            })
            .finally(() => {
              setLoading(false);
            })
            .catch((e) => console.log(e));
        }
      });
  }

  async function handleDeleteCertificate() {
    setLoading(true);
    const dataSend = {
      certificate_id: DeleteModal?.certificate_id,
    };

    console.log(dataSend);

    axios
      .post(
        BASE_URL + "/admin/certificates/delete_certificates.php",
        JSON.stringify(dataSend)
      )
      .then((res) => {
        if (res?.data?.status == "success") {
          toast.success(res?.data?.message);
          handleGetAllStudentsCertificates();
          setDeleteModal(null);
        } else {
          toast.error(res?.data.message);
        }
      })
      .finally(() => {
        setLoading(false);
      })
      .catch((e) => console.log(e));
  }

  const navigate = useNavigate();

  const componentRef = useRef(null);
  const hiddenContainerRef = useRef(document.createElement("div"));

  const location = useLocation();

  const studentData = location.state.rowData;

  console.log(studentData);

  return (
    <>
      {createPortal(
        <div
          ref={componentRef}
          style={{
            // position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            backgroundColor: "white",
            zIndex: 1000,
            overflow: "auto",
          }}
        >
          <Certification data={studentData} style={{ width: "100%" }} />
        </div>,
        hiddenContainerRef.current
      )}
      <Breadcrumbs parent="Students" title="Students certificates" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>Student's certificates</h5>
                <div className="d-flex" style={{ gap: "10px" }}>
                  <button
                    className="btn btn-primary my-4"
                    onClick={() => {
                      setAddcertificateModal(true);
                      // downloadPdf();
                    }}
                  >
                    Add certificates
                  </button>
                  <button
                    className="btn btn-primary my-4"
                    onClick={() => {
                      // setAddcertificateModal(true)
                      window.open("/certificate/" + student_id, "_blanck");
                    }}
                  >
                    Create certificates
                  </button>
                </div>
              </div>

              <div className="card-body">
                <Table
                  scroll={{
                    x: "max-content",
                  }}
                  columns={columns}
                  dataSource={StudentCertificates}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        title="Add certificate"
        open={AddcertificateModal}
        onCancel={() => setAddcertificateModal(false)}
        footer={[
          <Button
            type="primary"
            key="submit"
            onClick={() => handleAddCertificate()}
          >
            {Loading ? (
              <Spinner style={{ width: "15px", height: "15px" }} />
            ) : (
              "Add"
            )}
          </Button>,
          <Button key="cancel" onClick={() => setAddcertificateModal(false)}>
            Cancel
          </Button>,
        ]}
      >
        <form>
          <div className="form_field">
            <label className="form_label">certificate</label>
            <input
              type="file"
              accept="application/pdf,.pdf"
              className="form_input"
              onChange={(e) => {
                setNewPdf(e.target.files[0]);
              }}
            />
          </div>
        </form>
      </Modal>

      <Modal
        title="Delete pdf/powerpoint"
        open={DeleteModal}
        onCancel={() => setDeleteModal(null)}
        footer={[
          <Button
            type="primary"
            key="submit"
            onClick={() => handleDeleteCertificate(DeleteModal?.pdf_id)}
          >
            Delete
          </Button>,
          <Button key="cancel" onClick={() => setDeleteModal(null)}>
            Cancel
          </Button>,
        ]}
      >
        <h3>Are you sure you want to delete this Certificate</h3>
      </Modal>
    </>
  );
};
