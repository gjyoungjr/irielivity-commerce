import React from "react";
import { Chip } from "@material-ui/core";

//icons
import BlockIcon from "@material-ui/icons/Block";

export default function CancelledChip({ label }) {
  return (
    <Chip
      label={label}
      icon={<BlockIcon style={styles.icon} />}
      style={styles.cancelled}
    />
  );
}
//comment

const styles = {
  cancelled: {
    backgroundColor: "#f6003c",
    color: "white",
    cursor: "pointer",
  },
  icon: {
    color: "white",
  },
};
