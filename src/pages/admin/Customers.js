import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//utils
import { getAllUsers } from "../../redux/reducers/user/userActions";

// layout
import DashboardLayout from "../../layouts/DashboardLayout";

// component
import { default as CustomerList } from "../../components/admin/Customers";

// grabs state from redux
const mapState = ({ user }) => ({
  users: user.users,
});

export default function Customers() {
  const dispatch = useDispatch();
  // gets users
  const { users } = useSelector(mapState);

 
  // filter for only regular customers account
  const regularUsers =
    users && users.filter((user) => user.userRoles.length !== 2);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  return (
    <DashboardLayout>
      <CustomerList users={regularUsers} />
    </DashboardLayout>
  );
}
