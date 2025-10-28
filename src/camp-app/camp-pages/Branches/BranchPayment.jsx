import { Button, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../../component/common/breadcrumb/breadcrumb";
import { BASE_URL } from "../../../Api/baseUrl";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const BranchPayment = () => {
  const navigate = useNavigate();
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

  useEffect(() => {
    handleGetBranches();
  }, []);

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "branch name",
      dataIndex: "branch_name",
      key: "branch_name",
    },
    {
      title: "location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Link to={`/branch-payments/${record?.branch_id}`}>
            <Button
              onClick={(e) => {
                if (e.ctrlKey || e.metaKey) {
                  return;
                }
                e.preventDefault();
                navigate(`/branch-payments/${record?.branch_id}`);
              }}
            >
              branch payment
            </Button>
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Breadcrumbs parent="Branches" title="Branches List" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>List Branches</h5>
              </div>
              <div className="card-body">
                <Table
                  scroll={{
                    x: "max-content",
                  }}
                  columns={columns}
                  dataSource={Branches}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BranchPayment;
