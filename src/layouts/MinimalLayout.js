import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";

// components
import { default as NavMenu } from "../components/header/OffCanvasNavMenu";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    // display: "none",
    [theme.breakpoints.down("sm")]: {
      fontSize: "20px",
    },
    textAlign: "center",
    flexGrow: 40,
    fontWeight: "600",
    fontSize: "25px",
    textTransform: "uppercase",
    cursor: "pointer",
   
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {},
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export default function MinimalLayout({ children }) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.grow}>
      <AppBar
        position="fixed"
        style={{
          backgroundColor: "white",
          boxShadow: "none",
        }}
      >
        <NavMenu />

        <Toolbar>
          <div className="menu-open">
            <p style={styles.menuItems}>Menu</p>
          </div>

          <Typography
            className={classes.title}
            variant="h6"
            noWrap
            onClick={() => history.push("/")}
          >
            Irielivity
          </Typography>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <div className="mr-4" onClick={() => history.push('/login')}>
              <p style={styles.menuItems}>Login</p>
            </div>
            <div>
              <p style={styles.menuItems}>Bag(0)</p>
            </div>
          </div>

          <div className={classes.sectionMobile}>
            <div>
              <p style={styles.menuItems}>Bag(0)</p>
            </div>
          </div>
        </Toolbar>
      </AppBar>

      {children}
    </div>
  );
}

const styles = {
  menuItems: {
    fontSize: "16px",
    fontWeight: "600",
    color: "black",
    cursor: "pointer",
  },
};
