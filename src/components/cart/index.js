import React from "react";
import { Drawer, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";

// util fxn
import { selectCartTotal } from "../../redux/reducers/cart/cartSelectors";
import { currencyFormatter } from "../../utils";

import { selectCartItems } from "../../redux/reducers/cart/cartSelectors";
import CartItemSingle from "./CartItemSingle";
import EmptyCart from "./EmptyCart";

// grabs cart items data
const mapState = createStructuredSelector({
  cartItems: selectCartItems,
});

// grabs cart items data
const mapCartTotalState = createStructuredSelector({
  total: selectCartTotal,
});

export default function TemporaryDrawer({ toggleCartDrawer, cartDrawerPos }) {
  const classes = useStyles();
  // access cart data items
  const { cartItems } = useSelector(mapState);
  // grabs cart total price
  const { total } = useSelector(mapCartTotalState);

  return (
    <div>
      <React.Fragment>
        <Drawer
          classes={{ paper: classes.paper }}
          anchor={"right"}
          open={cartDrawerPos["right"]}
          onClose={toggleCartDrawer("right", false)}
          transitionDuration={{ enter: 650, exit: 350 }}
        >
          {cartItems && cartItems.length ? (
            <div>
              {cartItems.map((cartItem) => (
                <CartItemSingle
                  product={cartItem}
                  key={cartItem.productID}
                  anchor="right"
                />
              ))}
              <div className="cart-total-wrapper">
                <div className="shopping-cart-total">
                  <h4 className="font-weight-bold">
                    Total :
                    <span className="shop-total font-weight-bold">
                      BZD {currencyFormatter.format(total)}
                    </span>
                  </h4>
                </div>
                <div className="shopping-cart-btn text-center">
                  <Link
                    className="default-btn"
                    style={{ textTransform: "none" }}
                    to={process.env.PUBLIC_URL + "/checkout"}
                  >
                    Checkout
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <EmptyCart />
          )}
        </Drawer>
      </React.Fragment>
    </div>
  );
}

// const useStyles = makeStyles((theme) =>{
//   paper: {
//     backgroundColor: "#fdfbf4",
//     width: "auto",
//     [theme.breakpoints.down("sm")]: {
//       width: 290,
//     },
//   },
// });

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: "#fdfbf4",
    width: "auto",
    // [theme.breakpoints.down("sm")]: {
    //   width: 300,
    // },
  },
}));
