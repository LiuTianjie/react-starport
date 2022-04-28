import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";
import "antd/dist/antd.less";
import reportWebVitals from "./reportWebVitals";

import BaseLayout from "./layout/BaseLayout";
import { BrowserRouter } from "react-router-dom";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter>
    <BaseLayout />
  </BrowserRouter>
);

reportWebVitals();
