import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export default function AppAccordion({ label, data, item }) {
  const classes = useStyles();

  return (
    <Accordion
      style={{
        boxShadow: "none",
        backgroundColor: "transparent",
        borderBottom: "1px solid grey",
        paddingBottom: "20px",
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={classes.heading}>{label}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          <div className="text-left">
            {data ? (
              data.map((item, idx) => <li key={idx}>{item}</li>)
            ) : (
              <li>{item}</li>
            )}
          </div>
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}

// style config
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    borderTop: "1px solid grey",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));
