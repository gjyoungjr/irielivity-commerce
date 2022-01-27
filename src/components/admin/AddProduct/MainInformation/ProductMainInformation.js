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
  IconButton,
  Tooltip,
} from "@material-ui/core";
import { useFormikContext } from "formik";
import { useDispatch, useSelector } from "react-redux";

// utils
import { fetchProductCategories } from "../../../../redux/reducers/products/productsActions";

// components
import { InputField, SelectField } from "../../../forms/FormFields";
import AddProductCategory from "./AddProductCategory";

// icons
import AddIcon from "@material-ui/icons/Add";

// maps redux state to component
const mapState = ({ productsData }) => ({
  productCategories: productsData.productCategories,
});
export default function MainInformationForm({ formField }) {
  // styles declaration
  const classes = useStyles();
  const dispatch = useDispatch();
  // destructure to get products categories from redux
  const { productCategories } = useSelector(mapState);
  // grabs value from formik context
  const { values } = useFormikContext();

  // grabs fields from props
  const {
    productDescription,
    productName,
    productPrice,
    category,
    subCategory,
    productDiscount,
  } = formField;
  // stores sub categories after filtering categories from redux state
  const [subCategories, setSubCategories] = useState([]);
  const [displayAddCategoriesForm, setDisplayAddCategoriesForm] =
    useState(false);

  // toggles viewing of category form
  const handleShowAddProductCategoriesForm = () => {
    setDisplayAddCategoriesForm(true);
  };
  const handleCloseAddProductCategoriesForm = () => {
    setDisplayAddCategoriesForm(false);
  };

  useEffect(() => {
    // fetch product categories
    dispatch(fetchProductCategories());

    // get sub category based on main category selected
    const getSubCategories = () => {
      let _subCategories = [];
      if (values.category) {
        // search catgories for a specific category
        const foundCategory = productCategories.find((item) => {
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

    // data validation
    if (productCategories.length) {
      // call helper fxn to set state for sub categories
      setSubCategories(getSubCategories());
    }
  }, [values.category]);

  return (
    <Card className={classes.card} elevation={10}>
      <AddProductCategory
        open={displayAddCategoriesForm}
        handleClose={handleCloseAddProductCategoriesForm}
      />
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
          <Grid item xs={12} lg={6} md={8}>
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

          <Grid item xs={12} lg={6} md={4}>
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
          <Grid item xs={11} lg={6} md={6}>
            <SelectField
              name={category.name}
              label={category.label}
              data={productCategories}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={1} lg={1} md={1}>
            <Tooltip title="Add Product Category">
              <IconButton
                style={{
                  marginBottom: "28px",
                  marginLeft: "-30px",
                  backgroundColor: "blue",
                  color: "white",
                }}
                size="small"
                onClick={() => handleShowAddProductCategoriesForm()}
              >
                <AddIcon />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item xs={12} lg={5} md={5}>
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
