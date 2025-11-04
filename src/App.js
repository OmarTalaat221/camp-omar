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

const App = () => {
  const animation =
    localStorage.getItem("animation") ||
    ConfigDB.data.router_animation ||
    "fade";
  const location = useLocation();
  const navigate = useNavigate();

  const checkpath = window.location.pathname;

  console.log("checkpath", checkpath);

  const INACTIVITY_TIMEOUT = 60 * 60 * 1000; // 1 hour
  const WARNING_TIME = 10000; // 10 seconds

  const timeoutRef = useRef(null);
  const warningTimeoutRef = useRef(null);
  const countdownIntervalRef = useRef(null);
  const [isWarningActive, setIsWarningActive] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [checkpath]);

  const AdminData = JSON.parse(localStorage.getItem("AdminData"));

  // Check if user is admin or employee
  const isAdminOrEmployee =
    AdminData &&
    AdminData.length > 0 &&
    (AdminData[0]?.type === "super_admin" ||
      AdminData[0]?.type === "employee" ||
      AdminData[0]?.type === "instructor" ||
      AdminData[0]?.type === "superVisor");

  // Verify device serial on app load
  useEffect(() => {
    const verifyDeviceSerial = async () => {
      if (!AdminData || !AdminData.length) {
        setIsVerifying(false);
        return;
      }

      const admin_id = AdminData[0]?.id || AdminData[0]?.admin_id;
      const storedDeviceSerial = localStorage.getItem("device_serial");
      console.log(storedDeviceSerial);

      if (!admin_id) {
        setIsVerifying(false);
        return;
      }

      try {
        const response = await axios.post(
          BASE_URL + `/admin/permissions/admin_info.php`,
          JSON.stringify({ admin_id: admin_id })
        );

        console.log("Admin info response:", response.data);

        if (response.data.status === "success") {
          const serverDeviceSerial = response?.data?.message[0]?.device_serial;

          console.log(serverDeviceSerial, "serverDeviceSerial");
          console.log(storedDeviceSerial, "storedDeviceSerial");

          if (serverDeviceSerial && serverDeviceSerial != storedDeviceSerial) {
            console.log(serverDeviceSerial != storedDeviceSerial, "mmmm");
            toast.error(
              "Device verification failed. Please login again from this device."
            );
            handleLogout();
            return;
          }

          console.log("Device verified successfully");
          console.log(serverDeviceSerial != storedDeviceSerial, "mmmm");
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

  // Logout function
  const handleLogout = useCallback(() => {
    localStorage.removeItem("AdminData");
    localStorage.removeItem("token");
    // Don't remove device_serial as it's tied to the device

    // Clear all timers
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (warningTimeoutRef.current) clearTimeout(warningTimeoutRef.current);
    if (countdownIntervalRef.current)
      clearInterval(countdownIntervalRef.current);

    // Force page reload to reset all state
    window.location.reload();
  }, []);

  // Warning function - makes screen darker and starts countdown
  const showInactivityWarning = useCallback(() => {
    setIsWarningActive(true);
    setCountdown(10);

    // Start countdown
    countdownIntervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownIntervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  // Reset the inactivity timer
  const resetInactivityTimer = useCallback(() => {
    // Clear existing timers
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (warningTimeoutRef.current) {
      clearTimeout(warningTimeoutRef.current);
    }
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
    }

    // Reset warning state
    setIsWarningActive(false);
    setCountdown(10);

    // Only set timer if user is logged in
    if (isAdminOrEmployee) {
      // Set warning timer (10 seconds before logout)
      warningTimeoutRef.current = setTimeout(() => {
        showInactivityWarning();
      }, INACTIVITY_TIMEOUT - WARNING_TIME);

      // Set logout timer
      timeoutRef.current = setTimeout(() => {
        handleLogout();
      }, INACTIVITY_TIMEOUT);
    }
  }, [
    isAdminOrEmployee,
    handleLogout,
    showInactivityWarning,
    INACTIVITY_TIMEOUT,
    WARNING_TIME,
  ]);

  // Set up event listeners for user activity
  useEffect(() => {
    if (!isAdminOrEmployee) {
      return; // Don't set up timers if user is not logged in
    }

    // Events that indicate user activity
    const events = [
      "mousedown",
      "mousemove",
      "keypress",
      "scroll",
      "touchstart",
      "click",
    ];

    // Add event listeners
    const resetTimer = () => resetInactivityTimer();

    events.forEach((event) => {
      document.addEventListener(event, resetTimer, true);
    });

    // Start the timer initially
    resetInactivityTimer();

    // Cleanup function
    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, resetTimer, true);
      });

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (warningTimeoutRef.current) {
        clearTimeout(warningTimeoutRef.current);
      }
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
      }
    };
  }, [isAdminOrEmployee, resetInactivityTimer]);

  // Clean up timers when component unmounts
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (warningTimeoutRef.current) {
        clearTimeout(warningTimeoutRef.current);
      }
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
      }
    };
  }, []);

  // Show loader while verifying
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
          {/* Not logged in - Show Login */}
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

              {/* Page content with conditional styling */}
              <div
                className={`page-body ${
                  !isAdminOrEmployee ? "page-body-no-sidebar" : ""
                }`}
              >
                <TransitionGroup>
                  <CSSTransition
                    key={location.key}
                    timeout={300}
                    classNames="page-transition"
                    unmountOnExit
                  >
                    <div>
                      <Outlet />
                    </div>
                  </CSSTransition>
                </TransitionGroup>
              </div>

              {/* Show footer and theme customizer only for admin/employee */}
              {isAdminOrEmployee && (
                <>
                  <Footer />
                  <ThemeCustomize />
                </>
              )}
            </>
          )}
        </div>

        {/* Warning overlay - shows countdown */}
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
              <p>Move your mouse or click anywhere to stay logged in.</p>
              <button
                className="btn btn-primary"
                onClick={resetInactivityTimer}
                style={{ marginTop: "15px" }}
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

export default App;
