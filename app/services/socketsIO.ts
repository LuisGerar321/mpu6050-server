import { io } from "../serverExpressSocketIo";

export const emitNewRotation = (data) => {
  console.log("Sending Data 'newRotation'from Socket Server with data: ", data);
  io.emit("newRotation", { data });
};
