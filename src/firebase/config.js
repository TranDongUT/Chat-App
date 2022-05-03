import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getFirestore } from "firebase/firestore";

// Configure Firebase.
const firebaseConfig = {
  apiKey: "AIzaSyA9JcLGBMYrXf-y209ZhbKPFITb36TKU4k",
  authDomain: "trandongut.github.io",
  projectId: "chat-app-21d8f",
  storageBucket: "chat-app-21d8f.appspot.com",
  messagingSenderId: "691669657019",
  appId: "1:691669657019:web:3cfd5b086e8820e842109e",
  measurementId: "G-S10SNWB8Y1",
};
//firebase.initializeApp(firebaseConfig);

const app = firebase.initializeApp(firebaseConfig);

// Configure FirebaseUI.
const uiConfig = {
  signInFlow: "popup",
  signInSuccessUrl: "/",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
};

const auth = firebase.auth();
const db = getFirestore(app);

export { auth, db, uiConfig };
