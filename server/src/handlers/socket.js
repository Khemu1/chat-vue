import http from "http";

/**
 * @type {Array<{ id: number, online: boolean }>}
 */
const users = [
  { id: 1, online: false },
  { id: 2, online: false },
  { id: 3, online: false },
  { id: 4, online: false },
];

/**
 * Initializes Socket.IO with the given server.
 *
 * @param {http.Server} server - The HTTP server instance to bind with Socket.IO.
 * @returns {import("socket.io").Server} The initialized Socket.IO instance.
 */
export const initSocket = async (server) => {
  /**
   * @type {import("socket.io").Server}
   */
  const io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173"],
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  /**
   * @type {import("socket.io").Socket}
   */
  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("select_user", (userId) => {
      const userIndex = users.findIndex((u) => u.id === userId);
      if (userIndex !== -1) {
        users[userIndex].online = true;
        socket.userId = userId;
        io.emit("user_status", users);
      }
    });

    socket.on("message", (message) => {
      console.log("A user sent a message");
      io.emit("message", message);
    });

    socket.on("typing", (userId) => {
      console.log("A user is typing");
      io.emit("typing", userId);
    });

    socket.on("stop_typing", (userId) => {
      console.log("A user stopped typing");
      io.emit("stop_typing", userId);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
      const userIndex = users.findIndex((u) => u.id === socket.userId);
      if (userIndex !== -1) {
        users[userIndex].online = false;
        io.emit("user_status", users);
      }
    });
  });

  return io;
};
