import 'es6-promise/auto';
import Vue from 'vue';
import axios from 'axios';
import App from './App';
import router from './router';
import store from './store';
import _finally from 'promise.prototype.finally';
import chming from './utils/chming';
import map from './utils/map';
import markerImage from './assets/marker.svg';
import VueScroll from 'vue-scroll';

const init = function() {
  Vue.use(chming);
  Vue.use(map, {
    markerImageSize: {
      width: 24,
      height: 35,
    },
    initLocation: {
      lat: 37.51464774535222,
      lng: 127.01871998962301,
    },
    searchOptions: {
      page: 1,
      size: 10,
    },
    markerImage: markerImage,
  });

  // VueScroll 플로그인 로드
  Vue.use(VueScroll);

  // Promise finally 플로그인 로드
  _finally.shim(); 

  // axios baseURL 세팅 및 Vue prototype 객체의 $http에 참조
  axios.defaults.baseURL = 'http://chming.jeongmyeonghyeon.com/api';
  Vue.prototype.$http = axios;

  Vue.config.productionTip = false;
};

init();

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
});
