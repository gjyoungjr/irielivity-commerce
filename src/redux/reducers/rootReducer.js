import usersReducer from "./user/userReducer";
import productReducer from "./products/productsReducer";
import cartReducer from "./cart/cartReducer";
import deliveryReducer from "./delivery/deliveryReducer";
import ordersReducer from "./orders/ordersReducer";
import { combineReducers } from "redux";
import { createMultilanguageReducer } from "redux-multilanguage";

const rootReducer = combineReducers({
  multilanguage: createMultilanguageReducer({ currentLanguageCode: "en" }),
  productsData: productReducer,
  cartData: cartReducer,
  deliveryData: deliveryReducer,
  user: usersReducer,
  ordersData: ordersReducer,
});

export default rootReducer;
