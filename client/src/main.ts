import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import SocketProvider from "./components/socket/SokcetProvider.vue";
import { createPinia } from "pinia";
// import { router } from "./routes/index";

const app = createApp(App);

app.component("SocketProvider", SocketProvider);
app.use(createPinia());
// app.use(router);
app.mount("#app");
