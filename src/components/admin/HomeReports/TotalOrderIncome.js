import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  makeStyles,
  // colors,
} from "@material-ui/core";
import CountUp from "react-countup";

// icons
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
  },
  avatar: {
    backgroundColor: "rgba(255.0, 55.0, 75.0, 0.3)",
    height: 56,
    width: 56,
  },
}));

const TotalProfit = ({ className, totalOrderIncome, ...rest }) => {
  const classes = useStyles();

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
              TOTAL INCOME
            </Typography>
            <Typography
              color="textPrimary"
              className="font-weight-bold"
              variant="h3"
            >
              $
              <CountUp
                start={0}
                end={totalOrderIncome}
                duration={2.75}
                decimals={2}
                separator=","
              />
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <AttachMoneyIcon style={{ color: "#FF374B" }} />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

TotalProfit.propTypes = {
  className: PropTypes.string,
};

export default TotalProfit;
