import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import '../node_modules/animate.css/animate.css';
import '../node_modules/animate.css/animate.min.css';
import App from "./App";
import "./styles/reset.css";
import "./styles/fonts.css";
import "./styles/variables.css";
import "./styles/helpers.css";
import "./styles/defaults.css";
import "./styles/Responsive.css";
import { ScrollToTop } from "./Components/ScrollToTop/ScrollToTop";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <App />
    <ScrollToTop />
  </BrowserRouter>
  // </React.StrictMode>
);
