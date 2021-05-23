import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  makeStyles,
  Box,
  Card,
  Fab,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@material-ui/core";
// import { Pagination } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Lottie from "lottie-react";

// components
import ProductCard from "./ProductCard";

// lottie animation
import notInStock from "../../../assets/lottie-animations/empty.json";

// utils
import {
  fetchProductsStart,
  fetchProductCategories,
} from "../../../redux/reducers/products/productsActions";

// grabs product data from redux state
const mapState = ({ productsData }) => ({
  products: productsData.products,
  productCategories: productsData.productCategories,
});

export default function ProductList() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  // store values of selected cateogry from drop down
  const [filterType, setFilterType] = useState("");
  // handles chaning of value on drop down
  const handleProductCategory = (e) => {
    if (e.target.value === "All") {
      setFilterType("");
    } else {
      setFilterType(e.target.value);
    }
  };

  // on click action for add product btn
  const redirectToAddProduct = () => {
    history.push("/admin/add-product");
  };

  // desturucture states from redux store
  const { products, productCategories } = useSelector(mapState);

  useEffect(() => {
    // fetches data for products and product cateogries on component mount
    dispatch(fetchProductsStart({ filterType }));
    dispatch(fetchProductCategories());
  }, [dispatch, filterType]);

  return (
    <div className={classes.root}>
      {/* App Tool Bar  */}
      <Container maxWidth={false}>
        <div className="d-flex justify-content-between">
          <Box maxWidth={200}>
            <Card className={classes.card} elevation={10}>
              <FormControl fullWidth variant="outlined" style={{ height: 25 }}>
                <InputLabel shrink>Filter by</InputLabel>
                <Select
                  fullWidth
                  value={filterType ? filterType : "All"}
                  onChange={handleProductCategory}
                  style={{ height: "37px", borderRadius: "20px" }}
                >
                  <MenuItem value="All">All</MenuItem>
                  {productCategories &&
                    productCategories.length &&
                    productCategories.map((category) => (
                      <MenuItem value={category.value} key={category.value}>
                        {category.label}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
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

        {/* Product Lists */}
        <Box mt={3}>
          <Grid container spacing={2}>
            {products && products.length ? (
              products.map((product, index) => (
                <Grid item key={index} lg={4} xl={4} md={4} xs={12}>
                  <ProductCard
                    className={classes.productCard}
                    product={product}
                  />
                </Grid>
              ))
            ) : (
              <div className="mr-auto ml-auto">
                <Lottie
                  animationData={notInStock}
                  style={{ height: "500px", marginTop: "20px" }}
                />
                <h3 className="text-center">
                  No product in stock for this category.
                </h3>
              </div>
            )}
          </Grid>
        </Box>
        {/* <Box mt={3} display="flex" justifyContent="center">
          <Pagination color="primary" count={3} size="small" />
        </Box> */}
      </Container>
    </div>
  );
}

// styles
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  productCard: {
    height: "100%",
  },
  card: {
    height: "50px",
    alignItems: "center",
    justifyContent: "center",
    padding: "8px",
    borderRadius: "30px",
    width: "200px",
  },
  button: {
    textTransform: "none",
    fontWeight: "500",
    marginTop: "2px",
    backgroundColor: "white",
  },
}));
