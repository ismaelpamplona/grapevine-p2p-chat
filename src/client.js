const { PeerRPCClient } = require("grenache-nodejs-ws");
const Link = require("grenache-nodejs-link");
const readline = require("readline");

// Connect to Grape DHT
const link = new Link({
  grape: "http://127.0.0.1:30001",
});
link.start();

// Set up the RPC WebSocket client
const peer = new PeerRPCClient(link, {});
peer.init();

// Create a readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Ask for the peer name you want to discover
rl.question(
  "Enter the peer name to lookup (e.g., client1, client2): ",
  (peerName) => {
    link.lookup(peerName, (err, peers) => {
      if (err) {
        console.error("Lookup error:", err);
        rl.close();
        return;
      }

      if (peers.length === 0) {
        console.log("No peers found!");
        rl.close();
        return;
      }

      console.log("Available peers:", peers);
      rl.question("Enter your message: ", (message) => {
        sendMessage(peerName, message, peers[0]); // Correctly send message to peer name
      });
    });
  }
);

// Function to send message to the chosen peer
function sendMessage(peerName, message, peerAddress) {
  console.log(`Sending message to ${peerName} at ${peerAddress}`);
  peer.request(peerName, { message }, { timeout: 10000 }, (err, result) => {
    if (err) console.error(err);
    else console.log(`Received response from ${peerName}: ${result}`);
    rl.close();
  });
}
