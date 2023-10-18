import { setupServer } from "./server";

async function main() {
  try {
    await setupServer();
  } catch (error) {
    console.error(error);
  }
}

main();
