import { firestore } from "../../../firebase/utils";
import firebase from "firebase/app";

// add products to db
export const handleAddProduct = (product) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("products")
      .doc()
      .set(product)
      .then(() => {
        console.log("...set");
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// adds product category to db
export const handleAddProductCategory = (product) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("productCategories")
      .doc()
      .set(product)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// get all records from orders table in db
export const handleGetAllProductCategories = () => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("productCategories")
      .get()
      .then((snapshot) => {
        const productCategoriesArray = snapshot.docs.map((doc) => {
          return {
            ...doc.data(),
          };
        });
        resolve(productCategoriesArray);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// update products in db
export const handleUpdateProduct = (productID, product) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("products")
      .doc(productID)
      .update(product)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// adds product review to db
export const handleAddProductReview = (product) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("productReviews")
      .doc()
      .set(product)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// fetch review that belongs to a particular product
export const handleFetchProductReviewStart = ({
  filterType,
  startAfterDoc,
  persistProducts = [],
}) => {
  return new Promise((resolve, reject) => {
    // limit documents per fetch
    const pageSize = 2;
    let ref = firestore
      .collection("productReviews")
      .orderBy("createdAt", "desc")
      .limit(pageSize);
    // query type
    // fetch reviews where product id matches param
    ref = ref.where("productID", "==", filterType);

    if (startAfterDoc) ref = ref.startAfter(startAfterDoc);

    ref
      .get()
      .then((snap) => {
        // gets size of array
        const totalCount = snap.size;
        // maps through each doc & retrieve data
        const data = [
          ...persistProducts,
          ...snap.docs.map((doc) => {
            return {
              ...doc.data(),
            };
          }),
        ];

        resolve({
          data,
          queryDoc: snap.docs[totalCount - 1],
          isLastPage: totalCount < 1,
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// get products from db
export const handleFetchProducts = ({ filterType }) => {
  return new Promise((resolve, reject) => {
    let ref = firestore.collection("products").orderBy("createdAt");

    if (filterType) {
      ref = ref.where("category", "==", filterType);
    }

    ref
      .get()
      .then((snapshot) => {
        const productsArray = snapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            documentID: doc.id,
          };
        });
        resolve(productsArray);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// delete products from db
export const handleDeleteProduct = (documentID) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("products")
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

// fetch single product from db
export const handleFetchProduct = (productId) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("products")
      .doc(productId)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          resolve({ ...snapshot.data(), documentID: snapshot.id });
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// handles decrementing product qty
export const handleDecrementProductQty = (productID, decrementValue) => {
  // create product ref
  const productRef = firestore.collection("products").doc(productID);
  // decrement action for product quanity
  const decrementBy = firebase.firestore.FieldValue.increment(-decrementValue);

  productRef
    .update({ quantity: decrementBy })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};
