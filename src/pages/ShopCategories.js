import React, { useEffect } from "react";
import MetaTags from "react-meta-tags";
import { useDispatch } from "react-redux";

// layout
import MinimalLayout from "../layouts/MinimalLayout";
//components
import { default as ProductCategories } from "../components/shop/ShopCategories";

// redux action
import { fetchProductCategories } from "../redux/reducers/products/productsActions";

export default function ShopCategories() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductCategories());
  }, [dispatch]);
  return (
    <MinimalLayout>
      <MetaTags>
        <title>Irielivity Ltd</title>
      </MetaTags>
      <ProductCategories />
    </MinimalLayout>
  );
}
