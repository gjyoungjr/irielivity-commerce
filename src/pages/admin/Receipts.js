import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// utils
import { getAllOrders } from "../../redux/reducers/orders/ordersActions";

// layout
import DashboardLayout from "../../layouts/DashboardLayout";

// components
import { default as ReceiptList } from "../../components/admin/Receipts";

// grabs state from redux
const mapState = ({ ordersData }) => ({
  orders: ordersData.allOrders,
});

export default function Receipts() {
  const dispatch = useDispatch();
  const { orders } = useSelector(mapState);

  // filter orders & return orders that has a payment receipt
  const filteredOrders = orders.filter((item) => item.paymentReceipt !== "");

  // fetch orders on component mount
  // later pass as props to children
  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  return (
    <DashboardLayout>
      <ReceiptList filteredOrders={filteredOrders} />
    </DashboardLayout>
  );
}
