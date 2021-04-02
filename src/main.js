import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VModal from "vue-js-modal";
import SmartTable from "vuejs-smart-table";
import BootstrapVue from "bootstrap-vue";
import JsonCSV from "vue-json-csv";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.component("downloadCsv", JsonCSV);

Vue.use(BootstrapVue);
Vue.use(SmartTable);
Vue.use(VModal);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
