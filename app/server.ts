import express, { json } from "express";
import { config } from "./config";
import { createServer } from "http";
import { Server } from "socket.io";
import { emitNewRotation } from "./services/socketsIO";
const cors = require("cors");

const { port, host } = config;
const app = express();
app.use(json());
app.use(cors());

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.get("/", (req, res) => {
  res.send({ status: 200, message: "ok" });
});

app.post("/", (req, res) => {
  try {
    const { body } = req;
    if (Object.keys(body).length > 0 || !body) {
      return res.status(400).send({
        status: 400,
        message: "Bad Request",
      });
      emitNewRotation(body);
    }
    res.send({ status: 200, message: "ok" });
  } catch (error) {}
});

io.on("connection", (socket) => {
  console.log(`User connected with socket id: ${socket.id}`);
  socket.on("data", (data) => {
    console.log(`Data received from client ${socket.id}: ${data}`);
    // Puedes realizar cualquier otra acción que desees con los datos aquí
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected with socket id: ${socket.id}`);
  });
});

export const setupServer = async (): Promise<void> => {
  return new Promise((resolve) => {
    server.listen(port, host, () => {
      console.log(`App running on http://${host}:${port}`);
      resolve();
    });
  });
};

export { server, io }; // Exporta la instancia de Socket.io
