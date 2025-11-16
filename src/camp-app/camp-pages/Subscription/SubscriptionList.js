import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../../component/common/breadcrumb/breadcrumb";
import { Button, Modal, Select, Table, Input } from "antd";
import axios from "axios";
import { BASE_URL } from "../../../Api/baseUrl";
import { toast } from "react-toastify";
import { BsSearch } from "react-icons/bs";

const SubscriptionList = () => {
  const [Subscriptions, setSubscriptions] = useState([]);
  const [Levels, setLevels] = useState([]);

  const [OpenPackLevels, setOpenPackLevels] = useState(null);
  const [OpenPackDeleteModal, setOpenPackDeleteModal] = useState(false);
  const [OpenPackEditModal, setOpenPackEditModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const [AddPackLevels, setAddPackLevels] = useState(false);
  const [SelectedLevels, setSelectedLevels] = useState(null);
  const [NewPackData, setNewPackData] = useState({
    price: "",
    num_of_levels: "",
    title: "",
  });
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <div className="d-flex gap-2">
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<BsSearch />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </div>
      </div>
    ),
    filterIcon: (filtered) => (
      <BsSearch style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    render: (text) =>
      searchedColumn === dataIndex ? (
        <span style={{ backgroundColor: "#ffc069", padding: 0 }}>{text}</span>
      ) : (
        text
      ),
  });

  const columns = [
    {
      id: "package_id",
      dataIndex: "package_id",
      title: "#",
    },
    {
      id: "title",
      dataIndex: "title",
      title: "Title",
      ...getColumnSearchProps("title"),
    },
    {
      id: "price",
      dataIndex: "price",
      title: "Price",
    },
    {
      id: "num_of_levels",
      dataIndex: "num_of_levels",
      title: "Number of Levels",
      ...getColumnSearchProps("num_of_levels"),
    },
    {
      id: "action",
      dataIndex: "x",
      title: "Actions",
      render: (text, row) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            danger
            onClick={() => {
              setSelectedPackage(row);
              setOpenPackDeleteModal(true);
            }}
          >
            Delete
          </Button>
          <Button
            // type="primary"
            color="primary btn-pill"
            onClick={() => {
              setSelectedPackage(row);
              setOpenPackEditModal(true);
            }}
          >
            Edit
          </Button>
        </div>
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

  const resetAddForm = () => {
    setNewPackData({ price: "", num_of_levels: "", title: "" });
    setAddPackLevels(false);
  };

  const resetEditForm = () => {
    setSelectedPackage(null);
    setOpenPackEditModal(false);
  };

  const HandelAddPackage = async () => {
    if (
      !NewPackData.title ||
      !NewPackData.price ||
      !NewPackData.num_of_levels
    ) {
      toast.error("Please fill all fields");
      return;
    }

    const dataSend = {
      title: NewPackData.title,
      num_of_levels: NewPackData.num_of_levels,
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
          toast.success("Package added successfully!");
          resetAddForm();
          handleGetAllSubscription();
        } else {
          toast.error("Failed to add Package");
        }
      })
      .catch((e) => {
        console.log(e);
        toast.error("An error occurred");
      });
  };

  const handelDeletePackage = async () => {
    if (!selectedPackage) return;

    const dataSend = {
      package_id: selectedPackage.package_id,
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
          toast.success("Package deleted successfully!");
          setOpenPackDeleteModal(false);
          setSelectedPackage(null);
          handleGetAllSubscription();
        } else {
          toast.error("Failed to delete Package");
        }
      })
      .catch((e) => {
        console.log(e);
        toast.error("An error occurred");
      });
  };

  const handelEditPackage = async () => {
    if (!selectedPackage) return;

    if (
      !selectedPackage.title ||
      !selectedPackage.price ||
      !selectedPackage.num_of_levels
    ) {
      toast.error("Please fill all fields");
      return;
    }

    const dataSend = {
      title: selectedPackage.title,
      num_of_levels: selectedPackage.num_of_levels,
      price: selectedPackage.price,
      package_id: selectedPackage.package_id,
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
          toast.success("Package edited successfully!");
          resetEditForm();
          handleGetAllSubscription();
        } else {
          toast.error("Failed to edit Package");
        }
      })
      .catch((e) => {
        console.log(e);
        toast.error("An error occurred");
      });
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
                  // type="primary"
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
                  rowKey="package_id"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Package Levels Modal */}
      <Modal
        title="Package levels"
        open={OpenPackLevels !== null}
        onCancel={() => setOpenPackLevels(null)}
        footer={[
          <Button key="cancel" onClick={() => setOpenPackLevels(null)}>
            Cancel
          </Button>,
        ]}
      >
        <>
          {OpenPackLevels && Array.isArray(OpenPackLevels) ? (
            OpenPackLevels.map((level, index) => (
              <p key={level.id || index}>
                <strong>Level name:</strong> {level?.level_name}
              </p>
            ))
          ) : (
            <p>Loading levels...</p>
          )}
        </>
      </Modal>

      {/* Add Package Modal */}
      <Modal
        title="Add Package"
        open={AddPackLevels}
        footer={
          <>
            <Button color="primary btn-pill" onClick={HandelAddPackage}>
              Add
            </Button>
            <Button onClick={resetAddForm}>Cancel</Button>
          </>
        }
        onCancel={resetAddForm}
      >
        <>
          <div className="form_field">
            <label className="form_label">Package Title</label>
            <input
              type="text"
              className="form_input"
              placeholder="Enter package title"
              value={NewPackData.title}
              onChange={(e) => {
                setNewPackData({
                  ...NewPackData,
                  title: e.target.value,
                });
              }}
            />
          </div>
          <div className="form_field">
            <label className="form_label">Package Price</label>
            <input
              type="number"
              className="form_input"
              placeholder="Enter price"
              value={NewPackData.price}
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
            <label className="form_label">Number of Levels</label>
            <input
              type="number"
              className="form_input"
              placeholder="Enter number of levels"
              value={NewPackData.num_of_levels}
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

      {/* Delete Package Modal */}
      <Modal
        title="Delete Package"
        open={OpenPackDeleteModal}
        footer={
          <>
            <Button danger onClick={handelDeletePackage}>
              Delete
            </Button>
            <Button
              onClick={() => {
                setOpenPackDeleteModal(false);
                setSelectedPackage(null);
              }}
            >
              Cancel
            </Button>
          </>
        }
        onCancel={() => {
          setOpenPackDeleteModal(false);
          setSelectedPackage(null);
        }}
      >
        <h3>Are you sure that you want to delete this package?</h3>
        {selectedPackage && (
          <p>
            <strong>Title:</strong> {selectedPackage.title}
          </p>
        )}
      </Modal>

      {/* Edit Package Modal */}
      <Modal
        title="Edit Package"
        open={OpenPackEditModal}
        footer={
          <>
            <Button
              color="primary btn-pill"
              // type="primary"
              onClick={handelEditPackage}
            >
              Edit
            </Button>
            <Button onClick={resetEditForm}>Cancel</Button>
          </>
        }
        onCancel={resetEditForm}
      >
        <>
          <div className="form_field">
            <label className="form_label">Package Title</label>
            <input
              type="text"
              className="form_input"
              placeholder="Enter package title"
              value={selectedPackage?.title || ""}
              onChange={(e) => {
                setSelectedPackage({
                  ...selectedPackage,
                  title: e.target.value,
                });
              }}
            />
          </div>
          <div className="form_field">
            <label className="form_label">Package Price</label>
            <input
              type="number"
              className="form_input"
              placeholder="Enter price"
              onWheel={(e) => e.target.blur()}
              value={selectedPackage?.price || ""}
              onChange={(e) => {
                setSelectedPackage({
                  ...selectedPackage,
                  price: e.target.value,
                });
              }}
            />
          </div>
          <div className="form_field">
            <label className="form_label">Number of Levels</label>
            <input
              type="number"
              className="form_input"
              placeholder="Enter number of levels"
              onWheel={(e) => e.target.blur()}
              value={selectedPackage?.num_of_levels || ""}
              onChange={(e) => {
                setSelectedPackage({
                  ...selectedPackage,
                  num_of_levels: e.target.value,
                });
              }}
            />
          </div>
        </>
      </Modal>
    </>
  );
};

export default SubscriptionList;
