import Vue from 'vue';
import axios from 'axios';
import App from './App';
import router from './router';
import store from './store';
import chming from './utils/chming';

Vue.prototype.$http = axios;
Vue.prototype.$maps = window.daum.maps;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  chming,
  render: h => h(App),
});
