import { createApp } from "vue";
import App from "./src/app.vue";
import router from "./src/router/router";
import "./src/css/index.css";
import "./src/css/management.css";
import Highcharts from "highcharts-vue";

const app = createApp(App);

app.use(router)
app.use(Highcharts);

app.mount("#app");