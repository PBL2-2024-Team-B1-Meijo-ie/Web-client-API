import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Head from "./Head.tsx";
import Choice from "./Choice.tsx";
import { Map } from "./map.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Head />
    <Map />
    <Choice />
  </StrictMode>,
);