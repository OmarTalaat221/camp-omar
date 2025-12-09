// public/firebase-messaging-sw.js
/* eslint-disable no-undef */

importScripts(
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyDF7YfaAcDhOeQuXxZHrCaOILr1_zgBJjU",
  authDomain: "camp-for-english-4475e.firebaseapp.com",
  projectId: "camp-for-english-4475e",
  storageBucket: "camp-for-english-4475e.firebasestorage.app",
  messagingSenderId: "780607917855",
  appId: "1:780607917855:web:1ed16abec4c47cffccaa2a",
  measurementId: "G-MP890MTH7L",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let messaging;
try {
  messaging = firebase.messaging();
} catch (e) {
  console.log("[SW] Messaging init error:", e);
}

// Handle background messages
if (messaging) {
  messaging.onBackgroundMessage((payload) => {
    console.log("[SW] Background message:", payload);

    const title =
      payload.notification?.title || payload.data?.title || "New Notification";
    const body = payload.notification?.body || payload.data?.body || "";
    const image = payload.notification?.image || payload.data?.image;

    // Use camp_logo.jpg from public folder
    const icon = "/camp_logo.png";
    const badge = "/camp_logo.png";

    const options = {
      body: body,
      icon: icon,
      badge: badge,
      image: image,
      data: payload.data || {},
      tag: `notification-${Date.now()}`,
      requireInteraction: true,
      vibrate: [200, 100, 200, 100, 200],
      actions: [
        { action: "open", title: "🔓 Open" },
        { action: "close", title: "❌ Dismiss" },
      ],
      silent: false,
    };

    // Show native notification
    self.registration.showNotification(title, options);

    // Send message to ALL open windows/tabs to show toast with sound
    self.clients
      .matchAll({
        type: "window",
        includeUncontrolled: true,
      })
      .then((clients) => {
        clients.forEach((client) => {
          client.postMessage({
            type: "BACKGROUND_NOTIFICATION",
            title: title,
            body: body,
            image: image,
            icon: icon,
            data: payload.data || {},
          });
        });
      });
  });
}

// Notification click
self.addEventListener("notificationclick", (event) => {
  console.log("[SW] Notification clicked");
  event.notification.close();

  if (event.action === "close") return;

  const data = event.notification.data || {};
  const url = data.url || data.route || "/";

  event.waitUntil(
    self.clients
      .matchAll({
        type: "window",
        includeUncontrolled: true,
      })
      .then((clientList) => {
        // Try to focus existing window
        for (const client of clientList) {
          if (client.url.includes(self.location.origin) && "focus" in client) {
            client.postMessage({
              type: "NOTIFICATION_CLICKED",
              data: data,
            });
            return client.focus();
          }
        }
        // Open new window if none exists
        if (self.clients.openWindow) {
          return self.clients.openWindow(url);
        }
      })
  );
});

// Notification close
self.addEventListener("notificationclose", (event) => {
  console.log("[SW] Notification closed");
});

// Install
self.addEventListener("install", (event) => {
  console.log("[SW] Installing...");
  event.waitUntil(self.skipWaiting());
});

// Activate
self.addEventListener("activate", (event) => {
  console.log("[SW] Activating...");
  event.waitUntil(
    Promise.resolve()
      .then(() => self.clients.claim())
      .then(() => console.log("[SW] Active"))
      .catch((e) => console.log("[SW] Error:", e))
  );
});

// Messages from main app
self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
