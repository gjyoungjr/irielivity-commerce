import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Box,
  Card,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles,
  Fab,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
// icons
import { Search as SearchIcon } from "react-feather";

const useStyles = makeStyles((theme) => ({
  root: {},
  card: {
    height: "50px",
    alignItems: "center",
    justifyContent: "center",
    padding: "8px",
    borderRadius: "30px",
  },
  button: {
    textTransform: "none",
    fontWeight: "500",
    marginTop: "2px",
    backgroundColor: "white",
  },
}));

const AppToolBar = ({ className, ...rest }) => {
  // styles declartion
  const classes = useStyles();
  // access to history for routing
  const history = useHistory();

  const redirectToAddProduct = () => {
    history.push("/admin/add-product");
  };

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <div className="d-flex justify-content-between">
        <Box maxWidth={200}>
          <Card className={classes.card} elevation={10}>
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon fontSize="small" color="action">
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                ),
                style: {
                  borderRadius: "40px",
                  backgroundColor: "white",
                  height: "35px",
                },
              }}
              variant="outlined"
              fullWidth
              style={{ height: "38px" }}
            />
          </Card>
        </Box>

        <Fab
          variant="extended"
          className={classes.button}
          onClick={redirectToAddProduct}
        >
          Add Product
        </Fab>
      </div>
    </div>
  );
};

AppToolBar.propTypes = {
  className: PropTypes.string,
};

export default AppToolBar;
