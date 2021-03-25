import React from "react";

// components
import ProductVariants from "./ProductVariants";
import ImageUpload from "./ImageUpload";

export default function Variants({ formField }) {
  return (
    <>
      <ProductVariants formField={formField} />
      <ImageUpload formField={formField} />
    </>
  );
}
