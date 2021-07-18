import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useFormikContext } from "formik";

// form fields
import { InputField } from "../../../forms/FormFields";
// components
import AppButton from "../../../app-button";

import { apiInstance } from "../../../../redux/reducers/payments/paymentHelpers";

// stripe card configs
const configCardElement = {
  iconStyle: "solid",
  iconColor: "black",
  style: {
    base: {
      fontSize: "16px",
      color: "#000",
      borderRadius: "10px",
      "::placeholder": {
        color: "gray",
      },
    },
    invalid: {
      color: "#9e2146",
    },
  },
  hidePostalCode: true,
};
export default function Billing({ formField, orderTotal }) {
  const stripe = useStripe();
  const elements = useElements();
  const { values } = useFormikContext();

  // gets form fields form props
  const {
    billingAddress,
    billingCity,
    billingName,
    billingPostalCode,
    billingState,
  } = formField;

  const cardElement = elements.getElement("card");

  const billing_address = {
    line1: values.billingAddress,
    city: values.billingCity,
    state: values.billingState,
    postal_code: values.billingPostalCode,
    country: "US",
  };

  const handleStripePymt = () => {
    // make api call to handle procesing of stripe payments
    apiInstance
      .post("/payments/create", {
        amount: orderTotal * 100, // so currency can be in cents
        shipping: {
          name: values.billingName,
          address: {
            ...billing_address,
          },
        },
      })
      .then(({ data: clientSecret }) => {
        console.log(clientSecret);
        stripe
          .createPaymentMethod({
            type: "card",
            card: cardElement,
            billing_details: {
              name: values.billingName,
              address: {
                ...billing_address,
              },
            },
          })
          .then(({ paymentMethod }) => {
            console.log(paymentMethod);
            stripe
              .confirmCardPayment(clientSecret, {
                payment_method: paymentMethod.id,
              })
              .then(({ paymentIntent }) => {
                console.log(paymentIntent);
              });
          });
      });
  };
  // comment

  return (
    <div>
      <InputField
        name={billingName.name}
        label={billingName.label}
        fullWidth
        variant="outlined"
        className="mb-3"
      />
      <InputField
        name={billingAddress.name}
        label={billingAddress.label}
        fullWidth
        variant="outlined"
        className="mb-3"
      />
      <InputField
        name={billingCity.name}
        label={billingCity.label}
        fullWidth
        variant="outlined"
        className="mb-3"
      />
      <InputField
        name={billingState.name}
        label={billingState.label}
        fullWidth
        variant="outlined"
        className="mb-3"
      />
      <InputField
        name={billingPostalCode.name}
        label={billingPostalCode.label}
        fullWidth
        variant="outlined"
        className="mb-3"
      />

      <div
        style={{
          border: "1px solid gray",
          borderRadius: "5px",
          padding: "20px",
        }}
      >
        <CardElement options={configCardElement} />
      </div>

      <div>
        <AppButton
          label="Pay Now"
          color="white"
          bgColor="black"
          width="100px"
          onClick={handleStripePymt}
        />
      </div>
    </div>
  );
}
