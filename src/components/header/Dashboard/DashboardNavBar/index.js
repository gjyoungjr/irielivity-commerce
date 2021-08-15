import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  makeStyles,
} from "@material-ui/core";

// icons
import {
  Home as DashboardHomeIcon,
  // Settings as SettingsIcon,
  ShoppingCart as ProductsIcon,
  User as UserIcon,
  Users as UsersIcon,
  LogOut as LogoutIcon,
  Box as OrdersIcon,
  CreditCard as PaymentIcon,
} from "react-feather";

// utils
import { auth } from "../../../../firebase/utils";

// components
import NavItem from "./NavItem";
import UserBox from "./UserBox";

const items = [
  {
    href: "/admin/home",
    icon: DashboardHomeIcon,
    title: "Dashboard",
  },
  {
    href: "/admin/customers",
    icon: UsersIcon,
    title: "Customers",
  },
  {
    href: "/admin/products",
    icon: ProductsIcon,
    title: "Products",
  },
  {
    href: "/admin/orders",
    icon: OrdersIcon,
    title: "Orders",
  },
  {
    href: "/admin/receipts",
    icon: PaymentIcon,
    title: "Receipts",
  },
  {
    href: "/admin/account",
    icon: UserIcon,
    title: "Account",
  },
  // {
  //   href: "/app/settings",
  //   icon: SettingsIcon,
  //   title: "Settings",
  // },
];
const secondaryItems = [
  {
    href: "/:filterType",
    icon: LogoutIcon,
    title: "Sign Out",
  },
];

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
    width: 64,
    height: 64,
  },
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <>
      <Divider />
      <Box height="100%" display="flex" flexDirection="column">
        <UserBox />

        {/* <Divider /> */}
        <Box p={2}>
          <List>
            {items.map((item) => (
              <NavItem
                href={item.href}
                key={item.title}
                title={item.title}
                icon={item.icon}
              />
            ))}
          </List>
          {/* <Divider /> */}
          <List>
            {secondaryItems.map((item) => (
              <NavItem
                href={item.href}
                key={item.title}
                title={item.title}
                icon={item.icon}
                onClick={() => {
                  auth.signOut();
                  history.push("/home");
                }}
              />
            ))}
          </List>
        </Box>
        <Box flexGrow={1} />
      </Box>
    </>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          style={{ boxShadow: "none" }}
          // elevation={10}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false,
};

export default NavBar;
