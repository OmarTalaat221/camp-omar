import { Table } from "antd";
import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../component/common/breadcrumb/breadcrumb";
import axios from "axios";
import { BASE_URL } from "../../Api/baseUrl";

const Notes = () => {
  const [Notes, setNotes] = useState([]);

  function handleGetBranches() {
    axios
      .get(
        BASE_URL + "/admin/complains_exceptions/select_complains_exceptions.php"
      )
      .then((res) => {
        console.log(res);
        if (res?.data?.status == "success") {
          setNotes(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    handleGetBranches();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "exceptions_complains_id",
      key: "exceptions_complains_id",
    },
    {
      title: "Student Name",
      dataIndex: "student_name",
      key: "student_name",
    },
    {
      title: "Student ID",
      dataIndex: "student_id",
      key: "student_id",
    },
    {
      title: "Admin Name",
      dataIndex: "admin_name",
      key: "admin_name",
    },
    {
      title: "Admin ID",
      dataIndex: "admin_id",
      key: "admin_id",
    },
    {
      title: "Type",
      dataIndex: "Type",
      key: "Type",
    },
    {
      title: "Text",
      dataIndex: "Text",
      key: "Text",
    },
    {
      title: "Date",
      dataIndex: "Date",
      key: "Date",
    },
  ];

  return (
    <>
      <Breadcrumbs parent="Notes" title="Complains & Exeptions" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>Complains & Exeptions</h5>
              </div>
              <div className="card-body">
                <Table
                  scroll={{
                    x: "max-content",
                  }}
                  columns={columns}
                  dataSource={Notes}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notes;
