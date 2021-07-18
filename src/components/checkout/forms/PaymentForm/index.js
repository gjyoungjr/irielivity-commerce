import React from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  makeStyles,
} from "@material-ui/core";
import { useFormikContext } from "formik";

// components
import PayOnPickUp from "./PayOnPickUp";
import OnlineTransfer from "./OnlineTransfer";
import Billing from "./Billing";

const paymentTypes = [
  {
    value: "Online-Transfer",
  },
  {
    value: "Pay-On-Pick-Up",
  },
  {
    value: "Credit-Card",
  },
];

export default function PaymentForm({ formField, orderTotal }) {
  const classes = useStyles();
  const { setFieldValue, values, errors } = useFormikContext();
  const { paymentMethod } = formField;

  return (
    <div style={styles.wrapper}>
      {errors && <div style={styles.errorMsg}>{errors.paymentMethod}</div>}
      {errors && <div style={styles.errorMsg}>{errors.paymentReceipt}</div>}
      <FormControl component="fieldset" fullWidth>
        <RadioGroup
          name={paymentMethod.name}
          value={values.paymentMethod}
          onChange={(event) => {
            setFieldValue(paymentMethod.name, event.currentTarget.value);
          }}
        >
          <div className="d-flex justify-content-between">
            {paymentTypes &&
              paymentTypes.map((pymtType) => (
                <div key={pymtType.value}>
                  <FormControlLabel
                    value={pymtType.value}
                    control={
                      <Radio
                        classes={{
                          root: classes.radio,
                          checked: classes.checked,
                        }}
                      />
                    }
                    label={pymtType.value}
                  />
                </div>
              ))}
          </div>
        </RadioGroup>
      </FormControl>

      {values.paymentMethod === "Pay-On-Pick-Up" ? (
        <PayOnPickUp />
      ) : values.paymentMethod === "Credit-Card" ? (
        <Billing formField={formField} orderTotal={orderTotal} />
      ) : (
        <OnlineTransfer />
      )}

      <pre>{JSON.stringify(values, null, 2)}</pre>
      {/* <pre>{JSON.stringify(errors, null, 2)}</pre> */}
    </div>
  );
}
// style config
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "25px",
  },
  radio: {
    "&$checked": {
      color: "#000",
    },
  },
  checked: {},
}));

const styles = {
  bottomSpacer: {
    marginBottom: "-5px",
  },
  bottomSpacer1: {
    marginBottom: "1px",
    opacity: 0.7,
  },
  wrapper: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
  },
  errorMsg: {
    color: "red",
    fontSize: "14px",
  },
};
