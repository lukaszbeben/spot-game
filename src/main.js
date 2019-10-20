import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Button, Progress, Modal, Field, Input } from "buefy";

Vue.use(Button);
Vue.use(Progress);
Vue.use(Modal);
Vue.use(Field);
Vue.use(Input);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
