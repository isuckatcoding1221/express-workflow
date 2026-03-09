import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useCallback } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [json, setJson] = useState("");
  const [error, setError] = useState("");

  const helloApi = useCallback(async () => {
    try {
      const response = await fetch("/api/hello", {
        method: "GET",
      });
      const jsonRespone = await response.json();
      setJson(jsonRespone.message);
    } catch (error) {
      setError(error);
      console.log("Error", error);
    }
  }, []);

  useEffect(() => {
    helloApi();
  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <p>{json}</p>
      <p>{error}</p>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
