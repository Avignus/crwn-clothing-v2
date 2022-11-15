import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./context/user.context";
import { CartProvider } from "./context/cart.context";
import { store } from "./store/store";
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <UserProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </UserProvider>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
