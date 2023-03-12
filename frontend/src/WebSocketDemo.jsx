import React, { useState, useCallback, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import Loader from "./Loader.jsx";

export const WebSocketDemo = ({ loaderId }) => {
  //Public API that will echo messages sent to it back to the client
  const [socketUrl, setSocketUrl] = useState("ws://localhost:8999");
  const [messageHistory, setMessageHistory] = useState([]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage));
    }
  }, [lastMessage, setMessageHistory]);

  const handleClickSendMessage = useCallback(
    () => sendMessage(wrapMessage({ action: "loading", loaderId })),
    [loaderId]
  );

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <button
        onClick={handleClickSendMessage}
        disabled={readyState !== ReadyState.OPEN}
      >
        Начать загрузку
      </button>
      <Placeholder h={20} />

      <Loader
        percent={
          parseInt(
            lastMessage?.data &&
              isForMe(lastMessage?.data, loaderId) &&
              parseMessage(lastMessage?.data)?.percent
          ) || 0
        }
      />
      <Placeholder h={20} />

      <span>The WebSocket is currently {connectionStatus}</span>

      <Placeholder h={20} />
    </div>
  );
};

const parseMessage = (message) => {
  try {
    return JSON.parse(message);
  } catch (error) {
    alert("Message: ", message);
    return null;
  }
};

const wrapMessage = (message) => {
  try {
    return JSON.stringify(message);
  } catch (error) {
    alert("Message: ", message);
    return null;
  }
};

const isForMe = (message, loaderId) => {
  return parseMessage(message)?.loaderId === loaderId;
};

const Placeholder = ({ w, h }) => {
  return <div style={{ width: w + "px", height: h + "px" }}></div>;
};
