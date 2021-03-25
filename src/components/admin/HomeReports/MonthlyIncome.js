import React, { useEffect, useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles,
} from "@material-ui/core";
import CountUp from "react-countup";
import moment from "moment";

// icons
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
// import MoneyIcon from "@material-ui/icons/Money";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  avatar: {
    backgroundColor: "rgba(70.0, 203.0, 92.0, 0.3)",
    // backgroundColor: colors.red[600],
    height: 56,
    width: 56,
  },
  differenceIcon: {
    color: colors.red[900],
  },
  differenceValue: {
    color: colors.red[900],
    marginRight: theme.spacing(1),
  },
}));

// format fxn for date
const formatDate = (value) => {
  const timeStampDate = value;
  const dateInMillis = timeStampDate.seconds * 1000;
  value = new Date(dateInMillis).toDateString();

  return new Date(value);
};

const Budget = ({ className, allOrders, ...rest }) => {
  const classes = useStyles();
  const [monthlyIncome, setMonthlyIncome] = useState(0);

  useEffect(() => {
    //handle guard
    if (!allOrders) return;

    // start & end of month date used for comparison
    const startOfMonth = moment().startOf("month").toDate();
    const endOfMonth = moment().endOf("month").toDate();

    // filter data to get only orders of the current month
    const monthlyOrders = allOrders.filter(
      (order) =>
        formatDate(order.createdAt) >= startOfMonth &&
        formatDate(order.createdAt) <= endOfMonth
    );

    // get total income from orders from the current month
    const totalMonthlyIncome = monthlyOrders.reduce((totalIncome, order) => {
      return totalIncome + order.orderTotal;
    }, 0);
    // set state with value
    setMonthlyIncome(totalMonthlyIncome);
  }, [allOrders]);

  return (
    <Card
      elevation={20}
      style={{ borderRadius: "15px" }}
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Typography
              color="textSecondary"
              className="font-weight-bold"
              gutterBottom
              variant="h6"
            >
              MONTHLY INCOME
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
              className="font-weight-bold"
            >
              $
              <CountUp
                start={0}
                end={parseInt(monthlyIncome)}
                duration={2.75}
                separator=","
                decimals={2}
              />
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <AttachMoneyIcon style={{ color: "#46C5BC" }} />
            </Avatar>
          </Grid>
        </Grid>
        <Box mt={2} display="flex" alignItems="center">
          <ArrowDownwardIcon className={classes.differenceIcon} />
          <Typography className={classes.differenceValue} variant="body2">
            12%
          </Typography>
          <Typography color="textSecondary" variant="caption">
            Since last month
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

Budget.propTypes = {
  className: PropTypes.string,
};

export default Budget;
