// const http = require("http");
// const express = require( "express");
// const WebSocket = require( "ws");

import http from "http";
import express from "express";
import WebSocket, { WebSocketServer } from "ws";

const app = express();

const server = http.createServer(app);

const webSocketServer = new WebSocketServer({ server });

webSocketServer.on("connection", (ws) => {
  ws.on("message", async (m) => {
    if (parseMessage(m)?.loaderId === 1) {
      loader1Handle(ws);
    }
    if (parseMessage(m)?.loaderId === 2) {
      loader2Handle(ws);
    }

    console.log("message: ", m.toString());
  });

  ws.on("error", (e) => ws.send(e));

  ws.send(JSON.stringify({ message: "Hi there, I am a WebSocket server" }));
});

server.listen(8999, () => console.log("Server started"));

const loader1Handle = async (ws) => {
  for (let index = 0; index < 5; index++) {
    ws.send(
      JSON.stringify({
        type: "Loading",
        percent: ((index + 1) / 5) * 100,
        loaderId: 1,
      })
    );
    await new Promise((resolve) => setTimeout(() => resolve(), 1000));
  }
};

const loader2Handle = async (ws) => {
  for (let index = 0; index < 15; index++) {
    ws.send(
      JSON.stringify({
        type: "Loading",
        percent: ((index + 1) / 15) * 100,
        loaderId: 2,
      })
    );
    await new Promise((resolve) => setTimeout(() => resolve(), 700));
  }
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
