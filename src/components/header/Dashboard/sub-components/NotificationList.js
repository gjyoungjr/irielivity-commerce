/*eslint-disable */

import React from "react";
import { Menu, withStyles } from "@material-ui/core";

// components
import NotificationSingle from "./NotificationSingle";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
    borderRadius: "10px",
    width: "100%",
    maxWidth: "36ch",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
    style={{ marginTop: "25px", width: "100%" }}
  />
));

export default function NotificationList({
  anchorEl,
  handleCloseMenu,
  ordersNotificationData,
}) {
  return (
    <StyledMenu
      id="customized-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleCloseMenu}
    >
      {/* <div>
        {ordersNotificationData.map((order, key) => (
          <NotificationSingle order={order} key={key} />
        ))}
      </div> */}
    </StyledMenu>
  );
}
