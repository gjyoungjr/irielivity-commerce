import React from "react";
import { Container, Grid, makeStyles } from "@material-ui/core";

// components
import MonthlyIncome from "./MonthlyIncome";
import LatestOrders from "./LatestOrders";
import Sales from "./Sales";
import TotalOrders from "./TotalOrders";
import TotalOrderIncome from "./TotalOrderIncome";
import TrafficByDevice from "./TrafficByDevice";
import TotalCustomers from "./TotalCustomers";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

export default function HomeReports({
  usersCount,
  latestOrders,
  ordersStats,
  totalOrderIncome,
  weeklySales,
  allOrders,
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={3} sm={6} xl={3} xs={12} md={3}>
            <MonthlyIncome allOrders={allOrders} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12} md={3}>
            <TotalCustomers usersCount={usersCount} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12} md={3}>
            <TotalOrders ordersStats={ordersStats} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12} md={3}>
            <TotalOrderIncome totalOrderIncome={totalOrderIncome} />
          </Grid>

          <Grid item lg={8} md={12} xl={9} xs={12}>
            <Sales weeklySales={weeklySales} />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <TrafficByDevice />
          </Grid>

          <Grid item lg={12} md={12} xl={12} xs={12}>
            <LatestOrders latestOrders={latestOrders} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
