import React, { useEffect } from "react";
import MetaTags from "react-meta-tags";
import { useSelector, useDispatch } from "react-redux";

// layout
import MinimalLayout from "../layouts/MinimalLayout";

// components
import MembersSettings from "../components/members-settings";

// utils fxn
import { getUserOrderHistory } from "../redux/reducers/orders/ordersActions";

// grabs state from redux
const mapState = ({ user, ordersData }) => ({
  currentUser: user.currentUser.userAuth,
  orderHistory: ordersData.orderHistory.data,
});
export default function MembersPage() {
  const dispatch = useDispatch();
  // destructures states from redux store
  const { currentUser, orderHistory } = useSelector(mapState);

  // fetches user orders
  useEffect(() => {
    dispatch(getUserOrderHistory(currentUser.uid));
  }, [currentUser.uid, dispatch]);
  return (
    <MinimalLayout>
      <MetaTags>
        <title>Irielivity Ltd. Members</title>
      </MetaTags>
      <MembersSettings usersOrders={orderHistory} />
    </MinimalLayout>
  );
}
