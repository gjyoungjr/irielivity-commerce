import React, { Fragment, useRef, useEffect, useState } from "react";
import { Form, Formik } from "formik";

// utils
import { accountDetailsValidationSchema } from "../../forms/FormModel/ValidationSchema";
import { AccountDetailsFormModel } from "../../forms/FormModel/FormModel";
import { AccountDetailsFormValues } from "../../forms/FormModel/FormInitialValues";
import {
  updateUserEmail,
  updateUserFirstName,
  updateUserLastName,
} from "../../../firebase/utils";
import { checkEmail, checkFirstName, checkLastName } from "./utils";

// components
import { InputField } from "../../forms/FormFields";
import AppButton from "../../app-button";
import LoadingCircular from "../../loading/LoadingCircular";
import Reauthenticate from "../Reauthenticate";
import Notification from "../../snackbar-notif/Notification";
import DeleteAccount from "./DeleteAccount";

export default function AccountDetails({ data, currentUser }) {
  // form ref to Formik
  // to get access to props
  const formRef = useRef();

  // destructure object for fields
  const {
    formField: { accountEmail, accountFirstName, accountLastName },
  } = AccountDetailsFormModel;

  // destructure data returned from db
  const { email, firstName, lastName, userAuth } = currentUser;

  // tracks state of field
  // if they are same as the data being set to state
  const [isEmailSame, setIsEmailSame] = useState(true);
  const [isFirstNameSame, setIsFirstNameSame] = useState(true);
  const [isLastNameSame, setIsLastNameSame] = useState(true);
  const [displayReauth, setDisplayReauth] = useState(true);
  const [displayNotif, setDisplayNotif] = useState(false);

  useEffect(() => {
    if (currentUser) {
      // set field values with data from db
      formRef.current.setFieldValue("accountEmail", email || "");
      formRef.current.setFieldValue("accountFirstName", firstName || "");
      formRef.current.setFieldValue("accountLastName", lastName || "");
    }
  }, [currentUser, email, firstName, lastName]);

  return (
    <Fragment>
      <Reauthenticate
        open={displayReauth}
        onClose={() => setDisplayReauth(false)}
        currentUser={currentUser}
      />
      <Notification
        open={displayNotif}
        message="Successfully updated account"
        onClose={() => setDisplayNotif(false)}
      />

      <Formik
        innerRef={formRef}
        enableReinitialize={true}
        initialValues={AccountDetailsFormValues}
        validationSchema={accountDetailsValidationSchema}
        onSubmit={async (values) => {
          const { accountEmail, accountFirstName, accountLastName } = values;
          try {
            if (!isEmailSame) {
              await userAuth
                .updateEmail(accountEmail)
                .then(async () => {
                  setDisplayNotif(true);
                  await updateUserEmail(userAuth);
                })
                .catch(({ code }) => {
                  console.log(code);
                  setDisplayReauth(true);
                });
            }

            if (!isFirstNameSame) {
              await userAuth
                .updateProfile({
                  displayName: accountFirstName,
                })
                .then(async () => {
                  setDisplayNotif(true);
                  await updateUserFirstName(userAuth);
                })
                .catch(({ code }) => {
                  setDisplayReauth(true);
                  console.log(code);
                });
            }

            if (!isLastNameSame) {
              await updateUserLastName(userAuth, accountLastName)
                .then((res) => {
                  setDisplayNotif(true);
                  console.log(res);
                })
                .catch((err) => console.log(err));
            }
          } catch (err) {
            console.log("Err->", err);
          }
        }}
      >
        {(props) => (
          <>
            {checkFirstName(
              props.values.accountFirstName,
              firstName,
              setIsFirstNameSame
            )}
            {checkEmail(props.values.accountEmail, email, setIsEmailSame)}
            {checkLastName(
              props.values.accountLastName,
              lastName,
              setIsLastNameSame
            )}

            <Form onSubmit={props.handleSubmit}>
              {/* Email  */}
              <InputField
                name={accountEmail.name}
                label={accountEmail.label}
                fullWidth
                variant="outlined"
                size="medium"
                style={{ marginBottom: "20px" }}
              />
              {/* First Name  */}
              <InputField
                name={accountFirstName.name}
                label={accountFirstName.label}
                fullWidth
                variant="outlined"
                size="medium"
                style={{ marginBottom: "20px" }}
              />
              {/* Last Name  */}
              <InputField
                name={accountLastName.name}
                label={accountLastName.label}
                fullWidth
                variant="outlined"
                size="medium"
                style={{ marginBottom: "20px" }}
              />
              <DeleteAccount currentUser={currentUser} />

              <div className="text-right mt-10">
                <AppButton
                  width="15%"
                  type="submit"
                  bgColor="black"
                  color="white"
                  disabled={isLastNameSame && isFirstNameSame && isEmailSame}
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
          </>
        )}
      </Formik>
    </Fragment>
  );
}
