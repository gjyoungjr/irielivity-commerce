import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  InputAdornment,
} from "@material-ui/core";
import { Form, Formik } from "formik";

// utils
import { reauthValidationSchema } from "../forms/FormModel/ValidationSchema";
import { ReauthFormModel } from "../forms/FormModel/FormModel";
import { ReauthFormValues } from "../forms/FormModel/FormInitialValues";
import { emailProvider } from "../../firebase/utils";

// icons
import CancelIcon from "@material-ui/icons/Cancel";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

// components
import { InputField } from "../forms/FormFields";
import AppButton from "../app-button";
import LoadingCircular from "../loading/LoadingCircular";
import Notification from "../snackbar-notif/Notification";

export default function FormDialog({ open, onClose, currentUser }) {
  // grabs user auth
  const { userAuth } = currentUser;
  // enables/diable password view
  const [showPassword, setShowPassword] = useState(false);
  // hide/show notif
  const [displayNotif, setDisplayNotif] = useState(false);
  // server sider errors
  const [_errorMsg, setErrorMsg] = useState({
    mistMatchCredentials: "",
    invalidEmailorPassword: "",
  });
  // grabs form fields
  const {
    formField: { reauthEmail, reauthPassword },
  } = ReauthFormModel;
  // helper fxn handle server side errors
  const handleServerErrors = (code, actions) => {
    if (code === "auth/user-mismatch") {
      setErrorMsg({
        mistMatchCredentials:
          "Email/password doesnt matches your current credentials.",
      });
      actions.setSubmitting(false);
    }
    if (code === "auth/wrong-password") {
      setErrorMsg({
        invalidEmailorPassword: "Invalid email/password, please try again.",
      });
      actions.setSubmitting(false);
    }
  };
  return (
    <div>
      {/* Notification Display  */}
      <Notification
        open={displayNotif}
        onClose={() => setDisplayNotif(false)}
        message="Successfully Reauthenicated."
      />
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="form-dialog-title"
        PaperProps={{ style: { borderRadius: "25px" } }}
      >
        <DialogTitle>
          <div className="d-flex justify-content-between">
            <p style={{ fontSize: "20px", fontWeight: "bold" }}>
              Reauthentication
            </p>

            <IconButton style={{ marginTop: "-15px" }} onClick={onClose}>
              <CancelIcon style={{ color: "black" }} />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            For Security reasons, its neccessary for you to log in before
            updating your account details.
          </DialogContentText>

          <Formik
            initialValues={ReauthFormValues}
            validationSchema={reauthValidationSchema}
            onSubmit={(values, actions) => {
              const { reauthEmail, reauthPassword } = values;
              const credential = emailProvider.credential(
                reauthEmail,
                reauthPassword
              );
              userAuth
                .reauthenticateWithCredential(credential)
                .then(() => {
                  setDisplayNotif(true);
                  onClose();
                  actions.resetForm({});
                })
                .catch(({ code }) => {
                  handleServerErrors(code, actions);
                  console.log(code);
                });
            }}
          >
            {(props) => (
              <Form onSubmit={props.handleSubmit}>
                <p style={{ color: "red" }}>{_errorMsg.mistMatchCredentials}</p>
                <p style={{ color: "red" }}>
                  {_errorMsg.invalidEmailorPassword}
                </p>
                <InputField
                  name={reauthEmail.name}
                  label={reauthEmail.label}
                  fullWidth
                  variant="outlined"
                  size="medium"
                  style={{ marginBottom: "20px" }}
                />
                <InputField
                  type={showPassword ? "text" : "password"}
                  name={reauthPassword.name}
                  label={reauthPassword.label}
                  fullWidth
                  variant="outlined"
                  size="medium"
                  style={{ marginBottom: "20px" }}
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
                <DialogActions>
                  <AppButton
                    width="25%"
                    type="submit"
                    bgColor="black"
                    color="white"
                    label={
                      props.isSubmitting ? (
                        <LoadingCircular color="white" />
                      ) : (
                        "Log In"
                      )
                    }
                  />
                </DialogActions>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
}
