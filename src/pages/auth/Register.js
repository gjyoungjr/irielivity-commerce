import React from "react";
// layouts
import MinimalLayout from "../../layouts/MinimalLayout";

// components
import { RegisterForm } from "../../components/auth";

export default function Register() {
  return (
    <MinimalLayout>
      <RegisterForm />
    </MinimalLayout>
  );
}
