import React from "react";

import {default as AccountSetttings } from "../../components/admin/Account";

import DashboardLayout from "../../layouts/DashboardLayout";
export default function Account() {
  return (
    <DashboardLayout>
      <AccountSetttings />
    </DashboardLayout>
  );
}
