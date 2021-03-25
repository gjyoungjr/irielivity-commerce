import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  makeStyles,
  Grid,
  IconButton,
  Chip,
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
  chip: {
    backgroundColor: "rgba(23.0, 82.0, 255.0, .2)",
    color: "black",
    marginLeft: "5px",
  },
};

export default function ReviewVariants({ formValues }) {
  // styles declaration
  const classes = useStyles();

  // grabs form values
  const { fit, materials, sizes, dimensions, quantity } = formValues;

  return (
    <Card className={classes.card} elevation={10}>
      <CardHeader
        title="Product Variants"
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
            <p style={styles.font}>Materials</p>
          </Grid>
          <Grid item xs={6} lg={6} className="text-right">
            {materials &&
              materials.map((item, key) => (
                <Chip label={item} style={styles.chip} key={key} />
              ))}
          </Grid>
        </Grid>

        {sizes && sizes.length ? (
          <Grid container spacing={3}>
            <Grid item xs={6} lg={6}>
              <p style={styles.font}>Sizes</p>
            </Grid>
            <Grid item xs={6} lg={6} className="text-right">
              {sizes &&
                sizes.map((item, key) => (
                  <Chip label={item} style={styles.chip} key={key} />
                ))}
            </Grid>
          </Grid>
        ) : (
          ""
        )}

        <Grid container spacing={3}>
          <Grid item xs={6} lg={6}>
            <p style={styles.font}>Quantity</p>
          </Grid>
          <Grid item xs={6} lg={6} className="text-right">
            <p>{quantity}</p>
          </Grid>
        </Grid>

        {dimensions && (
          <Grid container spacing={3}>
            <Grid item xs={6} lg={6}>
              <p style={styles.font}>Dimensions</p>
            </Grid>
            <Grid item xs={6} lg={6} className="text-right">
              <p>{dimensions}</p>
            </Grid>
          </Grid>
        )}

        {fit && (
          <Grid container spacing={3}>
            <Grid item xs={6} lg={6}>
              <p style={styles.font}>Fit</p>
            </Grid>
            <Grid item xs={6} lg={6} className="text-right">
              <p>{fit}</p>
            </Grid>
          </Grid>
        )}

        {/* <pre>{JSON.stringify(formValues, null, 2)}</pre> */}
      </CardContent>
    </Card>
  );
}
