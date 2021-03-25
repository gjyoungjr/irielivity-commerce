import React from "react";
import MetaTags from "react-meta-tags";

// layout
import MinimalLayout from "../layouts/MinimalLayout";

// components
import MembersSettings from "../components/members-settings";

export default function OrderHistory() {
  return (
    <MinimalLayout>
      <MetaTags>
        <title>Irielivity Ltd. Members</title>
      </MetaTags>
      <MembersSettings />
    </MinimalLayout>
  );
}
