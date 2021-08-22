import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useFormikContext } from "formik";
import Autocomplete from "@material-ui/lab/Autocomplete";

// form fields
import { InputField } from "../../../forms/FormFields";
// components
import AppButton from "../../../app-button";
// api calll
import { apiInstance } from "../../../../redux/reducers/payments/paymentHelpers";
// data
import { countries } from "../../data";
// icons
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

export default function Billing({ formField, orderTotal }) {
  const stripe = useStripe();
  const elements = useElements();
  const { values, setFieldValue } = useFormikContext();
  const [loading, setLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // gets form fields form props
  const {
    billingAddress,
    billingCity,
    billingName,
    billingPostalCode,
    billingState,
    billingCountry,
  } = formField;

  const cardElement = elements.getElement("card");

  const billing_address = {
    line1: values.billingAddress,
    city: values.billingCity,
    state: values.billingState,
    postal_code: values.billingPostalCode,
    country: values.billingCountry,
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
        console.log(clientSecret, "**");
        setLoading(true);
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
            stripe
              .confirmCardPayment(clientSecret, {
                payment_method: paymentMethod.id,
              })
              .then(({ paymentIntent }) => {
                setLoading(false);
                setIsComplete(true);
              });
          });
      });
  };

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

      <Autocomplete
        id="combo-box-demo"
        className="mb-3"
        fullWidth
        name={billingCountry.name}
        // classes={{
        //   option: classes.option,
        // }}
        options={countries}
        onChange={(event, value) => {
          // if (!value) {
          //   setIsCountryError(true);
          //   setFieldValue("zip", "");
          //   return;
          // }
          // setIsCountryError(false);
          // setFieldValue("zip", value.phone || "");
          setFieldValue("billingCountry", value.code || "");
        }}
        onBlur={() => {
          // if (!values.) {
          //   setIsCountryError(true);
          // }
        }}
        getOptionLabel={(option) => option.label}
        renderOption={(option) => (
          <React.Fragment>
            <span>{countryToFlag(option.code)}</span>
            {option.label} ({option.code}) +{option.phone}
          </React.Fragment>
        )}
        renderInput={(params) => (
          <InputField
            {...params}
            label={billingCountry.label}
            name={billingCountry.name}
            variant="outlined"
            // helperText={
            //   isCountryError && isCountryTouched && "Country is required"
            // }
            // error={isCountryError && isCountryTouched}
          />
        )}
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

      <div className="text-right mt-2">
        <AppButton
          label={
            loading ? (
              "Loading"
            ) : isComplete ? (
              <CheckCircleIcon style={{ color: "green" }} />
            ) : (
              "Pay Now"
            )
          }
          color="white"
          bgColor="black"
          width="100px"
          onClick={handleStripePymt}
        />
      </div>
    </div>
  );
}

// ISO 3166-1 alpha-2
// ⚠️ No support for IE 11
function countryToFlag(isoCode) {
  return typeof String.fromCodePoint !== "undefined"
    ? isoCode
        .toUpperCase()
        .replace(/./g, (char) =>
          String.fromCodePoint(char.charCodeAt(0) + 127397)
        )
    : isoCode;
}

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
