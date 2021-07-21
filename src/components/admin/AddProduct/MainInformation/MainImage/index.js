import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  makeStyles,
} from "@material-ui/core";
import { useFormikContext } from "formik";
// components
import ImageUpload from "./ImageUpload";

export default function MainInformationForm({ productID }) {
  const classes = useStyles();
  const { values } = useFormikContext();

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

        <div className="text-center">
          {productID && (
            <img
              src={values.mainImgUrl}
              alt=""
              width="30%"
              style={{ borderRadius: "15px" }}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
}

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
