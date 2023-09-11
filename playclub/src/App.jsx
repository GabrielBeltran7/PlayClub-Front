import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Route, Routes } from "react-router-dom";
import Landing from "./Views/Landing/Landing";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" Component={Landing} />
      </Routes>
    </div>
  );
}

export default App;
