import Vue from 'vue';
import axios from 'axios';
import App from './App';
import router from './router';
import store from './store';
import chming from './utils/chming';
import map from './utils/map';
import markerImage from './assets/marker.svg';

Vue.use(chming);
Vue.use(map, {
  markerImageSize: {
    width: 24,
    height: 35,
  },
  initLocation: {
    lat: 37.515309,
    lng: 127.02105,
  },
  searchOptions: {
    page: 1,
    size: 10,
  },
  markerImage: markerImage,
});

axios.defaults.baseURL = 'http://chming.jeongmyeonghyeon.com/api';
// axios.defaults.baseURL = 'https://chming-6e62d.firebaseio.com/';
Vue.prototype.$http = axios;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
});
