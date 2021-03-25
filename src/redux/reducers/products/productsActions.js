import productsTypes from "./productsTypes";

export const addProductStart = (productData) => ({
  type: productsTypes.ADD_NEW_PRODUCT_START,
  payload: productData,
});

export const fetchProductsStart = (filters = {}) => ({
  type: productsTypes.FETCH_PRODUCTS_START,
  payload: filters,
});

export const setProducts = (products) => ({
  type: productsTypes.SET_PRODUCTS,
  payload: products,
});

export const deleteProductsStart = (productId) => ({
  type: productsTypes.DELETE_PRODUCTS_START,
  payload: productId,
});

export const fetchProductStart = (productId) => ({
  type: productsTypes.FETCH_PRODUCT_START,
  payload: productId,
});

export const setProduct = (product) => ({
  type: productsTypes.SET_PRODUCT,
  payload: product,
});

export const updateProductStart = (productData) => ({
  type: productsTypes.UPDATE_PRODUCT_START,
  payload: productData,
});

export const addProductReview = (product) => ({
  type: productsTypes.ADD_PRODUCT_REVIEW_START,
  payload: product,
});

export const fetchProductReviewStart = (filters = {}) => ({
  type: productsTypes.FETCH_PRODUCT_REVIEW_START,
  payload: filters,
});

export const setProductReview = (product) => ({
  type: productsTypes.SET_PRODUCT_REVIEW,
  payload: product,
});
