importScripts('https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.15.0/firebase-messaging.js');
firebase.initializeApp({
    apiKey: "AIzaSyDw5x74A-5a15CS2eVm1D3cgUAbldoklOg",
    authDomain: "highscoreio.firebaseapp.com",
    projectId: "highscoreio",
    storageBucket: "highscoreio.appspot.com",
    messagingSenderId: "117107557485",
    appId: "1:117107557485:web:13019bbac818470c5d6b64",
    measurementId: "G-HCVFP0MHCH"
});
const messaging = firebase.messaging();