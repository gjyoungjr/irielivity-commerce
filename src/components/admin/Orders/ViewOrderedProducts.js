import React from "react";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import {
  IconButton,
  Dialog,
  Typography,
  withStyles,
  Grid,
  Divider,
  Box,
} from "@material-ui/core";

// icons
import CloseIcon from "@material-ui/icons/Close";

//components
import Status from "./Status";

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
}) {
  return (
    <div>
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
          <p style={{ marginLeft: "50px", marginTop: "-12px", opacity: 0.6 }}>
            Ordered Products
          </p>
          <p style={{ marginLeft: "50px", marginTop: "-22px", opacity: 0.6 }}>
            Order:{orderRef}
          </p>
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

                        <div style={{ marginTop: "-15px" }}>
                          <p style={{ opacity: 0.5 }}>{product.category}</p>
                          <p style={{ marginTop: "-18px", opacity: 0.5 }}>
                            Qty: {product.quantity}
                          </p>
                          {product.selectedSize && (
                            <p style={{ marginTop: "-18px", opacity: 0.5 }}>
                              Size: {product.selectedSize}
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

          {/* Form Select To update Order Status */}
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
};
