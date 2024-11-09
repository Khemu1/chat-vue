import { defineStore } from "pinia";

export const useUserDataStore = defineStore("userDataStore", {
  state: () => ({
    userId: null as number | null,
    socketId: null as string | null,
    online: false,
  }),

  actions: {
    userChosen(id: number, socketId: string) {
      this.userId = id;
      this.socketId = socketId;
      this.online = true;
    },

    userDisconnected() {
      this.userId = null;
      this.socketId = null;
      this.online = false;
    },
  },
});
