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

      // 시 기준으로 오름차순 정렬
      regionList.sort(function(region1, region2) {
        return region1.si > region2.si;
      });

      // 시 배열 생성(unique - 중복제거)
      state.regionCategoryList = regionList.filter(function(region, pos, array) {
        return !pos || region.si !== array[pos - 1].si;
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