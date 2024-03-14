// firebase.js
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/messaging";
require("firebase/auth");
require("firebase/firestore");

import { useSelector } from "react-redux";
import { store } from "../store/store";
import { get_settings } from "@/interceptor/routes"

const fetchFirebaseConfigFromBackend = async () => {
  try {
    const response = await get_settings();
    // const config = await response.json();
    return config;
  } catch (error) {
    console.error("Error fetching Firebase config from backend:", error);
    throw error;
  }
};

const FirebaseData = async () => {
  // api calls
  const state = store.getState();
  // const data = await fetchFirebaseConfigFromBackend();
  // console.log(await data);

  let firebaseConfig = {
    apiKey: "AIzaSyCAxOWBbXYuMNKAHoYtqWmwhbf7-NeQmT0",
    authDomain: "eshop-2210d.firebaseapp.com",
    projectId: "eshop-2210d",
    storageBucket: "eshop-2210d.appspot.com",
    messagingSenderId: "G-1JN518T7J6",
    appId: "1:365058967814:web:e205a52dc3abd1719a7687",
    measurementId: "G-1JN518T7J6",
  };
  //   let firebaseConfig = {
  //     apiKey: data.firebase_settings[0].apiKey,
  //     authDomain: data.firebase_settings[0].authDomain,
  //     projectId: data.firebase_settings[0].projectId,
  //     storageBucket: data.firebase_settings[0].storageBucket,
  //     messagingSenderId: data.firebase_settings[0].messagingSenderId,
  //     appId: data.firebase_settings[0].appId,
  //     measurementId: data.firebase_settings[0].measurementId,
  //   };

  // eslint-disable-next-line
  firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();

  const googleProvider = new firebase.auth.GoogleAuthProvider();

  const messaging = firebase.messaging(); // Add this line

  const facebookprovider = new firebase.auth.FacebookAuthProvider();

  return { auth, googleProvider, facebookprovider, firebase, messaging };
};

export default FirebaseData;
