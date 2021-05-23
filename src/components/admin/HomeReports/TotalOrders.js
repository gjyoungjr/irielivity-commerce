import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Typography,
  makeStyles,
  // colors,
} from "@material-ui/core";
import CountUp from "react-countup";

//icons
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
  },
  avatar: {
    backgroundColor: "rgba(255.0, 191.0, 41.0, 0.3)",
    height: 56,
    width: 56,
  },
}));

const TotalOrders = ({ className, ordersStats, ...rest }) => {
  const classes = useStyles();

  // gets orders count from props being passed
  const ordersCount = ordersStats.length ? ordersStats[0].ordersCount : 0;

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
              TOTAL ORDERS
            </Typography>
            <Typography
              color="textPrimary"
              className="font-weight-bold"
              variant="h3"
            >
              <CountUp
                start={0}
                end={ordersCount}
                duration={2.75}
                separator=","
              />
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <ShoppingCartOutlinedIcon style={{ color: "#FFBF29" }} />
            </Avatar>
          </Grid>
        </Grid>
        <Box mt={3}>
          <LinearProgress value={75.5} variant="determinate" />
        </Box>
      </CardContent>
    </Card>
  );
};

TotalOrders.propTypes = {
  className: PropTypes.string,
};

export default TotalOrders;
