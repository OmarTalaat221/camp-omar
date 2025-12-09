// src/firebase/firebase.js
import { initializeApp } from "firebase/app";
import {
  getMessaging,
  getToken,
  onMessage,
  deleteToken,
} from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDF7YfaAcDhOeQuXxZHrCaOILr1_zgBJjU",
  authDomain: "camp-for-english-4475e.firebaseapp.com",
  projectId: "camp-for-english-4475e",
  storageBucket: "camp-for-english-4475e.firebasestorage.app",
  messagingSenderId: "780607917855",
  appId: "1:780607917855:web:1ed16abec4c47cffccaa2a",
  measurementId: "G-MP890MTH7L",
};

export const VAPID_KEY =
  "BJGzq736xltJ6e__AI4q7_2Q9gyBbasQtE8QlIZfB-wXo-XWZlq66nMsX9ybNyEDcdQlMTh05ugJSGZMauHWzQA";

// Initialize Firebase
let app = null;
let messaging = null;

// Check if browser supports notifications
export const isMessagingSupported = () => {
  return (
    typeof window !== "undefined" &&
    "Notification" in window &&
    "serviceWorker" in navigator &&
    "PushManager" in window &&
    "indexedDB" in window
  );
};

// Check if IndexedDB is available and working
export const checkIndexedDB = () => {
  return new Promise((resolve) => {
    try {
      const request = indexedDB.open("test-db", 1);

      request.onerror = () => {
        console.log("❌ IndexedDB not available");
        resolve(false);
      };

      request.onsuccess = () => {
        request.result.close();
        indexedDB.deleteDatabase("test-db");
        console.log("✅ IndexedDB is available");
        resolve(true);
      };
    } catch (e) {
      console.log("❌ IndexedDB error:", e);
      resolve(false);
    }
  });
};

// Initialize Firebase lazily
export const initializeFirebase = async () => {
  if (app) return { app, messaging };

  try {
    app = initializeApp(firebaseConfig);

    if (isMessagingSupported()) {
      const isIDBAvailable = await checkIndexedDB();
      if (isIDBAvailable) {
        messaging = getMessaging(app);
        console.log("✅ Firebase Messaging initialized");
      } else {
        console.log("⚠️ IndexedDB not available, messaging disabled");
      }
    }

    return { app, messaging };
  } catch (error) {
    console.error("❌ Firebase initialization error:", error);
    return { app: null, messaging: null };
  }
};

// Get messaging instance
export const getMessagingInstance = () => messaging;

export { app, messaging, getToken, onMessage, deleteToken };
