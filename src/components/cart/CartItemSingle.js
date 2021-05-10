import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import {
  IconButton,
  ButtonGroup,
  Button,
  Typography,
  Badge,
  makeStyles,
} from "@material-ui/core";
import { useDispatch } from "react-redux";

// icons
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
// util fxn
import { currencyFormatter } from "../../utils";
import {
  removeCartItem,
  addToCart,
  reduceCartItem,
} from "../../redux/reducers/cart/cartActions";

export default function CartItemSingle({ product, anchor }) {
  const dispatch = useDispatch();
  const classes = useStyles();

  // removes item from cart
  const handleRemoveCartItem = (documentID) => {
    dispatch(removeCartItem({ documentID }));
  };
  //add items to cart
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  // handle reduce cart items
  const handleReduceCartItem = (product) => {
    dispatch(reduceCartItem(product));
  };

  return (
    <div className="shopping-cart-content" style={{ marginTop: "-14px" }}>
      <Fragment>
        <ul>
          <li className="product-shopping-cart">
            <div className="shopping-cart-img">
              <Link to={`/product/${product.documentID}`}>
                <img
                  alt=""
                  src={process.env.PUBLIC_URL + product.mainImgUrl}
                  className="img-fluid"
                />
              </Link>
            </div>
            <div className="shopping-cart-title">
              <Typography noWrap>
                <Link
                  to={process.env.PUBLIC_URL + "/product/" + product.documentID}
                >
                  {product.productName}
                </Link>
              </Typography>
              <div style={{ width: "10%" }}>
                <ButtonGroup>
                  <Button
                    // disabled={isFetchedOrders}
                    style={styles.btn}
                    onClick={() => handleReduceCartItem(product)}
                  >
                    -
                  </Button>
                  <div className="text-center mt-1">
                    <Badge
                      badgeContent={product.quantity}
                      classes={{ badge: classes.customBadge }}
                    />
                  </div>
                  <Button
                    // disabled={isFetchedOrders || product.quantity > 1}
                    style={styles.btn}
                    onClick={() => handleAddToCart(product)}
                  >
                    <span>+</span>
                  </Button>
                </ButtonGroup>
                {/* <h6>Qty: {product.quantity}</h6> */}
              </div>
              <span>BZD {currencyFormatter.format(product.productPrice)}</span>
            </div>
            <div className="shopping-cart-delete">
              <IconButton
                onClick={() => handleRemoveCartItem(product.documentID)}
              >
                <DeleteForeverIcon style={{ fontSize: "18px" }} />
              </IconButton>
            </div>
          </li>
        </ul>
      </Fragment>
    </div>
  );
}

const styles = {
  btn: {
    backgroundColor: "transparent",
    borderRadius: "none",
    border: "none",
    width: "10px",
    // height: "30px",
    // width: "20px",
    // color: "white",
    // padding: "5px",
    // borderRadius: "50%",
  },
  actions: {
    top: "12px",
    position: "relative",
  },
  deleteAction: {
    cursor: "pointer",
    color: "red",
  },
  disabledDeleteAction: {
    color: "red",
  },
};

const useStyles = makeStyles((theme) => ({
  customBadge: {
    backgroundColor: "black",
    color: "white",
  },
}));
