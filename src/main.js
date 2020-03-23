import Vue from 'vue'
import Login from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'; 
import 'element-ui/lib/theme-chalk/index.css';
require("./css/style.css");
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(Login)
}).$mount('#app')
