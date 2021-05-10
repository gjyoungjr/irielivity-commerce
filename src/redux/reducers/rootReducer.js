// import currencyReducer from "./currencyReducer";
// import productReducer from "./productReducer";
// import cartReducer from "./cartReducer";
// import wishlistReducer from "./wishlistReducer";
// import compareReducer from "./compareReducer";
import usersReducer from "./user/userReducer";
import productReducer from "./products/productsReducer";
import cartReducer from "./cart/cartReducer";
import deliveryReducer from "./delivery/deliveryReducer";
import ordersReducer from "./orders/ordersReducer";
import { combineReducers } from "redux";
import { createMultilanguageReducer } from "redux-multilanguage";

const rootReducer = combineReducers({
  multilanguage: createMultilanguageReducer({ currentLanguageCode: "en" }),
  // currencyData: currencyReducer,
  productsData: productReducer,
  cartData: cartReducer,
  deliveryData: deliveryReducer,
  // wishlistData: wishlistReducer,
  // compareData: compareReducer,
  user: usersReducer,
  ordersData: ordersReducer,
});

export default rootReducer;
