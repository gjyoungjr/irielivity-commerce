/*eslint-disable */
import React from "react";
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

// icons
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import PeopleIcon from "@material-ui/icons/PeopleOutlined";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  avatar: {
    backgroundColor:"rgba(23.0, 82.0, 255.0, 0.3)",
    height: 56,
    width: 56,
  },
  differenceIcon: {
    color: colors.green[900],
  },
  differenceValue: {
    color: colors.green[900],
    marginRight: theme.spacing(1),
  },
}));

const TotalCustomers = ({ className, usersCount, ...rest }) => {
  const classes = useStyles();

  // const totalCustomers = usersCount.length > 0 ? usersCount[0].usersCount : 0

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
            <Typography color="textSecondary" className="font-weight-bold" gutterBottom variant="h6">
              TOTAL CUSTOMER
            </Typography>
            <Typography color="textPrimary" className="font-weight-bold" variant="h3">
            {/* <CountUp start={0} end={totalCustomers - 2} duration={2.75} separator="," /> */}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <PeopleIcon style={{color: '#1752FF'}} />
            </Avatar>
          </Grid>
        </Grid>
        <Box mt={2} display="flex" alignItems="center">
          <ArrowUpwardIcon className={classes.differenceIcon} />
          <Typography className={classes.differenceValue} variant="body2">
            16%
          </Typography>
          <Typography color="textSecondary" variant="caption">
            Since last month
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

TotalCustomers.propTypes = {
  className: PropTypes.string,
};

export default TotalCustomers;
