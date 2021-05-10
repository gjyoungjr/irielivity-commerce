import React from "react";
import { useHistory } from "react-router-dom";

//icons
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
export default function EmptyCart() {
  const history = useHistory();
  return (
    <div className="cart-empty-wrapper">
      <p className="cart-empty-text">Oops you cart is empty!</p>

      <div className="go-shopping-link" onClick={() => history.push("/shop")}>
        Go Shopping <ArrowRightAltIcon />
      </div>
    </div>
  );
}
