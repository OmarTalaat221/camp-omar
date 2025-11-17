import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import io from "socket.io-client";
import { useLocation, useParams } from "react-router-dom";
import "./style.css";
import { Image } from "antd";
// Import React Icons
import {
  MdMic,
  MdAttachFile,
  MdSend,
  MdDelete,
  MdPause,
  MdPlayArrow,
  MdStop,
  MdClose,
  MdUpload,
} from "react-icons/md";
import { BiMicrophone } from "react-icons/bi";
import { IoMicOutline, IoSendSharp } from "react-icons/io5";
import { FiMic, FiPaperclip } from "react-icons/fi";

const backendUrl = "https://camp-coding.tech";

const socket = io(backendUrl, {
  path: "/campForEnglishChat/socket.io",
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

  // Audio Recording States
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const recordingIntervalRef = useRef(null);
  const audioPreviewRef = useRef(null);

  const adminId = AdminData[0]?.admin_id;
  const messageEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const senderName = AdminData[0]?.name;
  const location = useLocation();
  const { additionalData } = location.state || {};

  const user_image =
    additionalData?.image ||
    "https://res.cloudinary.com/dhgp9dzdt/image/upload/v1749036826/WhatsApp_Image_2025-06-04_at_14.31.19_e58a8cb4_b9cvno.jpg";

  // Audio Recording Functions
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });
        const audioUrl = URL.createObjectURL(audioBlob);

        setAudioBlob(audioBlob);
        setAudioUrl(audioUrl);

        // Stop all tracks
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      // Start timer
      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert("Could not access microphone. Please check permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);

      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      if (isPaused) {
        mediaRecorderRef.current.resume();
        recordingIntervalRef.current = setInterval(() => {
          setRecordingTime((prev) => prev + 1);
        }, 1000);
      } else {
        mediaRecorderRef.current.pause();
        if (recordingIntervalRef.current) {
          clearInterval(recordingIntervalRef.current);
        }
      }
      setIsPaused(!isPaused);
    }
  };

  const cancelRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
    }

    setIsRecording(false);
    setIsPaused(false);
    setRecordingTime(0);
    setAudioBlob(null);
    setAudioUrl(null);
    audioChunksRef.current = [];

    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current);
    }
  };

  const deleteAudioRecording = () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    setAudioBlob(null);
    setAudioUrl(null);
    setRecordingTime(0);
  };

  // Format time in MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Send audio message via API
  const sendAudioMessage = async () => {
    if (!audioBlob || !chatId) return;

    setIsUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    // Create a file from the blob with proper extension
    const audioFile = new File([audioBlob], `audio_${Date.now()}.webm`, {
      type: "audio/webm",
    });

    formData.append("file", audioFile);
    formData.append("chatId", chatId);
    formData.append("senderId", adminId);
    formData.append("senderRole", "admin");
    formData.append("senderName", senderName);
    formData.append("messageType", "audio");

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

      console.log("Audio uploaded successfully:", response.data);

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
        audio:
          messageData.mediaUrl && messageData.messageType === "audio"
            ? messageData.mediaUrl
            : undefined,
        messageType: messageData.messageType,
      };

      setMessages((prevMessages) => {
        const messageExists = prevMessages.some(
          (msg) => msg._id === newMessage._id
        );
        if (messageExists) {
          return prevMessages;
        }
        return [...prevMessages, newMessage];
      });

      // Clear audio recording
      deleteAudioRecording();
      setUploadProgress(0);
    } catch (error) {
      console.error("Failed to upload audio:", error);
      console.error("Error details:", error.response?.data);
      alert("Failed to upload audio. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  useEffect(() => {
    socket.on("newUnseenMessage", ({ group_id, chatId }) => {
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
      setIsOnline(true);
    });

    socket.on("disconnect", (reason) => {
      setIsOnline(false);
    });

    socket.on("connect_error", (error) => {
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
      socket.emit("joinGroupChat", { chatId });
    }

    socket.on("newMessage", (newMessage) => {
      const normalizedNewMessageChatId = String(newMessage.chatId);
      const normalizedExpectedChatId = String(chatId);

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
          image:
            newMessage.mediaUrl && newMessage.messageType === "image"
              ? newMessage.mediaUrl
              : undefined,
          video:
            newMessage.mediaUrl && newMessage.messageType === "video"
              ? newMessage.mediaUrl
              : undefined,
          audio:
            newMessage.mediaUrl && newMessage.messageType === "audio"
              ? newMessage.mediaUrl
              : undefined,
          videoThumbnail: newMessage.thumbnailUrl,
          messageType: newMessage.messageType,
        };

        setMessages((prevMessages) => {
          const messageExists = prevMessages.some(
            (msg) => msg._id === formattedMessage._id
          );
          if (messageExists) {
            return prevMessages;
          }
          return [...prevMessages, formattedMessage];
        });
        makeMessagesSeen(chatId);
      }
    });

    socket.on("messageDeleted", ({ messageId, chatId: deletedChatId }) => {
      const normalizedDeletedChatId = String(deletedChatId);
      const normalizedExpectedChatId = String(chatId);

      if (normalizedDeletedChatId === normalizedExpectedChatId) {
        setMessages((prevMessages) =>
          prevMessages.filter((msg) => msg._id !== messageId)
        );
      }
    });

    const heartbeatInterval = setInterval(() => {
      if (socket.connected) {
        socket.emit("ping");
      }
    }, 30000);

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

  const handleFileSelect = (event) => {
    const target = event.target;
    const file = target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

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
      alert("Failed to upload media. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

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

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/campForEnglishChat/groupChat/${group_id}/${student_id}`
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
          audio:
            msg.mediaUrl && msg.messageType === "audio"
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

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

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
                      <MdClose size={18} />
                    </button>
                  )}
                </div>

                {msg.text && <div style={styles.messageText}>{msg.text}</div>}

                {msg.image && (
                  <div style={styles.mediaContainer}>
                    <Image
                      src={msg.image}
                      alt="Image"
                      style={styles.mediaImage}
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

                {/* {msg.audio && (
                  <div style={styles.mediaContainer}>
                    <div style={styles.audioMessageContainer}>
                      <MdMic size={20} color="#0c5460" />
                      <audio controls style={styles.audioMessage}>
                        <source src={msg.audio} type="audio/webm" />
                        <source src={msg.audio} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  </div>
                )} */}
              </div>
            </div>
          ))}

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

        {/* Audio Recording Section */}
        {isRecording && (
          <div style={styles.recordingSection}>
            <div style={styles.recordingInfo}>
              <div style={styles.recordingIndicator}>
                <div style={styles.recordingDot}></div>
                <span style={styles.recordingText}>
                  {isPaused ? "Paused" : "Recording..."}
                </span>
              </div>
              <span style={styles.recordingTime}>
                {formatTime(recordingTime)}
              </span>
            </div>
            <div style={styles.recordingActions}>
              <button
                onClick={pauseRecording}
                style={styles.pauseButton}
                title={isPaused ? "Resume" : "Pause"}
              >
                {isPaused ? <MdPlayArrow size={18} /> : <MdPause size={18} />}
                <span style={{ marginLeft: "5px" }}>
                  {isPaused ? "Resume" : "Pause"}
                </span>
              </button>
              <button
                onClick={stopRecording}
                style={styles.stopButton}
                title="Stop Recording"
              >
                <MdStop size={18} />
                <span style={{ marginLeft: "5px" }}>Stop</span>
              </button>
              <button
                onClick={cancelRecording}
                style={styles.cancelRecordButton}
                title="Cancel Recording"
              >
                <MdClose size={18} />
                <span style={{ marginLeft: "5px" }}>Cancel</span>
              </button>
            </div>
          </div>
        )}

        {/* Audio Preview Section
        {audioUrl && !isRecording && (
          <div style={styles.audioPreviewSection}>
            <div style={styles.audioPreviewInfo}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <MdMic size={20} color="#0c5460" />
                <span style={styles.audioLabel}>Audio recorded</span>
              </div>
              <span style={styles.audioDuration}>
                {formatTime(recordingTime)}
              </span>
            </div>
            <audio
              ref={audioPreviewRef}
              controls
              src={audioUrl}
              style={styles.audioPlayer}
            />
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
            <div style={styles.audioActions}>
              <button
                onClick={sendAudioMessage}
                style={styles.sendAudioButton}
                disabled={isUploading}
              >
                <MdUpload size={18} />
                <span style={{ marginLeft: "5px" }}>
                  {isUploading ? "Uploading..." : "Send Audio"}
                </span>
              </button>
              <button
                onClick={deleteAudioRecording}
                style={styles.deleteAudioButton}
                disabled={isUploading}
              >
                <MdDelete size={18} />
                <span style={{ marginLeft: "5px" }}>Delete</span>
              </button>
            </div>
          </div>
        )} */}

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
            disabled={isRecording || audioUrl !== null}
          />

          {/* Microphone Button */}
          {/* <button
            onClick={isRecording ? stopRecording : startRecording}
            style={{
              ...styles.micButton,
              backgroundColor: isRecording ? "#dc3545" : "#28a745",
            }}
            title={isRecording ? "Stop Recording" : "Start Recording"}
            disabled={audioUrl !== null}
          >
            <MdMic size={20} />
          </button> */}

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
            disabled={isRecording || audioUrl !== null}
          >
            <MdAttachFile size={20} />
          </button>

          <button
            onClick={sendMessage}
            style={styles.sendButton}
            disabled={!newMessage.trim() || isRecording || audioUrl !== null}
          >
            <MdSend size={18} style={{ marginRight: "5px" }} />
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
    padding: "0",
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
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
  audioMessageContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "8px",
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    borderRadius: "8px",
  },
  audioMessage: {
    width: "250px",
    height: "40px",
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
  // Recording Styles
  recordingSection: {
    padding: "15px",
    backgroundColor: "#fff3cd",
    borderRadius: "8px",
    marginBottom: "10px",
    border: "2px solid #ffc107",
  },
  recordingInfo: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
  recordingIndicator: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  recordingDot: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    backgroundColor: "#dc3545",
    animation: "blink 1s infinite",
  },
  recordingText: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#856404",
  },
  recordingTime: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#856404",
    fontFamily: "monospace",
  },
  recordingActions: {
    display: "flex",
    gap: "8px",
    justifyContent: "center",
  },
  pauseButton: {
    padding: "8px 16px",
    backgroundColor: "#ffc107",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
  },
  stopButton: {
    padding: "8px 16px",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
  },
  cancelRecordButton: {
    padding: "8px 16px",
    backgroundColor: "#6c757d",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
  },
  // Audio Preview Styles
  audioPreviewSection: {
    padding: "15px",
    backgroundColor: "#d1ecf1",
    borderRadius: "8px",
    marginBottom: "10px",
    border: "2px solid #0c5460",
  },
  audioPreviewInfo: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
  audioLabel: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#0c5460",
  },
  audioDuration: {
    fontSize: "14px",
    color: "#0c5460",
    fontFamily: "monospace",
  },
  audioPlayer: {
    width: "100%",
    marginBottom: "10px",
  },
  audioActions: {
    display: "flex",
    gap: "8px",
    justifyContent: "center",
  },
  sendAudioButton: {
    padding: "8px 16px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
  },
  deleteAudioButton: {
    padding: "8px 16px",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
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
  micButton: {
    padding: "12px",
    color: "white",
    border: "none",
    borderRadius: "50%",
    cursor: "pointer",
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s ease",
  },
  attachButton: {
    padding: "12px",
    backgroundColor: "#6c757d",
    color: "white",
    border: "none",
    borderRadius: "50%",
    cursor: "pointer",
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
    display: "flex",
    alignItems: "center",
  },
};

export default Chat;
