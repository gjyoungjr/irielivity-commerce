import React, { useState } from "react";
import { Hidden, InputAdornment, IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Form, Formik } from "formik";


// icons
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";



// components
import AppButton from "../app-button";
// ->form fields
import { InputField } from "../forms/FormFields";
// ->form model
import { LoginFormModel } from "../forms/FormModel/FormModel";
import { LoginValidationSchema } from "../forms/FormModel/ValidationSchema";
import { LoginFormValues } from "../forms/FormModel/FormInitialValues";

export default function LoginForm() {
  // enables/disbable password viewing
  const [showPassword, setShowPassword] = useState(false);

  // destructure for form fields
  const {
    formField: { email, password },
  } = LoginFormModel;
  return (
    <div className="auth-wrapper">
      <p className="text-left auth-title">Login</p>

      <Formik
        initialValues={LoginFormValues}
        validationSchema={LoginValidationSchema}
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {(props) => (
          <Form onSubmit={props.handleSubmit}>
            <Hidden smDown>
              <InputField
                label={email.label}
                name={email.name}
                className="mb-3"
                fullWidth
                inputProps={{ style: styles.generalStyling }}
                InputLabelProps={{ style: styles.inputLabel }}
              />
              <InputField
                label={password.label}
                name={password.name}
                type={showPassword ? "text" : "password"}
                className="mb-3"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        onMouseDown={(e) => e.preventDefault()}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                inputProps={{ style: styles.generalStyling }}
                InputLabelProps={{ style: styles.inputLabel }}
              />
            </Hidden>
            <Hidden smUp>
              <InputField
                label={email.label}
                name={email.name}
                className="mb-3"
                fullWidth
              />
              <InputField
                type={showPassword ? "text" : "password"}
                label={password.label}
                name={password.name}
                className="mb-3"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        onMouseDown={(e) => e.preventDefault()}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Hidden>

            <div>
              <AppButton
                type="submit"
                bgColor="black"
                color="white"
                label="Sign In"
                height="45px"
                borderRadius="30px"
                width="130px"
              />
            </div>
          </Form>
        )}
      </Formik>

      <div className="d-flex justify-content-start mt-3 auth-nav">
        <Link to="/register" className="mr-3">
          Create Account
        </Link>
        <Link to="" className="mr-3">
          Forgot your Password?
        </Link>
      </div>
    </div>
  );
}
const styles = {
  generalStyling: {
    fontSize: "32px",
  },
  inputLabel: {
    fontSize: "26px",
  },
};
