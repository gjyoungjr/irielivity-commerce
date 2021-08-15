/*eslint-disable */

import React, { useState, Fragment } from "react";
import { Fab, Badge } from "@material-ui/core";
import { useSelector } from "react-redux";

// icons
import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";

// components
import NotificationList from "./NotificationList";

// grabs data from redux store
// const mapState = ({ ordersData }) => ({
//   ordersNotificationData: ordersData.ordersNotificationData,
// });

export default function Notification() {
  // grabs order notif data
  // const { ordersNotificationData } = useSelector(mapState);

  // console.log(ordersNotificationData);

  const [anchorEl, setAnchorEl] = useState(null);
  const divRef = React.useRef();

  // fxn to display popper
  const handleDisplayMenu = (event) => {
    setAnchorEl(divRef.current);
  };

  // fxn to hide poper
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  return (
    <Fragment>
      <Fab
        size="small"
        style={{ backgroundColor: "#EFF0F3" }}
        onClick={() => handleDisplayMenu()}
        aria-haspopup="true"
        ref={divRef}
      >
        <Badge badgeContent={1} color="primary">
          <NotificationsIcon />
        </Badge>
      </Fab>
      <NotificationList
        anchorEl={anchorEl}
        handleCloseMenu={handleCloseMenu}
        // ordersNotificationData={ordersNotificationData}
      />
    </Fragment>
  );
}
