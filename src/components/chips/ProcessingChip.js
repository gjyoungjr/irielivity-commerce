import React from "react";
import { Chip } from "@material-ui/core";

//icons
import AutorenewIcon from "@material-ui/icons/Autorenew";

export default function ProcessingChip({ label }) {
  return (
    <Chip label={label} icon={<AutorenewIcon />} style={styles.processing} />
  );
}

const styles = {
  processing: {
    backgroundColor: "rgba(23.0, 82.0, 255.0, .2)",
    color: "black",
    cursor: "pointer",
  },
};
