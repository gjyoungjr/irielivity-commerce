import React from "react";
import { Select, MenuItem, FormControl } from "@material-ui/core";

//components
import {
  ProcessingChip,
  InTransitChip,
  CompletedChip,
  CancelledChip,
} from "../../chips";

export default function Statuses({ value, onChange }) {
  const statuses = ["Processing", "In-Transit", "Completed", "Cancelled"];

  return (
    <FormControl fullWidth>
      <Select
        value={value}
        variant="standard"
        onChange={onChange}
        style={{ fontSize: "inherit" }}
      >
        {statuses.map((status, index) => {
          return (
            <MenuItem key={index} value={status}>
              {status === "Processing" ? (
                <ProcessingChip label={status} />
              ) : status === "In-Transit" ? (
                <InTransitChip label={status} />
              ) : status === "Cancelled" ? (
                <CancelledChip label={status} />
              ) : (
                <CompletedChip label={status} />
              )}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
