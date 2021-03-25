/*eslint-disable */

import React from "react";
import {
  Avatar,
  Divider,
  ListItem,
  ListItemAvatar,
  Typography,
  ListItemText,
  MenuItem,
} from "@material-ui/core";
import moment from "moment";
import { useHistory } from "react-router-dom";

// currency format fxn
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

// format fxn for date
// const formatDate = (value) => {
//   const timeStampDate = value;
//   const dateInMillis = timeStampDate.seconds * 1000;
//   value = new Date(dateInMillis).toDateString();

//   return value;
// };

export default function NotificationSingle({ order }) {
  const history = useHistory();

  // grabs avatar url for user
  // const avatarUrl = order.user.avatarUrl;
  // // grabs user full name
  // const userName = order.user.fullName;
  // // gets initial from user name
  // const initials = order.user.fullName.charAt(0);

  // on click on notif
  // route user to orders data table
  const routeToOrders = () => {
    history.push("/admin/orders");
  };

  return (
    <div>
      <MenuItem>
        {/* <ListItem alignItems="flex-start" onClick={() => routeToOrders()}>
          <ListItemAvatar>
            {avatarUrl ? (
              <Avatar src={avatarUrl} />
            ) : (
              <Avatar>{initials}</Avatar>
            )}
          </ListItemAvatar>
          <ListItemText
            primary={userName}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  noWrap
                  color="textPrimary"
                >
                  {`${moment().format("LLL")} `}
                </Typography>
                <br></br>
                {formatter.format(order.orderTotal)}
              </React.Fragment>
            }
          />
        </ListItem> */}
      </MenuItem>
      <Divider />
    </div>
  );
}
