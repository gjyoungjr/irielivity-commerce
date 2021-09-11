import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Formik, Form } from "formik";
import { auth } from "../../firebase/utils";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

// components
import AppButton from "../app-button";
import Notification from "../snackbar-notif/Notification";
import LoadingCircular from "../loading/LoadingCircular";
//->form fields
import { InputField } from "../forms/FormFields";
//-> form models
import { ResetPasswordFormValues } from "../forms/FormModel/FormInitialValues";
import { resetPasswordValidationSchema } from "../forms/FormModel/ValidationSchema";
import { ResetPasswordFormModel } from "../forms/FormModel/FormModel";

export default function ResetPassword({ open, onClose }) {
  const [displayNotification, setDisplayNotification] = useState(false);
  const [_errorMsg, setErrorMsg] = useState("");

  // destructure object for fields
  const {
    formField: { recoveryEmail },
  } = ResetPasswordFormModel;

  // handles errors thrown by server
  const handleServerErrors = (code, actions) => {
    if (code === "auth/user-not-found") {
      setErrorMsg("Email not found, please try again.");
      actions.setSubmitting(false);
    }
  };

  // succesfull submission of form date
  const onSuccess = (actions) => {
    actions.resetForm({});
    onClose();
    setDisplayNotification(true);
  };
  return (
    <div>
      <Notification
        open={displayNotification}
        message="Email has been sent"
        onClose={() => setDisplayNotification(false)}
      />
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{ style: { borderRadius: "25px" } }}
      >
        <DialogTitle id="form-dialog-title">Reset Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter your email to receive instructions on how to reset your
            account password.
          </DialogContentText>
          <Formik
            initialValues={ResetPasswordFormValues}
            validationSchema={resetPasswordValidationSchema}
            onSubmit={(values, actions) => {
              // destucture values
              const { recoveryEmail } = values;
              // config object used to redirect user
              // on reset password success
              const config = {
                url: "https://irielivity.com/",
              };
              auth
                .sendPasswordResetEmail(recoveryEmail, config)
                .then(() => onSuccess(actions))
                .catch(({ code }) => handleServerErrors(code, actions));
            }}
          >
            {(props) => (
              <Fragment>
                <p style={{ color: "red" }}>{_errorMsg && _errorMsg}</p>
                <Form onSubmit={props.handleSubmit}>
                  <InputField
                    name={recoveryEmail.name}
                    label={recoveryEmail.label}
                    fullWidth
                  />
                  <DialogActions>
                    <AppButton
                      type="submit"
                      bgColor="black"
                      color="white"
                      label={
                        props.isSubmitting ? (
                          <LoadingCircular color="white" />
                        ) : (
                          "Reset"
                        )
                      }
                      width="30%"
                    />
                  </DialogActions>
                </Form>
              </Fragment>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
}

ResetPassword.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};
