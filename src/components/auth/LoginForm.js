import React, { useState } from "react";
import {
  FormControlLabel,
  InputAdornment,
  IconButton,
  Checkbox,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
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
  const [showPasswordModal, setShowPasswordModal] = useState(false);
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
    window.location.reload(false);
    actions.resetForm({});
  };
  return (
    <React.Fragment>
      <ResetPassword
        open={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
      />
      <div className="auth-wrapper">
        <p className="text-center auth-title  font-weight-bold">
          Hello, Welcome Back!
        </p>

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

              <InputField
                label={email.label}
                name={email.name}
                className="mb-3"
                fullWidth
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
              />
              <div
                className="d-flex justify-content-between"
                style={{ marginTop: "15px" }}
              >
                <FormControlLabel
                  style={{ marginTop: "-5px" }}
                  value="end"
                  control={
                    <Checkbox
                      style={{ color: "black" }}
                      size="small"
                      defaultChecked
                    />
                  }
                  label={<p className="sign-in">Keep me signed in.</p>}
                  labelPlacement="end"
                />
                <a
                  href="#/"
                  onClick={() => {
                    setShowPasswordModal(true);
                  }}
                  className="forgot-password"
                >
                  Forgot Password?{" "}
                </a>
              </div>
              <br></br>

              <div className="text-center">
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
                  width="100%"
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </React.Fragment>
  );
}
