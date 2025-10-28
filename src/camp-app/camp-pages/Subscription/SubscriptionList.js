import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../../component/common/breadcrumb/breadcrumb";
import { Button, Modal, Select, Table } from "antd";
import axios from "axios";
import { BASE_URL } from "../../../Api/baseUrl";
import { toast } from "react-toastify";

const SubscriptionList = () => {
  const [Subscriptions, setSubscriptions] = useState([]);
  const [Levels, setLevels] = useState([]);

  const [OpenPackLevels, setOpenPackLevels] = useState(null);
  const [OpenPackDeleteModal, setOpenPackDeleteModal] = useState(null);
  const [OpenPackEditModal, setOpenPackEditModal] = useState(null);

  const [AddPackLevels, setAddPackLevels] = useState(null);
  const [SelectedLevels, setSelectedLevels] = useState(null);
  const [NewPackData, setNewPackData] = useState({
    price: null,
    num_of_levels: null,
  });

  const columns = [
    {
      id: "package_id",
      dataIndex: "package_id",
      title: "#",
    },
    {
      id: "price",
      dataIndex: "price",
      title: "price",
    },
    {
      id: "num_of_levels",
      dataIndex: "num_of_levels",
      title: "num_of_levels",
    },
    {
      id: "action",
      dataIndex: "x",
      title: "package Levels",
      render: (text, row) => (
        <>
          <Button
            color="primary btn-pill"
            style={{ margin: "0px 10px" }}
            onClick={() => setOpenPackDeleteModal(row)}
          >
            delete package
          </Button>
          <Button
            color="primary btn-pill"
            style={{ margin: "0px 10px" }}
            onClick={() => setOpenPackEditModal(row)}
          >
            Edit package
          </Button>
        </>
      ),
    },
  ];

  function handleGetAllSubscription() {
    axios
      .get(BASE_URL + "/admin/subscription/select_subscription_offers.php")
      .then((res) => {
        if (res?.data?.status == "success") {
          setSubscriptions(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    handleGetAllSubscription();
  }, []);

  function handleSelectLevels() {
    axios
      .get(BASE_URL + "/admin/content/select_levels.php")
      .then((res) => {
        console.log(res);
        if (res?.data?.status == "success") {
          setLevels(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    handleSelectLevels();
  }, []);

  // const LevelOptions = Levels.map((level)=>{
  //   return{label:level?.level_name,value:level?.level_id}
  // })
  const { Option } = Select;

  const handleSelectChange = (selectedItems) => {
    console.log("Selected items:", selectedItems);
    let Levels = selectedItems.join("*");
    setSelectedLevels(Levels);
    setNewPackData({
      ...NewPackData,
      num_of_levels: selectedItems.length,
    });
  };

  const HandelAddPackage = async () => {
    const dataSend = {
      num_of_levels: NewPackData.num_of_levels,
      levels_ids: SelectedLevels,
      price: NewPackData.price,
    };

    console.log(dataSend);

    axios
      .post(
        BASE_URL + "/admin/subscription/add_subscription_offers.php",
        JSON.stringify(dataSend)
      )
      .then((res) => {
        console.log(res);
        if (res?.data?.status == "success") {
          toast.success("Package add succesfully!");
          setAddPackLevels(false);
          handleGetAllSubscription();
        } else {
          toast.error("Faild to add Package");
        }
      })
      .catch((e) => console.log(e));
  };

  const handelDeletePackage = async () => {
    const dataSend = {
      package_id: OpenPackDeleteModal.package_id,
    };

    console.log(dataSend);

    axios
      .post(
        BASE_URL + "/admin/subscription/delete_subscription_offers.php",
        JSON.stringify(dataSend)
      )
      .then((res) => {
        console.log(res);
        if (res?.data?.status == "success") {
          toast.success("Package deleted succesfully!");
          setOpenPackDeleteModal(false);
          handleGetAllSubscription();
        } else {
          toast.error("Faild to delete Package");
        }
      })
      .catch((e) => console.log(e));
  };

  const handelEditPackage = async () => {
    const dataSend = {
      num_of_levels: NewPackData.num_of_levels,
      levels_ids: SelectedLevels,
      price: OpenPackEditModal.price,
      package_id: OpenPackEditModal?.package_id,
    };

    console.log(dataSend);

    axios
      .post(
        BASE_URL + "/admin/subscription/edit_subscription_offers.php",
        JSON.stringify(dataSend)
      )
      .then((res) => {
        console.log(res);
        if (res?.data?.status == "success") {
          toast.success("Package edited succesfully!");
          setOpenPackEditModal(false);
          handleGetAllSubscription();
        } else {
          toast.error("Faild to edit Package");
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <Breadcrumbs parent="Subscription" title="Subscription packages" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>List Packages</h5>
                <Button
                  color="primary btn-pill"
                  style={{ margin: "10px 0" }}
                  onClick={() => setAddPackLevels(true)}
                >
                  Add Package
                </Button>
              </div>
              <div className="card-body">
                <Table
                  scroll={{
                    x: "max-content",
                  }}
                  columns={columns}
                  dataSource={Subscriptions}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        title="Package levels"
        open={OpenPackLevels}
        onCancel={() => setOpenPackLevels(false)}
        footer={[
          <Button key="cancel" onClick={() => setOpenPackLevels(false)}>
            Cancel
          </Button>,
        ]}
      >
        <>
          {OpenPackLevels && Array.isArray(OpenPackLevels) ? (
            OpenPackLevels.map((level) => (
              <p key={level.id}>
                <strong>Level name:</strong> {level?.level_name}
              </p>
            ))
          ) : (
            <p>Loading levels...</p>
          )}
        </>
      </Modal>

      <Modal
        title="Add Package"
        open={AddPackLevels}
        footer={
          <>
            <Button style={{ margin: "0px 10px " }} onClick={HandelAddPackage}>
              Add
            </Button>
            <Button onClick={() => setAddPackLevels(false)}>Cancel</Button>
          </>
        }
        onCancel={() => setAddPackLevels(false)}
      >
        <>
          <div className="form_field">
            <label className="form_label">Package Price</label>
            <input
              type="number"
              className="form_input"
              onWheel={(e) => e.target.blur()}
              onChange={(e) => {
                setNewPackData({
                  ...NewPackData,
                  price: e.target.value,
                });
              }}
            />
          </div>
          <div className="form_field">
            <label className="form_label">Select Packages</label>
            <input
              type="number"
              className="form_input"
              onWheel={(e) => e.target.blur()}
              onChange={(e) => {
                setNewPackData({
                  ...NewPackData,
                  num_of_levels: e.target.value,
                });
              }}
            />
          </div>
        </>
      </Modal>

      <Modal
        title="Delete Package"
        open={OpenPackDeleteModal}
        footer={
          <>
            <Button
              style={{ margin: "0px 10px " }}
              onClick={handelDeletePackage}
            >
              Delete
            </Button>
            <Button onClick={() => setOpenPackDeleteModal(false)}>
              Cancel
            </Button>
          </>
        }
        onCancel={() => setOpenPackDeleteModal(false)}
      >
        <h3>Are you sure that you want to delete this package</h3>
      </Modal>

      <Modal
        title="Edit Package"
        open={OpenPackEditModal}
        footer={
          <>
            <Button style={{ margin: "0px 10px " }} onClick={handelEditPackage}>
              Edit
            </Button>
            <Button onClick={() => setOpenPackEditModal(false)}>Cancel</Button>
          </>
        }
        onCancel={() => setOpenPackEditModal(false)}
      >
        <>
          <div className="form_field">
            <label className="form_label">Package Price</label>
            <input
              type="number"
              className="form_input"
              onWheel={(e) => e.target.blur()}
              value={OpenPackEditModal?.price || " "}
              onChange={(e) => {
                setOpenPackEditModal({
                  ...OpenPackEditModal,
                  price: e.target.value,
                });
              }}
            />
          </div>
          <div className="form_field">
            <label className="form_label">Select Packages</label>
            <Select
              mode="multiple"
              className="form_input"
              placeholder="Select packages"
              onChange={handleSelectChange}
              style={{ width: "100%" }}
              // defaultValue={OpenPackEditModal?.levels}
            >
              {Levels.map((option) => (
                <Option key={option.level_id} value={option.level_id}>
                  {option.level_name}
                </Option>
              ))}
            </Select>
          </div>
        </>
      </Modal>
    </>
  );
};

export default SubscriptionList;
