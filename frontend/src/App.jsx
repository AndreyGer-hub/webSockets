import { useState } from "react";
import "./App.css";
import { WebSocketDemo } from "./WebSocketDemo.jsx";

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
        <WebSocketDemo loaderId={1}/>
        <WebSocketDemo loaderId={2}/>
        
      </div>
    </div>
  );
}

export default App;
