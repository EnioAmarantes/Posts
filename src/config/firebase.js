import firebase from "firebase";

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBSw9vEEFBhuEeFwtMYMh6xRExXJA2FT1s",
    authDomain: "posts-b594b.firebaseapp.com",
    projectId: "posts-b594b",
    storageBucket: "posts-b594b.appspot.com",
    messagingSenderId: "639507835208",
    appId: "1:639507835208:web:e6ee7af5a960026426ab7d",
    measurementId: "G-YK5262PV9B"
  };
  // Initialize Firebase
  export default firebase.initializeApp(firebaseConfig);
  //firebase.analytics();
