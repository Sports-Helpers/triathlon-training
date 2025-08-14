import { createApp } from "vue";
import App from "@/App.vue";
import { ROUTING_SERVICE_KEY, RoutingService } from "@/services/routing/routingService";
import { LANGUAGE_SERVICE_KEY, LanguageService } from "@/services/i18n/languageService";
import { createPinia } from "pinia";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";
import "@/assets/styles.css";
import { createHead } from "@unhead/vue/client";
import { THEME_SERVICE_KEY, ThemeService } from "@/services/themes/themeService";
import { I18nInstance } from "@/services/i18n/i18nInstance";
import { RouterInstance } from "@/services/routing/routerInstance";
import { ThemeInstance } from "@/services/themes/themeInstance";

const languageService = new LanguageService(new I18nInstance());
const routingService = new RoutingService(new RouterInstance());
const themeService = new ThemeService(new ThemeInstance());

const app = createApp(App);
app.use(createHead());
app.use(createPinia().use(piniaPluginPersistedState));
app.use(languageService.getI18nInstance().getRoot());
app.use(routingService.getRouterInstance().getRouter());

app.provide(LANGUAGE_SERVICE_KEY, languageService);
app.provide(ROUTING_SERVICE_KEY, routingService);
app.provide(THEME_SERVICE_KEY, themeService);

app.mount("#app");
