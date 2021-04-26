import React from "react";
import { useDispatch, useSelector } from "react-redux";

// components
import { default as AddReviewForm } from "./AddReview";
import ProductReviewSingle from "./ProductReviewSingle";
import ViewMore from "./ViewMore";

// utils
import { fetchProductReviewStart } from "../../../../../redux/reducers/products/productsActions";

// grabs state from redux store
const mapState = ({ productsData }) => ({
  _productReviews: productsData.productReviews,
});

export default function ProductReviews({ product, productReviews }) {
  const dispatch = useDispatch();
  const { _productReviews } = useSelector(mapState);
  const { queryDoc, data, isLastPage } = _productReviews;
  const filterType = product.documentID;

  // fetch call for paginaiton
  const handleViewMore = () => {
    dispatch(
      fetchProductReviewStart({
        filterType,
        startAfterDoc: queryDoc,
        persistProducts: data,
      })
    );
  };

  const configViewMore = {
    onViewMoreEvt: handleViewMore,
  };

  return (
    <div className="row">
      <div className="col-lg-9">
        {!productReviews.length && (
          <p>Have your say. Be the first to write a review.</p>
        )}

        {productReviews && productReviews.length
          ? productReviews.map((review, key) => (
              <ProductReviewSingle review={review} key={key} />
            ))
          : ""}

        {!isLastPage && <ViewMore {...configViewMore} />}
      </div>

      <div className="col-lg-3">
        <AddReviewForm product={product} />
      </div>
    </div>
  );
}
