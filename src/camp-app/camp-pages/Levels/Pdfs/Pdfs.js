import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../../../component/common/breadcrumb/breadcrumb";
import { Button, Modal, Table } from "antd";
import { FaBook, FaTrashCan } from "react-icons/fa6";
import { Spinner } from "reactstrap";
import { BASE_URL } from "../../../../Api/baseUrl";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { imageUploader } from "../../camp-utils";

const Pdfs = () => {
  const [Pdfs, setPdfs] = useState([]);
  const [newPdf, setnewPdf] = useState();
  const [EditPdfLink, setEditPdfLink] = useState();

  const { section_id } = useParams();
  const [AddModal, setAddModal] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [DeleteModal, setDeleteModal] = useState(null);
  const [EditModal, setEditModal] = useState(null);

  const [NewPdfData, setNewPdfData] = useState({
    pdf_name: null,
    pdf_link: null,
  });

  const columns = [
    {
      id: "pdf_id",
      dataIndex: "pdf_id",
      title: "#",
    },
    {
      id: "pdf_name",
      dataIndex: "pdf_name",
      title: "pdf name",
    },
    {
      id: "pdf_link",
      dataIndex: "pdf_link",
      title: "pdf link",
      render: (text, row) => (
        <>
          <FaBook
            onClick={() => window.open(row?.pdf_link)}
            style={{
              width: "30px",
              height: "30px",
              color: "orange",
              cursor: "pointer",
            }}
          />
        </>
      ),
    },
    {
      id: "Action",
      dataIndex: "x",
      title: "Actions",
      render: (text, row) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <FaTrashCan
            className="del_icon"
            style={{ cursor: "pointer" }}
            onClick={() => setDeleteModal(row)}
          />
          <Button
            style={{ margin: "0px 10px" }}
            onClick={() => setEditModal(row)}
          >
            Edit
          </Button>
        </div>
      ),
    },
  ];

  function handleGetPdfs() {
    const data_send = {
      section_id: section_id,
    };
    axios
      .post(BASE_URL + "/admin/content/select_pdfs.php", data_send)
      .then((res) => {
        if (res?.data?.status == "success") {
          setPdfs(res?.data?.message);
        }
      });
  }

  useEffect(() => {
    handleGetPdfs();
  }, []);

  async function handleAddPdf() {
    setLoading(true);
    const formData = new FormData();
    formData.append("file_attachment", newPdf);
    await axios
      .post(
        "https://camp-coding.online/camp-for-english/admin/upload_pdf.php",
        formData
      )
      .then((resPdf) => {
        console.log(resPdf);

        if (resPdf?.data?.status == "success") {
          const dataSend = {
            section_id: section_id,
            pdf_name: NewPdfData?.pdf_name,
            pdf_link: resPdf.data.message,
          };

          console.log(dataSend);

          axios
            .post(
              BASE_URL + "/admin/content/add_pdf.php",
              JSON.stringify(dataSend)
            )
            .then((res) => {
              if (res?.data?.status == "success") {
                toast.success(res?.data?.message);
                handleGetPdfs();
                setAddModal(false);
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

  const handleDeletePdf = (id) => {
    const dataSend = {
      pdf_id: id,
    };
    axios
      .post(
        BASE_URL + "/admin/content/delete_pdf.php",
        JSON.stringify(dataSend)
      )
      .then((res) => {
        console.log(res);
        if (res?.data?.status == "success") {
          toast.success(res.data.message);
          setDeleteModal(false);
          handleGetPdfs();
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((e) => console.log(e));
  };

  async function handleEditPdf() {
    setLoading(true);
    const formData = new FormData();
    formData.append("file_attachment", EditPdfLink);
    await axios
      .post(
        "https://camp-coding.online/camp-for-english/admin/upload_pdf.php",
        formData
      )
      .then((resPdf) => {
        console.log(resPdf);

        const dataSend = {
          pdf_name: EditModal?.pdf_name,
          pdf_link: EditPdfLink ? resPdf.data.message : EditModal.pdf_link,
          pdf_id: EditModal.pdf_id,
        };

        console.log(dataSend);

        axios
          .post(
            BASE_URL + "/admin/content/edit_pdf.php",
            JSON.stringify(dataSend)
          )
          .then((res) => {
            if (res?.data?.status == "success") {
              toast.success(res?.data?.message);
              handleGetPdfs();
              setEditModal(false);
            } else {
              toast.error(res?.data.message);
            }
          })
          .finally(() => {
            setLoading(false);
          })
          .catch((e) => console.log(e));
      });
  }

  return (
    <>
      <Breadcrumbs parent="sections" title=" section files" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>section files</h5>
                <div className="card-body">
                  <button
                    className="btn btn-primary my-4"
                    onClick={() => setAddModal(true)}
                  >
                    Add pdf/powerpoint
                  </button>
                </div>

                <Table columns={columns} dataSource={Pdfs} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        title="Add pdf/powerpoint"
        open={AddModal}
        onCancel={() => setAddModal(false)}
        footer={[
          <Button type="primary" key="submit" onClick={() => handleAddPdf()}>
            {Loading ? (
              <Spinner style={{ width: "15px", height: "15px" }} />
            ) : (
              "Add"
            )}
          </Button>,
          <Button key="cancel" onClick={() => setAddModal(false)}>
            Cancel
          </Button>,
        ]}
      >
        <form>
          <div className="form_field">
            <label className="form_label">pdf/powerpoint name</label>
            <input
              type="text"
              className="form_input"
              onChange={(e) =>
                setNewPdfData({ ...NewPdfData, pdf_name: e.target.value })
              }
            />
          </div>
          <div className="form_field">
            <label className="form_label">pdf/powerpoint</label>
            <input
              type="file"
              className="form_input"
              onChange={(e) => {
                setnewPdf(e.target.files[0]);
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
            onClick={() => handleDeletePdf(DeleteModal?.pdf_id)}
          >
            Delete
          </Button>,
          <Button key="cancel" onClick={() => setDeleteModal(null)}>
            Cancel
          </Button>,
        ]}
      >
        <h3>Are you sure you want to delete this pdf/powerpoint</h3>
        <p>
          <strong>pdf/powerpoint name:</strong> {DeleteModal?.pdf_name}
        </p>
      </Modal>

      <Modal
        title="Edit pdf/powerpoint"
        open={EditModal}
        onCancel={() => setEditModal(null)}
        footer={[
          <Button type="primary" key="submit" onClick={() => handleEditPdf()}>
            {Loading ? (
              <Spinner style={{ width: "15px", height: "15px" }} />
            ) : (
              "Add"
            )}
          </Button>,
          <Button key="cancel" onClick={() => setEditModal(null)}>
            Cancel
          </Button>,
        ]}
      >
        <form>
          <div className="form_field">
            <label className="form_label">pdf/powerpoint name</label>
            <input
              type="text"
              className="form_input"
              value={EditModal?.pdf_name || " "}
              onChange={(e) =>
                setEditModal({ ...EditModal, pdf_name: e.target.value })
              }
            />
          </div>
          <div className="form_field">
            <label className="form_label">pdf/powerpoint</label>
            <input
              type="file"
              className="form_input"
              onChange={(e) => {
                setEditPdfLink(e.target.files[0]);
              }}
            />
          </div>
          <div
            style={{
              width: "30%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {EditModal?.pdf_link ? (
              <>
                <FaBook
                  onClick={() => window.open(EditModal?.pdf_link)}
                  style={{
                    width: "30px",
                    height: "30px",
                    color: "orange",
                    cursor: "pointer",
                  }}
                />
                <FaTrashCan
                  style={{
                    width: "20px",
                    height: "20px",
                    color: "red",
                    cursor: "pointer",
                  }}
                  onClick={() => setEditModal({ ...EditModal, pdf_link: null })}
                />
              </>
            ) : null}
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Pdfs;
