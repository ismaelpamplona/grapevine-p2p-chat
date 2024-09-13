const { PeerRPCServer } = require("grenache-nodejs-ws");
const Link = require("grenache-nodejs-link");

// Connect to Grape DHT
const link = new Link({
  grape: "http://127.0.0.1:30001",
});
link.start();

// Set up the RPC WebSocket server
const peer = new PeerRPCServer(link, {});
peer.init();

// Create WebSocket service
const service = peer.transport("server");
service.listen(1337);

// Announce the service in the DHT
setInterval(() => {
  link.announce("ws_chat_service", service.port, {});
}, 1000);

service.on("request", (rid, key, payload, handler) => {
  console.log(`Received message: ${payload}`);
  handler.reply(null, `Echo: ${payload}`);
});
