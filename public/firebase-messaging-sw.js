importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCOtML6mEnFXtBhZcSgFJ6EWoPMnhz9ONA",
  authDomain: "auctiongems-aa8d5.firebaseapp.com",
  projectId: "auctiongems-aa8d5",
  storageBucket: "auctiongems-aa8d5.appspot.com",
  messagingSenderId: "81772822293",
  appId: "1:81772822293:web:de5845573aace7c26ab31c",
  measurementId: "G-9LWX6VB9X1"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Listen for background messages
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message', payload);
  
  const notificationTitle = payload.notification?.title || 'Default title';
  const notificationOptions = {
    body: payload.notification?.body || 'Default body',
    icon: payload.notification?.icon || '/firebase-logo.png',
    image: payload.data?.auctionImage || '/firebase-logo.png', 
    data: {
      url: payload.data?.productUrl || '' 
    }
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close(); 

  // Open the product URL in a new tab
  event.waitUntil(
    clients.openWindow(event.notification.data.url) // Use the stored product URL
  );
});
