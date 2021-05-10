import React, { useState, useEffect } from "react";
import { Radio, RadioGroup, FormControlLabel } from "@material-ui/core";
import { useFormikContext } from "formik";

// components
import PayOnPickUp from "./PayOnPickUp";
import OnlineTransfer from "./OnlineTransfer";

export default function PaymentForm() {
  const [value, setValue] = useState("Pay-On-Pick-Up");
  const { setFieldValue } = useFormikContext();

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  // set payment method field every time value changes
  useEffect(() => {
    setFieldValue("paymentMethod", value);
  }, [value, setFieldValue]);

  return (
    <div style={styles.wrapper}>
      <RadioGroup value={value} onChange={handleChange}>
        <div className="d-flex justify-content-between">
          <FormControlLabel
            value="Pay-On-Pick-Up"
            control={<Radio style={{ color: "black" }} />}
            label="Pay On Pick Up"
          />
          <FormControlLabel
            value="Online-Transfer"
            control={<Radio style={{ color: "black" }} />}
            label="Online-Transfer"
          />
        </div>
      </RadioGroup>

      {value === "Pay-On-Pick-Up" ? <PayOnPickUp /> : <OnlineTransfer />}
    </div>
  );
}

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
};
