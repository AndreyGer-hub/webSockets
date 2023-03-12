import { useState } from "react";
import "./App.css";
import { WebSocketLoader } from "./WebSocketLoader.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <WebSocketLoader loaderId={1} />
        <WebSocketLoader loaderId={2} />
      </div>
    </div>
  );
}

export default App;
