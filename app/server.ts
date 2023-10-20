import { emitNewRotation } from "./services/socketsIO";

const net = require("net"); // Import network library (built-in with Node)

// Server logic
// - What to do with incoming connections and data?
const server = net.createServer((socket) => {
  // Create socket connection
  console.log("client connected"); // Raspberry Pi connection established

  // When data is sent within the socket
  socket.on("data", (data) => {
    const buffer: string[] = data.toString().split("\n");

    try {
      // buffer.map((data: string) => {
      //   if (data.includes("{") && data.includes("}")) {
      //     emitNewRotation(JSON.parse(data));
      //   }
      // });
      emitNewRotation(JSON.parse(buffer[0]));
      //socket.write("server response"); // Respond to Raspberry Pi
    } catch (e) {
      console.log(
        "Error when trying to send data: ",
        data.toString().split("\n")
      );
    }
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
