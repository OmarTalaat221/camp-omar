import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../../component/common/breadcrumb/breadcrumb";
import axios from "axios";
import { BASE_URL } from "../../../Api/baseUrl";
import { render } from "@testing-library/react";
import { Button, Modal, Table } from "antd";
import { toast } from "react-toastify";

const TracksList = () => {
  const [Tracks, setTracks] = useState([]);
  const [UpdateStatusModal, setUpdateStatusModal] = useState(null);
  const [AddTrackModal, setAddTrackModal] = useState(false);

  const [NewTrackData, setNewTrackData] = useState({
    name: "",
  });

  function handleSelectTracks() {
    axios
      .get(BASE_URL + "/admin/tracks/select_tracks.php")
      .then((res) => {
        console.log(res);
        if (res?.data?.status == "success") {
          setTracks(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    handleSelectTracks();
  }, []);

  const columns = [
    {
      id: "id",
      dataIndex: "id",
      title: "Id",
    },
    {
      id: "name",
      dataIndex: "name",
      title: "track_name",
    },
    {
      id: "status",
      dataIndex: "status",
      title: "status",
      render: (text, row) => (
        <>
          {row?.status == 0 ? (
            <p style={{ color: "red" }}>Deactivate</p>
          ) : (
            <p style={{ color: "green" }}>Active</p>
          )}
        </>
      ),
    },
    {
      id: "x",
      dataIndex: "x",
      title: "Action",
      render: (text, row) => (
        <>
          <Button onClick={() => setUpdateStatusModal(row)}>
            {row?.status == 0 ? "Active" : "Deactivate"}
          </Button>
        </>
      ),
    },
  ];

  function handelAddNewTrack() {
    const dataSend = {
      name: NewTrackData?.name,
    };
    axios
      .post(BASE_URL + "/admin/tracks/add_track.php", JSON.stringify(dataSend))
      .then((res) => {
        console.log(res);
        if (res?.data?.status == "success") {
          toast.success(res.data.message);
          setAddTrackModal(false);
          handleSelectTracks();
          setNewTrackData({
            ...NewTrackData,
            name: "",
          });
        } else {
          toast.success(res.data.message);
        }
      })
      .catch((e) => console.log(e));
  }

  function handelUpdateTrackStatus() {
    const dataSend = {
      track_id: UpdateStatusModal?.id,
      status: UpdateStatusModal?.status == 0 ? 1 : 0,
    };
    axios
      .post(
        BASE_URL + "/admin/tracks/update_tracks.php",
        JSON.stringify(dataSend)
      )
      .then((res) => {
        console.log(res);
        if (res?.data?.status == "success") {
          toast.success(res.data.message);
          setUpdateStatusModal(null);
          handleSelectTracks();
        } else {
          toast.success(res.data.message);
        }
      })
      .catch((e) => console.log(e));
  }

  return (
    <>
      <Breadcrumbs parent="Tracks" title="List Tracks" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>Tracks List</h5>
              </div>
              <div className="card-body">
                {/* <button
                  className="btn btn-primary mb-3"
                  onClick={() => setAddTrackModal(true)}
                >
                  Add Track
                </button> */}
                <Table columns={columns} dataSource={Tracks} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        title={"Add new track"}
        open={AddTrackModal}
        // onOk={handleDeleteLevel}
        onCancel={() => setAddTrackModal(false)}
        footer={[
          <Button type="primary" key="submit" onClick={handelAddNewTrack}>
            Add
          </Button>,
          <Button type="" key="cancel" onClick={() => setAddTrackModal(false)}>
            No
          </Button>,
        ]}
      >
        <div className="form_field">
          <label className="form_label">Track Name</label>
          <input
            className="form_input"
            value={NewTrackData?.name}
            onChange={(e) =>
              setNewTrackData({ ...NewTrackData, name: e.target.value })
            }
            type="text"
          />
        </div>
      </Modal>

      <Modal
        title={UpdateStatusModal?.status == 0 ? "Active" : "Deactivate"}
        open={UpdateStatusModal}
        // onOk={handleDeleteLevel}
        onCancel={() => setUpdateStatusModal(null)}
        footer={[
          <Button type="primary" key="submit" onClick={handelUpdateTrackStatus}>
            Yes
          </Button>,
          <Button
            type=""
            key="cancel"
            onClick={() => setUpdateStatusModal(null)}
          >
            No
          </Button>,
        ]}
      >
        <p>
          Are you sure you want to{" "}
          {UpdateStatusModal?.status == 0 ? "Active" : "Deactivate"} the
          Following track:
          <br />
          <strong>{UpdateStatusModal?.name}</strong>
        </p>
      </Modal>
    </>
  );
};

export default TracksList;
