import { firestore } from "../../../firebase/utils";

// get all users records from orders table in db
export const handleGetAllUsers = () => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("users")
      .get()
      .then((snapshot) => {
        const usersArray = snapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            documentID: doc.id,
          };
        });
        resolve(usersArray);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// gets total users from db table
export const handleGetTotalUsers = () => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("userStats")
      .get()
      .then((snapshot) => {
        const userStats = snapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            documentID: doc.id,
          };
        });
        resolve(userStats);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// update user account to an admin account
export const handleSetUserAdmin = (userID, user) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("users")
      .doc(userID)
      .update(user)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};
