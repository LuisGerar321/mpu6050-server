import { io } from "../serverExpressSocketIo";

export const emitNewRotation = (data) => {
  try {
    console.log(
      "Sending Data 'newRotation'from Socket Server with data: ",
      data
    );
    io.emit("newRotation", { data });
  } catch (error) {
    console.log("Error in emit: ", data);
  }
};
