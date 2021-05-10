import React, { useState, useEffect, Fragment } from "react";
import { Grid, TextField, makeStyles } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
// components
import { InputField } from "../../forms/FormFields";
import { countries } from "../data";
import { useFormikContext } from "formik";

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

const useStyles = makeStyles({
  option: {
    fontSize: 15,
    "& > span": {
      marginRight: 10,
      fontSize: 18,
    },
  },
});

export default function AddressForm({ formField }) {
  const classes = useStyles();
  const [isCountryError, setIsCountryError] = useState(false);
  const [isCountryTouched, setCountryTouched] = useState(false);

  // grabs props from formik
  const { setFieldValue, errors, values, touched } = useFormikContext();

  const {
    first_Name,
    last_Name,
    e_mail,
    phoneNumber,
    address1,
    town_city,
    country,
    zip,
  } = formField;

  useEffect(() => {
    // if errors exists
    if (errors && !values.country) {
      // grabs error for materials field
      const { country } = errors;
      // & if there is an error for materials
      // store it & set bool state to true
      if (country) {
        // setMaterialsErrorMsg(country);
        setIsCountryError(true);
      }
    }
    // checks if field is touched
    if (touched) {
      const { country } = touched;
      if (country) {
        setCountryTouched(true);
      }
    }
  }, [errors, values.country, touched]);

  return (
    <Fragment>
      {/* <div style={{height: '10px', backgroundColor: 'black', width: '100%', marginTop: '-10px'}} /> */}
      <div>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6} md={6}>
            <InputField
              name={first_Name.name}
              label={first_Name.label}
              variant="outlined"
              // size="medium"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} lg={6} md={6}>
            <InputField
              name={last_Name.name}
              label={last_Name.label}
              variant="outlined"
              // size="small"
              fullWidth
            />
          </Grid>
        </Grid>

        <Grid container spacing={3} className="mb-3">
          <Grid item xs={12} lg={12} md={12}>
            <InputField
              name={e_mail.name}
              label={e_mail.label}
              variant="outlined"
              fullWidth
            />
          </Grid>
        </Grid>

        <Grid container spacing={3} className="mb-3">
          <Grid item xs={12} lg={12} md={12}>
            <InputField
              name={phoneNumber.name}
              label={phoneNumber.label}
              variant="outlined"
              fullWidth
            />
          </Grid>
        </Grid>

        <Grid container spacing={3} className="mb-3">
          <Grid item xs={12} lg={7} md={7}>
            <Autocomplete
              id="combo-box-demo"
              fullWidth
              classes={{
                option: classes.option,
              }}
              options={countries}
              onChange={(event, value) => {
                if (!value) {
                  setIsCountryError(true);
                  setFieldValue("zip", "");
                  return;
                }
                setIsCountryError(false);
                setFieldValue("zip", value.phone || "");
                setFieldValue("country", value.label || "");
              }}
              onBlur={() => {
                if (!values.country) {
                  setIsCountryError(true);
                }
              }}
              getOptionLabel={(option) => option.label}
              renderOption={(option) => (
                <React.Fragment>
                  <span>{countryToFlag(option.code)}</span>
                  {option.label} ({option.code}) +{option.phone}
                </React.Fragment>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={country.label}
                  name={country.name}
                  variant="outlined"
                  helperText={
                    isCountryError && isCountryTouched && "Country is required"
                  }
                  error={isCountryError && isCountryTouched}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} lg={5} md={5}>
            <InputField
              name={address1.name}
              label={address1.label}
              variant="outlined"
              fullWidth
            />
          </Grid>
        </Grid>

        <Grid container spacing={3} className="mb-3">
          <Grid item xs={12} lg={6} md={6}>
            <InputField
              name={town_city.name}
              label={town_city.label}
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} lg={6} md={6}>
            <InputField
              name={zip.name}
              label={zip.label}
              variant="outlined"
              fullWidth
            />
          </Grid>
        </Grid>
      </div>
    </Fragment>
  );
}
