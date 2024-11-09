<template>
  <slot></slot>
</template>

<script setup lang="ts">
import { provide } from "vue";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000", {
  transports: ["websocket"],
  withCredentials: true,
});

provide("socket", socket);
</script>
