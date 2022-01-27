import React from "react";
import {
  Slide,
  Typography,
  Toolbar,
  AppBar,
  Dialog,
  makeStyles,
  IconButton,
} from "@material-ui/core";

//icons
import CloseIcon from "@material-ui/icons/Close";

// components
import SizeChart from "./SizeChart";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
    backgroundColor: "white",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ open, handleClose }) {
  const classes = useStyles();

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Size Chart
            </Typography>
          </Toolbar>
        </AppBar>
        <div style={{ padding: "20px" }}>
          <p className="font-weight-bold">General Sizing Guide</p>
          <p>
            The measurements on the size chart are body measurements. Find your
            correct size in the chart below. Scroll horizontally to see more
            sizes.
          </p>
          <SizeChart />
        </div>
      </Dialog>
    </div>
  );
}
