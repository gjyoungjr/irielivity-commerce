import React from "react";
import { Card, CardContent } from "@material-ui/core";

// icons
import CallMadeIcon from "@material-ui/icons/CallMade";

export default function PayOnPickUp() {
  return (
    <Card className="p-2 mb-40" style={styles.card}>
      <CardContent>
        <p>
          You can pay by cash on delivery (for Belize City delivery/pickup orders
          ONLY)
        </p>
        <a
          style={{
            color: "black",
            backgroundColor: "#fdfbf4",

            padding: "6px 12px",
            borderRadius: "20px",
            border: "1px solid black",
          }}
          href="https://goo.gl/maps/9V2yjBegMVhDrYsv8"
          target="#"
        >
          View address
          <CallMadeIcon style={{ fontSize: "16px" }} />
        </a>
      </CardContent>
    </Card>
  );
}
const styles = {
  bottomSpacer: {
    marginBottom: "-5px",
  },
  bottomSpacer1: {
    marginBottom: "1px",
    opacity: 0.7,
  },
  card: {
    borderRadius: "9px",
    boxShadow: "none",
    border: "1px solid #F2F2F2",
    backgroundColor: "#fdfbf4",
  },
  btn: {
    borderRadius: "20px",
    textTransform: "none",
    backgroundColor: "black",
  },
};
