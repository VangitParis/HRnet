import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./utils/store";
import Header from "./components/Layouts/Header/header";
import App from "./components/Router/App";
import ReactModal from 'react-modal';
import './styles/sass/main.scss'; 


// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
ReactModal.setAppElement('#root'); // ou tout autre élément auquel votre application est attachée




const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
      <React.StrictMode>
        <BrowserRouter basename="/HRnet/">
          <Header />
          <App />
        </BrowserRouter>
      </React.StrictMode>
  </Provider>
);
