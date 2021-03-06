import React from "react";

// layouts
import MinimalLayout from "../../layouts/MinimalLayout";

// components
import {LoginForm} from "../../components/auth";

export default function Login() {
  return (
    <MinimalLayout>
      <LoginForm />
    </MinimalLayout>
  );
}

