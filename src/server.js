const { PeerRPCServer } = require("grenache-nodejs-ws");
const Link = require("grenache-nodejs-link");

// Start Grape link
const link = new Link({
  grape: "http://127.0.0.1:30001",
});

link.start();

const peer = new PeerRPCServer(link, {});
peer.init();

// Use dynamic port passed as an argument
const port = parseInt(process.argv[3], 10) || 1337;

const service = peer.transport("server");
service.listen(port);

// Announce the server (client) to the DHT
const clientName = process.argv[2]; // e.g., 'client1' or 'client2'
setInterval(() => {
  link.announce(clientName, service.port, {});
}, 1000);

// Listen for incoming messages from clients
service.on("request", (rid, key, payload, handler) => {
  console.log(`Received message from ${key}: ${payload.message}`);
  handler.reply(null, `Echo: ${payload.message}`);
});
