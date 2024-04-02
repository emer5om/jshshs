import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/messaging';
require("firebase/auth");
require("firebase/firestore");


const FirebaseData = () => {
// api calls

  let firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APPPID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENTID,
    };



// eslint-disable-next-line
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const googleProvider = new firebase.auth.GoogleAuthProvider();

const messaging = firebase.messaging(); // Add this line


// const facebookprovider = new firebase.auth.FacebookAuthProvider();

return { auth, googleProvider, firebase, messaging };

}

export default FirebaseData;
