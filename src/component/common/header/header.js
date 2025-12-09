// src/component/common/header/header.jsx
import React, {
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
} from "react";
import Bookmark from "./bookmark";
import man from "../../../assets/images/dashboard/user.png";
import {
  AlignCenter,
  FileText,
  Activity,
  User,
  Clipboard,
  Anchor,
  Settings,
  LogOut,
  ThumbsUp,
  MessageCircle,
  MessageSquare,
  Maximize,
  Search,
  MoreHorizontal,
  Bell,
} from "react-feather";
import { Row, Col, Form, FormGroup, Button } from "reactstrap";
import { MENUITEMS } from "../sidebar/menu";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";
import { useNotification } from "../../../context/NotificationContext";
// import { useNotification } from "../../../component/notifications/NotificationProvider";

const socket = io("https://camp-coding.tech", {
  path: "/campForEnglishChat/socket.io",
});

const Header = (props) => {
  const history = useNavigate();
  const navigate = useNavigate();
  const [profile, setProfile] = useState("");
  const [name, setName] = useState("");
  const [mainmenu, setMainMenu] = useState(MENUITEMS);
  const [searchValue, setsearchValue] = useState("");
  const [navmenu, setNavmenu] = useState(false);
  const [searchinput, setSearchinput] = useState(false);
  const [spinner, setspinner] = useState(false);
  const [searchResult, setSearchResult] = useState(false);
  const [searchResultEmpty, setSearchResultEmpty] = useState(false);
  const [sidebar, setSidebar] = useState("iconsidebar-menu");
  const [rightSidebar, setRightSidebar] = useState(true);
  const width = useWindowSize();

  // Get notification context
  const notification = useNotification();

  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      setsearchValue("");
    }
  }, []);

  function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize(window.innerWidth);
      }
      window.addEventListener("resize", updateSize);
      updateSize();
      return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
  }

  useEffect(() => {
    if (width <= 991) {
      setSidebar("iconbar-second-close");
      document
        .querySelector(".iconsidebar-menu")
        ?.classList.add("iconbar-second-close");
    } else {
      setSidebar("iconsidebar-menu");
      document
        .querySelector(".iconsidebar-menu")
        ?.classList.remove("iconbar-second-close");
    }

    setProfile(man);
    setName(localStorage.getItem("Name"));
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [escFunction, width]);

  // Logout function with FCM cleanup
  const logOuts = async () => {
    try {
      // Cleanup FCM token
      if (notification?.cleanup) {
        await notification.cleanup();
        console.log("✅ FCM token cleaned up on logout");
      }
    } catch (error) {
      console.error("Error cleaning up FCM:", error);
    } finally {
      // Clear local storage
      localStorage.removeItem("AdminData");
      localStorage.removeItem("token");
      localStorage.removeItem("fcm_token");

      // Reload page
      window.location.reload();
      window.location.href = "/";
    }
  };

  const handleSearchKeyword = (keyword) => {
    keyword ? addFix() : removeFix();
    const items = [];
    if (keyword.length > 0) {
      setsearchValue(keyword);
      setspinner(true);
      setTimeout(function () {
        setspinner(false);
      }, 1000);
    } else {
      setspinner(false);
    }
    mainmenu.filter((menuItems) => {
      if (
        menuItems.title.toLowerCase().includes(keyword) &&
        menuItems.type === "link"
      ) {
        items.push(menuItems);
      }
      if (!menuItems.children) return false;
      menuItems.children.filter((subItems) => {
        if (
          subItems.title.toLowerCase().includes(keyword) &&
          subItems.type === "link"
        ) {
          subItems.icon = menuItems.icon;
          items.push(subItems);
        }
        if (!subItems.children) return false;
        subItems.children.filter((suSubItems) => {
          if (suSubItems.title.toLowerCase().includes(keyword)) {
            suSubItems.icon = menuItems.icon;
            items.push(suSubItems);
          }
          return suSubItems;
        });
        return subItems;
      });
      checkSearchResultEmpty(items);
      setsearchValue(items);
      return menuItems;
    });
  };

  const addFix = () => {
    setSearchResult(true);
    document.querySelector(".Typeahead-menu")?.classList.add("is-open");
    document.body.classList.add("offcanvas");
  };

  const removeFix = () => {
    setSearchResult(false);
    setsearchValue("");
    document.querySelector(".Typeahead-menu")?.classList.remove("is-open");
    document.body.classList.remove("offcanvas");
  };

  const checkSearchResultEmpty = (items) => {
    if (!items.length) {
      setSearchResultEmpty(true);
      document.querySelector(".empty-menu")?.classList.add("is-open");
    } else {
      setSearchResultEmpty(false);
      document.querySelector(".empty-menu")?.classList.remove("is-open");
    }
  };

  const openCloseSidebar = (sidebartoggle) => {
    var isOpen = false;

    const mainMenuUl = [
      ...(document.querySelector(".iconMenu-bar")?.children || []),
    ];

    mainMenuUl.map((item) => {
      if (item.classList.value.includes("open")) {
        isOpen = true;
      }
      return item;
    });

    if (sidebartoggle === "iconsidebar-menu") {
      setSidebar("iconbar-second-close");
      document
        .querySelector(".iconsidebar-menu")
        ?.classList.remove("iconbar-mainmenu-close");
      document
        .querySelector(".iconsidebar-menu")
        ?.classList.add("iconbar-second-close");
    } else if (isOpen && sidebartoggle === "iconbar-second-close") {
      setSidebar("iconsidebar-menu");
      document
        .querySelector(".iconsidebar-menu")
        ?.classList.remove("iconbar-second-close");
    } else if (!isOpen && sidebartoggle === "iconbar-second-close") {
      setSidebar("iconsidebar-menu");
      document
        .querySelector(".iconsidebar-menu")
        ?.classList.add("iconbar-mainmenu-close");
      document
        .querySelector(".iconsidebar-menu")
        ?.classList.remove("iconbar-second-close");
    }
  };

  const showRightSidebar = () => {
    if (rightSidebar) {
      setRightSidebar(!rightSidebar);
      document.querySelector(".right-sidebar")?.classList.add("show");
    } else {
      setRightSidebar(!rightSidebar);
      document.querySelector(".right-sidebar")?.classList.remove("show");
    }
  };

  const goFull = () => {
    if (
      (document.fullScreenElement && document.fullScreenElement !== null) ||
      (!document.mozFullScreen && !document.webkitIsFullScreen)
    ) {
      if (document.documentElement.requestFullScreen) {
        document.documentElement.requestFullScreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  };

  const Navmenuhideandshow = () => {
    if (navmenu) {
      setNavmenu(!navmenu);
      document.querySelector(".nav-menus")?.classList.add("open");
    } else {
      setNavmenu(!navmenu);
      document.querySelector(".nav-menus")?.classList.remove("open");
    }
  };

  const openCloseSearch = () => {
    if (searchinput) {
      setSearchinput(!searchinput);
      document.querySelector(".Typeahead-input")?.classList.add("open");
    } else {
      setSearchinput(!searchinput);
      document.querySelector(".Typeahead-input")?.classList.remove("open");
      document.querySelector(".Typeahead-menu")?.classList.remove("is-open");
    }
  };

  const [UnreadesMassegesCount, setUnreadesMassegesCount] = useState(null);
  const AdminData = JSON.parse(localStorage.getItem("AdminData"));
  const adminId = AdminData?.[0]?.admin_id;

  useEffect(() => {
    if (!adminId) return;

    const fetchUnseenMessages = async () => {
      try {
        const response = await axios.get(
          `https://camp-coding.tech/campForEnglishChat/messages/unseen/${adminId}/admin`
        );
        setUnreadesMassegesCount(response.data.total_count);
      } catch (error) {
        console.error("Failed to fetch unseen messages:", error);
      }
    };

    fetchUnseenMessages();

    socket.on("newUnseenMessage", ({ groupId, chatId }) => {
      console.log("New unseen message in group:", groupId, "chat:", chatId);
      fetchUnseenMessages();
    });

    socket.on(
      "unseenMessagesCount",
      ({ recipientId, recipientRole, totalCount, details }) => {
        if (recipientId === adminId && recipientRole === AdminData?.[0]?.type) {
          setUnreadesMassegesCount(totalCount);
        }
      }
    );

    return () => {
      socket.off("newUnseenMessage");
      socket.off("unseenMessagesCount");
    };
  }, [adminId]);

  return (
    <div className="page-main-header">
      <div className="main-header-right">
        <div className="main-header-left text-center">
          <div className="logo-wrapper" style={{ backgroundColor: "" }}>
            <Link to={`${process.env.PUBLIC_URL}/students/list`}>
              <img
                style={{ height: "65px", objectFit: "contain" }}
                src="https://res.cloudinary.com/dbz6ebekj/image/upload/v1734261758/logo_png_2_1_1_rx2qjj.png"
                alt=""
              />
            </Link>
          </div>
        </div>
        <div className="mobile-sidebar">
          <div className="media-body text-end switch-sm">
            <label className="switch ms-3">
              <AlignCenter
                className="font-primary"
                onClick={() => openCloseSidebar(sidebar)}
              />
            </label>
          </div>
        </div>
        <div className="nav-right col pull-right right-menu">
          <ul className="nav-menus">
            {/* Push Notifications Indicator */}


            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              Unread
              <i
                className="fa fa-bell fa-2x"
                aria-hidden="true"
                style={{ 
                  color: "orangered",
                  cursor: "pointer",
                  position: "relative",
                }}
                onClick={() =>
                  navigate(`${process.env.PUBLIC_URL}/unReadMasseges`)
                }
              >
                <span
                  style={{
                    position: "absolute",
                    top: "-10px",
                    left: "10px",
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    backgroundColor: "#053D3C",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <p style={{ margin: "0px", padding: "0px", color: "white" }}>
                    {UnreadesMassegesCount}
                  </p>
                </span>
              </i>
              Messages
            </div>

            <li></li>
            <li className="onhover-dropdown">
              {" "}
              <span className="media user-header">
                <img
                  className={profile === man ? "img-fluid" : "otheruser"}
                  src={profile}
                  alt=""
                />
              </span>
              <ul className="onhover-show-div profile-dropdown">
                <li className="gradient-primary">
                  <h5 className="f-w-600 mb-0">{AdminData?.[0]?.name}</h5>
                  <span>{AdminData?.[0]?.type}</span>
                </li>
                <li onClick={logOuts} style={{ cursor: "pointer" }}>
                  <LogOut />
                  Logout
                </li>
              </ul>
            </li>
          </ul>
          <div
            className="d-lg-none mobile-toggle pull-right"
            onClick={Navmenuhideandshow}
          >
            <MoreHorizontal />
          </div>
        </div>
        <script id="result-template" type="text/x-handlebars-template">
          <div className="ProfileCard u-cf">
            <div className="ProfileCard-avatar">
              <i className="pe-7s-home"></i>
            </div>
            <div className="ProfileCard-details">
              <div className="ProfileCard-realName"></div>
            </div>
          </div>
        </script>
        <script id="empty-template" type="text/x-handlebars-template">
          <div className="EmptyMessage">
            Your search turned up 0 results. This most likely means the backend
            is down, yikes!
          </div>
        </script>
      </div>
    </div>
  );
};

export default Header;
