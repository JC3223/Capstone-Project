/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from "@/plugins";

// Components
import App from "./App.vue";
import VueSidebarMenu from "vue-sidebar-menu";
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";

// Composables
import { createApp } from "vue";

import vuetify from "./plugins/vuetify";
import 'vuetify/styles';

const app = createApp(App);

registerPlugins(app);

app.use(vuetify).mount("#app");
