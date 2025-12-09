// src/context/NotificationContext.jsx
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { createPortal } from "react-dom";
import axios from "axios";
import {
  getToken,
  onMessage,
  deleteToken,
  VAPID_KEY,
  isMessagingSupported,
  initializeFirebase,
  checkIndexedDB,
} from "../firebase/firebase";
import { BASE_URL } from "../Api/baseUrl";
import "./NotificationStyles.css";

// Create context
const NotificationContext = createContext(null);

// ============================================
// NOTIFICATION SOUND MANAGER
// ============================================
class NotificationSoundManager {
  constructor() {
    this.audio = null;
    this.isInitialized = false;
  }

  initialize() {
    if (this.isInitialized) return;

    try {
      this.audio = new Audio("/notification.mp3");
      this.audio.preload = "auto";
      this.audio.volume = 0.7;
      this.isInitialized = true;
      console.log("🔊 Notification sound initialized");
    } catch (error) {
      console.error("❌ Failed to initialize notification sound:", error);
    }
  }

  async play() {
    try {
      if (!this.audio) {
        this.initialize();
      }

      if (this.audio) {
        this.audio.currentTime = 0;
        await this.audio.play();
        console.log("🔊 Notification sound played");
        return true;
      }
      return false;
    } catch (error) {
      if (error.name === "NotAllowedError") {
        console.log("⚠️ Sound autoplay blocked by browser");
      } else {
        console.error("❌ Failed to play notification sound:", error);
      }
      return false;
    }
  }

  setVolume(volume) {
    if (this.audio) {
      this.audio.volume = Math.max(0, Math.min(1, volume));
    }
  }

  mute() {
    if (this.audio) {
      this.audio.muted = true;
    }
  }

  unmute() {
    if (this.audio) {
      this.audio.muted = false;
    }
  }
}

// Create singleton instance
const soundManager = new NotificationSoundManager();

// ============================================
// TOAST COMPONENT
// ============================================
const Toast = ({ toast, onClose }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (toast.duration && toast.duration !== Infinity) {
      const startTime = Date.now();
      const duration = toast.duration;

      const updateProgress = () => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
        setProgress(remaining);

        if (remaining > 0) {
          requestAnimationFrame(updateProgress);
        }
      };

      requestAnimationFrame(updateProgress);

      const timer = setTimeout(() => {
        handleClose();
      }, toast.duration);

      return () => clearTimeout(timer);
    }
  }, [toast.duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => onClose(toast.id), 300);
  };

  const getIcon = () => {
    switch (toast.type) {
      case "success":
        return "✓";
      case "error":
        return "✕";
      case "warning":
        return "⚠";
      case "notification":
        return "🔔";
      case "info":
      default:
        return "ℹ";
    }
  };

  const getTypeClass = () => {
    if (toast.type === "notification") return "toast-notification";
    return `toast-${toast.type}`;
  };

  return (
    <div
      className={`notification-toast ${getTypeClass()} ${
        isExiting ? "toast-exit" : "toast-enter"
      }`}
      onClick={toast.onClick}
    >
      {/* Content */}
      <div className="toast-content">
        {toast.title && <div className="toast-title">{toast.title}</div>}
        <div className="toast-message">{toast.message}</div>
        {toast.timestamp && (
          <div className="toast-timestamp">
            {new Date(toast.timestamp).toLocaleTimeString()}
          </div>
        )}
      </div>

      {/* Image */}
      {toast.image && <img src={toast.image} alt="" className="toast-image" />}

      {/* Close Button */}
      <button
        className="toast-close-btn"
        onClick={(e) => {
          e.stopPropagation();
          handleClose();
        }}
      >
        ×
      </button>

      {/* Progress Bar */}
      {toast.duration && toast.duration !== Infinity && (
        <div className="toast-progress-bar" style={{ width: `${progress}%` }} />
      )}
    </div>
  );
};

// ============================================
// TOAST CONTAINER
// ============================================
const ToastContainer = ({ toasts, removeToast }) => {
  if (typeof document === "undefined") return null;

  return createPortal(
    <div className="notification-toast-container">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onClose={removeToast} />
      ))}
    </div>,
    document.body
  );
};

// ============================================
// CLEAR FIREBASE STORAGE
// ============================================
const clearFirebaseStorage = async () => {
  try {
    const databases = [
      "firebase-messaging-database",
      "firebase-installations-database",
      "firebase-heartbeat-database",
      "firebaseLocalStorageDb",
    ];

    for (const dbName of databases) {
      try {
        await new Promise((resolve) => {
          const request = indexedDB.deleteDatabase(dbName);
          request.onsuccess = () => resolve();
          request.onerror = () => resolve();
          request.onblocked = () => resolve();
        });
      } catch (e) {
        console.log(`⚠️ Error deleting ${dbName}:`, e);
      }
    }

    return true;
  } catch (error) {
    console.error("❌ Error clearing Firebase storage:", error);
    return false;
  }
};

