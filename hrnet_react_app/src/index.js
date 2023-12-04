import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./utils/store";
import Header from "./components/Layouts/Header/header";
import App from "./components/Router/App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
      <React.StrictMode>
        <BrowserRouter>
          <Header />
          <App />
        </BrowserRouter>
      </React.StrictMode>
  </Provider>
);
