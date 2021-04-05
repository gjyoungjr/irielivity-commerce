import React from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Avatar,
  Typography,
  makeStyles,
  withStyles,
  Badge,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

// gets state from redux
const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256,
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: "calc(100% - 64px)",
  },
  avatar: {
    cursor: "pointer",
    width: 70,
    height: 70,
  },
  verifiedIcon: {
    color: "green",
    fontSize: "16px",
    marginBottom: "1px",
    marginLeft: "10px",
  },
}));

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);

export default function UserBox() {
  const classes = useStyles();
  // destructure current user from redux state
  const { currentUser } = useSelector(mapState);

  const fullName = currentUser
    ? currentUser.firstName + " " + currentUser.lastName
    : "";

  return (
    <Box alignItems="center" display="flex" flexDirection="column" p={2}>
      <StyledBadge
        overlap="circle"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        variant="dot"
      >
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={currentUser.avatarUrl || ""}
          to="/admin/account"
        />
      </StyledBadge>
      <Typography
        className={classes.name}
        style={{ color: "black", marginTop: "5px" }}
        variant="h5"
      >
        {fullName}
      </Typography>
      <Typography color="textSecondary" variant="body2">
        Super Admin
      </Typography>
    </Box>
  );
}
