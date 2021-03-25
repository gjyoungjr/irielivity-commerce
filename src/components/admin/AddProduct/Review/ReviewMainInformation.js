import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  makeStyles,
  IconButton,
  Grid,
} from "@material-ui/core";

// icons
import LockTwoToneIcon from "@material-ui/icons/LockTwoTone";

const useStyles = makeStyles(() => ({
  title: {
    fontWeight: "600",
    textAlign: "left",
  },
  bottomSpacer: {
    marginBottom: "18px",
  },
  topSpacer: {
    marginTop: "18px",
  },
  card: {
    borderRadius: "15px",
    marginTop: "20px",
    marginBottom: "10px",
  },
}));

const styles = {
  font: {
    fontWeight: "bold",
    fontSize: "15px",
  },
};
// currency format fxn
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});
export default function ReviewMainInformation({ formValues }) {
  // styles declaration
  const classes = useStyles();

  // grabs form values
  const { productName, productPrice, category, subCategory } = formValues;

  return (
    <Card className={classes.card} elevation={10}>
      <CardHeader
        title="Product Main Information"
        className={classes.title}
        titleTypographyProps={{
          style: {
            fontWeight: "600",
          },
        }}
        action={
          <IconButton color="primary">
            <LockTwoToneIcon />
          </IconButton>
        }
      />
      <Divider className="ml-3 mr-3 mb-2" />

      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={6} lg={6}>
            <p style={styles.font}>Name</p>
          </Grid>
          <Grid item xs={6} lg={6} className="text-right">
            <p>{productName}</p>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={6} lg={6}>
            <p style={styles.font}>Price</p>
          </Grid>
          <Grid item xs={6} lg={6} className="text-right">
            <p>{formatter.format(productPrice)}</p>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={6} lg={6}>
            <p style={styles.font}>Category</p>
          </Grid>
          <Grid item xs={6} lg={6} className="text-right">
            <p>{category} </p>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={6} lg={6}>
            <p style={styles.font}>Sub-Category</p>
          </Grid>
          <Grid item xs={6} lg={6} className="text-right">
            <p>{subCategory} </p>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
