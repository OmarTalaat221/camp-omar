import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import io from "socket.io-client";
import { useLocation, useParams } from "react-router-dom";
import "./style.css";
import { Image } from "antd";

const backendUrl = "https://camp-coding.tech";

const socket = io(backendUrl, {
  path: "/campForEnglishChat/socket.io",
  // transports: ["websocket", "polling"],
  timeout: 180000,
  forceNew: true,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
});

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatId, setChatId] = useState(null);
  const { group_id, student_id } = useParams();
  const AdminData = JSON.parse(localStorage.getItem("AdminData"));
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOnline, setIsOnline] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  console.log("admin data", AdminData);
  const adminId = AdminData[0]?.admin_id;
  // Current admin ID
  console.log(AdminData?.admin_id);

  const messageEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const senderName = AdminData[0]?.name;
  const location = useLocation();
  const { additionalData } = location.state || {};
  console.log(additionalData);
  console.log(group_id, student_id, chatId);

  const user_image =
    additionalData?.image ||
    "https://res.cloudinary.com/dhgp9dzdt/image/upload/v1749036826/WhatsApp_Image_2025-06-04_at_14.31.19_e58a8cb4_b9cvno.jpg";

  useEffect(() => {
    socket.on("newUnseenMessage", ({ group_id, chatId }) => {
      console.log("New unseen message in group:", group_id, "chat:", chatId);
      setUnreadCount((prev) => prev + 1);
    });

    socket.on("unseenMessagesCount", ({ count }) => {
      setUnreadCount(count);
    });

    socket.on("userTyping", ({ userId, userName, isTyping }) => {
      if (isTyping) {
        setTypingUsers((prev) => [
          ...prev.filter((user) => user !== userName),
          userName,
        ]);
      } else {
        setTypingUsers((prev) => prev.filter((user) => user !== userName));
      }
    });

    socket.on("userOnline", ({ userId, userName }) => {
      setIsOnline(true);
    });

    socket.on("userOffline", ({ userId, userName }) => {
      setIsOnline(false);
    });

    return () => {
      socket.off("newUnseenMessage");
      socket.off("unseenMessagesCount");
      socket.off("userTyping");
      socket.off("userOnline");
      socket.off("userOffline");
    };
  }, []);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Dashboard socket connected:", socket.id);
      setIsOnline(true);
    });

    socket.on("disconnect", (reason) => {
      console.log("Dashboard socket disconnected:", reason);
      setIsOnline(false);
    });

    socket.on("connect_error", (error) => {
      console.error("Dashboard socket connection error:", error);
      setIsOnline(false);
    });

    socket.on("joinedChat", (data) => {
      console.log("Dashboard successfully joined chat:", data);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("connect_error");
      socket.off("joinedChat");
    };
  }, []);
  useEffect(() => {
    if (chatId) {
      console.log("Dashboard joining chat room:", chatId);
      socket.emit("joinGroupChat", { chatId });
    }

    socket.on("newMessage", (newMessage) => {
      console.log("Received newMessage on dashboard:", newMessage);
      console.log("Dashboard message details:", {
        messageId: newMessage.messageId,
        chatId: newMessage.chatId,
        expectedChatId: chatId,
        messageType: newMessage.messageType,
        mediaUrl: newMessage.mediaUrl,
        thumbnailUrl: newMessage.thumbnailUrl,
      });

      // FIXED: Normalize chatId comparison by converting both to strings
      const normalizedNewMessageChatId = String(newMessage.chatId);
      const normalizedExpectedChatId = String(chatId);

      console.log("Dashboard normalized comparison:", {
        normalizedNewMessageChatId,
        normalizedExpectedChatId,
        isMatch: normalizedNewMessageChatId === normalizedExpectedChatId,
      });

      if (normalizedNewMessageChatId === normalizedExpectedChatId) {
        const formattedMessage = {
          _id: newMessage.messageId,
          text: newMessage.messageText,
          createdAt: new Date(newMessage.createdAt),
          user: {
            _id: newMessage.senderId,
            name: newMessage.senderName,
            isAdmin: newMessage.senderRole === "admin",
          },
          // Handle media messages
          image:
            newMessage.mediaUrl && newMessage.messageType === "image"
              ? newMessage.mediaUrl
              : undefined,
          video:
            newMessage.mediaUrl && newMessage.messageType === "video"
              ? newMessage.mediaUrl
              : undefined,
          videoThumbnail: newMessage.thumbnailUrl,
          messageType: newMessage.messageType,
        };

        console.log("Formatted message for dashboard:", formattedMessage);

        setMessages((prevMessages) => {
          const messageExists = prevMessages.some(
            (msg) => msg._id === formattedMessage._id
          );
          if (messageExists) {
            console.log(
              "Message already exists in dashboard, skipping:",
              formattedMessage._id
            );
            return prevMessages;
          }
          console.log(
            "Adding new message to dashboard state:",
            formattedMessage
          );
          return [...prevMessages, formattedMessage];
        });
        makeMessagesSeen(chatId);
      } else {
        console.log(
          "Dashboard message chatId mismatch:",
          normalizedNewMessageChatId,
          "vs",
          normalizedExpectedChatId
        );
      }
    });

    socket.on("messageDeleted", ({ messageId, chatId: deletedChatId }) => {
      console.log("Received messageDeleted on dashboard:", {
        messageId,
        deletedChatId,
      });

      // FIXED: Normalize chatId comparison for message deletion too
      const normalizedDeletedChatId = String(deletedChatId);
      const normalizedExpectedChatId = String(chatId);

      if (normalizedDeletedChatId === normalizedExpectedChatId) {
        setMessages((prevMessages) =>
          prevMessages.filter((msg) => msg._id !== messageId)
        );
      }
    });

    // Add heartbeat to keep connection alive
    const heartbeatInterval = setInterval(() => {
      if (socket.connected) {
        socket.emit("ping");
      }
    }, 30000); // Send ping every 30 seconds

    return () => {
      socket.off("newMessage");
      socket.off("messageDeleted");
      clearInterval(heartbeatInterval);
    };
  }, [chatId]);

  async function makeMessagesSeen(chat_id) {
    try {
      await axios.post(`${backendUrl}/campForEnglishChat/messages/seen`, {
        recipientId: adminId,
        recipientRole: "admin",
        chatId: chat_id,
      });
      setUnreadCount(0);
    } catch (error) {
      console.error("Failed to mark messages as seen:", error);
    }
  }

  // Handle typing indicator
  const handleTyping = (isTyping) => {
    setIsTyping(isTyping);
    if (chatId) {
      socket.emit("typing", {
        chatId,
        userId: adminId,
        userName: senderName,
        isTyping,
      });
    }
  };

  // Handle file selection
  const handleFileSelect = (event) => {
    const target = event.target;
    const file = target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  // Handle media upload
  const handleMediaUpload = async () => {
    if (!selectedFile || !chatId) return;

    setIsUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("chatId", chatId);
    formData.append("senderId", adminId);
    formData.append("senderRole", "admin");
    formData.append("senderName", senderName);

    // Determine message type based on file type
    const messageType = selectedFile.type.startsWith("image/")
      ? "image"
      : "video";
    formData.append("messageType", messageType);

    try {
      const response = await axios.post(
        `${backendUrl}/campForEnglishChat/groupChat/sendMedia`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const progress = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setUploadProgress(progress);
            }
          },
        }
      );

      console.log("Media uploaded successfully:", response.data);

      // Immediately add the message to local state
      const messageData = response.data;
      const newMessage = {
        _id: messageData.messageId,
        text: messageData.messageText,
        createdAt: new Date(messageData.createdAt),
        user: {
          _id: messageData.senderId,
          name: messageData.senderName,
          isAdmin: messageData.senderRole === "admin",
        },
        // Handle media messages
        image:
          messageData.mediaUrl && messageData.messageType === "image"
            ? messageData.mediaUrl
            : undefined,
        video:
          messageData.mediaUrl && messageData.messageType === "video"
            ? messageData.mediaUrl
            : undefined,
        videoThumbnail: messageData.thumbnailUrl,
        messageType: messageData.messageType,
      };

      // Add to messages state immediately (avoid duplicates)
      setMessages((prevMessages) => {
        const messageExists = prevMessages.some(
          (msg) => msg._id === newMessage._id
        );
        if (messageExists) {
          return prevMessages;
        }
        return [...prevMessages, newMessage];
      });

      setSelectedFile(null);
      setUploadProgress(0);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Failed to upload media:", error);
      console.error("Error details:", error.response?.data);
      alert("Failed to upload media. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  // Handle message deletion
  const handleDeleteMessage = async (messageId) => {
    if (!window.confirm("Are you sure you want to delete this message?"))
      return;

    try {
      await axios.delete(
        `${backendUrl}/campForEnglishChat/groupChat/deleteMessage/${messageId}`,
        {
          data: {
            chatId,
            senderId: adminId,
            senderRole: "admin",
          },
        }
      );

      setMessages((prev) => prev.filter((msg) => msg._id !== messageId));
    } catch (error) {
      console.error("Failed to delete message:", error);
      alert("Failed to delete message. Please try again.");
    }
  };
  useEffect(() => {
    const fetchChatId = async () => {
      try {
        const response = await axios.post(
          `${backendUrl}/campForEnglishChat/groupChat`,
          {
            groupId: group_id,
            studentId: student_id,
          }
        );
        setChatId(response.data.chatId);
        makeMessagesSeen(response.data.chatId);
      } catch (error) {
        console.error("Failed to fetch chat ID:", error);
      }
    };

    fetchChatId();
  }, [group_id]);

  // Fetch chat history
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/campForEnglishChat/groupChat/${group_id}/${student_id}` // Replace with dynamic student ID if needed
        );
        const formattedMessages = response.data.map((msg) => ({
          _id: msg.messageId,
          text: msg.messageText,
          createdAt: new Date(msg.createdAt),
          user: {
            _id: msg.senderId,
            name: msg.senderName,
            isAdmin: msg.senderRole === "admin",
          },
          image:
            msg.mediaUrl && msg.messageType === "image"
              ? msg.mediaUrl
              : undefined,
          video:
            msg.mediaUrl && msg.messageType === "video"
              ? msg.mediaUrl
              : undefined,
          videoThumbnail: msg.thumbnailUrl,
          messageType: msg.messageType,
        }));
        setMessages(formattedMessages);
      } catch (error) {
        console.error("Failed to fetch chat history:", error);
      }
    };

    fetchChatHistory();
  }, []);

  // Scroll to the latest message
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Send a new message
  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const response = await axios.post(
        `${backendUrl}/campForEnglishChat/groupChat/sendMessage`,
        {
          chatId,
          group_id,
          senderId: adminId,
          senderRole: "admin",
          messageText: newMessage,
          senderName,
        }
      );

      // Immediately add the message to local state as fallback
      const messageData = response.data;
      const newMessageObj = {
        _id: messageData.messageId,
        text: messageData.messageText,
        createdAt: new Date(messageData.createdAt),
        user: {
          _id: messageData.senderId,
          name: messageData.senderName,
          isAdmin: messageData.senderRole === "admin",
        },
      };

      setMessages((prevMessages) => {
        const messageExists = prevMessages.some(
          (msg) => msg._id === newMessageObj._id
        );
        if (messageExists) {
          return prevMessages;
        }
        return [...prevMessages, newMessageObj];
      });

      setNewMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.chatBox}>
        <div style={styles.header}>
          <h2 style={styles.heading}>{additionalData?.name}</h2>
          <div style={styles.statusIndicators}>
            <div style={styles.statusItem}>
              <div
                style={{
                  ...styles.statusDot,
                  backgroundColor: isOnline ? "#0cf742" : "#dc3545",
                  animation: isOnline ? "bounce 0.6s infinite" : "",
                }}
              ></div>
              <span style={styles.statusText}>
                {isOnline ? "Online" : "Offline"}
              </span>
            </div>
            {unreadCount > 0 && (
              <div style={styles.unreadBadge}>{unreadCount} unread</div>
            )}
          </div>
        </div>

        {/* Chat Window */}
        <div style={styles.chatWindow}>
          {messages.map((msg, index) => (
            <div
              key={`${msg._id}-${msg.createdAt}-${index}`}
              style={{
                ...styles.message,
                justifyContent: msg.user.isAdmin ? "flex-end" : "flex-start",
              }}
            >
              <div
                style={{
                  ...styles.messageBubble,
                  backgroundColor: msg.user.isAdmin ? "#d1e7dd" : "#eb5d2282",
                }}
              >
                <div style={styles.messageHeader}>
                  <strong>{msg.user.name}</strong>
                  <span style={styles.messageTime}>
                    {msg.createdAt.toLocaleTimeString()}
                  </span>
                  {msg.user.isAdmin && (
                    <button
                      onClick={() => handleDeleteMessage(msg._id)}
                      style={styles.deleteButton}
                      title="Delete message"
                    >
                      ×
                    </button>
                  )}
                </div>

                {/* Text Message */}
                {msg.text && <div style={styles.messageText}>{msg.text}</div>}

                {/* Media Message */}
                {msg.image && (
                  <div style={styles.mediaContainer}>
                    <Image
                      src={msg.image}
                      alt="Image"
                      style={styles.mediaImage}
                      // onClick={() => window.open(msg.image, "_blank")}
                    />
                  </div>
                )}

                {msg.video && (
                  <div style={styles.mediaContainer}>
                    <video
                      controls
                      style={styles.mediaVideo}
                      poster={msg.videoThumbnail}
                    >
                      <source src={msg.video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {typingUsers.length > 0 && (
            <div style={styles.typingIndicator}>
              <span style={styles.typingText}>
                {typingUsers.join(", ")}{" "}
                {typingUsers.length === 1 ? "is" : "are"} typing...
              </span>
            </div>
          )}

          <div ref={messageEndRef} />
        </div>

        {/* File Upload Section */}
        {selectedFile && (
          <div style={styles.fileUploadSection}>
            <div style={styles.fileInfo}>
              <span style={styles.fileName}>{selectedFile.name}</span>
              <span style={styles.fileSize}>
                ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
              </span>
            </div>
            {isUploading && (
              <div style={styles.progressBar}>
                <div
                  style={{
                    ...styles.progressFill,
                    width: `${uploadProgress}%`,
                  }}
                ></div>
                <span style={styles.progressText}>{uploadProgress}%</span>
              </div>
            )}
            <div style={styles.fileActions}>
              <button
                onClick={handleMediaUpload}
                style={styles.uploadButton}
                disabled={isUploading}
              >
                {isUploading ? "Uploading..." : "Upload"}
              </button>
              <button
                onClick={() => setSelectedFile(null)}
                style={styles.cancelButton}
                disabled={isUploading}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Input Section */}
        <div style={styles.inputContainer}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value);
              handleTyping(e.target.value.length > 0);
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Type a message..."
            style={styles.input}
          />

          {/* File Upload Button */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            onChange={handleFileSelect}
            style={styles.fileInput}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            style={styles.attachButton}
            title="Attach file"
          >
            📎
          </button>

          <button
            onClick={sendMessage}
            style={styles.sendButton}
            disabled={!newMessage.trim()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    maxHeight: "90vh",
    backgroundColor: "#f5f5f5",
    padding: "20px",
    margin: 0,
  },
  chatBox: {
    width: "100%",
    maxWidth: "800px",
    height: "90vh",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    padding: "20px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    paddingBottom: "10px",
    borderBottom: "1px solid #eee",
  },
  heading: {
    margin: 0,
    fontSize: "24px",
    fontWeight: "bold",
  },
  statusIndicators: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  statusItem: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  statusDot: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
  },
  statusText: {
    fontSize: "12px",
    color: "#666",
  },
  unreadBadge: {
    backgroundColor: "#dc3545",
    color: "white",
    padding: "2px 8px",
    borderRadius: "10px",
    fontSize: "12px",
    fontWeight: "bold",
  },
  chatWindow: {
    flex: 1,
    overflowY: "auto",
    marginBottom: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "10px",
    backgroundColor: "#fafafa",
  },
  message: {
    display: "flex",
    marginBottom: "10px",
  },
  messageBubble: {
    padding: "12px 15px",
    borderRadius: "15px",
    maxWidth: "80%",
    wordWrap: "break-word",
    position: "relative",
  },
  messageHeader: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "5px",
    fontSize: "12px",
  },
  messageTime: {
    color: "#666",
    fontSize: "10px",
  },
  messageText: {
    fontSize: "14px",
    lineHeight: "1.4",
  },
  deleteButton: {
    background: "none",
    border: "none",
    color: "#dc3545",
    cursor: "pointer",
    fontSize: "16px",
    padding: "0",
    marginLeft: "auto",
  },
  mediaContainer: {
    marginTop: "8px",
  },
  mediaImage: {
    maxWidth: "200px",
    maxHeight: "200px",
    borderRadius: "8px",
    cursor: "pointer",
  },
  mediaVideo: {
    maxWidth: "300px",
    maxHeight: "200px",
    borderRadius: "8px",
  },
  typingIndicator: {
    padding: "8px 15px",
    backgroundColor: "#e9ecef",
    borderRadius: "15px",
    marginBottom: "10px",
    fontSize: "12px",
    color: "#666",
    fontStyle: "italic",
  },
  typingText: {
    fontSize: "12px",
  },
  fileUploadSection: {
    padding: "10px",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    marginBottom: "10px",
    border: "1px solid #dee2e6",
  },
  fileInfo: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "8px",
  },
  fileName: {
    fontWeight: "bold",
    fontSize: "14px",
  },
  fileSize: {
    color: "#666",
    fontSize: "12px",
  },
  progressBar: {
    width: "100%",
    height: "20px",
    backgroundColor: "#e9ecef",
    borderRadius: "10px",
    overflow: "hidden",
    position: "relative",
    marginBottom: "8px",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#007bff",
    transition: "width 0.3s ease",
  },
  progressText: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: "12px",
    color: "white",
    fontWeight: "bold",
  },
  fileActions: {
    display: "flex",
    gap: "8px",
  },
  uploadButton: {
    padding: "6px 12px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "12px",
  },
  cancelButton: {
    padding: "6px 12px",
    backgroundColor: "#6c757d",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "12px",
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  input: {
    flex: 1,
    padding: "12px",
    borderRadius: "20px",
    border: "1px solid #ddd",
    fontSize: "14px",
  },
  fileInput: {
    display: "none",
  },
  attachButton: {
    padding: "12px",
    backgroundColor: "#6c757d",
    color: "white",
    border: "none",
    borderRadius: "50%",
    cursor: "pointer",
    fontSize: "16px",
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  sendButton: {
    padding: "12px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
  },
};

export default Chat;