// ============================================
// PROVIDER COMPONENT
// ============================================
const NotificationProvider = ({ children }) => {
  const [fcmToken, setFcmToken] = useState(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [toasts, setToasts] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const toastIdRef = useRef(0);
  const unsubscribeRef = useRef(null);
  const retryCountRef = useRef(0);
  const messagingRef = useRef(null); // Use ref instead of state for messaging
  const maxRetries = 2;

  // Initialize sound manager on first user interaction
  useEffect(() => {
    const initSound = () => {
      soundManager.initialize();
      document.removeEventListener("click", initSound);
      document.removeEventListener("touchstart", initSound);
      document.removeEventListener("keydown", initSound);
    };

    document.addEventListener("click", initSound);
    document.addEventListener("touchstart", initSound);
    document.addEventListener("keydown", initSound);

    return () => {
      document.removeEventListener("click", initSound);
      document.removeEventListener("touchstart", initSound);
      document.removeEventListener("keydown", initSound);
    };
  }, []);

  // Check if messaging is supported
  useEffect(() => {
    const checkSupport = async () => {
      const supported = isMessagingSupported();
      if (supported) {
        const idbAvailable = await checkIndexedDB();
        setIsSupported(supported && idbAvailable);
      } else {
        setIsSupported(false);
      }
    };
    checkSupport();
  }, []);

  // Load sound preference from localStorage
  useEffect(() => {
    const savedPref = localStorage.getItem("notification_sound_enabled");
    if (savedPref !== null) {
      setIsSoundEnabled(JSON.parse(savedPref));
    }
  }, []);

  // ============================================
  // PLAY NOTIFICATION SOUND
  // ============================================
  const playSound = useCallback(() => {
    if (isSoundEnabled) {
      soundManager.play();
    }
  }, [isSoundEnabled]);

  // Toggle sound
  const toggleSound = useCallback(() => {
    setIsSoundEnabled((prev) => {
      const newValue = !prev;
      if (newValue) {
        soundManager.unmute();
      } else {
        soundManager.mute();
      }
      localStorage.setItem(
        "notification_sound_enabled",
        JSON.stringify(newValue)
      );
      return newValue;
    });
  }, []);

  // ============================================
  // ADD TOAST (Internal)
  // ============================================
  const addToast = useCallback((options) => {
    const id = toastIdRef.current++;
    const newToast = {
      id,
      type: "info",
      duration: 5000,
      timestamp: new Date(),
      ...options,
    };
    setToasts((prev) => [...prev, newToast]);
    return id;
  }, []);

  // Remove toast
  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Clear all toasts
  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);

  // ============================================
  // TOAST HELPER FUNCTIONS (without sound)
  // ============================================
  const success = useCallback(
    (title, message, options = {}) => {
      return addToast({ title, message, type: "success", ...options });
    },
    [addToast]
  );

  const error = useCallback(
    (title, message, options = {}) => {
      return addToast({
        title,
        message,
        type: "error",
        duration: 7000,
        ...options,
      });
    },
    [addToast]
  );

  const warning = useCallback(
    (title, message, options = {}) => {
      return addToast({ title, message, type: "warning", ...options });
    },
    [addToast]
  );

  const info = useCallback(
    (title, message, options = {}) => {
      return addToast({ title, message, type: "info", ...options });
    },
    [addToast]
  );

  // ============================================
  // NOTIFY - FCM NOTIFICATION WITH SOUND
  // ============================================
  const notify = useCallback(
    (title, message, options = {}) => {
      console.log("🔔 notify() called:", title, message);

      // Play notification sound
      playSound();

      // Add to notifications list for history
      const notification = {
        id: Date.now(),
        title,
        body: message,
        image: options.image,
        icon: options.icon || "/camp_logo.png",
        data: options.data || {},
        timestamp: new Date(),
        read: false,
      };
      setNotifications((prev) => [notification, ...prev]);

      // Show toast notification
      return addToast({
        title,
        message,
        type: "notification",
        duration: options.duration || 10000,
        timestamp: new Date(),
        image: options.image,
        icon: options.icon || "/camp_logo.png",
        onClick:
          options.onClick ||
          (() => {
            if (options.url) {
              window.location.href = options.url;
            } else if (options.route) {
              window.location.href = options.route;
            }
          }),
        ...options,
      });
    },
    [addToast, playSound]
  );

  // ============================================
  // SAVE FCM TOKEN TO BACKEND
  // ============================================
  const saveFcmTokenToServer = useCallback(async (token, adminId) => {
    if (!token || !adminId) {
      console.log("⚠️ Missing token or adminId");
      return false;
    }

    try {
      console.log("📤 Saving FCM token to server...");

      const response = await axios.post(
        BASE_URL + `/admin/permissions/save_fcm_token.php`,
        JSON.stringify({
          admin_id: adminId,
          fcm_token: token,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === "success") {
        console.log("✅ FCM token saved to server");
        return true;
      } else {
        console.log("⚠️ Server response:", response.data.message);
        return false;
      }
    } catch (error) {
      console.error("❌ Error saving FCM token:", error);
      return false;
    }
  }, []);

  // Get admin ID
  const getAdminId = useCallback(() => {
    try {
      const AdminData = JSON.parse(localStorage.getItem("AdminData"));
      if (AdminData && AdminData.length > 0) {
        return AdminData[0]?.id || AdminData[0]?.admin_id;
      }
      return null;
    } catch (e) {
      return null;
    }
  }, []);

  // ============================================
  // REGISTER SERVICE WORKER
  // ============================================
  const registerServiceWorker = useCallback(async () => {
    try {
      if (!("serviceWorker" in navigator)) {
        return null;
      }

      let registration = await navigator.serviceWorker.getRegistration("/");

      if (registration && registration.active) {
        return registration;
      }

      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const reg of registrations) {
        if (!reg.active) {
          await reg.unregister();
        }
      }

      registration = await navigator.serviceWorker.register(
        "/firebase-messaging-sw.js",
        { scope: "/" }
      );

      if (registration.installing || registration.waiting) {
        await new Promise((resolve) => {
          const sw = registration.installing || registration.waiting;
          if (!sw || sw.state === "activated") {
            resolve();
            return;
          }

          const handleStateChange = () => {
            if (sw.state === "activated") {
              sw.removeEventListener("statechange", handleStateChange);
              resolve();
            }
          };

          sw.addEventListener("statechange", handleStateChange);
          setTimeout(() => {
            sw.removeEventListener("statechange", handleStateChange);
            resolve();
          }, 10000);
        });
      }

      await navigator.serviceWorker.ready;
      return registration;
    } catch (error) {
      console.error("❌ Service Worker error:", error);
      return null;
    }
  }, []);

  // ============================================
  // GET FCM TOKEN
  // ============================================
  const getFCMToken = useCallback(
    async (retry = false, adminId = null) => {
      if (!isSupported) {
        return null;
      }

      if (isInitializing) {
        return null;
      }

      setIsInitializing(true);

      try {
        const { messaging: msgInstance } = await initializeFirebase();

        if (!msgInstance) {
          setIsInitializing(false);
          return null;
        }

        // Store messaging instance in ref
        messagingRef.current = msgInstance;

        if (Notification.permission === "denied") {
          setIsInitializing(false);
          return null;
        }

        if (Notification.permission !== "granted") {
          const permission = await Notification.requestPermission();
          if (permission !== "granted") {
            setIsInitializing(false);
            return null;
          }
        }

        const swRegistration = await registerServiceWorker();

        if (!swRegistration || !swRegistration.active) {
          setIsInitializing(false);
          return null;
        }

        const token = await getToken(msgInstance, {
          vapidKey: VAPID_KEY,
          serviceWorkerRegistration: swRegistration,
        });

        if (token) {
          const oldToken = localStorage.getItem("fcm_token");
          const tokenChanged = oldToken !== token;

          setFcmToken(token);
          setIsEnabled(true);
          localStorage.setItem("fcm_token", token);
          retryCountRef.current = 0;

          if (tokenChanged) {
            const currentAdminId = adminId || getAdminId();
            if (currentAdminId) {
              await saveFcmTokenToServer(token, currentAdminId);
            }
          }

          setIsInitializing(false);
          return token;
        }

        setIsInitializing(false);
        return null;
      } catch (error) {
        console.error("❌ FCM Token error:", error.code, error.message);

        if (error.message?.includes("storage") || error.code === 20) {
          if (retryCountRef.current < maxRetries && !retry) {
            retryCountRef.current++;
            await clearFirebaseStorage();
            const registrations =
              await navigator.serviceWorker.getRegistrations();
            for (const reg of registrations) {
              await reg.unregister();
            }
            setIsInitializing(false);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            return getFCMToken(true, adminId);
          }
        }

        setIsInitializing(false);
        return null;
      }
    },
    [
      isSupported,
      isInitializing,
      registerServiceWorker,
      getAdminId,
      saveFcmTokenToServer,
    ]
  );

  // ============================================
  // INITIALIZE NOTIFICATIONS - FIXED VERSION
  // ============================================
  const initializeNotifications = useCallback(
    async (userId) => {
      if (!isSupported) {
        console.log("⚠️ Notifications not supported");
        return null;
      }

      try {
        console.log("🔔 Initializing notifications...");

        // First, initialize Firebase and get messaging instance
        const { messaging: msgInstance } = await initializeFirebase();

        if (!msgInstance) {
          console.log("❌ Messaging not available");
          return null;
        }

        // Store in ref for later use
        messagingRef.current = msgInstance;

        // Get FCM token
        const token = await getFCMToken(false, userId);

        if (token) {
          // Unsubscribe from previous listener if exists
          if (unsubscribeRef.current) {
            console.log("🔄 Unsubscribing from previous listener");
            unsubscribeRef.current();
            unsubscribeRef.current = null;
          }

          // Set up foreground message listener using the messaging instance directly
          console.log("📨 Setting up foreground message listener...");

          unsubscribeRef.current = onMessage(msgInstance, (payload) => {
            console.log("📨 ====== FOREGROUND MESSAGE RECEIVED ======");
            console.log("📨 Payload:", payload);

            // Extract data from payload
            const title =
              payload.notification?.title ||
              payload.data?.title ||
              "New Notification";
            const body = payload.notification?.body || payload.data?.body || "";
            const image = payload.notification?.image || payload.data?.image;
            const data = payload.data || {};

            console.log("📨 Title:", title);
            console.log("📨 Body:", body);
            console.log("📨 Calling notify()...");

            // Use notify() to show toast with sound
            notify(title, body, {
              image,
              icon: "/camp_logo.png",
              data,
              url: data.url,
              route: data.route,
            });

            console.log("📨 ====== FOREGROUND MESSAGE HANDLED ======");
          });

          console.log("✅ Foreground listener is now active!");
          return token;
        }

        return null;
      } catch (error) {
        console.error("❌ Initialize error:", error);
        return null;
      }
    },
    [isSupported, getFCMToken, notify]
  );

  // Update FCM token on server
  const updateFcmTokenOnServer = useCallback(async () => {
    const adminId = getAdminId();
    const currentToken = fcmToken || localStorage.getItem("fcm_token");

    if (currentToken && adminId) {
      return await saveFcmTokenToServer(currentToken, adminId);
    }
    return false;
  }, [fcmToken, getAdminId, saveFcmTokenToServer]);

  // Cleanup
  const cleanup = useCallback(async () => {
    try {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }

      if (messagingRef.current && fcmToken) {
        try {
          await deleteToken(messagingRef.current);
        } catch (e) {
          console.log("⚠️ Token delete error:", e);
        }
      }

      setFcmToken(null);
      setIsEnabled(false);
      localStorage.removeItem("fcm_token");
    } catch (error) {
      console.error("❌ Cleanup error:", error);
    }
  }, [fcmToken]);

  // ============================================
  // LISTEN FOR BACKGROUND NOTIFICATIONS
  // ============================================
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    const handleMessage = (event) => {
      console.log("📨 Service Worker message received:", event.data);

      // Handle notification click from background
      if (event.data?.type === "NOTIFICATION_CLICKED") {
        console.log("🔔 Background notification clicked:", event.data);
        if (event.data.data?.url) {
          window.location.href = event.data.data.url;
        } else if (event.data.data?.route) {
          window.location.href = event.data.data.route;
        }
      }

      // Handle background notification - show toast with sound when app is open
      if (event.data?.type === "BACKGROUND_NOTIFICATION") {
        console.log("📨 Background notification - showing toast with sound");

        notify(event.data.title || "New Notification", event.data.body || "", {
          image: event.data.image,
          icon: "/camp_logo.png",
          data: event.data.data || {},
          url: event.data.data?.url,
          route: event.data.data?.route,
        });
      }
    };

    navigator.serviceWorker.addEventListener("message", handleMessage);

    return () => {
      navigator.serviceWorker.removeEventListener("message", handleMessage);
    };
  }, [notify]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, []);

  // ============================================
  // CONTEXT VALUE
  // ============================================
  const value = {
    // State
    fcmToken,
    isEnabled,
    isSupported,
    isInitializing,
    isSoundEnabled,
    notifications,
    unreadCount: notifications.filter((n) => !n.read).length,

    // FCM Functions
    getFCMToken,
    initializeNotifications,
    cleanup,
    saveFcmTokenToServer,
    updateFcmTokenOnServer,

    // Toast Functions (without sound)
    success,
    error,
    warning,
    info,

    // Notification Function (WITH SOUND)
    notify,

    // Sound Functions
    playSound,
    toggleSound,

    // Toast Management
    addToast,
    removeToast,
    clearToasts,

    // Notification Management
    markAsRead: (id) =>
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      ),
    markAllAsRead: () =>
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true }))),
    clearNotifications: () => setNotifications([]),
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within NotificationProvider");
  }
  return context;
};

export default NotificationProvider;
