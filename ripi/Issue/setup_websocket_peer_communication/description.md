# setup_websocket_peer_communication (Issue)

- [x] Set up Grenache WebSocket (WS) peer communication.
- [x] Implement a basic WebSocket server (GrenacheService) `src/server.js` that listens for connections.
  - The WebSocket server (`GrenacheService`) listens on port `1337`.
  - It announces itself in the DHT as `ws_chat_service`, so it can be discovered by peers.
  - The service echoes any message it receives, which is just for testing the initial setup.
- [ ] Implement a basic WebSocket client (GrenachePeer) `src/client.js` that sends a message to the server.
  - The WebSocket client (`GrenachePeer`) looks up the `ws_chat_service` in the DHT and sends the message `"Hello from client!"`.
  - It expects an echo response from the server.
- [ ] Write unit tests for the WebSocket service and peer communication.
- [ ] Write an integration test to ensure the communication works end-to-end.
