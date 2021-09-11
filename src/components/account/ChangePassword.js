import React, { useState } from "react";
import { Form, Formik } from "formik";
import { InputAdornment, IconButton } from "@material-ui/core";

// utils
import { changePasswordValidationSchema } from "../forms/FormModel/ValidationSchema";
import { ChangePasswordFormModel } from "../forms/FormModel/FormModel";
import { ChangePasswordFormValues } from "../forms/FormModel/FormInitialValues";

// components
import { InputField } from "../forms/FormFields";
import AppButton from "../app-button";
import LoadingCircular from "../loading/LoadingCircular";
import Reauthenticate from "./Reauthenticate";
import Notification from "../snackbar-notif/Notification";

// icons
// iconso
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

export default function ChangePassword({ currentUser }) {
  // grabs userauth
  const { userAuth } = currentUser;
  // enables/disbable password viewing
  const [showPassword, setShowPassword] = useState(false);
  const [displayReauth, setDisplayReauth] = useState(true);
  const [displayNotif, setDisplayNotif] = useState(false);

  // destructure object for fields
  const {
    formField: { newPassword },
  } = ChangePasswordFormModel;
  return (
    <div style={{ width: "100%" }}>
      <Reauthenticate
        open={displayReauth}
        onClose={() => setDisplayReauth(false)}
        currentUser={currentUser}
      />
      <Notification
        open={displayNotif}
        message="Successfully changed password"
        onClose={() => setDisplayNotif(false)}
      />
      <Formik
        initialValues={ChangePasswordFormValues}
        validationSchema={changePasswordValidationSchema}
        onSubmit={async (values, actions) => {
          const { newPassword } = values;

          await userAuth
            .updatePassword(newPassword)
            .then(() => {
              // Update successful
              setDisplayNotif(true);
              actions.resetForm({});
            })
            .catch(({ code }) => {
              // An error happened.
              setDisplayReauth(true);
              console.log(code);
            });
        }}
      >
        {(props) => (
          <Form onSubmit={props.handleSubmit}>
            <p>New Password</p>
            <InputField
              type={showPassword ? "text" : "password"}
              name={newPassword.name}
              label={newPassword.label}
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
            <div className="text-left">
              <AppButton
                width="130px"
                type="submit"
                bgColor="black"
                color="white"
                label={
                  props.isSubmitting ? (
                    <LoadingCircular color="white" />
                  ) : (
                    "Save"
                  )
                }
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
