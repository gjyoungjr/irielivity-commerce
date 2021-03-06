import React from "react";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";

export default function AppButton({
  onClick,
  width,
  bgColor,
  color,
  label,
  type,
  disabled,
  border,
  height = false,
  borderRadius,
}) {
  return (
    <>
      {disabled ? (
        <Button
          className="app-button"
          type={type}
          disabled={disabled}
          onClick={onClick}
          style={{
            borderRadius: "20px",
            backgroundColor: "#f5f5f5",
            opacity: 0.8,
            color: color,
            padding: "8px 10px",
            textTransform: "none",
            width: width,
          }}
        >
          {label}
        </Button>
      ) : height ? (
        <Button
          className="app-button"
          type={type}
          onClick={onClick}
          style={{
            borderRadius: borderRadius,
            border: border,
            backgroundColor: bgColor,
            color: color,
            padding: "8px 10px",
            textTransform: "none",
            width: width,
            height: height,
          }}
        >
          {label}
        </Button>
      ) : (
        <Button
          className="app-button"
          type={type}
          onClick={onClick}
          style={{
            borderRadius: "20px",
            border: border,
            backgroundColor: bgColor,
            color: color,
            padding: "8px 10px",
            textTransform: "none",
            width: width,
          }}
        >
          {label}
        </Button>
      )}
    </>
  );
}
AppButton.propTypes = {
  onClick: PropTypes.func,
  width: PropTypes.string,
  bgColor: PropTypes.string,
  color: PropTypes.string,
  label: PropTypes.any,
  type: PropTypes.string,
};
