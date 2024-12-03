import { useState } from "react";
import viteLogo from "/vite.svg";
import reactLogo from "./assets/react.svg";
import Test from "./Test.tsx";
import "./App.css";
import Head from "./Head.tsx";
import Choice from "./Choice.tsx";
import { Map } from "./Map.tsx";
import { Link } from "react-router";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <Head />
    <Map />
    <Choice />
    <Link to="/test">Test</Link>


      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Test /> */}
    </>
  );
}

export default App;