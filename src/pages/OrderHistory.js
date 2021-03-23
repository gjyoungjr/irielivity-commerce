import React from "react";
import MetaTags from "react-meta-tags";

// layout
import MinimalLayout from "../layouts/MinimalLayout";

// components
import Orders from "../components/orders";
export default function OrderHistory() {
  return (
    <MinimalLayout>
      <MetaTags>
        <title>Irielivity Ltd. Members</title>
      </MetaTags>
      <Orders />
    </MinimalLayout>
  );
}
