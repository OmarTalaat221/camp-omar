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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import ConfigDB from "./data/customizer/config";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Login from "./camp-app/camp-pages/Login/Login";
import "./app.css";

const App = () => {
  const animation =
    localStorage.getItem("animation") ||
    ConfigDB.data.router_animation ||
    "fade";
  const location = useLocation();
  const navigate = useNavigate();

  const INACTIVITY_TIMEOUT = 60 * 60 * 1000;

  const timeoutRef = useRef(null);
  const warningTimeoutRef = useRef(null);
  const [isWarningActive, setIsWarningActive] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const AdminData = JSON.parse(localStorage.getItem("AdminData"));

  // Check if user is admin or employee
  const isAdminOrEmployee =
    AdminData &&
    AdminData.length > 0 &&
    (AdminData[0]?.type === "super_admin" ||
      AdminData[0]?.type === "employee" ||
      AdminData[0]?.type === "instructor" ||
      AdminData[0]?.type === "superVisor");

  // Logout function
  const handleLogout = useCallback(() => {
    localStorage.removeItem("AdminData");
    localStorage.removeItem("token");

    // Force page reload to reset all state
    window.location.reload();
  }, []);

  // Warning function - makes screen darker
  const showInactivityWarning = useCallback(() => {
    setIsWarningActive(true);
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

    // Reset warning state
    setIsWarningActive(false);

    // Only set timer if user is logged in
    if (isAdminOrEmployee) {
      // Set warning timer (30 seconds before logout)
      warningTimeoutRef.current = setTimeout(() => {
        showInactivityWarning();
      }, INACTIVITY_TIMEOUT - 30000); // 30 seconds before actual logout

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
    };
  }, []);

  console.log(AdminData);

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

        {/* Warning overlay - shows when 30 seconds remaining */}
        {isWarningActive && (
          <div className="inactivity-warning-overlay">
            <div className="warning-content">
              <h3>Session Warning</h3>
              <p>You will be logged out in 30 seconds due to inactivity.</p>
              <p>Move your mouse or click anywhere to stay logged in.</p>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </Fragment>
  );
};

export default App;
