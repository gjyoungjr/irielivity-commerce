import React from "react";
import { Form, Formik } from "formik";
import { Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

// components
import { RatingForm } from "../../../../ratings";
import AppButton from "../../../../button/AppButton";
import Loading from "../../../../loading-progress/LoadingCircular";
import PopupDialog from "../../../../dialog/PopupDialog";
// -> form fields
import { InputField } from "../../../../forms/formFields";
// -> form structure/model
import { ProductReviewFormValues } from "../../../../forms/formModel/FormInitialValues";
import { ProductReviewFormModel } from "../../../../forms/formModel/FormModel";
import { ProductReviewValidationSchema } from "../../../../forms/formModel/ValidationSchema";

// uitls fxn
import {
  addProductReview,
  fetchProductReviewStart,
} from "../../../../../redux/reducers/products/productsActions";

// map user state to component
const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

export default function AddReview({ product }) {
  const dispatch = useDispatch();
  // gets from fields
  const {
    formField: { subject, message },
  } = ProductReviewFormModel;
  // grabs current user from redux
  const { currentUser } = useSelector(mapState);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // handles submission of form data
  const handleSubmitFormData = (values, actions) => {
    // destructure for formik values
    const { subject, message, rating } = values;
    const { documentID } = product;

    // data object to be sent to db
    const data = {
      subject: subject,
      message: message,
      rating: rating,
      productID: documentID,
      user: {
        fullName: currentUser.firstName + " " + currentUser.lastName,
        email: currentUser.email,
        avatarUrl: currentUser.avatarUrl ? currentUser.avatarUrl : "",
      },
    };

    // create param for fetch product review
    const filterType = documentID;

    // dispatch redux action
    // calls helper fxn to submit data
    dispatch(addProductReview(data));
    // calls fxn to fetch data so ui can be updated with new data
    dispatch(fetchProductReviewStart({ filterType }));
    // reset form after data is submitted
    setTimeout(() => {
      actions.setSubmitting(false);
      actions.resetForm({});
    }, 1000);
    handleClose();
  };

  return (
    <div className="ratting-form-wrapper pl-50">
      <div style={{ marginTop: "-20px" }}>
        <AppButton
          color="white"
          bgColor="black"
          width="130px"
          height="45px"
          borderRadius="25px"
          label="Add a Review"
          onClick={() => handleClickOpen()}
        />
      </div>

      <PopupDialog open={open} handleClose={handleClose} title="Review">
        <Formik
          initialValues={ProductReviewFormValues}
          validationSchema={ProductReviewValidationSchema}
          onSubmit={handleSubmitFormData}
        >
          {(props) => {
            return (
              <Form onSubmit={props.handleSubmit}>
                <div className="d-flex justify-content-start mt-2 mb-3">
                  <span className="mr-2">Your rating:</span>
                  <div className="mt-1">
                    <RatingForm
                      name="rating"
                      onChange={(e, value) => {
                        props.setFieldValue("rating", value);
                      }}
                    />
                  </div>
                </div>

                <Grid container spacing={2}>
                  <Grid item xs={12} lg={12}>
                    <InputField
                      name={subject.name}
                      label={subject.label}
                      fullWidth
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2} className="mt-1">
                  <Grid item xs={12} lg={12}>
                    <InputField
                      name={message.name}
                      label={message.label}
                      fullWidth
                      variant="outlined"
                      size="small"
                      multiline
                      rows={5}
                    />
                  </Grid>
                </Grid>

                <div className="mt-3">
                  <AppButton
                    type="submit"
                    bgColor="black"
                    color="white"
                    width="130px"
                    disabled={!currentUser}
                    label={
                      props.isSubmitting ? (
                        <Loading size={18} color="white" />
                      ) : (
                        "Submit"
                      )
                    }
                  />
                </div>
              </Form>
            );
          }}
        </Formik>
      </PopupDialog>
    </div>
  );
}
