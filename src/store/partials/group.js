import Vue from 'vue';
import axios from 'axios';

let http = axios;

export default {
  state: {
    groupList: [],
    groupDetail: null,
  },
  getters: {
    groupList(state) {
      return state.groupList;
    },
    groupDetail(state) {
      return state.groupDetail;
    },
  },
  mutations: {
    setGroupList(state, groupList) {
      state.groupList = groupList;
    },
    arrangeGroupByDistance(state, {getters, options}) {
      let LatLng = Vue.maps.LatLng;

      let groupList = state.groupList;
      let basePosition = new LatLng(options.lat, options.lng);

      groupList.forEach(function(group, index) {
        let line = Vue.maps.getPolyline();
        group.position = new LatLng(group.lat, group.lng);
        line.setPath([basePosition, group.position]);
        group.distance = Math.round(line.getLength());
      });

      groupList.sort(function(group1, group2) {
        return group1.distance - group2.distance;
      });

      getters.map.setCenter(basePosition);
    },
    setGroupDetail(state, groupDetail) {
      state.groupDetail = groupDetail;
    },
  },
  actions: {
    //  - 현재위치 위도
    //  - 현재위치 경도
    //  - 반경 ( meter 단위 )
    //  - 로그인 한 유저의 관심사 리스트 { 관심사명 }
    getGroupList({getters, commit, dispatch}, options) {
      if(!options) {
        let defaultLocation = Vue.maps.getDefaultLocation();
        options = {
          lat: defaultLocation.ib,
          lng: defaultLocation.hb,
          hobby: '축구',
        };
      }

      // let formData = Vue.setFormData(options);

      commit('setIsLoading', true);
      http.get(getters.url.MAIN_GROUP_LIST, {
        params: options,
      })
        .then(response => {
          if(response.status === 200) {
            let data = response.data;
            if(data.length !== 0) {
              commit('setGroupList', data);
              commit('arrangeGroupByDistance', {getters, options});
              dispatch('getGroupDetail', data[0]);
              commit('setMarker', getters);
              commit('setMarkerNumber', getters);
            } else {
              alert('검색 결과가 없습니다.');
            }
          }
        })
        .catch(error => {
          console.log('error:', error);
          console.log('error:', error.response);
        })
        .finally(() => {
          commit('setIsLoading', false);
        });
    },
    getGroupDetail({getters, commit}, group) {
      let url = `${getters.url.GROUP_DETAIL}${group.pk}/`;

      commit('setIsLoading', true);
      http.get(url)
        .then(response => {
          if(response.status === 200) {
            commit('setGroupDetail', response.data);
          }
        })
        .catch(error => {
          console.log('error:', error);
          console.log('error:', error.response);
        })
        .finally(() => {
          commit('setIsLoading', false);
        });
    },
  },
};