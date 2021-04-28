import PropTypes from "prop-types";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const productTypes = [
  {
    id: 1,
    label: "All",
    url: "/shop",
  },
  {
    id: 2,
    label: "T-Shirt",
    url: "/shop/T-Shirt",
  },
  {
    id: 3,
    label: "Jewelry",
    url: "/shop/Jewelry",
  },
];

const ShopTopAction = ({ productCount, productType }) => {
  const [selectedProductType, setSelectedProductType] = useState(null);
  return (
    <div className="shop-top-bar mb-35">
      <div className="select-shoing-wrap">
        <div className="shop-select text-left">
          {productTypes.map((product) => {
            return (
              <NavLink
                key={product.id}
                onClick={() => setSelectedProductType(product.url)}
                exact
                className="product-types mr-4"
                to={product.url}
                activeStyle={{
                  backgroundColor: "black",
                  color: "white",
                }}
              >
                {product.label}
                {selectedProductType === product.url ? (
                  <span>({productCount})</span>
                ) : (
                  ""
                )}
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
};

ShopTopAction.propTypes = {
  productCount: PropTypes.number,
  sortedProductCount: PropTypes.number,
  productType: PropTypes.string,
};

export default ShopTopAction;
