import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./App.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Observe from "./pages/Observe";
import Serve from "./pages/Serve";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}></Route>
      <Route path="/serve" element={<Serve />}></Route>
      <Route path="/observe" element={<Observe />}></Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);

reportWebVitals();
