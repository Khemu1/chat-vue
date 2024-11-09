<template>
  <slot></slot>
</template>

<script setup lang="ts">
import { onMounted, provide } from "vue";
import { io } from "socket.io-client";

onMounted(() => {
  const socket = io("http://localhost:3000", {
    transports: ["websocket"],
    withCredentials: true,
  });
  provide("socket", socket);
});
</script>
