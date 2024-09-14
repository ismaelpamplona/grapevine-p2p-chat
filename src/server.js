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
const clientName = process.argv[2] || "unknown-client";

// Set up the transport server and listen on the specified port
const service = peer.transport("server");
service.listen(port);

// Announce the server (client) to the DHT every second
setInterval(() => {
  link.announce(clientName, service.port, {});
}, 1000);

// Server startup message
console.log(`\n🚀 ${clientName} is up and running on port ${port}...`);
console.log(`🔗 Announcing ${clientName} to the DHT...\n`);

// Listen for incoming messages from clients
service.on("request", (rid, key, payload, handler) => {
  console.log(`\n📨 Received message from ${key}: ${payload.message}`);
  console.log(`🔄 Sending response confirmation to ${key}...`);

  // Reply to the client
  handler.reply(null, `Echo: ${payload.message}`);

  console.log("✅ Response sent!\n");
});
