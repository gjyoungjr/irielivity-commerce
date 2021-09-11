import PropTypes from "prop-types";
import React from "react";

// component
import ShopTopAction from "./ShopTopAction";

const ShopTopbar = ({ productType, productCount, productCategories }) => {
  return (
    <div style={{ marginTop: "-25px" }}>
      {/* shop top action */}
      <ShopTopAction
        productType={productType}
        productCount={productCount}
        productCategories={productCategories}
      />
    </div>
  );
};

ShopTopbar.propTypes = {
  productCount: PropTypes.number,
  productType: PropTypes.string,
};

export default ShopTopbar;
