import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";
import "antd/dist/antd.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Observe from "./pages/Observe";
import Serve from "./pages/Serve";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}></Route>
      {/* <Route path="/serve" element={<Serve />}></Route> */}
      <Route path="/serve" element={<Serve />}></Route>
      <Route path="/observe" element={<Observe />}></Route>
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
