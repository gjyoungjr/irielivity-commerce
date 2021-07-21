import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { useDispatch } from "react-redux";

// components
import AppButton from "../app-button";
import { deleteOrder } from "../../redux/reducers/orders/ordersActions";

export default function AlertDialog({
  open,
  onClose,
  msg,
  title,
  removeUser,
  handleCancelOrder,
  orderRef,
  isUserOrders,
  isAdminOrders,
  handleClose,
}) {
  const dispatch = useDispatch();

  const handleDeleteOrder = () => {
    dispatch(deleteOrder(orderRef));
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{ style: { borderRadius: "15px" } }}
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {msg}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <AppButton
            color="white"
            bgColor="black"
            width="15%"
            label="Yes"
            onClick={(e) => {
              isUserOrders
                ? handleCancelOrder(e, orderRef)
                : isAdminOrders
                ? handleDeleteOrder()
                : removeUser();

              onClose();
            }}
          />
          <AppButton
            border="1px solid black"
            color="black"
            bgColor="white"
            width="15%"
            label="No"
            onClick={onClose}
          />
        </DialogActions>
      </Dialog>
    </div>
  );
}
