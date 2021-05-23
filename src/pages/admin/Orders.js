import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// utils
import { getAllOrders } from "../../redux/reducers/orders/ordersActions";

// layout
import DashboardLayout from "../../layouts/DashboardLayout";

//component
import { default as OrdersList } from "../../components/admin/Orders";

// grabs state from redux
const mapState = ({ ordersData }) => ({
  orders: ordersData.allOrders,
});
export default function Orders() {
  const dispatch = useDispatch();
  const { orders } = useSelector(mapState);

  // fetch orders on component mount
  // later pass as props to children
  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  console.log(orders);

  return (
    <DashboardLayout>
      <OrdersList orders={orders} />
    </DashboardLayout>
  );
}
