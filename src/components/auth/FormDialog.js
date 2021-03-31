import React, { useState } from "react";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import {
  withStyles,
  makeStyles,
  Dialog,
  IconButton,
  Typography,
} from "@material-ui/core";
//icons
import CloseIcon from "@material-ui/icons/Close";

// components
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: "black",
    backgroundColor: "#f5f5f5",
  },
  //   backDrop: {
  //     backdropFilter: "blur(3px)",
  //     backgroundColor:'rgba(0,0,30,0.4)'
  //   },
});
const useStyles = makeStyles(() => ({
  backDrop: {
    backdropFilter: "blur(3px)",
    backgroundColor: "rgba(0,0,30,0.4)",
  },
  paper: {
    width: "530px",
    maxHeight: "600px",
  },
}));

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
  },
}))(MuiDialogContent);

const RegisterLink = ({ showRegisterForm }) => (
  <div className="text-center text-black">
    <p style={{ opacity: 0.8 }}>
      Not a member?{" "}
      <span
        className="mr-3"
        onClick={() => {
          showRegisterForm();
        }}
        style={{
          color: "black",
          textDecoration: "underline",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Join Us.
      </span>
    </p>
  </div>
);

const LogInLink = ({ showLoginForm }) => (
  <div className="text-center text-black">
    <p style={{ opacity: 0.8 }}>
      Already a member?{" "}
      <span
        className="mr-3"
        onClick={() => {
          showLoginForm();
        }}
        style={{
          color: "black",
          textDecoration: "underline",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Sign In.
      </span>
    </p>
  </div>
);

export default function FormDialog({ open, onClose }) {
  const classes = useStyles();
  const [displayRegisterForm, setDisplayRegisterForm] = useState(false);
  return (
    <div>
      <Dialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        PaperProps={{ style: { borderRadius: "25px" } }}
        classes={{ paper: classes.paper }}
        // BackdropProps={{
        //     classes: {
        //       root: classes.backDrop,
        //     },
        //   }}
      >
        <DialogTitle onClose={onClose} />

        <DialogContent>
          {displayRegisterForm ? <RegisterForm /> : <LoginForm />}

          {!displayRegisterForm && (
            <RegisterLink
              showRegisterForm={() => setDisplayRegisterForm(true)}
            />
          )}
          {displayRegisterForm && (
            <LogInLink showLoginForm={() => setDisplayRegisterForm(false)} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
