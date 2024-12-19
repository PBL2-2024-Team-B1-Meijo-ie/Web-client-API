import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Test from "./Test.tsx";
import ReserveList from "./ReserveList.tsx";

createRoot(document.getElementById("root")!).render(
  
  <StrictMode>
    <BrowserRouter basename={import.meta.env.DEV ? "/": "Web-client-API"}>
    <Routes>
      <Route path="/" element={<App/>} />
      <Route path="/test" element={<Test/>} />
      <Route path="reserve-list" element={<ReserveList />} />
    </Routes>
    </BrowserRouter>
  </StrictMode>,
);
