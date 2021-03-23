import React from "react";
import { Snackbar, IconButton } from "@material-ui/core";
import PropTypes from "prop-types";

import CloseIcon from "@material-ui/icons/Close";

export default function Notification({ open, message, onClose }) {
  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        ContentProps={{
          style: { backgroundColor: "green", color: "white" },
        }}
        onClose={onClose}
        open={open}
        autoHideDuration={5000}
        message={message}
        action={
          <React.Fragment>
            <IconButton size="small" color="inherit" onClick={onClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}

Notification.propTypes = {
  show: PropTypes.bool,
  message: PropTypes.string,
  onClose: PropTypes.func,
};
