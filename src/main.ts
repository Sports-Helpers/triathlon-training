import { createApp } from "vue";
import App from "@/App.vue";
import { ROUTING_SERVICE_KEY, RoutingService } from "@/services/routing/routingService";
import { createPinia } from "pinia";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";
import "@/assets/styles.css";
import { createHead } from "@unhead/vue/client";
import { THEME_SERVICE_KEY, ThemeService } from "@/services/themes/themeService";
import { RouterInstance } from "@/services/routing/routerInstance";
import { ThemeInstance } from "@/services/themes/themeInstance";

const routingService = new RoutingService(new RouterInstance());
const themeService = new ThemeService(new ThemeInstance());

const app = createApp(App);
app.use(createHead());
app.use(createPinia().use(piniaPluginPersistedState));
app.use(routingService.getRouterInstance().getRouter());

app.provide(ROUTING_SERVICE_KEY, routingService);
app.provide(THEME_SERVICE_KEY, themeService);

app.mount("#app");
