import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import io from "socket.io-client";
import { useLocation, useParams } from "react-router-dom";
import "./style.css";
import { Image, Dropdown, Menu } from "antd";
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
  MdImage,
  MdPictureAsPdf,
  MdDescription,
  MdTableChart,
} from "react-icons/md";

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

// Document type detection helper
const getDocumentInfo = (fileOrUrl) => {
  let extension = "";

  if (typeof fileOrUrl === "string") {
    // It's a URL
    const urlWithoutParams = fileOrUrl.split("?")[0];
    extension = urlWithoutParams.split(".").pop()?.toLowerCase() || "";
  } else if (fileOrUrl?.name) {
    // It's a File object
    extension = fileOrUrl.name.split(".").pop()?.toLowerCase() || "";
  } else if (fileOrUrl?.type) {
    // Check by MIME type
    const mimeType = fileOrUrl.type;
    if (mimeType === "application/pdf") extension = "pdf";
    else if (
      mimeType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      mimeType === "application/msword"
    )
      extension = "docx";
    else if (
      mimeType ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      mimeType === "application/vnd.ms-excel"
    )
      extension = "xlsx";
    else if (mimeType === "text/csv" || mimeType === "application/csv")
      extension = "csv";
  }

  switch (extension) {
    case "pdf":
      return {
        icon: <MdPictureAsPdf size={24} color="#dc3545" />,
        label: "PDF Document",
        color: "#dc3545",
        bgColor: "rgba(220, 53, 69, 0.1)",
        borderColor: "rgba(220, 53, 69, 0.3)",
      };
    case "doc":
    case "docx":
      return {
        icon: <MdDescription size={24} color="#2b579a" />,
        label: "Word Document",
        color: "#2b579a",
        bgColor: "rgba(43, 87, 154, 0.1)",
        borderColor: "rgba(43, 87, 154, 0.3)",
      };
    case "xls":
    case "xlsx":
      return {
        icon: <MdTableChart size={24} color="#217346" />,
        label: "Excel Spreadsheet",
        color: "#217346",
        bgColor: "rgba(33, 115, 70, 0.1)",
        borderColor: "rgba(33, 115, 70, 0.3)",
      };
    case "csv":
      return {
        icon: <MdTableChart size={24} color="#28a745" />,
        label: "CSV File",
        color: "#28a745",
        bgColor: "rgba(40, 167, 69, 0.1)",
        borderColor: "rgba(40, 167, 69, 0.3)",
      };
    default:
      return {
        icon: <MdDescription size={24} color="#6c757d" />,
        label: "Document",
        color: "#6c757d",
        bgColor: "rgba(108, 117, 125, 0.1)",
        borderColor: "rgba(108, 117, 125, 0.3)",
      };
  }
};

// Check if file is a supported document type
const isDocumentType = (file) => {
  const supportedMimeTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-excel",
    "text/csv",
    "application/csv",
  ];

  const supportedExtensions = ["pdf", "doc", "docx", "xls", "xlsx", "csv"];

  if (supportedMimeTypes.includes(file.type)) {
    return true;
  }

  const extension = file.name.split(".").pop()?.toLowerCase();
  return supportedExtensions.includes(extension);
};

