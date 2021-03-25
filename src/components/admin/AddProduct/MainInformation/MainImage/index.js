import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  makeStyles,
} from "@material-ui/core";

// components
import ImageUpload from "./ImageUpload";
const useStyles = makeStyles(() => ({
  title: {
    fontWeight: "600",
    textAlign: "center",
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

export default function MainInformationForm() {
  const classes = useStyles();
  return (
    <Card className={classes.card} elevation={10}>
      <CardHeader
        title="Main Image"
        className={classes.title}
        titleTypographyProps={{
          style: {
            fontWeight: "600",
          },
        }}
      />
      <Divider className="ml-3 mr-3" />
      <CardContent>
        <ImageUpload />
      </CardContent>
    </Card>
  );
}
