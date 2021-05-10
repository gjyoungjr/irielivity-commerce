import ordersTypes from "./ordersTypes";
import { takeLatest, put, all, call } from "redux-saga/effects";

// utils fxn
import {
  handleSaveOrder,
  handleGetUserOrderHistory,
  handleGetOrder,
  handleGetAllOrders,
  handleUpdateOrderStatus,
  handleGetLatestOrders,
  handleGetOrdersStats,
  handleGetWeeklyOrders,
} from "./ordersHelpers";
import { auth } from "../../../firebase/utils";
import { clearCart } from "../cart/cartActions";
import {
  setOrderDetails,
  setUserOrderHistory,
  setAllOrders,
  setOrderTotal,
  setLatestOrders,
  setOrdersStats,
  setWeeklyOrders,
} from "./ordersActions";
import { setDeliveryFee } from "../delivery/deliveryActions";

// stores order in db
export function* saveOrder({ payload }) {
  try {
    const timestamp = new Date();
    // spread in entire payload with all values
    yield handleSaveOrder({
      ...payload,
      orderUserID: auth.currentUser.uid,
      createdAt: timestamp,
    });

    // clear cart after user have successfully check out/purchased cart items
    // set order total back to 0
    // set delivery fee back to 0
    yield put(clearCart());
    yield put(setOrderTotal(0));
    yield put(setDeliveryFee(0));
  } catch (err) {
    console.log(err);
  }
}

// calls save order history fxn
export function* onSaveOrderHistoryStart() {
  yield takeLatest(ordersTypes.SAVE_ORDER_HISTORY_START, saveOrder);
}

// fetch order history from db
export function* getUserOrderHistory({ payload }) {
  try {
    // assign history to the data being returned
    const history = yield handleGetUserOrderHistory(payload);
    // then update redux store with orders
    yield put(setUserOrderHistory(history));
  } catch (err) {
    console.log(err);
  }
}

// calls get order history fxn
export function* onGetUserOrderHistoryStart() {
  yield takeLatest(
    ordersTypes.GET_USER_ORDER_HISTORY_START,
    getUserOrderHistory
  );
}

// fetch order history from db
export function* getOrderDetails({ payload }) {
  try {
    // asigned order to data beign returned from fxn call
    const order = yield handleGetOrder(payload);
    // then update redux store with order
    yield put(setOrderDetails(order));
  } catch (err) {
    console.log(err);
  }
}

// calls get order details fxn
export function* onGetOrderDetailsStart() {
  yield takeLatest(ordersTypes.GET_ORDER_DETAILS_START, getOrderDetails);
}

// fetch orders from db
export function* getAllOrders() {
  try {
    // assign orders to data being returned from api call
    const orders = yield handleGetAllOrders();
    // update redux store with all orders
    yield put(setAllOrders(orders));
  } catch (err) {
    console.log(err);
  }
}

// call get orders fxn
export function* onGetAllOrdersStart() {
  yield takeLatest(ordersTypes.GET_ALL_ORDERS, getAllOrders);
}

// update order status in db
export function* updateOrderStatus({ payload }) {
  try {
    const timestamp = new Date();
    yield handleUpdateOrderStatus(payload.orderID, {
      ...payload,
      updatedAt: timestamp,
    });
  } catch (err) {
    console.log(err);
  }
}

// calls update orders fxn
export function* onUpdateOrderStatusStart() {
  yield takeLatest(ordersTypes.UPDATE_ORDER_STATUS, updateOrderStatus);
}

// gets most recent orders
export function* getLatestOrders() {
  try {
    // assign orders to data being returned from api call
    const orders = yield handleGetLatestOrders();
    // update redux store with all orders
    yield put(setLatestOrders(orders));
  } catch (err) {
    console.log(err);
  }
}

// call get latest order fxn
export function* onGetLatestOrdersStart() {
  yield takeLatest(ordersTypes.GET_LATEST_ORDERS, getLatestOrders);
}

// gets order stats from db
export function* getOrdersStats() {
  try {
    // assign orders to data being returned from api call
    const ordersStats = yield handleGetOrdersStats();
    // update redux store with all orders
    yield put(setOrdersStats(ordersStats));
  } catch (err) {
    console.log(err);
  }
}

// calls get order stats fxn
export function* onGetOrdersStatsStart() {
  yield takeLatest(ordersTypes.GET_ORDERS_STATS, getOrdersStats);
}

// gets weekly orders from db
export function* getWeeklyOrders() {
  try {
    // assign orders to data being returned from fxn call
    const orders = yield handleGetWeeklyOrders();
    // update redux store with the data
    yield put(setWeeklyOrders(orders));
  } catch (err) {}
}

// calls get weekly order fxn
export function* onGetWeeklyOrdersStart() {
  yield takeLatest(ordersTypes.GET_WEEKLY_ORDERS, getWeeklyOrders);
}

export default function* ordersSagas() {
  yield all([
    call(onSaveOrderHistoryStart),
    call(onGetUserOrderHistoryStart),
    call(onGetOrderDetailsStart),
    call(onGetAllOrdersStart),
    call(onUpdateOrderStatusStart),
    call(onGetLatestOrdersStart),
    call(onGetOrdersStatsStart),
    call(onGetWeeklyOrdersStart),
  ]);
}
