/*eslint-disable */

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";

// utils
import { getTotalUsers } from "../../redux/reducers/user/userActions";
import {
  getLatestOrders,
  getOrdersStats,
  getAllOrders,
  getWeeklyOrders,
} from "../../redux/reducers/orders/ordersActions";
import { selectOrderTotalIncome } from "../../redux/reducers/orders/ordersSelector";

// layout
import DashboardLayout from "../../layouts/DashboardLayout";

// components
import { default as HomeReport } from "../../components/admin/HomeReports";

// gets state from redux store
const mapState = ({ user, ordersData }) => ({
  usersCount: user.totalUsers,
  latestOrders: ordersData.latestOrders,
  ordersStats: ordersData.ordersStats,
  allOrders: ordersData.allOrders,
  weeklyOrders: ordersData.weeklyOrders,
});

// structured selector to get total income from orders
const mapTotalOrdersState = createStructuredSelector({
  totalOrderIncome: selectOrderTotalIncome,
});

export default function DashboardHome() {
  const dispatch = useDispatch();
  // destructure from state
  const { usersCount, latestOrders, ordersStats, weeklyOrders, allOrders } =
    useSelector(mapState);
  const { totalOrderIncome } = useSelector(mapTotalOrdersState);

  // fetch total users count, all orders on component mount
  useEffect(() => {
    dispatch(getTotalUsers());
    dispatch(getLatestOrders());
    dispatch(getAllOrders());
    dispatch(getWeeklyOrders());
    dispatch(getOrdersStats());
  }, [dispatch]);

  return (
    <DashboardLayout>
      <HomeReport
        usersCount={usersCount}
        latestOrders={latestOrders}
        ordersStats={ordersStats}
        totalOrderIncome={totalOrderIncome}
        weeklySales={weeklyOrders}
        allOrders={allOrders}
      />
    </DashboardLayout>
  );
}
