import { reactive } from "vue";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000", {
  transports: ["websocket"],
  withCredentials: true,
});

const state = reactive({
  socket,
  userId: null,
});

export default state;
