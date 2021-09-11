import React, { useState, Fragment } from "react";
import {
  makeStyles,
  Tabs,
  Tab,
  Hidden,
  FormControl,
  Select,
  MenuItem,
} from "@material-ui/core";

// components
import AccountDetails from "./AccountDetails/AccountDetails";
import ChangePassword from "./ChangePassword";
import TabPanel from "./TabPanel";
import UploadProfileImage from "./UploadProfileImage";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: 400,
    marginTop: "100px",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  label: {
    textTransform: "none",
  },
  tabpanel: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "50%",
  },
}));

export default function EditAccount({ currentUser }) {
  const classes = useStyles();
  const [tabValue, setTabValue] = useState(0);
  const [renderedContent, setRenderedContent] = useState(0);

  const handleTabValChange = (e, newValue) => {
    setTabValue(newValue);
  };

  const handleDropDownChange = (e) => {
    setRenderedContent(e.target.value);
  };

  const content = [
    <AccountDetails currentUser={currentUser} />,
    <ChangePassword currentUser={currentUser} />,
    <UploadProfileImage currentUser={currentUser} />,
  ];

  return (
    <Fragment>
      <div className={classes.root}>
        {/* Render For Desktops/laptops */}
        <Hidden smDown>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={tabValue}
            onChange={handleTabValChange}
            TabIndicatorProps={{
              style: {
                backgroundColor: "black",
              },
            }}
            className={classes.tabs}
          >
            <Tab label={<p className={classes.label}>Account Details</p>} />
            <Tab label={<p className={classes.label}>Change Password</p>} />
            <Tab label={<p className={classes.label}>Profile Image</p>} />
          </Tabs>
          <div className={classes.tabpanel}>
            <TabPanel>{content[tabValue]}</TabPanel>
          </div>
        </Hidden>

        {/* Render for mobile */}
        <Hidden smUp mdUp>
          <div style={styles.mobileWrapper}>
            <FormControl style={styles.select} variant="outlined">
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={renderedContent}
                onChange={handleDropDownChange}
              >
                <MenuItem value={0}>Account Details</MenuItem>
                <MenuItem value={1}>Change Password</MenuItem>
                <MenuItem value={2}>Profile Image</MenuItem>
              </Select>
            </FormControl>
            <div style={styles.renderContentWrapper}>
              <div>{content[renderedContent]}</div>
            </div>
          </div>
        </Hidden>
      </div>
      <br></br>
      <br></br>
      <br></br>
    </Fragment>
  );
}

const styles = {
  mobileWrapper: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center",
  },
  select: {
    marginTop: "-80px",
  },
  renderContentWrapper: {
    padding: "15px",
  },
};
