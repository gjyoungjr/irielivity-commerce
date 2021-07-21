/* eslint-disable */
import React, { useState, useEffect } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  makeStyles,
  createMuiTheme,
  ThemeProvider,
  Divider,
  // Avatar,
} from "@material-ui/core";
import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";
import emailjs from "emailjs-com";

// utils
import {
  saveOrderHistory,
  setOrdersNotificationData,
} from "../../redux/reducers/orders/ordersActions";
import {
  selectCartItems,
  selectCartTotal,
} from "../../redux/reducers/cart/cartSelectors";
import {
  setDeliveryMethod,
  setDeliveryFee,
} from "../../redux/reducers/delivery/deliveryActions";
import { handleDecrementProductQty } from "../../redux/reducers/products/productsHelper";
import {
  alertAdminOnOrder,
  alertUserOnOrder,
} from "../../redux/reducers/orders/ordersHelpers";

// components -> forms
import { AddressForm, DeliveryForm, PaymentForm } from "./forms";

// components
import AppButton from "../app-button";
import Loading from "../loading/LoadingCircular";

// components -> form structure
import { CheckOutFormModel } from "../forms/FormModel/FormModel";
import { CheckOutFormValues } from "../forms/FormModel/FormInitialValues";
import { CheckOutValidationSchema } from "../forms/FormModel/ValidationSchema";

const steps = ["Shipping", "Delivery", "Payment"];
const { formId, formField } = CheckOutFormModel;

// grabs cart items total
const mapState = createStructuredSelector({
  orderSubTotal: selectCartTotal,
  cartItems: selectCartItems,
});

// get current user from redux state
// & order total with new value reflecting shipping cost
const _mapState = ({ user, ordersData, deliveryData }) => ({
  currentUser: user.currentUser,
  orderTotal: ordersData.orderTotal,
  deliveryFee: deliveryData.deliveryFee,
});

const useStyles = makeStyles(() => ({
  button: {
    borderRadius: "20px",
    textTransform: "none",
    marginTop: "30px",
    backgroundColor: "black",
    color: "white",
    "&:hover": {
      opacity: " 0.8 !important",
    },
  },

  stepper: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "25px",
    justifyContent: "center",
    color: "black",
    fontWeight: "bold",
    marginBottom: "18px",
    backgroundColor: "transparent",
    border: "1px solid #f5f5f5",
  },
}));

const theme = createMuiTheme({
  overrides: {
    MuiStepIcon: {
      active: {
        color: "black !important",
      },
      completed: {
        color: "rgb(68, 183, 0) !important",
      },
    },
  },
});

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const classes = useStyles();
  // const stripe = useStripe();
  // const elements = useElements();
  // const history = useHistory();
  const [activeStep, setActiveStep] = useState(0);
  const currentValidationSchema = CheckOutValidationSchema[activeStep];
  const isLastStep = activeStep === steps.length - 1;

  // access cart items
  const { cartItems, orderSubTotal } = useSelector(mapState);
  // access current user,  order total and delivery fee
  const { currentUser, orderTotal, deliveryFee } = useSelector(_mapState);

  function _renderStepContent(step) {
    switch (step) {
      case 0:
        return <AddressForm formField={formField} />;
      case 1:
        return <DeliveryForm formField={formField} />;
      case 2:
        return <PaymentForm formField={formField} orderTotal={orderTotal} />;
      default:
        return <div>Not Found</div>;
    }
  }

  function _submitForm(values, actions) {
    // used to set status of order on first submission to db
    const processing = "Processing";

    // destructure values for needed data
    const {
      first_Name,
      last_Name,
      e_mail,
      address1,
      town_city,
      country,
      zip,
      deliveryMethod,
      paymentMethod,
      paymentReceipt,
    } = values;
    // create order object to be submitted
    const configOrder = {
      orderTotal: orderTotal,
      orderSubTotal: orderSubTotal,
      addressfirstName: first_Name,
      addresslastName: last_Name,
      email: e_mail,
      address: address1,
      town_city: town_city,
      country: country,
      deliveryMethod: deliveryMethod,
      paymentMethod: paymentMethod,
      paymentReceipt: paymentReceipt,
      zip: zip,
      status: processing,
      deliveryFee: deliveryFee,
      user: {
        fullName: currentUser.firstName + " " + currentUser.lastName,
        email: currentUser.email,
        avatarUrl: currentUser.avatarUrl ? currentUser.avatarUrl : "",
      },
      // map through cart items to save all data that was in cart
      orderItems: cartItems.map((item) => {
        // destructure to get needed values
        const {
          documentID,
          productName,
          productPrice,
          quantity,
          category,
          mainImgUrl,
          selectedSize,
        } = item;

        // return all fields
        return {
          documentID,
          productName,
          productPrice,
          quantity,
          category,
          mainImgUrl,
          selectedSize,
        };
      }),
    };

    // decrement product qty in db
    cartItems.map((item) =>
      handleDecrementProductQty(item.documentID, item.quantity)
    );

    const allOrders = [];
    allOrders.push(configOrder);
    dispatch(saveOrderHistory(configOrder));
    dispatch(setOrdersNotificationData(allOrders));

    actions.setSubmitting(false);
    setActiveStep(activeStep + 1);
  }

  // handles form submission
  // & next step
  function _handleSubmit(values, actions) {
    if (isLastStep) {
      _submitForm(values, actions);
      setActiveStep(2);
    } else {
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  }

  // handles going to previous step
  function _handleBack() {
    setActiveStep(activeStep - 1);
  }

  // reset delivery method after leaving component
  useEffect(() => {
    return () => {
      dispatch(setDeliveryMethod(""));
      dispatch(setDeliveryFee(0));
    };
  }, [dispatch]);

  return (
    <div className="checkout-wrapper">
      <div className="cart-summary-mobile">{/* <CartSummaryMobile /> */}</div>

      <ThemeProvider theme={theme}>
        <Stepper activeStep={activeStep} className={classes.stepper}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </ThemeProvider>

      <Divider style={{ marginTop: "-20px", marginBottom: "20px" }} />
      <React.Fragment>
        {activeStep === steps.length ? (
          <Redirect to="/members" />
        ) : (
          <Formik
            initialValues={CheckOutFormValues}
            validationSchema={currentValidationSchema}
            onSubmit={_handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form id={formId}>
                {_renderStepContent(activeStep)}

                <div className="d-flex justify-content-start">
                  {activeStep !== 0 && (
                    <div className="mr-5">
                      <AppButton
                        onClick={_handleBack}
                        bgColor="black"
                        color="white"
                        label="Back"
                      />
                    </div>
                  )}
                  <div>
                    {isLastStep ? (
                      <AppButton
                        disabled={isSubmitting}
                        type="submit"
                        bgColor="black"
                        color="white"
                        label={
                          isSubmitting ? (
                            <Loading size={15} color="white" />
                          ) : (
                            "Place order"
                          )
                        }
                      />
                    ) : (
                      <AppButton
                        disabled={isSubmitting}
                        type="submit"
                        bgColor="black"
                        color="white"
                        label="Next"
                      />
                    )}
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </React.Fragment>
    </div>
  );
}
