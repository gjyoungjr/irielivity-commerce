import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Grid } from "@material-ui/core";

// components
import AppButton from "../app-button";
import CartDrawer from "../cart";
const ProductDescriptionInfo = ({ product }) => {
  const [selectedProductSize, setSelectedProductSize] = useState("");
  // const [isProductAdded, setIsProductAdded] = useState(false);
  // const [isProductFavorited, setIsProductFavorited] = useState(false);
  const [isSizeError, setIsSizeError] = useState(false);
  // const [selectedProductColor, setSelectedProductColor] = useState("");
  // const [open, setOpen] = React.useState(false);
  const [cartDrawerPos, setCartDrawerPos] = React.useState({
    right: false,
  });

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  // const handleClose = () => {
  //   setOpen(false);
  // };

  // // add products to cart
  // const handleAddToCart = (product) => {
  //   // handle guard if no product
  //   // or if no selected size was chosen
  //   if (product.sizes.length > 0) {
  //     if (selectedProductSize === "") {
  //       setIsSizeError(true);
  //       return;
  //     }
  //   }

  //   // dispatch redux action to add product to cart
  //   dispatch(addToCart(product));
  //   setIsProductAdded(true);
  // };

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
  return (
    <Fragment>
      {/* Cart Drawer */}
      <CartDrawer
        toggleCartDrawer={toggleCartDrawer}
        cartDrawerPos={cartDrawerPos}
      />
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
                  // onClick={() => handleClickOpen()}
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
                  onClick={toggleCartDrawer("right", true)}
                  // onClick={() =>
                  //   handleAddToCart({
                  //     ...product,
                  //     selectedSize: selectedProductSize,
                  //   })
                  // }
                />
              )}
            </div>
          </Grid>
          {/* <Grid item xs={12} lg={11} md={11}>
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
        </Grid> */}
        </Grid>

        {/* {product.variation ? (
        <div className="pro-details-size-color">
          <div className="pro-details-color-wrap">
            <span>Color</span>
            <div className="pro-details-color-content">
              {product.variation.map((single, key) => {
                return (
                  <label
                    className={`pro-details-color-content--single ${single.color}`}
                    key={key}
                  >
                    <input
                      type="radio"
                      value={single.color}
                      name="product-color"
                      checked={
                        single.color === selectedProductColor ? "checked" : ""
                      }
                      onChange={() => {
                        setSelectedProductColor(single.color);
                        setSelectedProductSize(single.size[0].name);
                        setProductStock(single.size[0].stock);
                        setQuantityCount(1);
                      }}
                    />
                    <span className="checkmark"></span>
                  </label>
                );
              })}
            </div>
          </div>
          <div className="pro-details-size">
            <span>Size</span>
            <div className="pro-details-size-content">
              {product.variation &&
                product.variation.map((single) => {
                  return single.color === selectedProductColor
                    ? single.size.map((singleSize, key) => {
                        return (
                          <label
                            className={`pro-details-size-content--single`}
                            key={key}
                          >
                            <input
                              type="radio"
                              value={singleSize.name}
                              checked={
                                singleSize.name === selectedProductSize
                                  ? "checked"
                                  : ""
                              }
                              onChange={() => {
                                setSelectedProductSize(singleSize.name);
                                setProductStock(singleSize.stock);
                                setQuantityCount(1);
                              }}
                            />
                            <span className="size-name">{singleSize.name}</span>
                          </label>
                        );
                      })
                    : "";
                })}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {product.affiliateLink ? (
        <div className="pro-details-quality">
          <div className="pro-details-cart btn-hover ml-0">
            <a
              href={product.affiliateLink}
              rel="noopener noreferrer"
              target="_blank"
            >
              Buy Now
            </a>
          </div>
        </div>
      ) : (
        <div className="pro-details-quality">
          <div className="cart-plus-minus">
            <button
              onClick={() =>
                setQuantityCount(quantityCount > 1 ? quantityCount - 1 : 1)
              }
              className="dec qtybutton"
            >
              -
            </button>
            <input
              className="cart-plus-minus-box"
              type="text"
              value={quantityCount}
              readOnly
            />
            <button
              onClick={() =>
                setQuantityCount(
                  quantityCount < productStock - productCartQty
                    ? quantityCount + 1
                    : quantityCount
                )
              }
              className="inc qtybutton"
            >
              +
            </button>
          </div>
          <div className="pro-details-cart btn-hover">
            {productStock && productStock > 0 ? (
              <button
                onClick={() =>
                  addToCart(
                    product,
                    addToast,
                    quantityCount,
                    selectedProductColor,
                    selectedProductSize
                  )
                }
                disabled={productCartQty >= productStock}
              >
                {" "}
                Add To Cart{" "}
              </button>
            ) : (
              <button disabled>Out of Stock</button>
            )}
          </div>
          <div className="pro-details-wishlist">
            <button
              className={wishlistItem !== undefined ? "active" : ""}
              disabled={wishlistItem !== undefined}
              title={
                wishlistItem !== undefined
                  ? "Added to wishlist"
                  : "Add to wishlist"
              }
              onClick={() => addToWishlist(product, addToast)}
            >
              <i className="pe-7s-like" />
            </button>
          </div>
          <div className="pro-details-compare">
            <button
              className={compareItem !== undefined ? "active" : ""}
              disabled={compareItem !== undefined}
              title={
                compareItem !== undefined
                  ? "Added to compare"
                  : "Add to compare"
              }
              onClick={() => addToCompare(product, addToast)}
            >
              <i className="pe-7s-shuffle" />
            </button>
          </div>
        </div>
      )}
      {product.category ? (
        <div className="pro-details-meta">
          <span>Categories :</span>
          <ul>
            {product.category.map((single, key) => {
              return (
                <li key={key}>
                  <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                    {single}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        ""
      )}
      {product.tag ? (
        <div className="pro-details-meta">
          <span>Tags :</span>
          <ul>
            {product.tag.map((single, key) => {
              return (
                <li key={key}>
                  <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                    {single}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        ""
      )}  */}

        <div className="pro-details-social">
          <ul>
            <li>
              <a href="//facebook.com">
                <i className="fa fa-facebook" />
              </a>
            </li>
            <li>
              <a href="//dribbble.com">
                <i className="fa fa-dribbble" />
              </a>
            </li>
            <li>
              <a href="//pinterest.com">
                <i className="fa fa-pinterest-p" />
              </a>
            </li>
            <li>
              <a href="//twitter.com">
                <i className="fa fa-twitter" />
              </a>
            </li>
            <li>
              <a href="//linkedin.com">
                <i className="fa fa-linkedin" />
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
