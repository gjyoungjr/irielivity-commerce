import PropTypes from "prop-types";
import React from "react";
import { NavLink } from "react-router-dom";

const productTypes = [
  {
    id: 1,
    label: "All",
    url: "/shop",
  },
  {
    id: 2,
    label: "Jewelry",
    url: "/shop/Jewelry",
  },
  {
    id: 3,
    label: "Clothing",
    url: "/shop/Clothing",
  },
];

const ShopTopAction = ({ productCount, productType }) => {
  return (
    <div className="shop-top-bar mb-35">
      <div className="select-shoing-wrap">
        <div className="shop-select text-center">
          <div className="mb-4">
            <div className="d-flex justify-content-between">
              <div className="product-count">{productCount}</div>
              <div className="product-type">
                {productType ? productType : "All"}
              </div>
              <div></div>
            </div>
          </div>
          <div>
            {productTypes.map((product) => {
              return (
                <NavLink
                  key={product.id}
                  exact
                  className="product-types mr-2"
                  to={product.url}
                  activeStyle={{
                    color: "black",
                    opacity: 1,
                    fontWeight: "bold",
                  }}
                >
                  {product.label},
                </NavLink>
              );
            })}
          </div>
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
