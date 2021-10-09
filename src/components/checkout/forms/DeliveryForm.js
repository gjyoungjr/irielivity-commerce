import React, { useState, useEffect } from "react";
import {
  makeStyles,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Radio,
  Card,
} from "@material-ui/core";
import { useFormikContext } from "formik";
import { useDispatch } from "react-redux";

// utils
import { setDeliveryMethod } from "../../../redux/reducers/delivery/deliveryActions";

// icons
import CallMadeIcon from "@material-ui/icons/CallMade";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    // backgroundColor: theme.palette.background.paper,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "25px",
    backgroundColor: "#fdfbf4",
  },
}));

export default function SelectedListItem() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] =
    useState("Pick-Up");

  const { setFieldValue } = useFormikContext();

  const handleChange = (event) => {
    setSelectedDeliveryMethod(event.target.value);
  };

  // update field value for delivery method every time value changes
  useEffect(() => {
    setFieldValue("deliveryMethod", selectedDeliveryMethod);
    dispatch(setDeliveryMethod(selectedDeliveryMethod));

    return () => {
      dispatch(setDeliveryMethod(""));
    };
  }, [setFieldValue, selectedDeliveryMethod, dispatch]);
  return (
    <div className={classes.root}>
      <p style={{ fontWeight: "600", fontSize: "18px" }}>Delivery Method</p>
      <Card
        style={{
          borderRadius: "none",
          boxShadow: "none",
          border: "1px solid #F2F2F2",
          padding: "10px",
          backgroundColor: "#fdfbf4",
        }}
        elevation={1}
      >
        <List component="nav" aria-label="main mailbox folders">
          <ListItem>
            <ListItemIcon>
              <Radio
                style={{ color: "black" }}
                checked={selectedDeliveryMethod === "Pick-Up"}
                onChange={handleChange}
                value="Pick-Up"
                name="radio-button-demo"
              />
            </ListItemIcon>
            <ListItemText
              primary={
                <div
                  className="d-flex justify-content-between"
                  style={{ marginBottom: "-15px" }}
                >
                  <p>Order Pick Up</p>
                  <p>Free</p>
                </div>
              }
              secondary="3 Sibun Street, Belize City, Belize"
            />{" "}
          </ListItem>
        </List>
        <a
          style={{
            color: "black",
            marginLeft: "20px",
            marginBottom: "20px",
            backgroundColor: "#fdfbf4",
            padding: "6px 12px",
            borderRadius: "20px",
            border: "1px solid black",
          }}
          href="https://www.google.com/maps/place/17%C2%B029'52.7%22N+88%C2%B011'45.7%22W/@17.4979839,-88.1982107,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x0!8m2!3d17.4979839!4d-88.196022?hl=en"
          target="#"
        >
          View address
          <CallMadeIcon style={{ fontSize: "16px" }} />
        </a>
      </Card>

      <Card
        style={{
          borderRadius: "none",
          boxShadow: "none",
          border: "1px solid #F2F2F2",
          marginTop: "15px",
          backgroundColor: "#fdfbf4",
        }}
        elevation={1}
      >
        <List component="nav" aria-label="main mailbox folders">
          <ListItem>
            <ListItemIcon>
              <Radio
                style={{ color: "black" }}
                checked={selectedDeliveryMethod === "Home-Delivery"}
                onChange={handleChange}
                value="Home-Delivery"
                name="radio-button-demo"
              />
            </ListItemIcon>
            <ListItemText
              primary={
                <div
                  className="d-flex justify-content-between"
                  style={{ marginBottom: "-15px" }}
                >
                  <p>Home Delivery</p>
                  <p>BZD $15.00</p>
                </div>
              }
              secondary="Delivery to inland only"
            />{" "}
          </ListItem>
        </List>
      </Card>
      <Card
        style={{
          borderRadius: "none",
          boxShadow: "none",
          border: "1px solid #F2F2F2",
          marginTop: "15px",
          backgroundColor: "#fdfbf4",
        }}
        elevation={1}
      >
        <List component="nav" aria-label="main mailbox folders">
          <ListItem>
            <ListItemIcon>
              <Radio
                style={{ color: "black" }}
                checked={selectedDeliveryMethod === "BPMS"}
                onChange={handleChange}
                value="BPMS"
                name="radio-button-demo"
              />
            </ListItemIcon>
            <ListItemText
              primary={
                <div
                  className="d-flex justify-content-between"
                  style={{ marginBottom: "-15px" }}
                >
                  <p>BPMS</p>
                  <p>BZD $10.00</p>
                </div>
              }
              secondary="1-2 Business Days"
            />{" "}
          </ListItem>
        </List>
      </Card>
    </div>
  );
}
