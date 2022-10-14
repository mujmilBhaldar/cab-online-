const firebase = require("firebase/compat/app");
require("firebase/auth");
const { initializeApp } = require("firebase-admin/app");
const firebaseConfig = {
  apiKey: "AIzaSyBjrfqyVrWspB5_n0E78POw03cjezOUGKU",
  authDomain: "otp-app-demo-e55fe.firebaseapp.com",
  projectId: "otp-app-demo-e55fe",
  storageBucket: "otp-app-demo-e55fe.appspot.com",
  messagingSenderId: "565096011456",
  appId: "1:565096011456:web:277d5f1cca9be134193f25",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
module.exports = firebase;
