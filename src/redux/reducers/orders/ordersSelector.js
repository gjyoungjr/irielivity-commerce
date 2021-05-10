import { createSelector } from "reselect";

export const selectOrdersData = (state) => state.ordersData;

export const selectOrderItems = createSelector(
  [selectOrdersData],
  (ordersData) => ordersData.allOrders
);

// gets total income from all orders
export const selectOrderTotalIncome = createSelector(
  [selectOrderItems],
  (allOrders) =>
    allOrders &&
    allOrders.reduce((orderTotal, order) => orderTotal + order.orderTotal, 0)
);
