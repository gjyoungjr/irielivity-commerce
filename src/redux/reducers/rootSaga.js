import { all, call } from "redux-saga/effects";

import productsSagas from "./products/productsSagas";
// import ordersSagas from "./orders/ordersSagas";
// import userSagas from "./users/userSagas";

export default function* rootSaga() {
  yield all([call(productsSagas)]);
}
