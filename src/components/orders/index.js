import React, { Fragment, useState } from "react";
import {
  Card,
  Box,
  BottomNavigation,
  BottomNavigationAction,
  makeStyles,
} from "@material-ui/core";

// utils fxn
import { auth } from "../../firebase/utils";

// components
import OrderHistory from "./OrderHistory";

// stylesheet
const useStyles = makeStyles({
  root: {
    width: 300,
    height: 50,
    backgroundColor: "#fdfbf4",
  },
  selected: {
    backgroundColor: "black",
    color: "white",
    borderRadius: "30px",

    margin: "5px 5px 5px 5px",
  },
  card: {
    position: "fixed !important",
    bottom: "2%",
    zIndex: 1,
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "35px",
  },
});

export default function BottomNav({ usersOrders }) {
  const classes = useStyles();
  const [tabValue, setTabValue] = useState(0);

  // fxn handles sign out of user
  const handleSignOut = () => {
    auth.signOut();
  };

  return (
    <Fragment>
      {/* Props passed to order history for conditional Render */}
      <OrderHistory tabValue={tabValue} usersOrders={usersOrders} />
      <Card className={classes.card} elevation={10}>
        <Box maxWidth={400}>
          <BottomNavigation
            value={tabValue}
            onChange={(event, newValue) => {
              setTabValue(newValue);
            }}
            showLabels
            className={classes.root}
          >
            <BottomNavigationAction
              label="Order History"
              classes={{ selected: classes.selected }}
            />
            <BottomNavigationAction
              label="Sign Out"
              classes={{ selected: classes.selected }}
              onClick={() => handleSignOut()}
            />
          </BottomNavigation>
        </Box>
      </Card>
    </Fragment>
  );
}
