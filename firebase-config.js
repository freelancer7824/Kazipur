 // Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCP6zCBnpY2IgIEPAtiAzuF6_83F4vU-xs",
  authDomain: "vip-news-aa9d1.firebaseapp.com",
  projectId: "vip-news-aa9d1",
  storageBucket: "vip-news-aa9d1.firebasestorage.app",
  messagingSenderId: "105863450293",
  appId: "1:105863450293:web:27d4c874ec3fef0184f8fc",
  measurementId: "G-TDRFDHC7ER"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage()