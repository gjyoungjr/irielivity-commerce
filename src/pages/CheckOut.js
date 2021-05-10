import React from "react";
import { Grid, Avatar } from "@material-ui/core";
// layout

import CheckoutForm from "../components/checkout";
import CartSummary from "../components/cart/CartSummary";

import Logo from "../assets/logo/logo.png";
export default function CheckOut() {
  return (
    <div style={{ overflow: "hidden" }}>
      <div className="mt-3 mb-5">
        <Avatar
          src={Logo}
          className="check-out-logo"
          // onClick={() => history.push("/")}
          style={{ height: 70, width: 70, cursor: "pointer" }}
        />
      </div>
      {/* <MetaTags>
        <title>Zyania Alonzo. Checkout</title>
        <meta
          name="description"
          content="Checkout page of flone react minimalist eCommerce template."
        />
      </MetaTags> */}

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

      {/* <Grid container spacing={2} direction="column">
        <Grid item lg={6} xs={12} md={6}>
          <div
            style={{ marginLeft: "auto", marginRight: "auto", width: "100%" }}
          >
            <CheckoutForm />
          </div>
        </Grid>
        <div className="divider" />
        <Hidden smDown>
          <Grid item lg={5} xs={12} md={5}>
            <div className="check-out-cart-summary">
              <CartSummary checkOut={true} />
            </div>
          </Grid>
        </Hidden>
      </Grid> */}
    </div>
  );
}
