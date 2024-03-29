import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

// components
import AppButton from "../app-button";
import CartDrawer from "../cart";
import SizeChart from "../size-chart";

// utils
import { addToCart } from "../../redux/reducers/cart/cartActions";

const ProductDescriptionInfo = ({ product }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [selectedProductSize, setSelectedProductSize] = useState("");
  const [isSizeError, setIsSizeError] = useState(false);
  const [selectedProductColor, setSelectedProductColor] = useState("");
  const [productColors, setProductColors] = useState([]);
  const [showSizeChart, setShowSizeChart] = React.useState(false);
  const [cartDrawerPos, setCartDrawerPos] = useState({
    right: false,
  });

  const handleShowSizeChart = () => {
    setShowSizeChart(true);
  };
  const handleCloseSizeChart = () => {
    setShowSizeChart(false);
  };

  // add products to cart
  const handleAddToCart = (product, anchor, open) => {
    // handle guard if no product
    // or if no selected size was chosen
    if (product.sizes.length > 0) {
      if (selectedProductSize === "") {
        setIsSizeError(true);
        return;
      }
    }

    // dispatch redux action to add product to cart
    dispatch(addToCart(product));
    // display cart drawer after product is added to cart
    setCartDrawerPos({ ...cartDrawerPos, [anchor]: open });
  };

  // // add product to wish list/favorites
  // const handleAddToFavorites = (product) => {
  //   // handle guard if no product
  //   if (!product) return;

  //   // dispatch redux action to add product to favorites
  //   dispatch(addToFavorites(product));
  //   setIsProductFavorited(true);
  // };

  // opens & close cart drawer
  const toggleCartDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setCartDrawerPos({ ...cartDrawerPos, [anchor]: open });
  };

  useEffect(() => {
    if (product && product.colors) setProductColors(product.colors.split(","));
    return;
  }, [product]);

  return (
    <Fragment>
      {/* Cart Drawer */}
      <CartDrawer
        toggleCartDrawer={toggleCartDrawer}
        cartDrawerPos={cartDrawerPos}
      />
      {/* Size Chart */}
      <SizeChart open={showSizeChart} handleClose={handleCloseSizeChart} />

      <div className="product-details-content ml-70 text-left">
        <h2 className="text-left">{product.productName}</h2>

        <div className="product-details-price">
          {product.productDiscount ? (
            <Fragment>
              <span>BZD ${product.productPrice}</span>
              <span className="old">BZD ${product.originalProductPrice}</span>
            </Fragment>
          ) : (
            <span style={{ color: "black" }}>BZD ${product.productPrice} </span>
          )}
        </div>

        <div className="pro-details-list">
          <p>{product ? product.productDescription : ""}</p>
        </div>
        <div className="pro-details-size-color mb-4">
          {product && product.colors ? (
            <div className="pro-details-color-wrap">
              <span>Color</span>
              <div
                className="pro-details-color-content"
                style={{ display: "block" }}
              >
                {productColors && productColors.length > 0
                  ? productColors.map((color) => (
                      <label
                        className={`pro-details-color-content--single ${color.toLowerCase()}`}
                      >
                        <input
                          type="radio"
                          value={product.colors}
                          name="product-color"
                          checked={
                            color === selectedProductColor ? "checked" : ""
                          }
                          onChange={() => {
                            setSelectedProductColor(color);
                          }}
                        />
                        <span className="checkmark"></span>
                      </label>
                    ))
                  : null}
              </div>
            </div>
          ) : (
            ""
          )}

          {product && product.sizes && product.sizes.length ? (
            <div className="pro-details-size">
              <div className="d-flex justify-content-between">
                <span>Select Size</span>
                <span
                  onClick={() => handleShowSizeChart()}
                  style={{ cursor: "pointer", opacity: 0.6 }}
                >
                  Size Guide
                </span>
              </div>
              <div className="pro-details-size-content">
                {product && product.sizes
                  ? product.sizes.map((single, key) => {
                      return (
                        <label
                          className={`pro-details-size-content--single`}
                          key={key}
                        >
                          <input
                            type="radio"
                            value={single}
                            checked={
                              single === selectedProductSize ? "checked" : ""
                            }
                            onChange={() => {
                              setIsSizeError(false);
                              setSelectedProductSize(single);
                            }}
                          />
                          <span className="size-name">{single}</span>
                        </label>
                      );
                    })
                  : ""}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>

        {isSizeError && (
          <p style={{ color: "#fe5252", marginTop: "-10px" }}>
            Please select a size before adding to cart
          </p>
        )}

        <Grid container spacing={2} direction="column">
          <Grid item xs={12} lg={11} md={11}>
            {/* Add To Cart Btn */}
            <div className="pro-details-cart ">
              {product.quantity === 0 || product.quantity < 0 ? (
                <AppButton
                  label="Out of Stock"
                  bgColor="black"
                  color="white"
                  width="100%"
                  height="60px"
                  borderRadius="30px"
                />
              ) : (
                <AppButton
                  label="Add to Cart"
                  bgColor="black"
                  color="white"
                  width="100%"
                  height="60px"
                  borderRadius="30px"
                  onClick={() =>
                    handleAddToCart(
                      {
                        ...product,
                        selectedSize: selectedProductSize,
                        selectedColor: selectedProductColor,
                      },
                      "right",
                      true
                    )
                  }
                />
              )}
            </div>
          </Grid>
          {/* Back to Shop Btn */}
          <Grid item xs={12} lg={11} md={11}>
            <div className="pro-details-cart ">
              <AppButton
                label="Back To Shop"
                bgColor="black"
                color="white"
                width="100%"
                height="60px"
                borderRadius="30px"
                onClick={() => history.push("/shop")}
              />
            </div>
          </Grid>
        </Grid>

        <div className="pro-details-social">
          <ul>
            <li>
              <a
                href="https://www.facebook.com/irielivitystore/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-facebook" />
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/irielivitystore/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-instagram" />
              </a>
            </li>
            <li>
              <a
                href="https://pin.it/MLZvxtY"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-pinterest-p" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

ProductDescriptionInfo.propTypes = {
  product: PropTypes.object,
};

export default ProductDescriptionInfo;
