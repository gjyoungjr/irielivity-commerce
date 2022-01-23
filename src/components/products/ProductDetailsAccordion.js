import React from "react";
// components
import ProductAccordion from "../accordion";

export default function ProductDetailsAccordion({ product }) {
  const { materials, dimensions } = product;

  return (
    <div style={{ borderTop: "1px solid grey" }}>
      {materials && <ProductAccordion label="Materials" data={materials} />}
      {dimensions && <ProductAccordion label="Dimensions" item={dimensions} />}
      {product.colors && (
        <ProductAccordion label="Colors" data={product.colors.split(",")} />
      )}
    </div>
  );
}
