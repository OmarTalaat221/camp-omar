// src/firebase/fcmService.js
import { getToken, onMessage, deleteToken } from "firebase/messaging";
import { messaging, VAPID_KEY } from "./firebase";

class FCMService {
  constructor() {
    this.token = null;
    this.onMessageCallback = null;
  }

  // Request notification permission and get FCM token
  async requestPermissionAndGetToken() {
    try {
      // Check if notifications are supported
      if (!("Notification" in window)) {
        console.warn("This browser does not support notifications");
        return null;
      }

      // Request permission
      const permission = await Notification.requestPermission();

      if (permission !== "granted") {
        console.warn("Notification permission denied");
        return null;
      }

      // Register service worker
      const registration = await this.registerServiceWorker();

      if (!registration) {
        console.error("Service worker registration failed");
        return null;
      }

      // Get FCM token
      const token = await getToken(messaging, {
        vapidKey: VAPID_KEY,
        serviceWorkerRegistration: registration,
      });

      if (token) {
        this.token = token;
        console.log("FCM Token:", token);
        // Store token in localStorage
        localStorage.setItem("fcmToken", token);
        return token;
      }

      return null;
    } catch (error) {
      console.error("Error getting FCM token:", error);
      return null;
    }
  }

  // Register service worker
  async registerServiceWorker() {
    try {
      if ("serviceWorker" in navigator) {
        const registration = await navigator.serviceWorker.register(
          "/firebase-messaging-sw.js",
          { scope: "/" }
        );
        console.log("Service Worker registered:", registration);
        return registration;
      }
      return null;
    } catch (error) {
      console.error("Service Worker registration failed:", error);
      return null;
    }
  }

  // Listen for foreground messages
  onMessageListener(callback) {
    if (!messaging) return () => {};

    return onMessage(messaging, (payload) => {
      console.log("Foreground message received:", payload);
      if (callback) {
        callback(payload);
      }
    });
  }

  // Get stored token
  getStoredToken() {
    return localStorage.getItem("fcmToken");
  }

  // Delete token (for logout)
  async deleteToken() {
    try {
      if (messaging) {
        await deleteToken(messaging);
        localStorage.removeItem("fcmToken");
        this.token = null;
        console.log("FCM token deleted");
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error deleting token:", error);
      return false;
    }
  }

  // Send token to backend
  async sendTokenToServer(token, userId) {
    try {
      const response = await fetch("/api/save-fcm-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({
          fcmToken: token,
          userId: userId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save FCM token");
      }

      console.log("FCM token saved to server");
      return true;
    } catch (error) {
      console.error("Error saving FCM token:", error);
      return false;
    }
  }
}

export const fcmService = new FCMService();
export default fcmService;
