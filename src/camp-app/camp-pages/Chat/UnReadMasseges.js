import { Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../../component/common/breadcrumb/breadcrumb";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import io from "socket.io-client";

const socket = io("https://camp-coding.tech", {
  path: "/campForEnglishChat/socket.io",
});

export const UnReadMasseges = () => {
  const navigate = useNavigate();
  const { branch_id, round_id } = useParams();
  const AdminData = JSON.parse(localStorage.getItem("AdminData"));
  const adminId = AdminData[0]?.admin_id;
  const [UnreadesMasseges, setUnreadesMasseges] = useState([]);

  const columns = [
    {
      id: "student_id",
      dataIndex: "student_id",
      title: "Id",
    },
    {
      id: "student_name",
      dataIndex: "student_name",
      title: "student name",
    },
    {
      id: "last_message_time",
      dataIndex: "last_message_time",
      title: "last message time",
    },
    {
      id: "Action",
      dataIndex: "x",
      title: "Action",
      render: (text, row) => (
        <>
          <Button
            style={{ margin: "0px 10px" }}
            onClick={() =>
              navigate(
                `${process.env.PUBLIC_URL}/groups/${row?.group_id}/students/${row?.student_id}/chat`,
                {
                  state: { additionalData: row },
                }
              )
            }
          >
            Chat with student
          </Button>
        </>
      ),
    },
  ];

  const [Count, setCount] = useState(null);

  useEffect(() => {
    // Fetch initial unseen messages
    const fetchUnseenMessages = async () => {
      try {
        const response = await axios.get(
          `https://camp-coding.tech/campForEnglishChat/messages/unseen/${adminId}/admin`
        );
        console.log("Fetched unseen messages:", response.data.details);
        setUnreadesMasseges(response.data.details);
        setCount(response.data.total_count);
      } catch (error) {
        console.error("Failed to fetch unseen messages:", error);
      }
    };

    fetchUnseenMessages();

    // Listen for new unseen messages
    socket.on("newUnseenMessage", ({ groupId, chatId }) => {
      console.log("Received newUnseenMessage:", groupId, chatId);
      fetchUnseenMessages(); // Refresh the list
    });

    // Listen for updates to the unseen messages count
    socket.on(
      "unseenMessagesCount",
      ({ recipientId, recipientRole, totalCount, details }) => {
        console.log(
          "Received unseenMessagesCount:",
          recipientId,
          recipientRole,
          totalCount,
          details
        );
        if (recipientRole === "admin") {
          console.log("Updating unseenMessages state:", details);
          setUnreadesMasseges(details);
        }
      }
    );

    return () => {
      socket.off("newUnseenMessage");
      socket.off("unseenMessagesCount");
    };
  }, [adminId]);

  return (
    <>
      <Breadcrumbs parent="Students" title="Student's Unread masseges" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-header">
                <h5>Student's Unread masseges</h5>
              </div>

              <div className="card-body">
                <Table
                  scroll={{
                    x: "max-content",
                  }}
                  columns={columns}
                  dataSource={UnreadesMasseges}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
