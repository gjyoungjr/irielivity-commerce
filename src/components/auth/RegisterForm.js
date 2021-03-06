import React, { useState } from "react";
import { Hidden, InputAdornment, IconButton } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { Form, Formik } from "formik";

//utils
import { auth, handleUserProfile } from "../../firebase/utils";

// icons
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

// components
import AppButton from "../app-button";
import { InputField } from "../forms/FormFields";
// ->form model
import { RegisterFormModel } from "../forms/FormModel/FormModel";
import { registerValidationSchema } from "../forms/FormModel/ValidationSchema";
import { RegisterFormValues } from "../forms/FormModel/FormInitialValues";

export default function RegisterForm() {
  const history = useHistory();
  // enables/disbable password viewing
  const [showPassword, setShowPassword] = useState(false);

  // destructure for form fields
  const {
    formField: { _email, _password, lastName, firstName },
  } = RegisterFormModel;

  // redirect on success
  const onSuccess = (history, actions) => {
    history.push(process.env.PUBLIC_URL + "/new");
    actions.setSubmitting(false);
    actions.resetForm({});
  };
  return (
    <div className="auth-wrapper">
      <p className="text-left auth-title">Register</p>

      <Formik
        initialValues={RegisterFormValues}
        validationSchema={registerValidationSchema}
        onSubmit={async (values, actions) => {
          const { _email, _password, firstName, lastName } = values;
          try {
            // creates user with email & password
            const { user } = await auth.createUserWithEmailAndPassword(
              _email,
              _password
            );

            // updates auth in firebase object
            user.updateProfile({
              displayName: firstName + " " + lastName,
            });

            // helper fxn submit user data to db
            await handleUserProfile(user, firstName, lastName);

            // // config object for email verification
            // const config = {
            //   url: "https://www.zyaniaalonzo.com/login-register",
            // };

            // // sends user email verification
            // user.sendEmailVerification(config).catch((err) => {
            //   console.err(err);
            // });
            onSuccess(history, actions);
          } catch (err) {
            console.log("Err->", err);
          }
        }}
      >
        {(props) => (
          <Form onSubmit={props.handleSubmit}>
            <Hidden smDown>
              <InputField
                label={firstName.label}
                name={firstName.name}
                className="mb-3"
                fullWidth
                inputProps={{ style: styles.generalStyling }}
                InputLabelProps={{ style: styles.inputLabel }}
              />
              <InputField
                label={lastName.label}
                name={lastName.name}
                className="mb-3"
                fullWidth
                inputProps={{ style: styles.generalStyling }}
                InputLabelProps={{ style: styles.inputLabel }}
              />
              <InputField
                label={_email.label}
                name={_email.name}
                className="mb-3"
                fullWidth
                inputProps={{ style: styles.generalStyling }}
                InputLabelProps={{ style: styles.inputLabel }}
                autoFocus={false}
              />
              <InputField
                label={_password.label}
                name={_password.name}
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
                label={firstName.label}
                name={firstName.name}
                className="mb-3"
                fullWidth
              />
              <InputField
                label={lastName.label}
                name={lastName.name}
                className="mb-3"
                fullWidth
              />
              <InputField
                label={_email.label}
                name={_email.name}
                className="mb-3"
                fullWidth
              />
              <InputField
                type={showPassword ? "text" : "password"}
                label={_password.label}
                name={_password.name}
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
                label="Register"
                height="45px"
                borderRadius="30px"
                width="130px"
              />
            </div>
          </Form>
        )}
      </Formik>

      <div className="auth-nav d-flex justify-content-start mt-3">
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
