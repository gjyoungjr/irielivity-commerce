import React from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  AppBar,
  Box,
  Hidden,
  Toolbar,
  makeStyles,
  Fab,
  Divider,
} from "@material-ui/core";

// icons
import MenuIcon from "@material-ui/icons/Menu";

// components
import Logo from "./DashboardLogo";
import Notification from "./sub-components";

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    width: 60,
    height: 60,
  },
}));

const TopBar = ({ className, onMobileNavOpen, ...rest }) => {
  const classes = useStyles();

  return (
    <AppBar
      style={{ backgroundColor: "white" }}
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Toolbar>
        <RouterLink to="/home">
          <Logo />
        </RouterLink>
        <Box flexGrow={1} />

        <Hidden mdDown>
          <Notification />
          <Divider />
        </Hidden>

        <Hidden lgUp>
          <Notification />
          <Fab
            size="small"
            style={{ backgroundColor: "#EFF0F3", marginLeft: "10px" }}
            onClick={onMobileNavOpen}
          >
            <MenuIcon />
          </Fab>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func,
};

export default TopBar;
