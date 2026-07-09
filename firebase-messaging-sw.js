// ============================================================
//  VetReady — Firebase Cloud Messaging Service Worker
//  File: firebase-messaging-sw.js
//  Deploy this file to the ROOT of your web server
//  (same directory as app.html / index.html)
//  so the URL https://getvetready.app/firebase-messaging-sw.js
//  resolves correctly.
// ============================================================

importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey:            "AIzaSyCyCRXWr8glMFHgpShyHRqn9tr9jhKJx0o",
  authDomain:        "vetready-7074c.firebaseapp.com",
  projectId:         "vetready-7074c",
  storageBucket:     "vetready-7074c.firebasestorage.app",
  messagingSenderId: "400838123990",
  appId:             "1:400838123990:web:469e2a1365ac0017d84477",
});

const messaging = firebase.messaging();

// Handle background push notifications (when the app tab is closed or in background)
messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || '🐾 New Triage Request';
  const body  = payload.notification?.body  || 'A pet owner needs attention.';

  self.registration.showNotification(title, {
    body,
    icon:  '/icons/icon-192.png',
    badge: '/icons/icon-72.png',
    data:  { url: 'https://getvetready.app/app.html?mode=vet' },
  });
});

// Open the vet portal when the notification is clicked
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification.data?.url || 'https://getvetready.app/app.html?mode=vet';
  event.waitUntil(clients.openWindow(url));
});
