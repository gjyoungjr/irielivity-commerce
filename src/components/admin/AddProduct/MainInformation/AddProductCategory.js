import React from "react";
import { withStyles, makeStyles, Dialog, IconButton } from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import ChipInput from "material-ui-chip-input";
import { Chip } from "@material-ui/core";
import { Form, Formik, FieldArray } from "formik";
import { useDispatch } from "react-redux";

//icons
import CancelIcon from "@material-ui/icons/Cancel";
import CloseIcon from "@material-ui/icons/Close";

// utils
import { addProductCategory } from "../../../../redux/reducers/products/productsActions";

// components
import { InputField } from "../../../forms/FormFields";
import { ProductCategoryFormValues } from "../../../forms/FormModel/FormInitialValues";
import { ProductCategoryFormModel } from "../../../forms/FormModel/FormModel";
import { ProductCategoryValidationSchema } from "../../../forms/FormModel/ValidationSchema";
import AppButton from "../../../app-button";
import LoadingCircular from "../../../loading/LoadingCircular";

export default function ProductCategory({ open, handleClose }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    formField: { categoryName, subCategories },
  } = ProductCategoryFormModel;

  // fxn submits form data
  const handleAddProductCategory = (values, actions) => {
    // data obj to be sent to db
    const data = {
      value: values.categoryName,
      label: values.categoryName,
      subCategories: values.subCategories,
    };
    dispatch(addProductCategory(data));

    // close dialog after submitting form data
    handleClose();
  };
  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        classes={{ paper: classes.paper }}
      >
        <DialogTitle onClose={handleClose}>Create Product Category</DialogTitle>
        <DialogContent dividers>
          <Formik
            initialValues={ProductCategoryFormValues}
            onSubmit={handleAddProductCategory}
            validationSchema={ProductCategoryValidationSchema}
          >
            {(props) => {
              return (
                <Form onSubmit={props.handleSubmit}>
                  <div className="mb-4">
                    <InputField
                      name={categoryName.name}
                      label={categoryName.label}
                      fullWidth
                    />
                  </div>

                  <FieldArray
                    name="subCategories"
                    render={(arrayHelpers) => (
                      <ChipInput
                        chipRenderer={chipRenderer}
                        name={subCategories.name}
                        label={subCategories.label}
                        value={props.values.subCategories}
                        onAdd={(chip) => {
                          arrayHelpers.push(chip);
                        }}
                        onDelete={(chip, index) =>
                          arrayHelpers.remove(index, chip)
                        }
                        fullWidth
                        helperText={props.errors && props.errors.subCategories}
                        classes={{ helperText: classes.helperText }}
                        error={props.errors.subCategories}
                      />
                    )}
                  />

                  <div className="text-right mt-3">
                    <AppButton
                      label={
                        props.isSubmitting ? (
                          <LoadingCircular color="white" size={17} />
                        ) : (
                          "Submit"
                        )
                      }
                      type="submit"
                      color="white"
                      bgColor="blue"
                      width="120px"
                      borderRadius="20px"
                    />
                  </div>
                </Form>
              );
            }}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// helper fxn to render chips
const chipRenderer = ({ chip, className, handleClick, handleDelete }, key) => {
  return (
    <Chip
      className={className}
      key={key}
      label={chip}
      onClick={handleClick}
      onDelete={handleDelete}
      deleteIcon={<CancelIcon style={{ color: "black" }} />}
      style={{
        backgroundColor: "rgba(23.0, 82.0, 255.0, .2)",
        color: "black",
      }}
    />
  );
};

const useStyles = makeStyles(() => ({
  paper: { minWidth: "500px", borderRadius: "15px" },
  helperText: {
    color: "red",
  },
}));
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },

  //   paper: { minWidth: "500px" },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <h4 className="font-weight-bold">{children}</h4>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);
