import deliveryTypes from "./deliveryTypes";

export const setDeliveryMethod = (delivery) => ({
  type: deliveryTypes.SET_DELIVERY,
  payload: delivery,
});

export const setDeliveryFee = (delivery) => ({
  type: deliveryTypes.SET_DELIVERY_FEE,
  payload: delivery,
});

