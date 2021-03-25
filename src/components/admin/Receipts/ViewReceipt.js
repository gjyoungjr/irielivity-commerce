import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";

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
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
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
    height: "100%",
    width: "100%",
    textAlign: "center",
    backgroundColor: "white",
  },
}))(MuiDialogContent);

export default function CustomizedDialogs({
  open = false,
  handleClose,
  receipt,
}) {
  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        style={{ height: "90%" }}
        PaperProps={{ style: { borderRadius: "20px" } }}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Receipt
        </DialogTitle>
        <DialogContent dividers>
          <embed
            src={receipt}
            type="application/pdf"
            width="600px"
            height="850px"
            style={{ backgroundColor: "white" }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
