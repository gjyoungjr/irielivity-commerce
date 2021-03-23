import React, { useState } from "react";
import { Hidden, InputAdornment, IconButton } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { Form, Formik } from "formik";

// utils
import { auth } from "../../firebase/utils";

// components
import AppButton from "../app-button";
import LoadingCircular from "../loading/LoadingCircular";
import ResetPassword from "./ResetPassword";

// ->form fields
import { InputField } from "../forms/FormFields";
// ->form model
import { LoginFormModel } from "../forms/FormModel/FormModel";
import { LoginValidationSchema } from "../forms/FormModel/ValidationSchema";
import { LoginFormValues } from "../forms/FormModel/FormInitialValues";

// icons
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

export default function LoginForm() {
  const history = useHistory();
  // enables/disbable password viewing
  const [showPassword, setShowPassword] = useState(false);
  const [displayPasswordModal, setDisplayPasswordModal] = useState(false);
  // state for  server sider errors
  const [_errorMsg, setErrorMsg] = useState({
    userNotFound: "",
    invalidEmailorPassword: "",
  });
  // destructure for form fields
  const {
    formField: { email, password },
  } = LoginFormModel;

  // helper fxn handle server side errors
  const handleServerErrors = (code) => {
    if (code === "auth/user-not-found") {
      setErrorMsg({
        userNotFound: "Account not found, please register for an account.",
      });
    }
    if (code === "auth/wrong-password") {
      setErrorMsg({
        invalidEmailorPassword: "Invalid email/password, please try again.",
      });
    }
  };

  // redirect on success form post
  const onSucces = (history, actions) => {
    history.push(process.env.PUBLIC_URL + "/");
    actions.resetForm({});
  };
  return (
    <>
      {/* Reset Password Modal */}
      <ResetPassword
        open={displayPasswordModal}
        onClose={() => setDisplayPasswordModal(false)}
      />
      <div className="auth-wrapper">
        <p className="text-left auth-title">Login</p>

        <Formik
          initialValues={LoginFormValues}
          validationSchema={LoginValidationSchema}
          onSubmit={async (values, actions) => {
            const { email, password } = values;
            await auth
              .signInWithEmailAndPassword(email, password)
              .then(() => onSucces(history, actions))
              .catch(({ code }) => {
                console.log(code);
                handleServerErrors(code);
              });
          }}
        >
          {(props) => (
            <Form onSubmit={props.handleSubmit}>
              <p style={{ color: "red" }}>{_errorMsg.userNotFound}</p>
              <p style={{ color: "red" }}>{_errorMsg.invalidEmailorPassword}</p>
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
              <Hidden mdUp>
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

              <div className="text-left">
                <AppButton
                  type="submit"
                  bgColor="black"
                  color="white"
                  label={
                    props.isSubmitting ? (
                      <LoadingCircular color="white" size={20} />
                    ) : (
                      "Sign In"
                    )
                  }
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
          <Link
            to="#"
            className="mr-3"
            onClick={() => setDisplayPasswordModal(true)}
          >
            Forgot your Password?
          </Link>
        </div>
      </div>
    </>
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
