import React, { useState, useEffect } from "react";
import "./style.css";
import axios from "axios";
import { BASE_URL } from "../../../Api/baseUrl";
import { toast } from "react-toastify";

const Login = () => {
  const [LoginData, setLoginData] = useState({
    email: null,
    password: null,
  });
  const [loading, setLoading] = useState(false);
  const [deviceToken, setDeviceToken] = useState(null);

  // Generate or retrieve device token
  useEffect(() => {
    const getDeviceToken = () => {
      // Check if device token already exists in localStorage
      let token = localStorage.getItem("device_serial");

      if (!token) {
        // Generate new device token
        token = generateDeviceToken();
        // Store it in localStorage
        localStorage.setItem("device_serial", token);
      }

      setDeviceToken(token);
    };

    getDeviceToken();
  }, []);

  // Generate unique device token
  const generateDeviceToken = () => {
    // Method 1: UUID-like token
    const timestamp = new Date().getTime();
    const random = Math.random().toString(36).substring(2, 15);
    const userAgent = navigator.userAgent;
    const screenResolution = `${window.screen.width}x${window.screen.height}`;

    // Create a more unique identifier
    const uniqueString = `${timestamp}-${random}-${userAgent}-${screenResolution}`;

    // Simple hash function or just return a UUID-like string
    return `device-${timestamp}-${random}-${Math.random()
      .toString(36)
      .substring(2, 9)}`;
  };

  const handelLogin = async () => {
    // Basic validation
    if (!LoginData?.email || !LoginData?.password) {
      toast.error("Please enter both email and password");
      return;
    }

    if (!deviceToken) {
      toast.error("Device token not generated. Please refresh the page.");
      return;
    }

    setLoading(true);

    const dataSend = {
      email: LoginData?.email,
      password: LoginData?.password,
      device_serial: deviceToken, // Include device token
    };

    try {
      const res = await axios.post(
        BASE_URL + `/admin/permissions/login.php`,
        JSON.stringify(dataSend)
      );

      console.log(res);

      if (res.data.status === "success") {
        const userData = res.data.message;

        toast.success("Logged in successfully");
        localStorage.setItem("AdminData", JSON.stringify(userData));
        window.location.reload();
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

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
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
              onChange={(e) => {
                setLoginData({
                  ...LoginData,
                  email: e.target.value,
                });
              }}
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
              onChange={(e) => {
                setLoginData({
                  ...LoginData,
                  password: e.target.value,
                });
              }}
              onKeyPress={handleKeyPress}
              disabled={loading}
              placeholder="Enter your password"
            />
          </div>
          <button
            className="btn btn-primary"
            style={{ marginTop: "10px" }}
            onClick={handelLogin}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
