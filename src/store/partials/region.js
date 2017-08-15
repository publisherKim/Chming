import axios from 'axios';

let http = axios;

export default {
  state: {
    regionList: [],
  },
  getters: {
    regionList(state) {
      return state.regionList;
    },
  },
  mutations: {
    setRegionList() {
      
    },
  },
  actions: {
    getRegionList({commit}) {

    },
  }
};