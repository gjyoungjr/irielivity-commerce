import React, { useEffect } from "react";
import { Box, Container, Grid, makeStyles } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";

// components
import AppToolBar from "./AppToolBar";
import ProductCard from "./ProductCard";

// utils
import { fetchProductsStart } from "../../../redux/reducers/products/productsActions";

// grabs product data from redux state
const mapState = ({ productsData }) => ({
  products: productsData.products,
});

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
}));

const ProductList = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const { products } = useSelector(mapState);

  useEffect(() => {
    dispatch(fetchProductsStart());
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <Container maxWidth={false}>
        <AppToolBar />
        <Box mt={3}>
          <Grid container spacing={2}>
            {products.map((product, index) => (
              <Grid item key={index} lg={4} xl={4} md={4} xs={12}>
                <ProductCard
                  className={classes.productCard}
                  product={product}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box mt={3} display="flex" justifyContent="center">
          <Pagination color="primary" count={3} size="small" />
        </Box>
      </Container>
    </div>
  );
};

export default ProductList;
