import React, { Fragment, useEffect } from "react";
import {
  Card,
  CardHeader,
  makeStyles,
  CardContent,
  Divider,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createStructuredSelector } from "reselect";

// components
import AppButton from "../app-button";

// util fxn
import { selectCartTotal } from "../../redux/reducers/cart/cartSelectors";
import { setOrderTotal } from "../../redux/reducers/orders/ordersActions";
import { setDeliveryFee } from "../../redux/reducers/delivery/deliveryActions";

// grabs cart items data
const mapState = createStructuredSelector({
  total: selectCartTotal,
});

const mapDeliveryState = ({ deliveryData }) => ({
  delivery: deliveryData.deliveryMethod,
  deliveryFee: deliveryData.deliveryFee,
});

const useStyles = makeStyles(() => ({
  title: {
    fontWeight: "600",
    textAlign: "left",
  },
  bottomSpacer: {
    marginBottom: "18px",
  },
  topSpacer: {
    marginTop: "18px",
  },
  card: {
    borderRadius: "15px",
    marginTop: "20px",
    marginBottom: "10px",
  },
}));

// currency format fxn
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

export default function CartSummary({
  checkOut = false,
  fetchedTotal,
  fetchedSubTotal,
  fetchedDeliveryFee,
}) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  // access cart total
  const { total } = useSelector(mapState);
  const { delivery, deliveryFee } = useSelector(mapDeliveryState);

  // define variables for the delivery type that we're expecting
  const BPMS = "BPMS",
    homeDelivery = "Home-Delivery",
    pickUp = "Pick-Up";

  // switch fxn gets delivery fee on the delivery method that is chose
  const getDeliveryFee = (delivery) => {
    switch (delivery) {
      case BPMS:
        return 10;
      case homeDelivery:
        return 15;
      case pickUp:
        return 0;
      default:
        return 0;
    }
  };

  useEffect(() => {
    // if no delivery exit
    if (!delivery) return;

    // else gets delivery get fee
    const fee = getDeliveryFee(delivery);
    // set redux state with delievery fee
    dispatch(setDeliveryFee(fee));

    // update order total
    // & redux store
    dispatch(setOrderTotal(fee + total));
  }, [delivery, dispatch, total]);

  return (
    <Card style={styles.card} elevation={1}>
      <CardHeader
        title="Order Summary"
        className={classes.title}
        titleTypographyProps={{
          style: {
            fontWeight: "500",
            fontSize: "22px",
          },
        }}
      />
      <CardContent>
        {/* Subtotal Cost */}
        <div className="d-flex justify-content-between">
          <p>Subtotal</p>
          {fetchedSubTotal ? (
            <p>BZD {formatter.format(fetchedSubTotal)}</p>
          ) : (
            <p>BZD {formatter.format(total)}</p>
          )}
        </div>

        {/* Shipping Cost Render Methods */}
        {checkOut ? (
          <div className="d-flex justify-content-between">
            <p>Shipping</p>
            <p>BZD {formatter.format(deliveryFee)}</p>
          </div>
        ) : fetchedDeliveryFee ? (
          <div className="d-flex justify-content-between">
            <p>Shipping</p>
            <p>BZD {formatter.format(fetchedDeliveryFee)}</p>
          </div>
        ) : (
          <div className="d-flex justify-content-between">
            <p>Shipping</p>
            <p>BZD {formatter.format(0)}</p>
          </div>
        )}

        <Divider className="mt-3" />

        {/* Total Cost  */}
        <div className="d-flex justify-content-between mt-3">
          <p className="font-weight-bold">Total</p>
          {fetchedTotal ? (
            <p>BZD {formatter.format(fetchedTotal)}</p>
          ) : (
            <p>
              BZD{" "}
              {deliveryFee !== 0
                ? formatter.format(total + deliveryFee)
                : formatter.format(total)}
            </p>
          )}
        </div>
        <Divider />
        <br></br>
        {/* Button Renders for Different Uses  */}
        {checkOut ? (
          <Fragment>
            <AppButton
              label="Continue Shopping"
              bgColor="black"
              color="white"
              width="100%"
              height="60px"
              borderRadius="30px"
              border="1px solid grey"
              onClick={() => history.push("/shop")}
            />
            <br></br>
            <br></br>
            {/* <AppButton
              label="Back To Cart"
              bgColor="transparent"
              color="black"
              width="100%"
              height="60px"
              borderRadius="30px"
              border="1px solid grey"
              onClick={() => history.push("/cart")}
            /> */}
          </Fragment>
        ) : fetchedTotal ? (
          <Fragment>
            <AppButton
              label="Back to Orders"
              bgColor="black"
              color="white"
              width="100%"
              height="60px"
              borderRadius="30px"
              onClick={() => history.goBack()}
            />
          </Fragment>
        ) : (
          <Fragment>
            <AppButton
              label="Checkout"
              bgColor="black"
              color="white"
              width="100%"
              height="60px"
              borderRadius="30px"
              onClick={() => history.push("/checkout")}
            />
            <br></br>
            <br></br>
            <AppButton
              label="Continue Shopping"
              bgColor="white"
              color="black"
              width="100%"
              height="60px"
              borderRadius="30px"
              border="1px solid grey"
              onClick={() => history.push("/shop")}
            />
          </Fragment>
        )}
      </CardContent>
    </Card>
  );
}

const styles = {
  bottomSpacer: {
    marginBottom: "-5px",
  },
  bottomSpacer1: {
    marginBottom: "1px",
    opacity: 0.7,
  },
  card: {
    borderRadius: "none",
    boxShadow: "none",
    border: "1px solid #F2F2F2",
    backgroundColor: "transparent",
  },
};
