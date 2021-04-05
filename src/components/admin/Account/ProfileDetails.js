import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Grid,
} from "@material-ui/core";
import { Form, Formik } from "formik";

// components
// -> form fields
import { InputField } from "../../forms/FormFields";
// -> form models/structure
import { AdminAccountDetailsFormModel } from "../../forms/FormModel/FormModel";
import { AdminAccountDetailsValidationSchema } from "../../forms/FormModel/ValidationSchema";
import { AdminAccountDetailsFormValues } from "../../forms/FormModel/FormInitialValues";

// map user state to component
const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const ProfileDetails = ({ className, ...rest }) => {
  // grabs form fields
  const {
    formField: { adminEmail, adminFirstName, adminLastName },
  } = AdminAccountDetailsFormModel;
  // grabs current user from redux
  const { currentUser } = useSelector(mapState);
  // destructure data returned from db
  const { email, firstName, lastName } = currentUser;

  const [fetchedFormValues, setFetchedFormValues] = useState(null);

  // loads and set data for form fields on component mount
  useEffect(() => {
    // if no data exit
    if (!currentUser) return;

    // else load data & create object for form values
    const formValues = {
      adminFirstName: firstName || "",
      adminLastName: lastName || "",
      adminEmail: email || "",
    };

    // set state with form values
    setFetchedFormValues(formValues);
  }, [email, firstName, lastName, currentUser]);

  return (
    <Card elevation={10} style={{ borderRadius: "15px" }}>
      <CardHeader subheader="The information can be edited" title="Profile" />
      <Divider />
      <div style={{ padding: "20px" }}>
        <Formik
          initialValues={fetchedFormValues || AdminAccountDetailsFormValues}
          validationSchema={AdminAccountDetailsValidationSchema}
          enableReinitialize
        >
          {() => {
            return (
              <Form>
                <Grid container spacing={3}>
                  <Grid item md={6} xs={12}>
                    <InputField
                      fullWidth
                      name={adminFirstName.name}
                      label={adminFirstName.label}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <InputField
                      fullWidth
                      name={adminLastName.name}
                      label={adminLastName.label}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <InputField
                      fullWidth
                      name={adminEmail.name}
                      label={adminEmail.label}
                      variant="outlined"
                    />
                  </Grid>
                  {/* <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="phone"
                      onChange={handleChange}
                      type="number"
                      value={values.phone}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Country"
                      name="country"
                      onChange={handleChange}
                      required
                      value={values.country}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Select State"
                      name="state"
                      onChange={handleChange}
                      required
                      select
                      SelectProps={{ native: true }}
                      value={values.state}
                      variant="outlined"
                    >
                      {states.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </TextField>
                  </Grid> */}
                </Grid>

                <Divider className="mt-4" />
                <Box display="flex" justifyContent="flex-end" p={2}>
                  <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    style={{ borderRadius: "20px", textTransform: "none" }}
                  >
                    Save Details
                  </Button>
                </Box>
              </Form>
            );
          }}
        </Formik>
      </div>
    </Card>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string,
};

export default ProfileDetails;
