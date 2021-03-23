import React from "react";
import { Chip } from "@material-ui/core";

//icons
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

export default function CompletedChip({ label }) {
  return (
    <Chip
      label={label}
      icon={<CheckCircleOutlineIcon />}
      style={styles.completed}
    />
  );
}
//comment

const styles = {
  completed: {
    backgroundColor: "rgba(70.0, 203.0, 92.0, .5)",
    color: "black",
    cursor: "pointer",
  },
};
