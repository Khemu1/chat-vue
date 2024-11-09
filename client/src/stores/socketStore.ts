import { defineStore } from "pinia";
import { io, Socket } from "socket.io-client";
import { useUserDataStore } from "./userStore";

export const useSocketStore = defineStore("socket", {
  state: () => ({
    socket: null as Socket | null,
    isConnected: false,
  }),

  actions: {
    connectSocket(userId: number) {
      if (!this.socket) {
        this.socket = io("http://localhost:3000", {
          transports: ["websocket"],
          withCredentials: true,
        });
        const userDataStore = useUserDataStore();

        this.socket.on("connect", () => {
          this.isConnected = true;
          if (this.socket) {
            userDataStore.userChosen(userId, this.socket!.id as string);

            this.socket!.emit("select_user", userId);
          }
        });

        this.socket.on("disconnect", () => {
          const userDataStore = useUserDataStore();

          userDataStore.userDisconnected();
          this.isConnected = false;
          this.socket = null;
        });
      }
    },

    disconnectSocket() {
      if (this.socket) {
        this.socket.disconnect();
        this.socket = null;
        this.isConnected = false;
      }
    },
  },
});
