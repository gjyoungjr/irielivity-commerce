import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

import ProductImageGallery from "./ProductImageGallery";
import ProductDescriptionInfo from "./ProductDescriptionInfo";
import ProductImageGallerySideThumb from "./ProductImageGallerySideThumb";
import ProductImageFixed from "./ProductImageFixed";

const ProductImageDescription = ({
  spaceTopClass,
  spaceBottomClass,
  galleryType,
  product,
  currency,
  subImages,
}) => {
  return (
    <div
      className={`shop-area ${spaceTopClass ? spaceTopClass : ""} ${
        spaceBottomClass ? spaceBottomClass : ""
      }`}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6">
            {/* product image gallery */}
            {galleryType === "leftThumb" ? (
              <ProductImageGallerySideThumb
                product={product}
                thumbPosition="left"
                subImages={subImages}
              />
            ) : galleryType === "rightThumb" ? (
              <ProductImageGallerySideThumb product={product} />
            ) : galleryType === "fixedImage" ? (
              <ProductImageFixed product={product} />
            ) : (
              <ProductImageGallery product={product} subImages={subImages} />
            )}
          </div>
          <div className="col-lg-6 col-md-6">
            {/* product description info */}
            <ProductDescriptionInfo product={product} currency={currency} />
          </div>
        </div>
      </div>
    </div>
  );
};

ProductImageDescription.propTypes = {
  currency: PropTypes.object,
  galleryType: PropTypes.string,
  product: PropTypes.object,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
  subImages: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    currency: state.currencyData,
  };
};

export default connect(mapStateToProps)(ProductImageDescription);
