// src/App.jsx
import React, {
  Fragment,
  useEffect,
  useRef,
  useCallback,
  useState,
} from "react";
import Loader from "./component/common/loader/loader";
import Header from "./component/common/header/header";
import Sidebar from "./component/common/sidebar/sidebar";
import Rightsidebar from "./component/common/sidebar/rightsidebar";
import Footer from "./component/common/footer/footer";
import ThemeCustomize from "./component/common/theme-customizer/themeCustomize";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import ConfigDB from "./data/customizer/config";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Login from "./camp-app/camp-pages/Login/Login";
import axios from "axios";
import { BASE_URL } from "./Api/baseUrl";
import "./app.css";
import NotificationProvider, {
  useNotification,
} from "./context/NotificationContext";

// Inner App Component (has access to notification context)
const AppContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const checkpath = window.location.pathname;

  // Get notification context
  const notification = useNotification();

  const INACTIVITY_TIMEOUT = 60 * 60 * 1000;
  const WARNING_TIME = 10000;

  const timeoutRef = useRef(null);
  const warningTimeoutRef = useRef(null);
  const countdownIntervalRef = useRef(null);
  const [isWarningActive, setIsWarningActive] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [isVerifying, setIsVerifying] = useState(true);
  const notificationInitializedRef = useRef(false);

  const AdminData = JSON.parse(localStorage.getItem("AdminData"));

  const isAdminOrEmployee =
    AdminData &&
    AdminData.length > 0 &&
    (AdminData[0]?.type === "super_admin" ||
      AdminData[0]?.type === "employee" ||
      AdminData[0]?.type === "instructor" ||
      AdminData[0]?.type === "superVisor");

  // Initialize notifications when admin logs in
  useEffect(() => {
    const initNotifications = async () => {
      // Prevent multiple initializations
      if (notificationInitializedRef.current) return;

      if (
        isAdminOrEmployee &&
        notification.isSupported &&
        !notification.isEnabled
      ) {
        try {
          notificationInitializedRef.current = true;
          const adminId = AdminData[0]?.id || AdminData[0]?.admin_id;

          // initializeNotifications will automatically save token to server
          const token = await notification.initializeNotifications(adminId);

          if (token) {
            console.log("✅ Notifications initialized successfully");
            notification.notify(
              "Notifications Enabled",
              "You will receive push notifications"
            );
          }
        } catch (error) {
          console.log("Notification init failed:", error.message);
          notificationInitializedRef.current = false;
        }
      }
    };

    // Delay to allow UI to render first
    const timer = setTimeout(initNotifications, 2000);
    return () => clearTimeout(timer);
  }, [isAdminOrEmployee, notification.isSupported, notification.isEnabled]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [checkpath]);

  // Verify device serial
  useEffect(() => {
    const verifyDeviceSerial = async () => {
      if (!AdminData || !AdminData.length) {
        setIsVerifying(false);
        return;
      }

      const admin_id = AdminData[0]?.id || AdminData[0]?.admin_id;
      const storedDeviceSerial = localStorage.getItem("device_serial");

      if (!admin_id) {
        setIsVerifying(false);
        return;
      }

      try {
        const response = await axios.post(
          BASE_URL + `/admin/permissions/admin_info.php`,
          JSON.stringify({ admin_id: admin_id })
        );

        if (response.data.status === "success") {
          const serverDeviceSerial = response?.data?.message[0]?.device_serial;

          if (serverDeviceSerial && serverDeviceSerial != storedDeviceSerial) {
            toast.error("Device verification failed. Please login again.");
            handleLogout();
            return;
          }
        } else {
          toast.error("Failed to verify session");
          handleLogout();
        }
      } catch (error) {
        console.error("Device verification error:", error);
      } finally {
        setIsVerifying(false);
      }
    };

    verifyDeviceSerial();
  }, [checkpath]);

  const handleLogout = useCallback(async () => {
    // Cleanup FCM
    if (notification?.cleanup) {
      try {
        await notification.cleanup();
        console.log("✅ FCM cleaned up on logout");
      } catch (error) {
        console.error("FCM cleanup error:", error);
      }
    }

    // Clear local storage
    localStorage.removeItem("AdminData");
    localStorage.removeItem("token");
    localStorage.removeItem("fcm_token");

    // Clear timers
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (warningTimeoutRef.current) clearTimeout(warningTimeoutRef.current);
    if (countdownIntervalRef.current)
      clearInterval(countdownIntervalRef.current);

    window.location.reload();
  }, [notification]);

  // Warning function
  const showInactivityWarning = useCallback(() => {
    setIsWarningActive(true);
    setCountdown(10);

    // Show toast notification
    notification.warning(
      "Session Timeout Warning",
      "You will be logged out in 10 seconds due to inactivity."
    );

    countdownIntervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownIntervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [notification]);

  // Reset inactivity timer
  const resetInactivityTimer = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (warningTimeoutRef.current) clearTimeout(warningTimeoutRef.current);
    if (countdownIntervalRef.current)
      clearInterval(countdownIntervalRef.current);

    setIsWarningActive(false);
    setCountdown(10);

    if (isAdminOrEmployee) {
      warningTimeoutRef.current = setTimeout(() => {
        showInactivityWarning();
      }, INACTIVITY_TIMEOUT - WARNING_TIME);

      timeoutRef.current = setTimeout(() => {
        handleLogout();
      }, INACTIVITY_TIMEOUT);
    }
  }, [isAdminOrEmployee, handleLogout, showInactivityWarning]);

  // Activity listeners
  useEffect(() => {
    if (!isAdminOrEmployee) return;

    const events = [
      "mousedown",
      "mousemove",
      "keypress",
      "scroll",
      "touchstart",
      "click",
    ];
    const resetTimer = () => resetInactivityTimer();

    events.forEach((event) => {
      document.addEventListener(event, resetTimer, true);
    });

    resetInactivityTimer();

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, resetTimer, true);
      });
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (warningTimeoutRef.current) clearTimeout(warningTimeoutRef.current);
      if (countdownIntervalRef.current)
        clearInterval(countdownIntervalRef.current);
    };
  }, [isAdminOrEmployee, resetInactivityTimer]);

  if (isVerifying) {
    return (
      <Fragment>
        <Loader />
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Loader />
      <div className="page-wrapper">
        <div className="page-body-wrapper">
          {!AdminData ? (
            <Login />
          ) : (
            <>
              {isAdminOrEmployee && (
                <>
                  <Header />
                  <Sidebar />
                  <Rightsidebar />
                </>
              )}

              <div
                className={`page-body ${
                  !isAdminOrEmployee ? "page-body-no-sidebar" : ""
                }`}
              >
                <div>
                  <Outlet />
                </div>
              </div>

              {isAdminOrEmployee && (
                <>
                  <Footer />
                  <ThemeCustomize />
                </>
              )}
            </>
          )}
        </div>

        {/* Warning Overlay */}
        {isWarningActive && (
          <div className="inactivity-warning-overlay">
            <div className="warning-content">
              <div className="countdown-circle">
                <svg width="120" height="120">
                  <circle
                    cx="60"
                    cy="60"
                    r="54"
                    stroke="#e0e0e0"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="54"
                    stroke="#ff4757"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 54}`}
                    strokeDashoffset={`${
                      2 * Math.PI * 54 * (1 - countdown / 10)
                    }`}
                    strokeLinecap="round"
                    transform="rotate(-90 60 60)"
                    style={{ transition: "stroke-dashoffset 1s linear" }}
                  />
                </svg>
                <div className="countdown-number">{countdown}</div>
              </div>
              <h3>Session Timeout Warning</h3>
              <p>
                You will be logged out in <strong>{countdown}</strong> seconds
                due to inactivity.
              </p>
              <button
                className="btn btn-primary"
                onClick={resetInactivityTimer}
              >
                Stay Logged In
              </button>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </Fragment>
  );
};

const App = () => {
  return (
    <NotificationProvider>
      <AppContent />
    </NotificationProvider>
  );
};

export default App;
