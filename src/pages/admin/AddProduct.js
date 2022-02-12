import React, { useState, useEffect } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  CircularProgress,
  makeStyles,
  // Fab,
} from "@material-ui/core";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

// icons
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

// layout
import DashboardLayout from "../../layouts/DashboardLayout";

// components -> Forms
import MainInformation from "../../components/admin/AddProduct/MainInformation";
import Variants from "../../components/admin/AddProduct/Variants";
import Review from "../../components/admin/AddProduct/Review";

// sub component
import Notification from "../../components/snackbar-notif/Notification";

// utils -> from structures/models
import { AddProductFormModel } from "../../components/forms/FormModel/FormModel";
import { AddProductFormValues } from "../../components/forms/FormModel/FormInitialValues";
import { AddProductValidationSchema } from "../../components/forms/FormModel/ValidationSchema";

// utils -> redux helpers/actions
import {
  addProductStart,
  fetchProductStart,
  setProduct,
  updateProductStart,
} from "../../redux/reducers/products/productsActions";

// step labels
const steps = ["Main Information", "Variants", "Review"];

// grabs props from form model
const { formId, formField } = AddProductFormModel;

// stylesheet
const useStyles = makeStyles(() => ({
  root: {
    padding: "20px",
  },
  button: {
    borderRadius: "20px",
    textTransform: "none",
    marginTop: "30px",
    width: "100%",
  },
}));

// grabs state from redux
const mapState = ({ productsData }) => ({
  product: productsData.product,
});

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const [activeStep, setActiveStep] = useState(0);
  const [displayNotif, setDisplayNotif] = useState(false);
  const [fetchedFormValues, setFetchedFormValues] = useState(null);

  // gets the current validaiton schema for current active step
  const currentValidationSchema = AddProductValidationSchema[activeStep];
  // boolean state to check if its the last step
  const isLastStep = activeStep === steps.length - 1;

  // grabs productID from url
  const { productID } = useParams();
  // destructure to get product from redux store
  const { product } = useSelector(mapState);

  // switch function to determine step rendering
  function _renderStepContent(step) {
    switch (step) {
      case 0:
        return <MainInformation formField={formField} productID={productID} />;
      case 1:
        return <Variants formField={formField} productID={productID} />;
      case 2:
        return <Review />;
      default:
        return <Review />;
    }
  }

  // calls dispatch action to submit data to db
  const _submitForm = (values, actions) => {
    // destructure values
    const {
      productDescription,
      productName,
      mainImgUrl,
      productPrice,
      category,
      fit,
      materials,
      sizes,
      subCategory,
      dimensions,
      subImages,
      quantity,
      productDiscount,
      colors,
    } = values;

    let discountedPrice = 0;
    let finalPrice = 0;
    let originalProductPrice = productPrice;

    // if there is a discount
    // caluclate product price based on discount
    if (productDiscount) {
      discountedPrice = ((productDiscount / 100) * productPrice).toFixed(2);
      finalPrice = (productPrice - discountedPrice).toFixed(2);
    }

    // if productID exists
    // we are editing an exisiting product
    // so fxn call to update product will be called
    if (productID) {
      dispatch(
        updateProductStart({
          productDescription,
          productName,
          mainImgUrl,
          productPrice: productDiscount ? finalPrice : productPrice,
          category,
          subCategory,
          fit,
          materials,
          sizes,
          dimensions,
          subImages,
          quantity,
          productDiscount,
          originalProductPrice: originalProductPrice,
          productID,
          colors,
        })
      );
    } else {
      // else if productID does not exist
      // we are creating a new product
      dispatch(
        addProductStart({
          productDescription,
          productName,
          mainImgUrl,
          productPrice: productDiscount ? finalPrice : productPrice,
          category,
          subCategory,
          fit,
          materials,
          sizes,
          dimensions,
          subImages,
          quantity,
          productDiscount,
          originalProductPrice: originalProductPrice,
          colors,
        })
      );
    }

    actions.setSubmitting(false);
    setActiveStep(activeStep + 1);
  };

  // submit data on last step of form stepper
  function _handleSubmit(values, actions) {
    if (isLastStep) {
      _submitForm(values, actions);
    } else {
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  }

  // handles going back to previous step
  function _handleBack() {
    setActiveStep(activeStep - 1);
  }

  // runs fxn on component mount
  // to fetch data on selected product
  // to update that product in db
  useEffect(() => {
    // if no productID exit/break
    if (!productID) return;

    dispatch(fetchProductStart(productID));

    // set proudct state back to empty object
    // after component on mount
    return () => {
      dispatch(setProduct({}));
    };
  }, [productID, dispatch]);

  // loads and set data for form fields on component mount
  useEffect(() => {
    // if no data exit
    if (!product) return;

    // else load data & create object for form values
    const formValues = {
      productName: product.productName || "",
      productPrice: product.originalProductPrice || 0,
      productDescription: product.productDescription || "",
      category: product.category || "",
      productDiscount: product.productDiscount || 0,
      subCategory: product.subCategory || "",
      materials: product.materials || [],
      sizes: product.sizes || [],
      quantity: product.quantity || 0,
      fit: product.fit || "",
      dimensions: product.dimensions || "",
      colors:
        typeof product.colors === "string" && product.colors
          ? product.colors.split(",")
          : [],
      mainImgUrl: product.mainImgUrl || "",
      subImages: product.subImages || [],
    };

    // set state with form values
    setFetchedFormValues(formValues);
  }, [product]);

  // controls redirect on last step
  useEffect(() => {
    if (activeStep !== steps.length) return;

    const handleSuccessfulSubmit = () => {
      setDisplayNotif(true);
      setTimeout(() => {
        history.push("/admin/products");
      }, 1000);
    };

    handleSuccessfulSubmit();
  }, [activeStep, history]);

  return (
    <DashboardLayout>
      <Notification
        open={displayNotif}
        message="Successfully created product"
        onClose={() => setDisplayNotif(false)}
      />
      <div className={classes.root}>
        <Stepper activeStep={activeStep} className={classes.stepper}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <React.Fragment>
          <Formik
            initialValues={fetchedFormValues || AddProductFormValues}
            validationSchema={currentValidationSchema}
            onSubmit={_handleSubmit}
            enableReinitialize
          >
            {({ isSubmitting }) => (
              <Form id={formId}>
                {_renderStepContent(activeStep)}

                <div className="d-flex justify-content-start">
                  <div>
                    {activeStep !== 0 && (
                      <Button
                        variant="contained"
                        onClick={_handleBack}
                        className={classes.button}
                        startIcon={<ArrowBackIcon />}
                      >
                        Back
                      </Button>
                    )}
                  </div>
                  <div className="ml-5">
                    <Button
                      disabled={isSubmitting}
                      type="submit"
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      endIcon={<ArrowForwardIcon />}
                    >
                      {isLastStep ? "Submit" : "Next"}
                    </Button>
                    {isSubmitting && (
                      <CircularProgress
                        size={24}
                        className={classes.buttonProgress}
                      />
                    )}
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </React.Fragment>
      </div>
    </DashboardLayout>
  );
}
