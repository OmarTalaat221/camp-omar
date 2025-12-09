// src/components/ToastNotification/ToastNotification.jsx
import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import "./ToastNotification.css";

// Toast Item Component
const ToastItem = ({ toast, onClose }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (toast.duration !== Infinity) {
      const timer = setTimeout(() => {
        handleClose();
      }, toast.duration || 5000);

      return () => clearTimeout(timer);
    }
  }, [toast.duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose(toast.id);
    }, 300);
  };

  const getIcon = () => {
    switch (toast.type) {
      case "success":
        return "✓";
      case "error":
        return "✕";
      case "warning":
        return "⚠";
      case "info":
      default:
        return "ℹ";
    }
  };

  return (
    <div
      className={`toast-item toast-${toast.type} ${
        isExiting ? "toast-exit" : "toast-enter"
      }`}
      onClick={toast.onClick}
    >
      <div className="toast-icon">{toast.icon || getIcon()}</div>
      <div className="toast-content">
        {toast.title && <div className="toast-title">{toast.title}</div>}
        <div className="toast-message">{toast.message}</div>
      </div>
      {toast.image && <img src={toast.image} alt="" className="toast-image" />}
      <button
        className="toast-close"
        onClick={(e) => {
          e.stopPropagation();
          handleClose();
        }}
      >
        ×
      </button>
    </div>
  );
};

// Toast Container Component
const ToastContainer = ({ toasts, removeToast, position = "top-right" }) => {
  return createPortal(
    <div className={`toast-container toast-${position}`}>
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onClose={removeToast} />
      ))}
    </div>,
    document.body
  );
};

// Toast Manager Hook
let toastId = 0;
let addToastFn = null;

export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((options) => {
    const id = toastId++;
    const newToast = {
      id,
      type: "info",
      duration: 5000,
      ...options,
    };

    setToasts((prev) => [...prev, newToast]);
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const clearAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  // Expose addToast globally
  useEffect(() => {
    addToastFn = addToast;
  }, [addToast]);

  return {
    toasts,
    addToast,
    removeToast,
    clearAllToasts,
    ToastContainer: (props) => (
      <ToastContainer toasts={toasts} removeToast={removeToast} {...props} />
    ),
  };
};

// Global toast functions
export const toast = {
  success: (message, options = {}) => {
    if (addToastFn) {
      return addToastFn({ message, type: "success", ...options });
    }
  },
  error: (message, options = {}) => {
    if (addToastFn) {
      return addToastFn({ message, type: "error", ...options });
    }
  },
  warning: (message, options = {}) => {
    if (addToastFn) {
      return addToastFn({ message, type: "warning", ...options });
    }
  },
  info: (message, options = {}) => {
    if (addToastFn) {
      return addToastFn({ message, type: "info", ...options });
    }
  },
  notification: (payload, options = {}) => {
    if (addToastFn) {
      return addToastFn({
        title: payload.notification?.title || payload.title,
        message: payload.notification?.body || payload.body,
        image: payload.notification?.image,
        type: "info",
        duration: 8000,
        ...options,
      });
    }
  },
};

export default ToastContainer;
