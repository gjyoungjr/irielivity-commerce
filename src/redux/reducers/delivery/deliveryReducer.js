import deliveryTypes from "./deliveryTypes";

const INITIAL_STATE = {
  deliveryMethod: "",
  deliveryFee: 0,
};

const deliveryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case deliveryTypes.SET_DELIVERY:
      return {
        ...state,
        deliveryMethod: action.payload,
      };
    case deliveryTypes.SET_DELIVERY_FEE:
      return {
        ...state,
        deliveryFee: action.payload,
      };

    default:
      return state;
  }
};

export default deliveryReducer;
