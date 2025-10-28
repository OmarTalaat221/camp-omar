import { Button, Dropdown, Modal, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../../component/common/breadcrumb/breadcrumb";
import { BASE_URL } from "../../../Api/baseUrl";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaEllipsisVertical } from "react-icons/fa6";
import { toast } from "react-toastify";
import "./style.css";

export const Roundes = () => {
  const { branch_id } = useParams();
  const navigate = useNavigate();
  const [Rounds, setRounds] = useState([]);
  const [AddRoundModal, setAddRoundModal] = useState(false);
  const [DeleteRound, setDeleteRound] = useState(null);
  const [EditRound, setEditRound] = useState(null);
  const [FinishRound, setFinishRound] = useState(null);
  const [UpdateRoundLevel, setUpdateRoundLevel] = useState(null);
  const [UpdateRoundLevelData, setUpdateRoundLevelData] = useState({
    level_id: null,
  });

  const [Levels, setLevels] = useState([]);

  const [NewRoundData, setNewRoundData] = useState({
    Round_name: null,
  });

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

  const levelOptions = Levels.map((level) => {
    return { label: level.level_name, value: level.level_id };
  });

  function handleGetRounds() {
    const dataSend = {
      branch_id: branch_id,
    };

    axios
      .post(
        BASE_URL + "/admin/round/select_round.php",
        JSON.stringify(dataSend)
      )
      .then((res) => {
        console.log(res);
        if (res?.data?.status == "success") {
          setRounds(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    handleGetRounds();
  }, []);

  const columns = [
    {
      id: "round_id",
      dataIndex: "round_id",
      title: "#",
    },
    {
      id: "round_name",
      dataIndex: "round_name",
      title: "round name",
    },
    {
      title: "Actions",
      render: (text, row) => {
        const items = [
          // {
          //   key: 4,
          //   label: (
          //     <button
          //       className="btn btn-primary"
          //       onClick={() => {
          //         // setDeleteBranchModal(row);
          //         navigate(
          //           `${process.env.PUBLIC_URL}/branches/${branch_id}/Roundes/${row?.round_id}/groups`
          //         );
          //       }}
          //     >
          //       rounde's groups
          //     </button>
          //   ),
          // },
          {
            key: 5,
            label: (
              <button
                className="btn btn-primary"
                onClick={() => {
                  setDeleteRound(row);
                }}
              >
                Delete round
              </button>
            ),
          },
          {
            key: 6,
            label: (
              <button
                className="btn btn-primary"
                onClick={() => {
                  setEditRound(row);
                }}
              >
                Edit round
              </button>
            ),
          },
          {
            key: 7,
            label: (
              <button
                className="btn btn-primary"
                onClick={() => {
                  setFinishRound(row);
                }}
              >
                finish round
              </button>
            ),
          },
          {
            key: 8,
            label: (
              <button
                className="btn btn-primary"
                onClick={() => {
                  setUpdateRoundLevel(row);
                }}
              >
                Update round
              </button>
            ),
          },
          {
            key: 9,
            label: (
              <Link
                to={`/groups?round_id=${row.round_id}`}
                className="btn btn-primary text-white"
                // onClick={() => {
                //   setUpdateRoundLevel(row);
                // }}
              >
                Groups
              </Link>
            ),
          },

          {
            key: 10,
            label: (
              <Link
                to={`${process.env.PUBLIC_URL}/roundes/${row.round_id}/upgrade`}
                className="btn btn-primary text-white"
              >
                Upgrade Students
              </Link>
            ),
          },
        ];
        return (
          <div className="d-flex gap-2 align-items-center">
            <Dropdown
              menu={{
                items,
              }}
              placement="bottom"
            >
              <Button
                style={{ display: "flex", flexDirection: "column", gap: "3px" }}
              >
                <FaEllipsisVertical />
              </Button>
            </Dropdown>
          </div>
        );
      },
    },
  ];

  function handleAddNewRound() {
    const dataSend = {
      round_name: NewRoundData?.Round_name,
      branch_id: branch_id,
    };
    axios
      .post(BASE_URL + "/admin/round/add_round.php", JSON.stringify(dataSend))
      .then((res) => {
        console.log(res);
        if (res?.data?.status == "success") {
          toast.success(res?.data?.message);
          setAddRoundModal(false);
          handleGetRounds();
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
  }

  function handleDeleteRound(round_id) {
    const dataSend = {
      round_id: round_id,
    };
    axios
      .post(
        BASE_URL + "/admin/round/delete_round.php",
        JSON.stringify(dataSend)
      )
      .then((res) => {
        console.log(res);
        if (res?.data?.status == "success") {
          toast.success(res?.data?.message);
          setDeleteRound(null);
          handleGetRounds();
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
  }

  function handleFinishRound(round_id) {
    const dataSend = {
      round_id: round_id,
    };
    axios
      .post(
        BASE_URL + "/admin/round/finish_round.php",
        JSON.stringify(dataSend)
      )
      .then((res) => {
        console.log(res);
        if (res?.data?.status == "success") {
          toast.success(res?.data?.message);
          setFinishRound(null);
          handleGetRounds();
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
  }

  function handleEditRound() {
    const dataSend = {
      round_id: EditRound?.round_id,
      round_name: EditRound?.round_name,
    };
    axios
      .post(BASE_URL + "/admin/round/edit_round.php", JSON.stringify(dataSend))
      .then((res) => {
        console.log(res);
        if (res?.data?.status == "success") {
          toast.success(res?.data?.message);
          setEditRound(null);
          handleGetRounds();
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
  }

  const handelUpdateForLevel = async (round_id) => {
    const dataSend = {
      round_id: round_id,
      level_id: UpdateRoundLevelData?.level_id,
    };
    console.log(dataSend);

    axios
      .post(
        BASE_URL + "/admin/round/transfer_round.php",
        JSON.stringify(dataSend)
      )
      .then((res) => {
        console.log(res);
        if (res?.data?.status == "success") {
          toast.success(res?.data?.message);
          setUpdateRoundLevel(null);
          handleGetRounds();
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <Breadcrumbs parent="Branches" title="Rounds List" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>List Rounds</h5>
                <Button
                  color="primary btn-pill"
                  style={{ margin: "10px 0" }}
                  onClick={() => setAddRoundModal(true)}
                >
                  Add Round
                </Button>
              </div>
              <div className="card-body">
                <Table
                  scroll={{
                    x: "max-content",
                  }}
                  columns={columns}
                  dataSource={Rounds}
                  rowClassName={(record) =>
                    record.finish == 1 ? "row_highlight" : ""
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Add Round"
        open={AddRoundModal}
        onCancel={() => setAddRoundModal(false)}
        footer={[
          <Button onClick={handleAddNewRound}>Add</Button>,
          <Button key="cancel" onClick={() => setAddRoundModal(false)}>
            Cancel
          </Button>,
        ]}
      >
        <>
          <div className="form_field">
            <label className="form_label">Round Name</label>
            <input
              type="text"
              className="form_input"
              // value={EditBranchModal?.branch_name || ""}
              onChange={(e) => {
                setNewRoundData({
                  ...NewRoundData,
                  Round_name: e.target.value,
                });
              }}
            />
          </div>
        </>
      </Modal>

      <Modal
        title="Update Round to another level"
        open={UpdateRoundLevel}
        onCancel={() => setUpdateRoundLevel(null)}
        footer={[
          <Button
            onClick={() => handelUpdateForLevel(UpdateRoundLevel?.round_id)}
          >
            Update
          </Button>,
          <Button key="cancel" onClick={() => setUpdateRoundLevel(null)}>
            Cancel
          </Button>,
        ]}
      >
        <>
          <div className="form_field">
            <label className="form_label">Round Name</label>
            <Select
              options={levelOptions}
              onChange={(e) => {
                setUpdateRoundLevelData({
                  ...UpdateRoundLevelData,
                  level_id: e,
                });
              }}
            />
          </div>
        </>
      </Modal>

      <Modal
        title="Edit Round"
        open={EditRound}
        onCancel={() => setEditRound(null)}
        footer={[
          <Button onClick={handleEditRound}>Edit</Button>,
          <Button key="cancel" onClick={() => setEditRound(null)}>
            Cancel
          </Button>,
        ]}
      >
        <>
          <div className="form_field">
            <label className="form_label">Round Name</label>
            <input
              type="text"
              className="form_input"
              defaultValue={EditRound?.round_name || ""}
              onChange={(e) => {
                setEditRound({
                  ...EditRound,
                  round_name: e.target.value,
                });
              }}
            />
          </div>
        </>
      </Modal>

      <Modal
        title="Delete round"
        open={DeleteRound}
        footer={
          <>
            <Button
              style={{ margin: "0px 10px " }}
              onClick={() => handleDeleteRound(DeleteRound?.round_id)}
            >
              Delete
            </Button>
            <Button onClick={() => setDeleteRound(null)}>Cancel</Button>
          </>
        }
        onCancel={() => setDeleteRound(null)}
      >
        <h3>Are you sure that you want to delete this round</h3>
      </Modal>

      <Modal
        title="Finish round"
        open={FinishRound}
        footer={
          <>
            <Button
              style={{ margin: "0px 10px " }}
              onClick={() => handleFinishRound(FinishRound?.round_id)}
            >
              finish
            </Button>
            <Button onClick={() => setFinishRound(null)}>Cancel</Button>
          </>
        }
        onCancel={() => setFinishRound(null)}
      >
        <h3>Are you sure that you want to Finish this round</h3>
      </Modal>
    </>
  );
};
