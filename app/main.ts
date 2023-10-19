import { setupServer } from "./server";
import { setupServerIo } from "./serverExpressSocketIo";

async function main() {
  try {
    await setupServer();
    await setupServerIo();
  } catch (error) {
    console.error(error);
  }
}

main();
