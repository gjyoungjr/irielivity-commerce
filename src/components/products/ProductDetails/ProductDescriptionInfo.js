import PropTypes from "prop-types";
import React, { useState, Fragment } from "react";
import {
  Grid,
  AccordionDetails,
  AccordionSummary,
  Accordion,
  Typography,
} from "@material-ui/core";
import { useDispatch } from "react-redux";

// utils
import { addToCart } from "../../../redux/reducers/cart/cartActions";
import { addToFavorites } from "../../../redux/reducers/favorite/favoriteActions";

// components
import AppButton from "../../button/AppButton";
import Notification from "../../snackbar-notif/Notification";
import { default as SizeChart } from "../../size-chart";
import ProductAdditonalInfo from "../ProductDetails/ProductDescriptionTab/ProductAdditonalInfo";

// icon
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const ProductDescriptionInfo = ({ product }) => {
  const dispatch = useDispatch();
  const [selectedProductSize, setSelectedProductSize] = useState("");
  const [isProductAdded, setIsProductAdded] = useState(false);
  const [isProductFavorited, setIsProductFavorited] = useState(false);
  const [isSizeError, setIsSizeError] = useState(false);
  // const [selectedProductColor, setSelectedProductColor] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // add products to cart
  const handleAddToCart = (product) => {
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
    setIsProductAdded(true);
  };

  // add product to wish list/favorites
  const handleAddToFavorites = (product) => {
    // handle guard if no product
    if (!product) return;

    // dispatch redux action to add product to favorites
    dispatch(addToFavorites(product));
    setIsProductFavorited(true);
  };

  return (
    <div className="product-details-content ml-70">
      <Notification
        open={isProductAdded}
        message="Product added to cart"
        onClose={() => setIsProductAdded(false)}
      />
      <Notification
        open={isProductFavorited}
        message="Product added to favorites"
        onClose={() => setIsProductFavorited(false)}
      />
      <SizeChart open={open} handleClose={handleClose} />
      <h2>{product ? product.productName : ""}</h2>
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

        <div className="description-review-bottom">
          <Accordion
            style={{
              marginLeft: "-10px",
              boxShadow: "none",
              borderTop: "1px solid #e5e5e5",
              borderBottom: "1px solid #e5e5e5",
              marginBottom: "-25px",
            }}
            square
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon style={{ color: "black" }} />}
            >
              <Typography className="font-weight-bold">
                Product Details
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ProductAdditonalInfo
                dimensions={product.dimensions}
                materials={product.materials}
                color={product.colors}
              />
            </AccordionDetails>
          </Accordion>
        </div>
      </div>

      <div className="pro-details-size-color mb-4">
        {/* {product && product.colors ? (
          <div className="pro-details-color-wrap">
            <span>Color</span>
            <div
              className="pro-details-color-content"
              style={{ display: "block" }}
            >
              <label
                className={`pro-details-color-content--single ${product.colors}`}
              >
                <input
                  type="radio"
                  value={product.colors}
                  name="product-color"
                  checked={
                    product.colors === selectedProductColor ? "checked" : ""
                  }
                  onChange={() => {
                    setSelectedProductColor(product.colors);
                  }}
                />
                <span className="checkmark"></span>
              </label>
            </div>
          </div>
        ) : (
          ""
        )} */}

        {product && product.sizes && product.sizes.length ? (
          <div className="pro-details-size">
            <div className="d-flex justify-content-between">
              <span>Select Size</span>
              <span
                onClick={() => handleClickOpen()}
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
                  handleAddToCart({
                    ...product,
                    selectedSize: selectedProductSize,
                  })
                }
              />
            )}
          </div>
        </Grid>
        <Grid item xs={12} lg={11} md={11}>
          <div>
            <AppButton
              label={
                <>
                  <span>Favorite</span>
                  <FavoriteBorderIcon
                    style={{ fontSize: "16px", marginLeft: "9px" }}
                  />
                </>
              }
              bgColor="white"
              color="black"
              border="1px solid grey"
              width="100%"
              height="60px"
              borderRadius="30px"
              onClick={() => handleAddToFavorites(product)}
            />
          </div>
        </Grid>
      </Grid>

      <div className="pro-details-social">
        <ul>
          <li>
            <a href="https://www.facebook.com/zyaalonzo" target="#">
              <i className="fa fa-facebook" />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/zyaniaalonzo/" target="#">
              <i className="fa fa-instagram" />
            </a>
          </li>
          {/* <li>
            <a href="//pinterest.com">
              <i className="fa fa-pinterest-p" />
            </a>
          </li> */}
          {/* <li>
            <a href="//twitter.com">
              <i className="fa fa-twitter" />
            </a>
          </li>
          <li>
            <a href="//linkedin.com">
              <i className="fa fa-linkedin" />
            </a>
          </li> */}
        </ul>
      </div>
    </div>
  );
};

ProductDescriptionInfo.propTypes = {
  addToCart: PropTypes.func,
  product: PropTypes.object,
};

export default ProductDescriptionInfo;
