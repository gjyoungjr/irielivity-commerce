import React, { useState } from "react";
import { InputAdornment, IconButton } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Form, Formik } from "formik";

//utils
import { auth, handleUserProfile } from "../../firebase/utils";

// icons
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

// components
import AppButton from "../app-button";
import LoadingCircular from "../loading/LoadingCircular";

// ->form fields
import { InputField } from "../forms/FormFields";
// ->form model
import { RegisterFormModel } from "../forms/FormModel/FormModel";
import { registerValidationSchema } from "../forms/FormModel/ValidationSchema";
import { RegisterFormValues } from "../forms/FormModel/FormInitialValues";

export default function RegisterForm() {
  const history = useHistory();
  // enables/disbable password viewing
  const [showPassword, setShowPassword] = useState(false);
  const [_errorMsg, setErrorMsg] = useState({
    userNotFound: "",
    emailAlreadyInUse: "",
  });
  // destructure for form fields
  const {
    formField: { _email, _password, lastName, firstName },
  } = RegisterFormModel;

  // redirect on success
  const onSuccess = (history, actions) => {
    window.location.reload(false);
    actions.resetForm({});
  };

  // helper fxn handle server side errors
  const handleServerErrors = (code) => {
    if (code === "auth/email-already-in-use") {
      setErrorMsg({
        emailAlreadyInUse:
          "The email address is already in use by another account.",
      });
    }
  };
  return (
    <div className="auth-wrapper">
      <p className="text-center auth-title">Create Account</p>

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
          } catch ({ code }) {
            handleServerErrors(code);
          }
        }}
      >
        {(props) => (
          <Form onSubmit={props.handleSubmit}>
            <p style={{ color: "red" }}>{_errorMsg.emailAlreadyInUse}</p>

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
            />

            <div className="text-center">
              <AppButton
                type="submit"
                bgColor="black"
                color="white"
                label={
                  props.isSubmitting ? (
                    <LoadingCircular color="white" size={20} />
                  ) : (
                    "Register"
                  )
                }
                height="45px"
                borderRadius="30px"
                width="100%"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
