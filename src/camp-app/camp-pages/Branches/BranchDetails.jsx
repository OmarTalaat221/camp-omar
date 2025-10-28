import { Table } from "antd";
import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../../component/common/breadcrumb/breadcrumb";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../../Api/baseUrl";
import './style.css';

const BranchDetails = () => {
  const { branch_id } = useParams();

  const [Branches, setBranches] = useState([]);

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
    },
    {
      title: "Client Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "payed",
      dataIndex: "payed",
      key: "payed",
    },
    {
      title: "total price",
      dataIndex: "total_price",
      key: "total_price",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "date",
      dataIndex: "date",
      key: "date",
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
                style={{ display: "flex", flexDirection:"row", justifyContent: "space-between" }}
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
                <div className="card-header">
                  <h5>Branch depts</h5>
                </div>
                <div className="card-body">
                  <Table
                    scroll={{
                      x: "max-content",
                    }}
                    columns={Deptscolumns}
                    dataSource={Branches[0]?.branch_depts}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BranchDetails;
