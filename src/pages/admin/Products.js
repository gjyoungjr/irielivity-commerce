import React from "react";

// component 
import { default as ProductList } from "../../components/admin/Products";

// layout 
import DashboardLayout from "../../layouts/DashboardLayout";

export default function Products() {
  return (
    <DashboardLayout>
      <ProductList />
    </DashboardLayout>
  );
}
