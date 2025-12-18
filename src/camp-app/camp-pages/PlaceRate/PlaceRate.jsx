import React, { useEffect, useState } from "react";
import { Table, Rate } from "antd";
import Breadcrumbs from "../../../component/common/breadcrumb/breadcrumb";
import axios from "axios";
import { BASE_URL } from "../../../Api/baseUrl";

export default function PlaceRate() {
  const [placeRates, setPlaceRates] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      key: "student_rating_place_id",
      dataIndex: "student_rating_place_id",
      title: "ID",
    },
    {
      key: "name",
      dataIndex: "name",
      title: "Student Name",
      render: (text, row) => <p>{row?.student_data?.name}</p>,
    },
    {
      key: "email",
      dataIndex: "email",
      title: "Email",
      render: (text, row) => <p>{row?.student_data?.email}</p>,
    },
    {
      key: "phone",
      dataIndex: "phone",
      title: "Phone",
      render: (text, row) => <p>{row?.student_data?.phone}</p>,
    },
    {
      key: "place_rating",
      dataIndex: "place_rating",
      title: "Place Rating",
      render: (text, row) => (
        <Rate disabled defaultValue={parseInt(row?.place_rating)} count={5} />
      ),
    },
    {
      key: "receptionist_rating",
      dataIndex: "receptionist_rating",
      title: "Receptionist Rating",
      render: (text, row) => (
        <Rate
          disabled
          defaultValue={parseInt(row?.receptionist_rating)}
          count={5}
        />
      ),
    },
    {
      key: "recommend_rating",
      dataIndex: "recommend_rating",
      title: "Recommend Rating",
      render: (text, row) => (
        <Rate
          disabled
          defaultValue={parseInt(row?.recommend_rating)}
          count={5}
        />
      ),
    },
    {
      key: "created_at",
      dataIndex: "created_at",
      title: "Created At",
      render: (text, row) => (
        <p>{new Date(row?.created_at).toLocaleDateString()}</p>
      ),
    },
  ];

  function handleGetAllPlaceRates() {
    setLoading(true);
    axios
      .get(BASE_URL + "/admin/home/get_place_rate.php")
      .then((res) => {
        if (res?.data?.status === "success") {
          setPlaceRates(res?.data?.message);
        }
      })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    handleGetAllPlaceRates();
  }, []);

  return (
    <>
      <Breadcrumbs parent="Home" title="Place Ratings" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>Place Ratings</h5>
              </div>

              <div className="card-body">
                <Table
                  dataSource={placeRates}
                  columns={columns}
                  loading={loading}
                  rowKey="student_rating_place_id"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
