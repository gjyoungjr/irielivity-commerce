import PropTypes from "prop-types";
import React, { Fragment, useEffect } from "react";
import MetaTags from "react-meta-tags";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

// utils
import {
  fetchProductStart,
  setProduct,
  fetchProductReviewStart,
  setProductReview,
} from "../redux/reducers/products/productsActions";

import RelatedProductSlider from "../wrappers/product/RelatedProductSlider";
import ProductDescriptionTab from "../components/products/ProductDescriptionTab";
import ProductImageDescriptionSticky from "../wrappers/product/ProductImageDescriptionSticky";
// layout
import MinimalLayout from "../layouts/MinimalLayout";

const mapState = ({ productsData }) => ({
  product: productsData.product,
});

export default function ProductSticky() {
  const dispatch = useDispatch();
  // grabs productId from url params
  const { productID } = useParams();
  // destructure to get product from redux store
  const { product } = useSelector(mapState);

  // fetch product data on component mount
  useEffect(() => {
    const filterType = productID;
    // fetch product & product review based on proudctId that was passed
    dispatch(fetchProductStart(productID));
    dispatch(fetchProductReviewStart({ filterType }));

    // set values back to blank on leaving component
    // prevents ui bugs
    return () => {
      dispatch(setProduct({}));
      dispatch(setProductReview({}));
    };
  }, [dispatch, productID]);

  return (
    <MinimalLayout>
      <Fragment>
        <MetaTags>
          <title>Flone | Product Page</title>
          <meta
            name="description"
            content="Product page of flone react minimalist eCommerce template."
          />
        </MetaTags>

        {/* product description with image */}
        <ProductImageDescriptionSticky
          spaceTopClass="mt-100"
          spaceBottomClass="mb-100"
          product={product}
        />

        {/* product description tab */}
        <ProductDescriptionTab
          spaceBottomClass="pb-90"
          // productFullDesc={product.fullDescription}
        />

        {/* related product slider */}
        <RelatedProductSlider
          spaceBottomClass="pb-95"
          // category={product.category[0]}
        />
      </Fragment>
    </MinimalLayout>
  );
}

ProductSticky.propTypes = {
  location: PropTypes.object,
  product: PropTypes.object,
};
