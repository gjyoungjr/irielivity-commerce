import React, { Fragment } from "react";
import { IconButton, Drawer, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";

// icons
import CancelIcon from "@material-ui/icons/Cancel";

// utils
import { currencyFormatter } from "../../utils";
import { selectCartItems } from "../../redux/reducers/cart/cartSelectors";

const cartData = [
  {
    documentID: 1,
    mainImgUrl:
      "https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,w_440/bb4a9f2e-5d9e-4351-b361-1d8824e93d49/zoomx-invincible-run-flyknit-womens-running-shoe-8v734r.png",
    productName: "Nike React",
    quantity: 1,
    productPrice: 400,
  },
  {
    documentID: 1,
    mainImgUrl:
      "https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,w_440/bb4a9f2e-5d9e-4351-b361-1d8824e93d49/zoomx-invincible-run-flyknit-womens-running-shoe-8v734r.png",
    productName: "Nike React",
    quantity: 1,
    productPrice: 400,
  },
  {
    documentID: 1,
    mainImgUrl:
      "https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,w_440/bb4a9f2e-5d9e-4351-b361-1d8824e93d49/zoomx-invincible-run-flyknit-womens-running-shoe-8v734r.png",
    productName: "Nike React",
    quantity: 1,
    productPrice: 400,
  },
  {
    documentID: 1,
    mainImgUrl:
      "https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,w_440/bb4a9f2e-5d9e-4351-b361-1d8824e93d49/zoomx-invincible-run-flyknit-womens-running-shoe-8v734r.png",
    productName: "Nike React",
    quantity: 1,
    productPrice: 400,
  },
  {
    documentID: 1,
    mainImgUrl:
      "https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,w_440/bb4a9f2e-5d9e-4351-b361-1d8824e93d49/zoomx-invincible-run-flyknit-womens-running-shoe-8v734r.png",
    productName: "Nike React",
    quantity: 1,
    productPrice: 400,
  },
  {
    documentID: 1,
    mainImgUrl:
      "https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,w_440/bb4a9f2e-5d9e-4351-b361-1d8824e93d49/zoomx-invincible-run-flyknit-womens-running-shoe-8v734r.png",
    productName: "Nike React",
    quantity: 1,
    productPrice: 400,
  },
  {
    documentID: 1,
    mainImgUrl:
      "https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,w_440/bb4a9f2e-5d9e-4351-b361-1d8824e93d49/zoomx-invincible-run-flyknit-womens-running-shoe-8v734r.png",
    productName: "Nike React",
    quantity: 1,
    productPrice: 400,
  },
  {
    documentID: 1,
    mainImgUrl:
      "https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,w_440/bb4a9f2e-5d9e-4351-b361-1d8824e93d49/zoomx-invincible-run-flyknit-womens-running-shoe-8v734r.png",
    productName: "Nike React",
    quantity: 1,
    productPrice: 400,
  },
];
const useStyles = makeStyles({
  paper: {
    backgroundColor: "#fdfbf4",
  },
});

// grabs cart items data
const mapState = createStructuredSelector({
  cartItems: selectCartItems,
});

export default function TemporaryDrawer({ toggleCartDrawer, cartDrawerPos }) {
  const classes = useStyles();
  // access cart data items
  const { cartItems } = useSelector(mapState);

  const list = (anchor) => (
    <div className="shopping-cart-content" style={{ marginTop: "-14px" }}>
      {cartData && cartData.length > 0 ? (
        <Fragment>
          <ul>
            {cartItems.map((single, key) => {
              return (
                <li className="single-shopping-cart" key={key}>
                  <div className="shopping-cart-img">
                    <Link to={`/product/${single.documentID}`}>
                      <img
                        alt=""
                        src={process.env.PUBLIC_URL + single.mainImgUrl}
                        className="img-fluid"
                      />
                    </Link>
                  </div>
                  <div className="shopping-cart-title">
                    <h4>
                      <Link
                        to={
                          process.env.PUBLIC_URL +
                          "/product/" +
                          single.documentID
                        }
                      >
                        {single.productName}
                      </Link>
                    </h4>
                    <h6>Qty: {single.quantity}</h6>
                    <span>
                      BZD {currencyFormatter.format(single.productPrice)}
                    </span>
                  </div>
                  <div className="shopping-cart-delete">
                    <IconButton
                    //   onClick={() => handleRemoveCartItem(single.documentID)}
                    >
                      <CancelIcon style={{ fontSize: "15px" }} />
                    </IconButton>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="shopping-cart-total">
            <h4>
              Total :
              {/* <span className="shop-total">BZD {formatter.format(total)}</span> */}
              {/* <span className="shop-total">BZD {formatter.format(total)}</span> */}
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
        </Fragment>
      ) : (
        <p className="text-center">No items in cart.</p>
      )}
    </div>
  );

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
          {list("right")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
