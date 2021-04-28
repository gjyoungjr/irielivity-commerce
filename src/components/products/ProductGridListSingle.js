import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { Tooltip } from "@material-ui/core";
import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyLoadImage } from "react-lazy-load-image-component";

// // components
// import ProductModal from "./ProductModal";

//utils
// import { removeFavoriteItem } from "../../redux/reducers/favorite/favoriteActions";

//icon
// import FavoriteIcon from "@material-ui/icons/Favorite";

const ProductGridListSingle = ({
  product,
  currency,
  sliderClassName,
  spaceBottomClass,
  favorites,
}) => {
  // const dispatch = useDispatch();

  // handles remove favorite item
  // const handleRemoveFavoriteItem = (product) => {
  //   dispatch(removeFavoriteItem(product));
  // };

  return (
    <Fragment>
      {product.quantity > 0 ? (
        <div
          className={`col-xl-4 col-sm-6  ${
            sliderClassName ? sliderClassName : ""
          }`}
        >
          <div
            className={`product-wrap ${
              spaceBottomClass ? spaceBottomClass : ""
            }`}
          >
            <div className="product-img">
              <Link to={`/product/${product.documentID}`}>
                <LazyLoadImage
                  src={product.mainImgUrl}
                  className="default-img image-prod"
                  alt=""
                  effect="blur"
                />

                {product.mainImgUrl ? (
                  <img
                    className="hover-img"
                    src={
                      product.subImages && product.subImages.length > 0
                        ? product.subImages[0]
                        : ""
                    }
                    alt=""
                  />
                ) : (
                  ""
                )}
              </Link>
              {product.productDiscount || product.new ? (
                <div className="product-img-badges">
                  {product.productDiscount ? (
                    <span className="black">-{product.productDiscount}%</span>
                  ) : (
                    ""
                  )}
                  {product.new ? <span className="black">New</span> : ""}
                </div>
              ) : (
                ""
              )}

              {/* {favorites ? (
                <div className="product-img-badges-1">
                  <span style={styles.deleteIconWrapper}>
                    <Tooltip
                      title="Remove from favorites"
                      aria-label="Remove from favorites"
                    >
                      <FavoriteIcon
                        style={{ fontSize: "18px" }}
                        onClick={() => handleRemoveFavoriteItem(product)}
                      />
                    </Tooltip>
                  </span>
                </div>
              ) : (
                ""
              )} */}
            </div>

            <div className="product-content text-center">
              <h3>
                <Link to={`/product/${product.documentID}`}>
                  {product.productName}
                </Link>
              </h3>

              <div className="product-price">
                {product.productDiscount ? (
                  <Fragment>
                    <span>BZD ${product.productPrice}</span>
                    <span className="old">
                      BZD ${product.originalProductPrice}
                    </span>
                  </Fragment>
                ) : (
                  <span>BZD ${product.productPrice}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </Fragment>
  );
};

ProductGridListSingle.propTypes = {
  currency: PropTypes.object,
  product: PropTypes.object,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
};

export default ProductGridListSingle;
