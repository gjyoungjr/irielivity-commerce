import React from "react";
import { Chip } from "@material-ui/core";

//icons
import LocalShippingIcon from "@material-ui/icons/LocalShipping";

export default function InTransitChip({ label }) {
  return (
    <Chip
      label={label}
      icon={<LocalShippingIcon style={{ fontSize: "18px" }} />}
      style={styles.inTransit}
    />
  );
}

const styles = {
  inTransit: {
    backgroundColor: "rgba(255,245,145, 1)",
    color: "black",
    cursor: "pointer",
  },
};
