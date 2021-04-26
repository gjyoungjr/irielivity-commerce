import PropTypes from "prop-types";
import React from "react";

// components
import ProductGridList from "../products/ProductGridList";

const ShopProducts = ({ products, layout, favorites }) => {
  return (
    <div className="shop-bottom-area mt-35">
      <div className={`row ${layout ? layout : ""}`}>
        <ProductGridList
          products={products}
          spaceBottomClass="mb-25"
          favorites={favorites}
        />
      </div>
    </div>
  );
};

ShopProducts.propTypes = {
  layout: PropTypes.string,
  products: PropTypes.array,
};

export default ShopProducts;
