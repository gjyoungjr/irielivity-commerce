import React from "react";
import {  Grid, makeStyles } from "@material-ui/core";
import Profile from "./Profile";
import ProfileDetails from "./ProfileDetails";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    padding: '20px'
  },
}));

const Account = () => {
  const classes = useStyles();

  return (
    <div className={classes.root} >
      {/* <Container maxWidth="lg"> */}
        <Grid container spacing={3}>
          <Grid item lg={4} md={6} xs={12}>
            <Profile />
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
            <ProfileDetails />
          </Grid>
        </Grid>
      {/* </Container> */}
    </div>
  );
};

export default Account;
