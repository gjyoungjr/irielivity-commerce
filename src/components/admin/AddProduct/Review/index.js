import React from "react";
import { Grid } from "@material-ui/core";
import { useFormikContext } from "formik";

// components
import ReviewMainInformation from "./ReviewMainInformation";
import ReviewVariants from "./ReviewVariants";

export default function Review() {
  // grabs form values
  const { values: formValues } = useFormikContext();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={6} md={6}>
        <ReviewMainInformation formValues={formValues} />
      </Grid>
      <Grid item xs={12} lg={6} md={6}>
        <ReviewVariants formValues={formValues} />
      </Grid>
    </Grid>
  );
}
