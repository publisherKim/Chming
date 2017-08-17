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
    setRegionList(state, {regionList, commit}) {
      state.regionList = regionList;
      commit('setLocation', regionList[4]);
      state.regionCategoryList = regionList.filter(function(item, pos, array) {
        return !pos || item.si !== array[pos - 1].si;
      });
    },
  },
  actions: {
    getRegionList({getters, commit}) {
      commit('setIsLoading', true);
      http.get(getters.url.REGION_LIST)
        .then(response => {
          if(response.status === 200) {
            commit('setRegionList', {regionList: response.data, commit});
          }
        })
        .catch(error => {
          console.log('error.response:', error.response);
        })
        .finally(() => {
          commit('setIsLoading', false);
        });
    },
  }
};