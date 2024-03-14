// firebase.js
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/messaging';
require("firebase/auth");
require("firebase/firestore");

import { useSelector } from "react-redux";
import { store } from "../store/store";

const FirebaseData = () => {
  // api calls
  const state = store.getState();
  const data = state.settings.value;
  console.log(data)

  let firebaseConfig = {
    apiKey: data.firebase_settings[0].apiKey,
    authDomain: data.firebase_settings[0].authDomain,
    projectId: data.firebase_settings[0].projectId,
    storageBucket: data.firebase_settings[0].storageBucket,
    messagingSenderId: data.firebase_settings[0].messagingSenderId,
    appId: data.firebase_settings[0].appId,
    measurementId: data.firebase_settings[0].measurementId,
  };

  // eslint-disable-next-line
  firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();

  const googleProvider = new firebase.auth.GoogleAuthProvider();

  const messaging = firebase.messaging(); // Add this line

  const facebookprovider = new firebase.auth.FacebookAuthProvider();

  return { auth, googleProvider, facebookprovider, firebase, messaging };
};

export default FirebaseData;
