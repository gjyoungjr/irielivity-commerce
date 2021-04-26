import PropTypes from "prop-types";
import React from "react";
// import { Chip } from "@material-ui/core";

const ShopTopAction = ({ productCount, productType }) => {
  return (
    <div className="shop-top-bar mb-35">
      <div className="select-shoing-wrap">
        <div className="shop-select text-left">
          {/* <Chip label={productType} variant="outlined" /> */}
          <span className="product-types mr-3">{productType}</span>
          <span className="product-types">Demo</span>
        </div>
        <p>{/* Showing {sortedProductCount} of {productCount} result */}</p>
      </div>
    </div>
  );
};

ShopTopAction.propTypes = {
  getFilterSortParams: PropTypes.func,
  getLayout: PropTypes.func,
  productCount: PropTypes.number,
  sortedProductCount: PropTypes.number,
};

export default ShopTopAction;
