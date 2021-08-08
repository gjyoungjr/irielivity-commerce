import PropTypes from "prop-types";
import React from "react";
import { Grid } from "@material-ui/core";

import ProductDetailsAccordion from "./ProductDetailsAccordion";

const ProductDescriptionTab = ({ spaceBottomClass, product }) => {
  console.log(product, "*");

  return (
    <div className={`description-review-area mt-4 ${spaceBottomClass}`}>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={4} sm={4} md={4}>
          <div className="product-details">Product Details</div>
        </Grid>
        <Grid item xs={12} lg={8} sm={8} md={8}>
          <ProductDetailsAccordion product={product} />
        </Grid>
      </Grid>
    </div>
  );
};

ProductDescriptionTab.propTypes = {
  productFullDesc: PropTypes.string,
  spaceBottomClass: PropTypes.string,
};

export default ProductDescriptionTab;
