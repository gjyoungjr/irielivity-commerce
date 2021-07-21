import { firestore } from "../../../firebase/utils";
import firebase from "firebase/app";
import moment from "moment";

// saves order data in db table
export const handleSaveOrder = (order) => {
  return new Promise((resolve, reject) => {
    // create batch
    const batch = firestore.batch();
    // create ref for documents
    const orderRef = firestore.collection("orders").doc();
    const statsRef = firestore.collection("orderStats").doc("--stats--");
    // incremental value
    const increment = firebase.firestore.FieldValue.increment(1);

    // set data & increment val to documents
    batch.set(orderRef, order);
    batch.set(statsRef, { ordersCount: increment }, { merge: true });

    // commit batch
    batch
      .commit()
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// delete order from db
export const handleDeleteOrder = (documentID) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("orders")
      .doc(documentID)
      .delete()
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// gets user order from db
export const handleGetUserOrderHistory = (uid) => {
  return new Promise((resolve, reject) => {
    let ref = firestore.collection("orders").orderBy("createdAt", "desc");
    // query type
    ref = ref.where("orderUserID", "==", uid);

    ref
      .get()
      .then((snap) => {
        // maps through each doc & retrieve data & ID
        const data = [
          ...snap.docs.map((doc) => {
            return {
              ...doc.data(),
              documentID: doc.id,
            };
          }),
        ];

        resolve({ data });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// gets order details from db table
// gets user order from db
export const handleGetOrder = (orderID) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("orders")
      .doc(orderID)
      .get()
      .then((snap) => {
        if (snap.exists) {
          resolve({
            ...snap.data(),
            documentID: orderID,
          });
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// get all records from orders table in db
export const handleGetAllOrders = () => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("orders")
      .orderBy("createdAt", "desc")
      .get()
      .then((snapshot) => {
        const ordersArray = snapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            documentID: doc.id,
          };
        });
        resolve(ordersArray);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// gets most recent orders from db
export const handleGetLatestOrders = () => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("orders")
      .orderBy("createdAt", "desc")
      .limit(10)
      .get()
      .then((snapshot) => {
        const ordersArray = snapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            documentID: doc.id,
          };
        });
        resolve(ordersArray);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// update order status on db
export const handleUpdateOrderStatus = (orderID, order) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("orders")
      .doc(orderID)
      .update(order)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// handle fetching order stats
export const handleGetOrdersStats = () => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("orderStats")
      .get()
      .then((snapshot) => {
        const ordersStats = snapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            documentID: doc.id,
          };
        });
        resolve(ordersStats);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// handle get weekly orders from db
export const handleGetWeeklyOrders = () => {
  return new Promise((resolve, reject) => {
    const startOfWeek = moment().startOf("week").toDate();
    const endOfWeek = moment().endOf("week").toDate();

    firestore
      .collection("orders")
      .where("createdAt", ">=", startOfWeek)
      .where("createdAt", "<=", endOfWeek)

      .get()
      .then((snapshot) => {
        const orders = snapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            documentID: doc.id,
          };
        });
        resolve(orders);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// handle sending email to admin on orders placed
export const alertAdminOnOrder = async (emailjs, firstName, lastName) => {
  // object containng data to be sent on email
  const templateParams = {
    user: firstName + " " + lastName,
  };

  await emailjs
    .send(
      "service_74gwsnm",
      "template_0j00m5g",
      templateParams,
      "user_9S2XyjvCrtE9DYzEOBOwT"
    )
    .then(
      function (response) {
        console.log("SUCCESS!", response.status, response.text);
      },
      function (error) {
        console.log("FAILED...", error);
      }
    );
};

// handle sending email to user on orders placed
export const alertUserOnOrder = async (emailjs, email, firstName, lastName) => {
  const templateParams = {
    to_email: email,
    to_name: firstName + " " + lastName,
  };

  await emailjs
    .send(
      "service_74gwsnm",
      "template_lugj2bc",
      templateParams,
      "user_9S2XyjvCrtE9DYzEOBOwT"
    )
    .then(
      function (response) {
        console.log("SUCCESS!", response.status, response.text);
      },
      function (error) {
        console.log("FAILED...", error);
      }
    );
};
