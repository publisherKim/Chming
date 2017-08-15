import Vue from 'vue';
import axios from 'axios';

let http = axios;

export default {
  state: {
    groupList: [],
  },
  getters: {
    groupList(state) {
      return state.groupList;
    },
  },
  mutations: {
    setGroupList(state, groupList) {
      state.groupList = groupList;
    },
  },
  actions: {
    //  - 현재위치 위도
    //  - 현재위치 경도
    //  - 반경 ( meter 단위 )
    //  - 로그인 한 유저의 관심사 리스트 { 관심사명 }
    setGroupList({commit, state}, location) {
      location && commit('setMyLocation', location);
      !location && commit('setMyLocation', Vue.maps.getDefaultLocation());

      http.get('groups.json')
        .then(response => {
          if(response.status === 200) {
            commit('setGroupList', response.data);
            commit('setMarker');
            commit('arrangeGroupByDistance');
            commit('setMarkerNumber');
          }
        })
        .catch(error => {
          console.log('error:', error.response);
        });
    },
  }
};