import { emitNewRotation } from "./services/socketsIO";

const net = require("net"); // Import network library (built-in with Node)

// Server logic
// - What to do with incoming connections and data?
const server = net.createServer((socket) => {
  // Create socket connection
  console.log("client connected"); // Raspberry Pi connection established

  // When data is sent within the socket
  socket.on("data", (data) => {
    const msg = data.toString(); // Parse data
    console.log("received data from pi:", msg); // Log data
    emitNewRotation(data);
    socket.write("server response"); // Respond to Raspberry Pi
  });

  // The Raspberry Pi disconnected
  socket.on("end", () => {
    console.log("client disconnected");
  });
});

// Catch errors as they arise
server.on("error", (err) => {
  console.error("server error:", err);
});

// Start the server

export const setupServer = async (): Promise<void> => {
  return new Promise((resolve) => {
    server.listen(4000, () => {
      console.log("Server listening on port 4000");
      resolve();
    });
  });
};