// Get file name from URL
const getFileNameFromUrl = (url) => {
  if (!url) return "Document";
  const urlWithoutParams = url.split("?")[0];
  const fileName = urlWithoutParams.split("/").pop();
  return fileName || "Document";
};

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
  const [audioMimeType, setAudioMimeType] = useState("audio/webm");

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const recordingIntervalRef = useRef(null);
  const audioPreviewRef = useRef(null);

  const adminId = AdminData[0]?.admin_id;
  const messageEndRef = useRef(null);
  const imageInputRef = useRef(null);
  const documentInputRef = useRef(null);
  const senderName = AdminData[0]?.name;
  const location = useLocation();
  const { additionalData } = location.state || {};

  const user_image =
    additionalData?.image ||
    "https://res.cloudinary.com/dhgp9dzdt/image/upload/v1749036826/WhatsApp_Image_2025-06-04_at_14.31.19_e58a8cb4_b9cvno.jpg";

  // Accepted document types for file input
  const acceptedDocumentTypes =
    ".pdf,.doc,.docx,.xls,.xlsx,.csv,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv";

  // Get supported audio MIME type
  const getSupportedAudioMimeType = () => {
    const types = [
      "audio/mp4",
      "audio/webm;codecs=opus",
      "audio/webm",
      "audio/ogg;codecs=opus",
      "audio/ogg",
    ];

    for (const type of types) {
      if (MediaRecorder.isTypeSupported(type)) {
        console.log("Supported audio MIME type:", type);
        return type;
      }
    }

    console.warn("No preferred MIME type supported, using default");
    return "audio/webm"; // fallback
  };

  // Get file extension based on MIME type
  const getFileExtension = (mimeType) => {
    if (mimeType.includes("mp4")) return "m4a";
    if (mimeType.includes("webm")) return "webm";
    if (mimeType.includes("ogg")) return "ogg";
    return "webm"; // fallback
  };

  // Audio Recording Functions
  const startRecording = async () => {
    try {
      console.log("Starting audio recording...");
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const mimeType = getSupportedAudioMimeType();
      setAudioMimeType(mimeType);

      console.log("Using MIME type:", mimeType);

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: mimeType,
      });

      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
          console.log("Audio chunk recorded:", event.data.size, "bytes");
        }
      };

      mediaRecorder.onstop = () => {
        console.log("Recording stopped, creating blob...");
        const audioBlob = new Blob(audioChunksRef.current, {
          type: mimeType,
        });
        const audioUrl = URL.createObjectURL(audioBlob);

        console.log("Audio blob created:", {
          size: audioBlob.size,
          type: audioBlob.type,
        });

        setAudioBlob(audioBlob);
        setAudioUrl(audioUrl);

        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);

      console.log("Recording started successfully");
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert(
        "Could not access microphone. Please check permissions and try again."
      );
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      console.log("Stopping recording...");
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
        console.log("Resuming recording...");
        mediaRecorderRef.current.resume();
        recordingIntervalRef.current = setInterval(() => {
          setRecordingTime((prev) => prev + 1);
        }, 1000);
      } else {
        console.log("Pausing recording...");
        mediaRecorderRef.current.pause();
        if (recordingIntervalRef.current) {
          clearInterval(recordingIntervalRef.current);
        }
      }
      setIsPaused(!isPaused);
    }
  };

  const cancelRecording = () => {
    console.log("Cancelling recording...");
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
    console.log("Deleting audio recording...");
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
    if (!audioBlob || !chatId) {
      console.error("Missing required data for audio upload");
      alert("Missing required data. Please try recording again.");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      console.log("=== Starting Audio Upload ===");
      const formData = new FormData();
      const fileExtension = getFileExtension(audioMimeType);
      const fileName = `audio_${Date.now()}.${fileExtension}`;
      const audioFile = new File([audioBlob], fileName, {
        type: audioMimeType,
        lastModified: Date.now(),
      });

      formData.append("file", audioFile);
      formData.append("chatId", String(chatId));
      formData.append("senderId", String(adminId));
      formData.append("senderRole", "admin");
      formData.append("senderName", senderName);
      formData.append("messageType", "audio");

      const response = await axios.post(
        `${backendUrl}/campForEnglishChat/groupChat/sendMedia`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          timeout: 180000,
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setUploadProgress(percentCompleted);
            }
          },
        }
      );

      const messageData = response.data;
      const formattedMessage = {
        _id: messageData.messageId,
        text: messageData.messageText || "",
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
          (msg) => msg._id === formattedMessage._id
        );
        if (messageExists) {
          return prevMessages;
        }
        return [...prevMessages, formattedMessage];
      });

      deleteAudioRecording();
      setUploadProgress(0);
    } catch (error) {
      console.error("=== Audio Upload Failed ===", error);
      alert(`Upload Error: ${error.response?.data?.error || error.message}`);
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
          document:
            newMessage.mediaUrl && newMessage.messageType === "document"
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

  const handleFileSelect = (event, fileType) => {
    const target = event.target;
    const file = target.files?.[0];
    if (file) {
      console.log("File selected:", {
        name: file.name,
        type: file.type,
        size: file.size,
      });

      // Validate document type
      if (fileType === "document" && !isDocumentType(file)) {
        alert(
          "Unsupported file type. Please upload PDF, DOC, DOCX, XLS, XLSX, or CSV files."
        );
        return;
      }

      setSelectedFile(file);
    }
  };

  // Updated handleMediaUpload to support all document types
  const handleMediaUpload = async () => {
    if (!selectedFile || !chatId) {
      console.error("Missing required data for media upload");
      alert("Missing required data. Please try again.");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      console.log("=== Starting Media Upload ===");
      console.log("Selected file:", {
        name: selectedFile.name,
        type: selectedFile.type,
        size: selectedFile.size,
        sizeInMB: (selectedFile.size / 1024 / 1024).toFixed(2) + " MB",
      });

      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("chatId", String(chatId));
      formData.append("senderId", String(adminId));
      formData.append("senderRole", "admin");
      formData.append("senderName", senderName);

      // Determine message type
      let messageType = "file";
      if (selectedFile.type.startsWith("image/")) {
        messageType = "image";
      } else if (selectedFile.type.startsWith("video/")) {
        messageType = "video";
      } else if (isDocumentType(selectedFile)) {
        messageType = "document";
      }

      formData.append("messageType", messageType);

      const response = await axios.post(
        `${backendUrl}/campForEnglishChat/groupChat/sendMedia`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          timeout: 180000,
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setUploadProgress(percentCompleted);
            }
          },
        }
      );

      const messageData = response.data;
      const formattedMessage = {
        _id: messageData.messageId,
        text: messageData.messageText || "",
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
        document:
          messageData.mediaUrl && messageData.messageType === "document"
            ? messageData.mediaUrl
            : undefined,
        videoThumbnail: messageData.thumbnailUrl,
        messageType: messageData.messageType,
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

      setSelectedFile(null);
      setUploadProgress(0);
      if (imageInputRef.current) {
        imageInputRef.current.value = "";
      }
      if (documentInputRef.current) {
        documentInputRef.current.value = "";
      }

      console.log("=== Media Upload Completed Successfully ===");
    } catch (error) {
      console.error("=== Media Upload Failed ===", error?.response);
      alert(`Upload Error: ${error.response?.data?.error || error.message}`);
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
          document:
            msg.mediaUrl && msg.messageType === "document"
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
          groupId: group_id,
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

  // Attachment Menu
  const attachmentMenu = (
    <Menu>
      <Menu.Item
        key="image"
        icon={<MdImage size={18} />}
        onClick={() => imageInputRef.current?.click()}
      >
        Image
      </Menu.Item>
      <Menu.Item
        key="document"
        icon={<MdDescription size={18} />}
        onClick={() => documentInputRef.current?.click()}
      >
        Document (PDF, Word, Excel, CSV)
      </Menu.Item>
    </Menu>
  );

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

                {msg.audio && (
                  <div style={styles.mediaContainer}>
                    <div style={styles.audioMessageContainer}>
                      <MdMic size={20} color="#0c5460" />
                      <audio controls style={styles.audioMessage}>
                        <source src={msg.audio} type="audio/mp4" />
                        <source src={msg.audio} type="audio/webm" />
                        <source src={msg.audio} type="audio/mpeg" />
                        <source src={msg.audio} type="audio/ogg" />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  </div>
                )}

                {msg.document && (
                  <div style={styles.mediaContainer}>
                    {(() => {
                      const docInfo = getDocumentInfo(msg.document);
                      return (
                        <div
                          style={{
                            ...styles.documentContainer,
                            backgroundColor: docInfo.bgColor,
                            borderColor: docInfo.borderColor,
                          }}
                        >
                          {docInfo.icon}
                          <div style={styles.documentInfo}>
                            <span style={styles.documentName}>
                              {getFileNameFromUrl(msg.document)}
                            </span>
                            <span
                              style={{
                                ...styles.documentType,
                                color: docInfo.color,
                              }}
                            >
                              {docInfo.label}
                            </span>
                          </div>
                          <a
                            href={msg.document}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              ...styles.documentLink,
                              color: docInfo.color,
                            }}
                          >
                            View
                          </a>
                        </div>
                      );
                    })()}
                  </div>
                )}
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
                <span style={styles.recordingFormat}>
                  ({getFileExtension(audioMimeType).toUpperCase()})
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

        {/* Audio Preview Section */}
        {audioUrl && !isRecording && (
          <div style={styles.audioPreviewSection}>
            <div style={styles.audioPreviewInfo}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <MdMic size={20} color="#0c5460" />
                <span style={styles.audioLabel}>Audio recorded</span>
                <span style={styles.audioFormat}>
                  ({getFileExtension(audioMimeType).toUpperCase()})
                </span>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <span style={styles.audioDuration}>
                  {formatTime(recordingTime)}
                </span>
                <span style={styles.audioSize}>
                  ({(audioBlob?.size / 1024).toFixed(2)} KB)
                </span>
              </div>
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
                  {isUploading
                    ? `Uploading... ${uploadProgress}%`
                    : "Send Audio"}
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
        )}

        {/* File Upload Section */}
        {selectedFile && (
          <div style={styles.fileUploadSection}>
            <div style={styles.fileInfo}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                {(() => {
                  if (selectedFile.type.startsWith("image/")) {
                    return <MdImage size={24} color="#007bff" />;
                  }
                  const docInfo = getDocumentInfo(selectedFile);
                  return docInfo.icon;
                })()}
                <div style={styles.fileDetails}>
                  <span style={styles.fileName}>{selectedFile.name}</span>
                  <span style={styles.fileType}>
                    {selectedFile.type.startsWith("image/")
                      ? "Image"
                      : getDocumentInfo(selectedFile).label}
                  </span>
                </div>
              </div>
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
                {isUploading ? `Uploading... ${uploadProgress}%` : "Upload"}
              </button>
              <button
                onClick={() => {
                  setSelectedFile(null);
                  if (imageInputRef.current) {
                    imageInputRef.current.value = "";
                  }
                  if (documentInputRef.current) {
                    documentInputRef.current.value = "";
                  }
                }}
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
          <button
            onClick={isRecording ? stopRecording : startRecording}
            style={{
              ...styles.micButton,
              backgroundColor: isRecording ? "#dc3545" : "#28a745",
            }}
            title={isRecording ? "Stop Recording" : "Start Recording"}
            disabled={audioUrl !== null}
          >
            <MdMic size={20} />
          </button>

          {/* Hidden File Inputs */}
          <input
            ref={imageInputRef}
            type="file"
            accept="image/*,video/*"
            onChange={(e) => handleFileSelect(e, "media")}
            style={styles.fileInput}
          />
          <input
            ref={documentInputRef}
            type="file"
            accept={acceptedDocumentTypes}
            onChange={(e) => handleFileSelect(e, "document")}
            style={styles.fileInput}
          />

          {/* Attachment Dropdown Button */}
          <Dropdown overlay={attachmentMenu} trigger={["click"]}>
            <button
              style={styles.attachButton}
              title="Attach file"
              disabled={isRecording || audioUrl !== null}
            >
              <MdAttachFile size={20} />
            </button>
          </Dropdown>

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
    gap: "8px",
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
  documentContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid",
    minWidth: "220px",
  },
  documentInfo: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    overflow: "hidden",
  },
  documentName: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#333",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "150px",
  },
  documentType: {
    fontSize: "11px",
    fontWeight: "500",
  },
  documentLink: {
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "13px",
    padding: "4px 8px",
    borderRadius: "4px",
    backgroundColor: "rgba(0,0,0,0.05)",
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
  recordingFormat: {
    fontSize: "11px",
    color: "#856404",
    backgroundColor: "rgba(0,0,0,0.1)",
    padding: "2px 6px",
    borderRadius: "4px",
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
  audioFormat: {
    fontSize: "11px",
    color: "#0c5460",
    backgroundColor: "rgba(0,0,0,0.1)",
    padding: "2px 6px",
    borderRadius: "4px",
  },
  audioDuration: {
    fontSize: "14px",
    color: "#0c5460",
    fontFamily: "monospace",
  },
  audioSize: {
    fontSize: "11px",
    color: "#0c5460",
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
    justifyContent: "space-between",
    marginBottom: "8px",
  },
  fileDetails: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  fileName: {
    fontWeight: "bold",
    fontSize: "14px",
  },
  fileType: {
    fontSize: "11px",
    color: "#666",
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
