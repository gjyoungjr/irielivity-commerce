import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

export default function ShopTopAction({
  productCount,
  productType,
  productCategories,
}) {
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
            {productCategories.map((product, idx) => {
              return (
                <NavLink
                  key={product.value}
                  exact
                  className="product-types mr-2"
                  to={`/shop/${product.label}`}
                  activeStyle={{
                    color: "black",
                    opacity: 1,
                    fontWeight: "bold",
                  }}
                >
                  {productCategories.length !== idx + 1 ? (
                    <>{product.label} ,</>
                  ) : (
                    <>{product.label}</>
                  )}
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

ShopTopAction.propTypes = {
  productCount: PropTypes.number,
  sortedProductCount: PropTypes.number,
  productType: PropTypes.string,
};
