import { takeLatest, put, all, call } from "redux-saga/effects";
import productsTypes from "./productsTypes";

// utils
import {
  handleAddProduct,
  handleFetchProducts,
  handleFetchProduct,
  handleDeleteProduct,
  handleUpdateProduct,
  handleAddProductReview,
  handleFetchProductReviewStart,
} from "./productsHelper";
import {
  setProducts,
  fetchProductsStart,
  setProduct,
  setProductReview,
} from "./productsActions";
import { auth } from "../../../firebase/utils";

// ADDS PRODUCT TO DB
export function* addProduct({ payload }) {
  try {
    console.log('....added!!')
    const timestamp = new Date();
    // adding fields to db
    yield handleAddProduct({
      ...payload,
      productAdminUserUID: auth.currentUser.uid,
      createdAt: timestamp,
      updatedAt: timestamp,
    });
    yield put(fetchProductsStart());
  } catch (err) {
    console.log("Add Product->", err);
  }
}

// CALLS ADD PRODUCT FXN
export function* onAddProductStart() {
  yield takeLatest(productsTypes.ADD_NEW_PRODUCT_START, addProduct);
}

export function* updateProduct({ payload }) {
  try {
    const timestamp = new Date();
    // update field in db
    yield handleUpdateProduct(payload.productID, {
      ...payload,
      updatedAt: timestamp,
    });
    yield put(fetchProductsStart());
  } catch (err) {
    console.log(err);
  }
}

export function* onUpdateProductStart() {
  yield takeLatest(productsTypes.UPDATE_PRODUCT_START, updateProduct);
}

// FETCH PRODUCTS FROM DB
export function* fetchProducts({ payload: { filterType } }) {
  try {
    const products = yield handleFetchProducts({ filterType });
    yield put(setProducts(products));
  } catch (err) {
    console.log(err);
  }
}

// CALLS FETCH PRODUCT FXN
export function* onFetchProductsStart() {
  yield takeLatest(productsTypes.FETCH_PRODUCTS_START, fetchProducts);
}

// DELETES PRODUCT FROM DB
export function* deleteProduct({ payload }) {
  try {
    yield handleDeleteProduct(payload);
    yield put(fetchProductsStart());
  } catch (err) {
    console.log(err);
  }
}

// CALLS DELETE PRODUCT FXN
export function* onDeleteProductsStart() {
  yield takeLatest(productsTypes.DELETE_PRODUCTS_START, deleteProduct);
}

//  FETCH SINGLE PRODUCT
export function* fetchProduct({ payload }) {
  try {
    const product = yield handleFetchProduct(payload);
    yield put(setProduct(product));
  } catch (err) {
    console.log(err);
  }
}

// CALL FETCH SINGLE PRODUCT
export function* onFetchProductStart() {
  yield takeLatest(productsTypes.FETCH_PRODUCT_START, fetchProduct);
}

export function* addProductReview({ payload }) {
  try {
    // gets current data
    const timestamp = new Date();
    // update field in db
    yield handleAddProductReview({
      ...payload,
      createdAt: timestamp,
    });
  } catch (err) {
    console.log(err);
  }
}

// CALL ADD PRODUCT REVIEW
export function* onAddProductReviewStart() {
  yield takeLatest(productsTypes.ADD_PRODUCT_REVIEW_START, addProductReview);
}

export function* fetchProductReview({ payload }) {
  try {
    // assing review to data being returned from fxn call
    const review = yield handleFetchProductReviewStart(payload);
    // then update redux store with product review
    yield put(setProductReview(review));
  } catch (err) {
    console.log(err);
  }
}

export function* onFetchProductReviewStart() {
  yield takeLatest(
    productsTypes.FETCH_PRODUCT_REVIEW_START,
    fetchProductReview
  );
}

// export saga functions
export default function* productsSagas() {
  yield all([
    call(onAddProductStart),
    call(onFetchProductsStart),
    call(onFetchProductStart),
    call(onDeleteProductsStart),
    call(onUpdateProductStart),
    call(onAddProductReviewStart),
    call(onFetchProductReviewStart),
  ]);
}
