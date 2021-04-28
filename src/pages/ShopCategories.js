import React from "react";
import MetaTags from "react-meta-tags";

// layout
import MinimalLayout from "../layouts/MinimalLayout";
//components
import { default as ProductCategories } from "../components/shop/ShopCategories";

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
