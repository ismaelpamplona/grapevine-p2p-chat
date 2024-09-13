const { PeerRPCClient } = require("grenache-nodejs-ws");
const Link = require("grenache-nodejs-link");

// Connect to Grape DHT
const link = new Link({
  grape: "http://127.0.0.1:30001",
});
link.start();

// Set up the RPC WebSocket client
const peer = new PeerRPCClient(link, {});
peer.init();

// Discover the WebSocket service and send a message
link.lookup("ws_chat_service", (err, data) => {
  if (err) throw err;

  peer.request(
    "ws_chat_service",
    "Hello from client!",
    { timeout: 10000 },
    (err, result) => {
      if (err) console.error(err);
      else console.log(`Received response: ${result}`);
    }
  );
});
