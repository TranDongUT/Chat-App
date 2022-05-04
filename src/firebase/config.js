import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getFirestore } from "firebase/firestore";

// Configure Firebase.
const firebaseConfig = {
//////set up your firebase config hear
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
