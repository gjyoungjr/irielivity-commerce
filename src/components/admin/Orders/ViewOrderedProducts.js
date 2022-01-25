import React, { useState } from "react";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import moment from "moment";
import {
  IconButton,
  Dialog,
  Typography,
  withStyles,
  Grid,
  Divider,
  Box,
  Tooltip,
} from "@material-ui/core";

// icons
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";

//components
import Status from "./Status";
import AppButton from "../../app-button";
import ConfirmationAlert from "../../alert";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

export default function ViewOrderedProducts({
  open,
  handleClose,
  products,
  user,
  orderRef,
  statusValue,
  handleStatusChange,
  handleCancelOrder,
  refundDeadline,
  deleteOrder,
}) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isAdminOrders, setIsAdminOrders] = useState(false);
  return (
    <div>
      {/* Alert Dialog Before cancelling order */}
      {!isAdminOrders ? (
        <ConfirmationAlert
          open={showConfirmDialog}
          title="Cancel Order"
          msg="Are you sure you want to cancel your order?"
          onClose={() => setShowConfirmDialog(!showConfirmDialog)}
          handleCancelOrder={handleCancelOrder}
          orderRef={orderRef}
          isUserOrders={true}
        />
      ) : (
        <ConfirmationAlert
          open={showConfirmDialog}
          title="Delete Order"
          msg="Are you sure you want to delete this order?"
          onClose={() => setShowConfirmDialog(!showConfirmDialog)}
          handleCancelOrder={handleCancelOrder}
          orderRef={orderRef}
          isAdminOrders={isAdminOrders}
          deleteOrder={deleteOrder}
          handleClose={handleClose}
        />
      )}
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        PaperProps={{ style: { borderRadius: "20px", width: "700px" } }}
      >
        <DialogTitle onClose={handleClose}>
          <div className="d-flex justify-content-start">
            <span> {user}</span>
          </div>
          <p style={stylesheet.subTitle}>Ordered Products</p>
          <p style={stylesheet.subTitle}>Order:{orderRef}</p>
        </DialogTitle>
        <DialogContent dividers style={{ width: "100%" }}>
          <div style={{ width: "100%" }}>
            {products && products.length > 0
              ? products.map((product, key) => (
                  <div key={key}>
                    <Grid container spacing={1}>
                      {/* Product Img */}
                      <Grid item xs={4} lg={4} md={4}>
                        <img
                          style={{ width: "75%" }}
                          src={product.mainImgUrl}
                          alt=""
                        />
                      </Grid>

                      {/* Product Details */}
                      <Grid item xs={8} lg={8} md={8}>
                        <div className="d-flex justify-content-between">
                          <p className="font-weight-bold">
                            {product.productName}
                          </p>
                          <p>${product.productPrice}</p>
                        </div>

                        <div style={stylesheet.topSpacer}>
                          <p style={{ opacity: 0.5 }}>{product.category}</p>
                          <p style={stylesheet.fontstyle}>
                            Qty: {product.quantity}
                          </p>
                          {product.selectedSize && (
                            <p style={stylesheet.fontstyle}>
                              Size: {product.selectedSize}
                            </p>
                          )}
                          {product.selectedColor && (
                            <p style={stylesheet.fontstyle}>
                              Color: {product.selectedColor}
                            </p>
                          )}
                        </div>
                      </Grid>
                    </Grid>
                    <Divider className="mt-3 mb-3" />
                  </div>
                ))
              : ""}
          </div>

          {/* conditional render either show update status or cancel order */}
          {user ? (
            <div className="d-flex justify-content-between">
              <div className="mt-4 d-flex justify-content-start">
                <p style={stylesheet.formSelectTitle}>Update Order Status:</p>
                <Box maxWidth={300}>
                  <Status
                    value={
                      statusValue && statusValue.props
                        ? statusValue.props.label
                        : statusValue
                    }
                    onChange={(e) => handleStatusChange(e, orderRef)}
                  />
                </Box>
              </div>
              <div className="mt-4">
                <Tooltip title="Delete Order">
                  <IconButton
                    style={stylesheet.deleteWrapper}
                    onClick={() => {
                      setShowConfirmDialog(true);
                      setIsAdminOrders(true);
                    }}
                  >
                    <DeleteIcon style={stylesheet.deleteIcon} />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          ) : (
            <div>
              <AppButton
                width="120px"
                onClick={() => setShowConfirmDialog(true)}
                borderRadius="30px"
                label="Cancel Order"
                bgColor="black"
                disabled={moment().toDate() >= refundDeadline}
                color="white"
              />
              {moment().toDate() >= refundDeadline ? (
                <div className="ml-2" style={stylesheet.cancelTitle}>
                  We are sorry, 24 have has passed since you made your order.
                  This order can not be cancelled. Thank you for understanding.
                </div>
              ) : (
                <div className="ml-2" style={stylesheet.cancelTitle}>
                  As a part of our Customer Commitment for customers who
                  purchased any product, you have up to 24 hours after purchase
                  has been made to cancel your order and receive a full refund.
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

const stylesheet = {
  formSelectTitle: {
    marginTop: "15px",
    marginRight: "15px",
    fontWeight: "600",
    textTransform: "uppercase",
  },
  formSelect: {
    width: "30%",
  },
  subTitle: {
    marginLeft: "50px",
    marginTop: "-12px",
    opacity: 0.6,
  },
  fontstyle: {
    marginTop: "-18px",
    opacity: 0.5,
  },
  topSpacer: {
    marginTop: "-15px",
  },
  cancelTitle: {
    width: "90%",
    fontSize: "13px",
    opacity: 0.8,
    color: "red",
  },
  deleteWrapper: {
    backgroundColor: "#f5f5f5",
  },
  deleteIcon: {
    color: "red",
  },
};
