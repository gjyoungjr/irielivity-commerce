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

export const updateUserEmail = async (userAuth) => {
  // if no user not found in db
  // return
  if (!userAuth) return;

  // destrucutre uid from user auth
  const { uid, email } = userAuth;

  // create a ref to user document
  const userRef = firestore.doc(`users/${uid}`);
  const snapshot = await userRef.get();

  // if  found in database
  // save user data
  if (snapshot.exists) {
    const timestamp = new Date();

    try {
      await userRef.update({
        email: email,
        updatedAt: timestamp,
      });
    } catch (err) {
      console.log(err);
    }
  }

  return userRef;
};

export const updateUserProfilePic = async (userAuth, avatarUrl) => {
  // if no user not found in db
  // return
  if (!userAuth) return;

  // destrucutre uid from user auth
  const { uid } = userAuth;

  // create a ref to user document
  const userRef = firestore.doc(`users/${uid}`);
  const snapshot = await userRef.get();

  // if  found in database
  // save user data
  if (snapshot.exists) {
    const timestamp = new Date();

    try {
      await userRef.update({
        avatarUrl: avatarUrl,
        updatedAt: timestamp,
      });
    } catch (err) {
      console.log(err);
    }
  }

  return userRef;
};

export const updateUserFirstName = async (userAuth) => {
  // if no user not found in db
  // return
  if (!userAuth) return;

  // destrucutre uid from user auth
  const { uid, displayName } = userAuth;

  // create a ref to user document
  const userRef = firestore.doc(`users/${uid}`);
  const snapshot = await userRef.get();

  // if  found in database
  // save user data
  if (snapshot.exists) {
    const timestamp = new Date();

    try {
      await userRef.update({
        firstName: displayName,
        updatedAt: timestamp,
      });
    } catch (err) {
      console.log(err);
    }
  }

  return userRef;
};

export const updateUserLastName = async (userAuth, lastName) => {
  // if no user not found in db
  // return
  if (!userAuth) return;

  // destrucutre uid from user auth
  const { uid } = userAuth;
  // create a ref to user document
  const userRef = firestore.doc(`users/${uid}`);
  const snapshot = await userRef.get();

  // if  found in database
  // save user data
  if (snapshot.exists) {
    const timestamp = new Date();

    try {
      await userRef.update({
        lastName: lastName,
        updatedAt: timestamp,
      });
    } catch (err) {
      console.log(err);
    }
  }

  return userRef;
};

export const deleteUser = async (userAuth) => {
  // if no user not found in db
  // return
  if (!userAuth) return;

  // destrucutre uid from user auth
  const { uid } = userAuth;
  // increment value for whenever new user created
  const decrement = firebase.firestore.FieldValue.increment(-1);
  const batch = firestore.batch();

  // create a ref to user document
  const userRef = firestore.doc(`users/${uid}`);
  const statsRef = firestore.collection("users").doc("--stats--");

  try {
    // await userRef.delete();

    batch.delete(userRef);
    batch.update(statsRef, { usersCount: decrement }, { merge: true });

    await batch
      .commit()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
  // }

  return userRef;
};

export const checkIsUserAdmin = (currentUser) => {
  // if no current user is sign in exit
  if (!currentUser) return false;

  // grabs field from current user data
  const { isAdmin } = currentUser;
  // chekc if user has role of admin
  // if yes return true
  if (isAdmin) return true;

  // else return false
  return false;
};

// helper fxn to update/submit user data
export const handleUserProfile = async (userAuth, firstName, lastName) => {
  // if no user not found in db
  // return
  if (!userAuth) return;

  // destrucutre uid from user auth
  const { uid } = userAuth;
  // increment value for whenever new user created
  const increment = firebase.firestore.FieldValue.increment(1);
  const batch = firestore.batch();

  // create a ref to user document
  const userRef = firestore.collection("users").doc(`${uid}`);
  // a ref to stats document, counts amount of users
  const statsRef = firestore.collection("userStats").doc("--stats--");
  const snapshot = await userRef.get();

  // if not found in database
  // save user data
  if (!snapshot.exists) {
    // gets email from user auth object
    const { email } = userAuth;
    // timestampe for createdAt
    const timestamp = new Date();
    // const userRoles = ["user"];
    const isAdmin = false;
    const isSuperAdmin = false;

    try {
      batch.set(userRef, {
        firstName: firstName,
        lastName: lastName,
        email: email,
        createdAt: timestamp,
        fullName: firstName + " " + lastName,
        // userRoles,
        isAdmin,
        isSuperAdmin,
      });
      // keeps track of user counts
      batch.set(
        statsRef,
        {
          usersCount: increment,
        },
        { merge: true }
      );

      await batch
        .commit()
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  }

  return userRef;
};
