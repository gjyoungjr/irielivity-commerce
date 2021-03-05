import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "@firebase/storage";
import "firebase/analytics";
import { firebaseConfig } from "./config";

// intialize firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const emailProvider = firebase.auth.EmailAuthProvider;
export const storage = firebase.storage();
