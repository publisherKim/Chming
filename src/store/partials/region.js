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

      // 시 기준으로 오름차순 정렬
      regionList.sort((a, b) => {
        if(a.level1 < b.level1) {
          return -1;
        } else {
          return 1;
        }
      });

      // 시 배열 생성(unique - 중복제거)
      state.regionCategoryList = regionList.filter((region, pos, array) => {
        return !pos || region.level1 !== array[pos - 1].level1;
      });
    },
  },
  actions: {
    getRegionList({getters, commit}) {
      commit('setIsLoading', true);
      http.get(getters.url.REGION_LIST)
        .then(response => {
          if(response.status === 200) {
            commit('setRegionList', response.data);
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