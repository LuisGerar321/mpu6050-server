import { emitNewRotation } from "./services/socketsIO";

function sanitizateObject(inputString) {
  try {
    const parts = inputString.split("}{");
    let primerObjeto;

    if (parts.length > 1) {
      primerObjeto = parts[0] + "}";
    } else {
      primerObjeto = inputString;
    }

    return primerObjeto;
  } catch (error) {
    console.error("the error : ", error);
  }
}

const net = require("net"); // Import network library (built-in with Node)

// Server logic
// - What to do with incoming connections and data?
const server = net.createServer((socket) => {
  // Create socket connection
  console.log("client connected"); // Raspberry Pi connection established

  // When data is sent within the socket
  socket.on("data", (data) => {
    try {
      const msg = sanitizateObject(data);
      console.log(msg);
      //console.log("Received data from Socket Client Device:", msg); // Log data
      emitNewRotation(JSON.parse(msg));
      //socket.write("server response"); // Respond to Raspberry Pi
    } catch (e) {
      console.log("Error when trying to send data: ", data.toString());
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
