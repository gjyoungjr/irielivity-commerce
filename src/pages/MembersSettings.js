import React, { Fragment, useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import { makeStyles, AppBar, Tabs, Tab } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

// utils
import { getUserOrderHistory } from "../redux/reducers/orders/ordersActions";

// layouts
import MinimalLayout from "../layouts/MinimalLayout";

// components -> render with in tabs
import OrderHistory from "../components/orders/OrderHistory";
import EditAccount from "../components/account";

// helper fxn renders children for tabs
const TabPanel = ({ children }) => {
  return <div>{children}</div>;
};

// styles
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginLeft: "-30px",
    marginRight: "-30px",
  },
  indicator: {
    backgroundColor: "black",
  },
}));

// map state to component
const mapState = ({ user, ordersData }) => ({
  _currentUser: user.currentUser.userAuth,
  orderHistory: ordersData.orderHistory.data,
});

export default function UsersMenu({ currentUser }) {
  const dispatch = useDispatch();
  // destructure state
  const { _currentUser, orderHistory } = useSelector(mapState);

  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  // fetch order hsitory on component mount
  useEffect(() => {
    dispatch(getUserOrderHistory(_currentUser.uid));
  }, [dispatch, _currentUser.uid]);

  const content = [
    <OrderHistory usersOrders={orderHistory} />,
    <EditAccount currentUser={currentUser} />,
  ];

  return (
    <Fragment>
      <MetaTags>
        <title>Irielivity Ltd. Members </title>
        <meta name="description" content="Zyania Alonzo E-commerce Store." />
      </MetaTags>
      <MinimalLayout>
        <div className={classes.root}>
          <AppBar
            position="static"
            style={{
              backgroundColor: "#f5f5f5",
              boxShadow: "none",
              color: "black",
              borderBottom: "1px solid #f5f5f5",
              marginTop: "-31px",
              overflow: "auto",
              width: "100%",
            }}
          >
            <Tabs
              value={value}
              onChange={handleTabChange}
              aria-label="simple tabs example"
              centered
              classes={{
                indicator: classes.indicator,
              }}
            >
              <Tab label="Order History" style={{ textTransform: "none" }} />
              <Tab label="Account" style={{ textTransform: "none" }} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            {content[value]}
          </TabPanel>
        </div>
      </MinimalLayout>
    </Fragment>
  );
}
