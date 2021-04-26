import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { connect } from "react-redux";

// // components
import ProductGridListSingle from "./ProductGridListSingle";
// import Loading from "../loading-progress/Loading";

const ProductGrid = ({
  products,
  currency,
  favorites,
  sliderClassName,
  spaceBottomClass,
}) => {
  // error handling if no products found
  // if (!products.length) {
  //   return <Loading />;
  // }
  return (
    <Fragment>
      {products.map((product, index) => {
        return (
          <ProductGridListSingle
            sliderClassName={sliderClassName}
            spaceBottomClass={spaceBottomClass}
            product={product}
            currency={currency}
            key={index}
            favorites={favorites}
          />
        );
      })}
    </Fragment>
  );
};

ProductGrid.propTypes = {
  products: PropTypes.array,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    currency: state.currencyData,
  };
};

export default connect(mapStateToProps)(ProductGrid);
