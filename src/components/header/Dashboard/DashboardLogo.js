import React from "react";

// import logo from "../../../assets/img/logo/logo.png";
const Logo = (props) => {
  // return <img alt="Logo" src={logo} {...props} style={{height: '5%', width: '5%'}} />;
  return (
    <p
      {...props}
      style={{ fontWeight: "500", fontSize: "22px", color: "black", }}
    >
      Dashboard
    </p>
  );
};

export default Logo;
