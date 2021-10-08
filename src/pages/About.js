import React from "react";

import AboutUs from "../components/about";

import MinimalLayout from "../layouts/MinimalLayout";

export default function About() {
  return (
    <MinimalLayout showPadding>
      <AboutUs />
    </MinimalLayout>
  );
}
