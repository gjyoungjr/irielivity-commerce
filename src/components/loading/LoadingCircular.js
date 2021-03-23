import React from "react";
import { CircularProgress } from "@material-ui/core";
import PropTypes from "prop-types";

export default function LoadingCircular({ color, size }) {
  return (
    <div>
      <CircularProgress style={{ color: color }} size={size ? size : 18} />
    </div>
  );
}

LoadingCircular.propTypes = {
  color: PropTypes.string,
};
