import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import vueAxios from 'vue-axios';
import http from './utils/http';

import VueParticles from 'vue-particles'

Vue.use(VueParticles)

Vue.use(vueAxios, http)

Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
