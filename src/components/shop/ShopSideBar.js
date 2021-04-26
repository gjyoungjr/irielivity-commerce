/* eslint-disable */
import PropTypes from "prop-types";
import React from "react";

import ShopCategories from "../product/ShopCategories";
import ShopColor from "../product/ShopColor";
import ShopSize from "../product/ShopSize";

const ShopSidebar = ({ sideSpaceClass }) => {
  return (
    <div className={`sidebar-style ${sideSpaceClass ? sideSpaceClass : ""}`}>
      {/* filter by categories */}
      <ShopCategories />

      {/* filter by color */}
      <ShopColor />

      {/* filter by size */}
      <ShopSize />
    </div>
  );
};

ShopSidebar.propTypes = {
  getSortParams: PropTypes.func,
  products: PropTypes.array,
  sideSpaceClass: PropTypes.string,
};

export default ShopSidebar;
