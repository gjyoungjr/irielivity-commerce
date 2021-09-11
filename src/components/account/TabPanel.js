import React from "react";
import PropTypes from "prop-types";

export default function TabPanel({ children }) {
  return <div>{children}</div>;
}
TabPanel.propTypes = {
  children: PropTypes.node,
};
