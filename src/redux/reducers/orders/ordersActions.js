import ordersTypes from "./ordersTypes";

export const saveOrderHistory = (order) => ({
  type: ordersTypes.SAVE_ORDER_HISTORY_START,
  payload: order,
});

export const getUserOrderHistory = (uid) => ({
  type: ordersTypes.GET_USER_ORDER_HISTORY_START,
  payload: uid,
});

export const setUserOrderHistory = (history) => ({
  type: ordersTypes.SET_USER_ORDER_HISTORY,
  payload: history,
});

export const getOrderDetailsStart = (orderID) => ({
  type: ordersTypes.GET_ORDER_DETAILS_START,
  payload: orderID,
});

export const setOrderDetails = (order) => ({
  type: ordersTypes.SET_ORDER_DETAILS,
  payload: order,
});

export const getAllOrders = () => ({
  type: ordersTypes.GET_ALL_ORDERS,
});

export const setAllOrders = (orders) => ({
  type: ordersTypes.SET_ALL_ORDERS,
  payload: orders,
});

export const updateOrderStatus = (order) => ({
  type: ordersTypes.UPDATE_ORDER_STATUS,
  payload: order,
});

export const setOrdersNotificationData = (order) => ({
  type: ordersTypes.SET_ORDERS_NOTIFICATION_DATA,
  payload: order,
});

export const setOrderTotal = (order) => ({
  type: ordersTypes.SET_ORDER_TOTAL,
  payload: order,
});

export const getLatestOrders = () => ({
  type: ordersTypes.GET_LATEST_ORDERS,
});

export const setLatestOrders = (orders) => ({
  type: ordersTypes.SET_LATEST_ORDERS,
  payload: orders,
});
export const getOrdersStats = () => ({
  type: ordersTypes.GET_ORDERS_STATS,
});

export const setOrdersStats = (orders) => ({
  type: ordersTypes.SET_ORDERS_STATS,
  payload: orders,
});

export const getWeeklyOrders = () => ({
  type: ordersTypes.GET_WEEKLY_ORDERS,
});

export const setWeeklyOrders = (orders) => ({
  type: ordersTypes.SET_WEEKLY_ORDERS,
  payload: orders,
});
