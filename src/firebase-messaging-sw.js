/*importScripts("https://www.gstatic.com/firebasejs/9.15.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.15.0/firebase-messaging-compat.js");

const firebaseConfig = {
    apiKey: "AIzaSyDw5x74A-5a15CS2eVm1D3cgUAbldoklOg",
    authDomain: "highscoreio.firebaseapp.com",
    projectId: "highscoreio",
    storageBucket: "highscoreio.appspot.com",
    messagingSenderId: "117107557485",
    appId: "1:117107557485:web:13019bbac818470c5d6b64",
    measurementId: "G-HCVFP0MHCH"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
messaging.onBackgroundMessage(function(payload) {
    console.log("Received background message ", payload);
 
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
    };
 
    self.registration.showNotification(notificationTitle, notificationOptions);
  }); */