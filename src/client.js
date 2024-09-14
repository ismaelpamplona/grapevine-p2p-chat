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

function startPrompt() {
  rl.question(
    "\n---\n\n✨ Enter the peer name to lookup (client1, client2 or type 'exit' to quit): ",
    (peerName) => {
      if (peerName.toLowerCase() === "exit") {
        console.log("\n👋 Exiting the client... Goodbye!\n");
        rl.close();
        process.exit(0);
      }

      link.lookup(peerName, (err, peers) => {
        if (err) {
          console.error("\n❌ Lookup error");
          return startPrompt();
        }

        if (peers.length === 0) {
          console.log("\n⚠️  No peers found!");
          return startPrompt();
        }

        console.log("\n🔗 Available peers:", peers);
        rl.question("💬 Enter your message: ", (message) => {
          sendMessage(peerName, message, peers[0]); // Correctly send message to peer name
        });
      });
    }
  );
}

// Function to send message to the chosen peer
function sendMessage(peerName, message, peerAddress) {
  console.log(`\n📤 Sending message to ${peerName} at ${peerAddress}...`);
  peer.request(peerName, { message }, { timeout: 10000 }, (err, result) => {
    if (err) console.error(`\n❌ Error sending message to ${peerName}:`, err);
    else console.log(`📥 Message successfully delivered to ${peerName}!`);
    startPrompt();
  });
}

startPrompt();
