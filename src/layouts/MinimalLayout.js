import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

// utils fxn
import { checkIsUserAdmin } from "../firebase/utils";

// components
import { default as NavMenu } from "../components/header/OffCanvasNavMenu";

// grabs user auth from redux store
const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

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

  // destructure current user from redux state
  const { currentUser } = useSelector(mapState);

  //boolean state to detrmine if user is amdin
  const isAdmin = checkIsUserAdmin(currentUser);

  return (
    <div className={classes.grow}>
      <AppBar position="fixed" style={styles.appbar}>
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
            {/* Auth Listener to Logout/Login */}

            {!currentUser && (
              <div className="mr-4" onClick={() => history.push("/login")}>
                <p style={styles.menuItems}>Login</p>
              </div>
            )}

            {currentUser && !isAdmin && (
              <div className="mr-4" onClick={() => history.push("/members")}>
                <p style={styles.menuItems}>Account</p>
              </div>
            )}

            {currentUser && isAdmin && (
              <div className="mr-4" onClick={() => history.push("/admin/home")}>
                <p style={styles.menuItems}>Dashboard</p>
              </div>
            )}

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

      <div className="children-wrapper">{children}</div>
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
  appbar: {
    backgroundColor: "white",
    boxShadow: "none",
    borderBottom: "1px solid #f5f5f5",
  },
};
