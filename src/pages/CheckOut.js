import React from "react";
import { Grid, Avatar } from "@material-ui/core";
import MetaTags from "react-meta-tags";
import { useHistory } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// get stripe publish key
import { publishableKey } from "../stripe/config";

// components
import CheckoutForm from "../components/checkout";
import CartSummary from "../components/cart/CartSummary";
// imgs
import Logo from "../assets/logo/logo.png";

// load stripe
const stripePromise = loadStripe(publishableKey);

export default function CheckOut() {
  const history = useHistory();
  return (
    <Elements stripe={stripePromise}>
      <div style={{ overflow: "hidden" }}>
        <div className="mt-3 mb-5">
          <Avatar
            src={Logo}
            className="check-out-logo"
            onClick={() => history.push("/")}
            style={{ height: 70, width: 70, cursor: "pointer" }}
          />
        </div>
        <MetaTags>
          <title>Irielivity Ltd</title>
          <meta
            name="description"
            content="Checkout page of Irielivity Ltd.."
          />
        </MetaTags>

        <Grid container spacing={2}>
          <Grid item lg={6} xs={12} md={6}>
            <CheckoutForm />
          </Grid>
          <Grid item lg={5} xs={12} md={5}>
            <div className="check-out-cart-summary">
              <CartSummary checkOut={true} />
            </div>
          </Grid>
        </Grid>
      </div>
    </Elements>
  );
}
