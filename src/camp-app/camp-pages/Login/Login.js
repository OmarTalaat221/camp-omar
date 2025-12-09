// src/camp-app/camp-pages/Login/Login.jsx
import React, { useState, useEffect } from "react";
import "./style.css";
import axios from "axios";
import { BASE_URL } from "../../../Api/baseUrl";
import { toast } from "react-toastify";
import { useNotification } from "../../../context/NotificationContext";

const Login = () => {
  const [LoginData, setLoginData] = useState({
    email: null,
    password: null,
  });
  const [loading, setLoading] = useState(false);
  const [deviceToken, setDeviceToken] = useState(null);

  // Get notification context
  const notification = useNotification();

  // Generate device token
  useEffect(() => {
    let token = localStorage.getItem("device_serial");
    if (!token) {
      const timestamp = new Date().getTime();
      const random = Math.random().toString(36).substring(2, 15);
      token = `device-${timestamp}-${random}`;
      localStorage.setItem("device_serial", token);
    }
    setDeviceToken(token);
  }, []);

  // Request FCM token before login
  const requestFCMTokenBeforeLogin = async () => {
    if (!notification.isSupported) {
      console.log("⚠️ Notifications not supported");
      return null;
    }

    try {
      console.log("🔔 Requesting FCM token before login...");
      const token = await notification.getFCMToken();

      if (token) {
        console.log("✅ FCM Token obtained for login");
        return token;
      }

      return null;
    } catch (error) {
      console.error("❌ FCM token request failed:", error);
      return null;
    }
  };

  const handelLogin = async () => {
    if (!LoginData?.email || !LoginData?.password) {
      toast.error("Please enter both email and password");
      return;
    }

    if (!deviceToken) {
      toast.error("Device token not generated. Please refresh the page.");
      return;
    }

    setLoading(true);

    try {
      // Get FCM token (optional - don't block login)
      let currentFcmToken = localStorage.getItem("fcm_token");

      if (!currentFcmToken && notification.isSupported) {
        const toastId = toast.info("Setting up notifications...", {
          autoClose: false,
        });

        currentFcmToken = await requestFCMTokenBeforeLogin();

        toast.dismiss(toastId);
      }

      // Login request - include FCM token
      const dataSend = {
        email: LoginData.email,
        password: LoginData.password,
        device_serial: deviceToken,
        fcm_token: currentFcmToken || null,
      };

      console.log("📤 Logging in with data:", {
        ...dataSend,
        password: "***",
        fcm_token: currentFcmToken
          ? currentFcmToken.substring(0, 20) + "..."
          : null,
      });

      const res = await axios.post(
        BASE_URL + `/admin/permissions/login.php`,
        JSON.stringify(dataSend)
      );

      if (res.data.status === "success") {
        const userData = res.data.message;

        // Store admin data first
        localStorage.setItem("AdminData", JSON.stringify(userData));

        // If FCM token exists, also save it separately to server
        if (currentFcmToken && userData && userData.length > 0) {
          const adminId = userData[0]?.id || userData[0]?.admin_id;
          if (adminId) {
            // Save FCM token to server
            await notification.saveFcmTokenToServer(currentFcmToken, adminId);
          }
        }

        if (currentFcmToken) {
          toast.success("✅ Logged in with notifications enabled!");
        } else {
          toast.success("✅ Logged in successfully");
        }

        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !loading) {
      handelLogin();
    }
  };

  return (
    <div className="login_page">
      <div className="login_div">
        <img
          src="https://res.cloudinary.com/dbz6ebekj/image/upload/v1734261758/logo_png_2_1_1_rx2qjj.png"
          alt="Camp for English Logo"
        />
        <div className="form">
          <h2>Camp for English</h2>
          <p>
            We're excited to see you back. Log in to access your dashboard and
            stay connected.
          </p>

          <div className="form_field">
            <label className="form_label">Admin Email</label>
            <input
              type="email"
              className="form_input"
              value={LoginData?.email || ""}
              onChange={(e) =>
                setLoginData({ ...LoginData, email: e.target.value })
              }
              onKeyPress={handleKeyPress}
              disabled={loading}
              placeholder="Enter your email"
            />
          </div>

          <div className="form_field">
            <label className="form_label">Admin Password</label>
            <input
              type="password"
              className="form_input"
              value={LoginData?.password || ""}
              onChange={(e) =>
                setLoginData({ ...LoginData, password: e.target.value })
              }
              onKeyPress={handleKeyPress}
              disabled={loading}
              placeholder="Enter your password"
            />
          </div>

          <button
            className="btn btn-primary login-btn"
            onClick={handelLogin}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                {"Logging in..."}
              </>
            ) : (
              "Log in"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
