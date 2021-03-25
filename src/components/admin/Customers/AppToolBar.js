import React from "react";
import { Card, makeStyles, Box } from "@material-ui/core";

//icons
import { Users as CustomersIcon } from "react-feather";

const useStyles = makeStyles((theme) => ({
  root: {},
  card: {
    height: "45px",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px",
    borderRadius: "30px",
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "16px",
    color: "black",
  },
}));

export default function AppToolBar() {
  // styles declartion
  const classes = useStyles();

  return (
    <Box maxWidth={170}>
      <Card className={classes.card} elevation={10}>
        <CustomersIcon style={styles.icon} /> Customers
      </Card>
    </Box>
  );
}

const styles = {
  icon: {
    marginTop: "-5px",
    fontSize: "10px",
    color: "#383A3F",
  },
};
