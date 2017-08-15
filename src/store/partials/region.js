import axios from 'axios';

let http = axios;

export default {
  state: {
    regionList: [],
    regionCategoryList: [],
  },
  getters: {
    regionList(state) {
      return state.regionList;
    },
    regionCategoryList(state) {
      return state.regionCategoryList;
    },
  },
  mutations: {
    setRegionList(state, regionList) {
      state.regionList = regionList;

      state.regionCategoryList = regionList.filter(function(item, pos, array) {
        return !pos || item.si !== array[pos - 1].si;
      });
    },
  },
  actions: {
    getRegionList({getters, commit}) {
      http.get(getters.url.REGION_LIST)
        .then(response => {
          if(response.status === 200) {
            commit('setRegionList', response.data);
          }
        })
        .catch(error => {
          console.log('error.response:', error.response);
        });
    },
  }
};