import React, { useState, useEffect } from "react";
import {
  Card,
  makeStyles,
  CardHeader,
  Grid,
  Divider,
  CardContent,
  Chip,
} from "@material-ui/core";
import ChipInput from "material-ui-chip-input";
import { useFormikContext, FieldArray } from "formik";

//icons
import CancelIcon from "@material-ui/icons/Cancel";
// components
import { InputField, SelectField } from "../../../forms/FormFields";

// helper fxn to render chips
const chipRenderer = ({ chip, className, handleClick, handleDelete }, key) => {
  return (
    <Chip
      className={className}
      key={key}
      label={chip}
      onClick={handleClick}
      onDelete={handleDelete}
      deleteIcon={<CancelIcon style={{ color: "black" }} />}
      style={{
        backgroundColor: "rgba(23.0, 82.0, 255.0, .2)",
        color: "black",
      }}
    />
  );
};

const useStyles = makeStyles(() => ({
  title: {
    fontWeight: "600",
    textAlign: "center",
  },
  bottomSpacer: {
    marginBottom: "18px",
  },
  topSpacer: {
    marginTop: "18px",
  },
  card: {
    borderRadius: "15px",
    marginTop: "20px",
    marginBottom: "10px",
  },
  chip: {
    backgroundColor: "rgba(23.0, 82.0, 255.0, .2)",
    color: "rgba(23.0, 82.0, 255.0, 5)",
  },
  helperText: {
    color: "red",
  },
}));

const productFits = [
  {
    value: " True To Size",
    label: "True To Size",
  },
  {
    value: "Fits Big",
    label: "Fits Big",
  },
  {
    value: "Slim Fit",
    label: "Slim Fit",
  },
];

// const productColors = [
//   {
//     label: "Muave",
//     value: "mauve",
//   },
//   {
//     label: "Berry",
//     value: "berry",
//   },
//   {
//     label: "Sheer Lavender",
//     value: "sheer-lavender",
//   },
//   {
//     label: "Drift Wood",
//     value: "driftwood",
//   },
//   {
//     label: "Tan",
//     value: "tan",
//   },
//   {
//     label: "Coffee",
//     value: "coffee",
//   },
// ];

export default function ProductVariants({ formField }) {
  // styles declaration
  const classes = useStyles();
  // stores error msg
  const [materialsErrorMsg, setMaterialsErrorMsg] = useState([]);
  // boolean state for error msg
  const [isMaterialsError, setIsMaterialsError] = useState(false);

  // grabs values & errors from formik
  const { values, errors } = useFormikContext();
  // destructure props
  const { fit, materials, sizes, dimensions, quantity, colors } = formField;

  useEffect(() => {
    // if errors exists
    if (errors && !values.materials.length) {
      // grabs error for materials field
      const { materials } = errors;
      // & if there is an error for materials
      // store it & set bool state to true
      if (materials) {
        setMaterialsErrorMsg(materials);
        setIsMaterialsError(true);
      }
    }
  }, [errors, values.materials]);

  return (
    <Card className={classes.card} elevation={10}>
      <CardHeader
        title="Product Variants"
        className={classes.title}
        titleTypographyProps={{
          style: {
            fontWeight: "600",
          },
        }}
      />
      <Divider className="ml-3 mr-3 mb-2" />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={4} md={4}>
            <FieldArray
              name="materials"
              render={(arrayHelpers) => (
                <ChipInput
                  chipRenderer={chipRenderer}
                  name={materials.name}
                  label={materials.label}
                  value={values.materials}
                  onAdd={(chip) => {
                    setIsMaterialsError(false);
                    arrayHelpers.push(chip);
                  }}
                  onDelete={(chip, index) => arrayHelpers.remove(index, chip)}
                  fullWidth
                  variant="outlined"
                  helperText={isMaterialsError && materialsErrorMsg}
                  classes={{ helperText: classes.helperText }}
                  error={isMaterialsError}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} lg={4} md={4}>
            <SelectField
              name={fit.name}
              label={fit.label}
              data={productFits}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} lg={4} md={4}>
            <InputField
              name={quantity.name}
              label={quantity.label}
              fullWidth
              variant="outlined"
              type="number"
            />
          </Grid>
          <Grid item xs={12} lg={4} md={4}>
            <FieldArray
              name="sizes"
              render={(arrayHelpers) => (
                <ChipInput
                  chipRenderer={chipRenderer}
                  name={sizes.name}
                  label={sizes.label}
                  value={values.sizes}
                  onAdd={(chip) => arrayHelpers.push(chip)}
                  onDelete={(chip, index) => arrayHelpers.remove(index, chip)}
                  fullWidth
                  variant="outlined"
                />
              )}
            />
          </Grid>
          <Grid item xs={12} lg={4} md={4}>
            <InputField
              name={dimensions.name}
              label={dimensions.label}
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} lg={4} md={4}>
            <FieldArray
              name="colors"
              render={(arrayHelpers) => (
                <ChipInput
                  chipRenderer={chipRenderer}
                  name={colors.name}
                  label={colors.label}
                  value={
                    typeof values.colors === "string"
                      ? values.colors.split()
                      : values.colors
                  }
                  onAdd={(chip) => {
                    // setIsMaterialsError(false);
                    console.log(chip, "chip");
                    arrayHelpers.push(chip);
                  }}
                  onDelete={(chip, index) => arrayHelpers.remove(index, chip)}
                  fullWidth
                  variant="outlined"
                  // helperText={isMaterialsError && materialsErrorMsg}
                  classes={{ helperText: classes.helperText }}
                  // error={isMaterialsError}
                />
              )}
            />
            {/* <InputField
              name={colors.name}
              label={colors.label}
              variant="outlined"
              fullWidth
            /> */}
          </Grid>
          <pre>{JSON.stringify(values, null, 2)}</pre>
        </Grid>
      </CardContent>
    </Card>
  );
}
