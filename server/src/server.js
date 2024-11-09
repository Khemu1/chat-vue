import http from "http";
import app from "./app";
import { initSocket } from "./handlers/socket";

const server = http.createServer(app);

const startServer = async () => {
  try {
    initSocket(server);
    server.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();

process.on("SIGINT", () => {
  server.close(() => {
    console.log("Server closed");
  });
});
