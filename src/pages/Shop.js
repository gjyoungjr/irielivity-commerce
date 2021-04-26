/* eslint-disable */
import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import { useSelector, useDispatch } from "react-redux";
// import Breadcrumb from "../wrappers/breadcrumb/Breadcrumb";
import { useParams } from "react-router-dom";

// layout
import MinimalLayout from "../layouts/MinimalLayout";

// components
import ShopProducts from "../components/shop/ShopProducts";
// import ShopSidebar from "../components/shop/ShopSideBar";
import ShopTopBar from "../components/shop/ShopTopBar";

// utils
import { fetchProductsStart } from "../redux/reducers/products/productsActions";

// grabs product from redux store
const mapState = ({ productsData }) => ({
  products: productsData.products,
});

const Shop = ({ location }) => {
  const dispatch = useDispatch();

  // destructure props from router link
  const { pathname } = location;
  // const { filterType } = state;
  const { filterType } = useParams();

  // destructure to get products from redux
  const { products } = useSelector(mapState);

  useEffect(() => {
    // fetch products from db when component mounts
    dispatch(fetchProductsStart({ filterType }));
  }, [dispatch, filterType]);

  // return only products that are in stock
  // where quanity is greater than 0
  const productsInStock = products.filter((product) => product.quantity > 0);

  return (
    <Fragment>
      <MetaTags>
        <title>Shop </title>
        <meta name="description" content="Shop" />
      </MetaTags>

      <MinimalLayout>
        <div className="shop-area pt-95 pb-100">
          <div className="container-fluid">
            <div className="row">
              {/* <div className="col-lg-2 order-2 order-lg-1">
                {/* shop sidebar 
                <ShopSidebar products={products} sideSpaceClass="mr-30" />
              </div> */}
              <div className="col-lg-12 order-1 order-lg-2">
                {/* shop topbar default */}
                <ShopTopBar
                  productType={filterType}
                  productCount={productsInStock.length}
                />

                {/* shop page content default */}
                <ShopProducts products={products} />

                {/* shop product pagination
                <div className="pro-pagination-style text-center mt-30">
                  {/* <Paginator
                    totalRecords={sortedProducts.length}
                    pageLimit={pageLimit}
                    pageNeighbours={2}
                    setOffset={setOffset}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    pageContainerClass="mb-0 mt-0"
                    pagePrevText="«"
                    pageNextText="»"
                  /> *
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </MinimalLayout>
    </Fragment>
  );
};

Shop.propTypes = {
  location: PropTypes.object,
  products: PropTypes.array,
};

export default Shop;
