import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

let maps = window.daum.maps;
let imageSrc = 'http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
let imageSize = new maps.Size(24, 35);

export default new Vuex.Store({
  state: {
    url: 'http://chming.jeongmyeonghyeon.com/api',
    token: null + '',
    // token: null,
    userInfo: {
      
    },
    mapUtils: {
      markerImage: new maps.MarkerImage(imageSrc, imageSize),
      places: new maps.services.Places(),
      geocoder: new maps.services.Geocoder(),
    },
    map: null,
  },
  getters: {
    getUrl(state) {
      return state.url;
    },
    getToken(state) {
      return state.token;
    },
    getMap(state) {
      return state.map;
    },
    mapUtils(state) {
      return state.mapUtils;
    },
  },
  mutations: {
    setMap(state, map) {
      state.map = map;
    },
    setToken(state, token) {
      state.token = token;
    },
  },
  actions: {

  }
});