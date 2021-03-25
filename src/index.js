import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddle from "redux-saga";
import thunk from "redux-thunk";
import { save, load } from "redux-localstorage-simple";
import { Provider } from "react-redux";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import * as serviceWorker from "./serviceWorker";

// components
import App from "./App";
// styles
import "./assets/scss/style.scss";

// root reducer & saga
import rootReducer from "./redux/reducers/rootReducer";
import rootSaga from "./redux/reducers/rootSaga";

// creating middlewares
const sagaMiddleware = createSagaMiddle();
const middlewares = [logger, sagaMiddleware];

const store = createStore(
  rootReducer,
  load({ namespace: "irielivity_ecommerce" }),
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

// run saga
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
