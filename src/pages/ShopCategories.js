import React from "react";
import MetaTags from "react-meta-tags";

// layout
import MinimalLayout from "../layouts/MinimalLayout";
//components
import ProductCategories from "../components/shop-categories";

export default function ShopCategories() {
  return (
    <MinimalLayout>
      <MetaTags>
        <title>Irielivity Ltd</title>
      </MetaTags>
      <ProductCategories />
    </MinimalLayout>
  );
}
