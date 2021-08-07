import React from "react";

const Logo = (props) => {
  return (
    <p
      {...props}
      style={{ fontWeight: "500", fontSize: "22px", color: "black" }}
    >
      Dashboard
    </p>
  );
};

export default Logo;
