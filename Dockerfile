# Use Node.js official image
FROM node:16

# Install grenache-grape globally
RUN npm install -g grenache-grape

# Expose the ports for DHT and Peer communication
EXPOSE 30001 20001

# Set grape as the entrypoint
ENTRYPOINT ["grape"]
