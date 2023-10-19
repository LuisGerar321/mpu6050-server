import { io } from "../serverExpressSocketIo";

export const emitNewRotation = (data) => {
  console.log("Socket sent: newRotation with data: ", data);
  io.emit("newRotation", { data });
};
