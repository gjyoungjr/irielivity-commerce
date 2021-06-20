import React, { useEffect } from "react";
import { FormControlLabel, Switch } from "@material-ui/core";
import { useDispatch } from "react-redux";

// utils fxn
import {
  setAdminUser,
  getAllUsers,
} from "../../../redux/reducers/user/userActions";

export default function SwitchesSize({ rowValue, updateValue, userId }) {
  const dispatch = useDispatch();
  const [isAdmin, setIsAdmin] = React.useState(false);

  // toggle switch to update user role
  const handleToggleAdmin = () => {
    setIsAdmin(isAdmin ? false : true);
  };

  // handles api call to db to update user role
  useEffect(() => {
    if (!userId) return;
    dispatch(
      setAdminUser({
        userId,
        isAdmin,
      })
    );
    dispatch(getAllUsers());
  }, [isAdmin, dispatch, userId]);

  return (
    <FormControlLabel
      control={
        <Switch checked={rowValue || isAdmin} onChange={handleToggleAdmin} />
      }
      label={rowValue || isAdmin ? "Admin" : "User"}
    />
  );
}
