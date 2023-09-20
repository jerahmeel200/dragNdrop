import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.render(
  <React.StrictMode>
    <ToastContainer
      theme="dark"
      position="top-right"
      autoClose={3000}
      closeOnClick
      pauseOnHover={false}
    />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
