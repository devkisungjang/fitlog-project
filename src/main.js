// Plugins
import { registerPlugins } from "@/plugins";
import { createPinia } from "pinia";
import { useKakao } from "vue3-kakao-maps";

// Components
import App from "./App.vue";
import router from "./router";

// Composables
import { createApp } from "vue";

const app = createApp(App);
const pinia = createPinia();

useKakao("5bd7be4085eeed06609b9a85cfba8add", [
  "clusterer",
  "services",
  "drawing",
]);
registerPlugins(app);

app.use(router);
app.use(pinia);
app.mount("#app");
