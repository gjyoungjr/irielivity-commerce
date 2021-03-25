import React from "react";
import { Grid } from "@material-ui/core";

// components
import MainImage from "./MainImage";
import MainInformation from "./ProductMainInformation";

export default function index({ formField }) {
  return (
    <Grid container spacing={2}>
      <Grid item lg={6}  xs={12}>
        <MainInformation formField={formField} />
      </Grid>
      <Grid item lg={6} xs={12}>
        <MainImage formField={formField} />
      </Grid>
    </Grid>
  );
}
