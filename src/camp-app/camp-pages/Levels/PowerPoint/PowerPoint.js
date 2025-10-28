import React, { useState } from "react";
import Breadcrumbs from "../../../../component/common/breadcrumb/breadcrumb";
import { Button, Table } from "antd";
import { FaFilePowerpoint, FaTrashCan } from "react-icons/fa6";
import { Modal } from "antd";
import { Spinner } from "reactstrap";

export const PowerPoint = () => {
  const [AddModal, setAddModal] = useState(false);
  const [DeleteModal, setDeleteModal] = useState(null);

  const [Loading, setLoading] = useState(false);

  const [NewPowerPointData, setNewPowerPointData] = useState({
    PowerPoint_name: null,
    PowerPoint_description: null,
  });

  const [PowerPoint, setPowerPoint] = useState([
    {
      PowerPoint_id: 1,
      PowerPoint_name: "Effective Communication",
      PowerPoint_description:
        "A presentation on improving verbal and non-verbal communication skills.",
      PowerPoint_link: "https://example.com/effective-communication.pptx",
    },
    {
      PowerPoint_id: 2,
      PowerPoint_name: "Project Management Basics",
      PowerPoint_description:
        "An overview of project management methodologies and tools.",
      PowerPoint_link: "https://example.com/project-management-basics.pptx",
    },
    {
      PowerPoint_id: 3,
      PowerPoint_name: "Introduction to Artificial Intelligence",
      PowerPoint_description:
        "Exploring the basics of AI, including history, types, and applications.",
      PowerPoint_link: "https://example.com/introduction-to-ai.pptx",
    },
    {
      PowerPoint_id: 4,
      PowerPoint_name: "Marketing Strategies for 2024",
      PowerPoint_description:
        "Insights into effective marketing strategies and trends for the upcoming year.",
      PowerPoint_link: "https://example.com/marketing-strategies-2024.pptx",
    },
    {
      PowerPoint_id: 5,
      PowerPoint_name: "Cybersecurity Essentials",
      PowerPoint_description:
        "A guide to understanding and implementing basic cybersecurity measures.",
      PowerPoint_link: "https://example.com/cybersecurity-essentials.pptx",
    },
  ]);
  const columns = [
    {
      id: "PowerPoint_id",
      dataIndex: "PowerPoint_id",
      title: "#",
    },
    {
      id: "PowerPoint_name",
      dataIndex: "PowerPoint_name",
      title: "PowerPoint name",
    },
    {
      id: "PowerPoint_description",
      dataIndex: "PowerPoint_description",
      title: "Powerpoint description",
    },
    {
      id: "PowerPoint_link",
      dataIndex: "PowerPoint_link",
      title: "Powerpoint link",
      render: (text, row) => (
        <>
          <FaFilePowerpoint
            style={{ color: "orange", width: "30px", height: "30px" }}
            onClick={() => window.open(row?.PowerPoint_link)}
          />
        </>
      ),
    },
    {
      id: "Actions",
      dataIndex: "x",
      title: "Actions",
      render: (text, row) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* <Button >Edit</Button> */}
          <FaTrashCan
            className="del_icon"
            style={{ cursor: "pointer", margin: "0px 10px" }}
            onClick={() => setDeleteModal(row)}
          />
        </div>
      ),
    },
  ];
  return (
    <>
      <Breadcrumbs parent="sections" title=" section PowerPoints" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>section PowerPoints</h5>
                <div className="card-body">
                  <button
                    className="btn btn-primary my-4"
                    onClick={() => setAddModal(true)}
                  >
                    Add PowerPoint
                  </button>
                </div>

                <Table columns={columns} dataSource={PowerPoint} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= Add Modal ======================================= */}

      <Modal
        title="Add powerpoint"
        open={AddModal}
        onCancel={() => setAddModal(false)}
        footer={[
          <Button type="primary" key="submit">
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
            <label className="form_label">powerpoint name</label>
            <input
              type="text"
              className="form_input"
              onChange={(e) =>
                setNewPowerPointData({
                  ...NewPowerPointData,
                  PowerPoint_name: e.target.value,
                })
              }
            />
          </div>

          <div className="form_field">
            <label className="form_label">powerpoint Description</label>
            <textarea
              onChange={(e) =>
                setNewPowerPointData({
                  ...NewPowerPointData,
                  PowerPoint_description: e.target.value,
                })
              }
            ></textarea>
          </div>
          <div className="form_field">
            <label className="form_label">powerpoint</label>
            <input type="file" className="form_input" />
          </div>
        </form>
      </Modal>

      {/* ================= Edit Modal ===========================================   */}
      <Modal
        title="Delete powerpoint"
        open={DeleteModal}
        onCancel={() => setDeleteModal(null)}
        footer={[
          <Button type="primary" key="submit">
            {Loading ? (
              <Spinner style={{ width: "15px", height: "15px" }} />
            ) : (
              "Delete"
            )}
          </Button>,
          <Button key="cancel" onClick={() => setDeleteModal(null)}>
            Cancel
          </Button>,
        ]}
      >
        <h3>Are you sure you want to delete this powerpoint</h3>
        <p>
          <strong>section name:</strong> {DeleteModal?.PowerPoint_name}
        </p>
      </Modal>
    </>
  );
};
