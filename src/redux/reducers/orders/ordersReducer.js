import ordersTypes from "./ordersTypes";

const INITIAL_STATE = {
  orderHistory: [],
  orderDetails: {},
  allOrders: [],
  ordersNotificationData: [],
  orderTotal: 0,
  latestOrders: [],
  ordersStats: [],
  weeklyOrders: [],
};

const ordersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ordersTypes.SET_USER_ORDER_HISTORY:
      return {
        ...state,
        orderHistory: action.payload,
      };
    case ordersTypes.SET_ORDER_DETAILS:
      return {
        ...state,
        orderDetails: action.payload,
      };
    case ordersTypes.SET_ALL_ORDERS:
      return {
        ...state,
        allOrders: action.payload,
      };
    case ordersTypes.SET_ORDERS_NOTIFICATION_DATA:
      return {
        ...state,
        ordersNotificationData: action.payload,
      };
    case ordersTypes.SET_ORDER_TOTAL:
      return {
        ...state,
        orderTotal: action.payload,
      };
    case ordersTypes.SET_LATEST_ORDERS:
      return {
        ...state,
        latestOrders: action.payload,
      };
    case ordersTypes.SET_ORDERS_STATS:
      return {
        ...state,
        ordersStats: action.payload,
      };
    case ordersTypes.SET_WEEKLY_ORDERS:
      return {
        ...state,
        weeklyOrders: action.payload,
      };
    default:
      return state;
  }
};

export default ordersReducer;
