/* eslint-disable */
import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  makeStyles,
  InputAdornment,
  Grid,
} from "@material-ui/core";
import { useFormikContext } from "formik";

// utils
import { firestore } from "../../../../firebase/utils";

// components
import { InputField, SelectField } from "../../../forms/FormFields";

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
}));

export default function MainInformationForm({ formField }) {
  // styles declaration
  const classes = useStyles();
  // grabs fields from props
  const {
    productDescription,
    productName,
    productPrice,
    category,
    subCategory,
    productDiscount,
  } = formField;
  // stores fetch categories from db
  const [fetchedCategories, setFetchedCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  // grabs value from formik context
  const { values } = useFormikContext();

  useEffect(() => {
    let mounted = true;

    // get sub category based on main category selected
    const getSubCategories = () => {
      let _subCategories = [];
      if (values.category) {
        // search catgories for a specific category
        const foundCategory = fetchedCategories.find((item) => {
          return item.value === values.category;
        });
        // if found extract its sub categories
        // push it as objects into a new array
        foundCategory.subCategories.map((item, index) => {
          _subCategories.push({ value: index + 1, label: item });
        });
      }
      return _subCategories;
    };

    // create ref to collection
    const productCategoriesRef = firestore.collection("productCategories");

    productCategoriesRef.get().then((snapshot) => {
      // stores categories
      const categories = [];
      //maps through each category and pushes it into array
      snapshot.forEach((doc) => {
        categories.push({ ...doc.data() });
      });
      // then set state with data
      setFetchedCategories(categories);
    });

    // if data is present
    if (fetchedCategories.length) {
      // call helper fxn to set state for sub categories
      setSubCategories(getSubCategories());
    }

    return () => {
      mounted = false;
    };
  }, [values.category]);

  return (
    <Card className={classes.card} elevation={10}>
      <CardHeader
        title="Product Main Information"
        className={classes.title}
        titleTypographyProps={{
          style: {
            fontWeight: "600",
          },
        }}
      />
      <Divider className="ml-3 mr-3 mb-2" />

      <CardContent>
        <InputField
          name={productName.name}
          label={productName.label}
          variant="outlined"
          fullWidth
          className={classes.bottomSpacer}
        />

        <Grid container spacing={3} className={classes.bottomSpacer}>
          <Grid item xs={12} lg={8} md={8}>
            <InputField
              name={productPrice.name}
              label={productPrice.label}
              variant="outlined"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} lg={4} md={4}>
            <InputField
              name={productDiscount.name}
              label={productDiscount.label}
              variant="outlined"
              fullWidth
              type="number"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">%</InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3} className={classes.bottomSpacer}>
          <Grid item xs={12} lg={6} md={6}>
            <SelectField
              name={category.name}
              label={category.label}
              data={fetchedCategories}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} lg={6} md={6}>
            <SelectField
              disabled={!subCategories[0]}
              name={subCategory.name}
              label={subCategory.label}
              data={subCategories}
              fullWidth
              variant="outlined"
              defaultValue={""}
            />
          </Grid>
        </Grid>
        <InputField
          name={productDescription.name}
          label={productDescription.label}
          variant="outlined"
          fullWidth
          multiline
          rows="5"
        />
      </CardContent>
    </Card>
  );
}
