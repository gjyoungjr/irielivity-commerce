import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { save, load } from "redux-localstorage-simple";
import { Provider } from "react-redux";
import { fetchProducts } from "./redux/actions/productActions";
import rootReducer from "./redux/reducers/rootReducer";
import products from "./data/products.json";
import App from "./App";
import logger from "redux-logger";

import "./assets/scss/style.scss";

const middlewares = [logger];

import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(
  rootReducer,
  load(),
  composeWithDevTools(
    applyMiddleware(
      thunk,
      save({
        namespace: "irielivity_ecommerce",
      }),
      ...middlewares
    )
  )
);

// fetch products from json file
store.dispatch(fetchProducts(products));

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    div
  );
});
