import React, { useState, useEffect, Fragment } from "react";
import {
  makeStyles,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Avatar,
  Chip,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

//components
import LoadingCard from "./LoadingCard";
// utils
import { deleteProductsStart } from "../../../redux/reducers/products/productsActions";

// icons
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 520,
    borderRadius: "15px",
    height: 485,
  },

  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
    height: 35,
    width: 35,
    padding: "10px",
    fontSize: "15px",
  },
  time: {
    marginTop: "10px",
  },
}));

export default function ProductCard({ className, product, ...rest }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRouteToEditProduct = (documentID) => {
    history.push(`/admin/add-product/${documentID}`);
    setAnchorEl(null);
  };
  // deletes product from db
  const handleDeleteProduct = () => {
    dispatch(deleteProductsStart(product.documentID));
    setAnchorEl(null);
  };

  // formate date object returned from db
  const timeStampDate = product.updatedAt;
  const dateInMillis = timeStampDate.seconds * 1000;

  var date =
    new Date(dateInMillis).toDateString() +
    " at " +
    new Date(dateInMillis).toLocaleTimeString();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1600);
  }, [loading]);

  return (
    <Fragment>
      {loading ? (
        <LoadingCard props={loading} />
      ) : (
        <Card className={classes.root} elevation={10}>
          <CardHeader
            avatar={
              product.productDiscount ? (
                <Avatar className={classes.avatar}>
                  {product.productDiscount}%
                </Avatar>
              ) : (
                ""
              )
            }
            action={
              <IconButton aria-label="settings" onClick={handleClick}>
                <MoreVertIcon />
              </IconButton>
            }
            title={product.productName}
            subheader={
              <>
                <AccessTimeIcon /> <span className={classes.time}>{date}</span>
              </>
            }
          />
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            style={{ marginRight: "20px" }}
          >
            <MenuItem
              onClick={() => handleRouteToEditProduct(product.documentID)}
              style={{ color: "rgba(23.0, 82.0, 255.0, 0.8)" }}
            >
              <EditIcon style={{ marginRight: "5px", fontSize: "18px" }} /> Edit
            </MenuItem>
            <MenuItem
              onClick={() => handleDeleteProduct()}
              style={{ color: "red" }}
            >
              <DeleteIcon
                style={{ marginRight: "5px", color: "red", fontSize: "18px" }}
              />
              Delete
            </MenuItem>
          </Menu>
          <CardMedia
            image={product.mainImgUrl}
            style={{ height: 300 }}
            alt=""
            component="img"
          />
          <CardContent>
            <Typography
              variant="body2"
              color="textSecondary"
              noWrap
              component="p"
            >
              {product.productDescription}
            </Typography>

            {product.productDiscount ? (
              <div className="d-flex justify-content-start">
                <Typography
                  variant="h4"
                  color="error"
                  noWrap
                  component="p"
                  className="font-weight-bold mr-3"
                >
                  ${product.productPrice}
                </Typography>

                <Typography
                  variant="h4"
                  color="textSecondary"
                  noWrap
                  component="p"
                  className="font-weight-bold"
                  style={{ textDecoration: "line-through" }}
                >
                  ${product.originalProductPrice}
                </Typography>
              </div>
            ) : (
              <Typography
                variant="h4"
                color="textSecondary"
                noWrap
                component="p"
                className="font-weight-bold"
              >
                ${product.productPrice}
              </Typography>
            )}

            {product.quantity === 0 || product.quantity < 0 ? (
              <div className="text-right">
                <Chip
                  label="Out of stock."
                  style={{ backgroundColor: "black", color: "white" }}
                />
              </div>
            ) : product.quantity >= 1 && product.quantity <= 2 ? (
              <div className="text-right">
                <Chip
                  label="Low stock."
                  style={{ backgroundColor: "#fff1ac", color: "black" }}
                />
              </div>
            ) : (
              ""
            )}
          </CardContent>
        </Card>
      )}
    </Fragment>
  );
}
