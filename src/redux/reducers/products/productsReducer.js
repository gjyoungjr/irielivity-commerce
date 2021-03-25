import productsTypes from "./productsTypes";

const INITIAL_STATE = {
  products: [],
  product: {},
  productReviews: [],
};

const productsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case productsTypes.SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case productsTypes.SET_PRODUCT:
      return {
        ...state,
        product: action.payload,
      };
    case productsTypes.SET_PRODUCT_REVIEW:
      return {
        ...state,
        productReviews: action.payload,
      };
    default:
      return state;
  }
};

export default productsReducer;
