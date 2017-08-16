import Vue from 'vue';
import axios from 'axios';

let http = axios;

export default {
  state: {
    map: null,
    markers: [],
  },
  getters: {
    map(state) {
      return state.map;
    },
    markers(state) {
      return state.markers;
    },
  },
  mutations: {
    setMap(state, map) {
      state.map = map;
    },
    setMarker(state, getters) {

      state.markers = getters.groupList.map((group, index) => {
        let map = state.map;
        let position = new Vue.maps.LatLng(group.lat, group.lng);

        // 마커 생성 및 표시
        let marker = new Vue.maps.Marker({
          map: map, // 마커를 표시할 지도
          position: position, // 마커를 표시할 위치
          title: 'rrrr',
          // title: group.name + '\n' + group.description, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          image: Vue.maps.getMarkerImage(), // 마커 이미지 
        });

        return marker;
      });
    },
    setMarkerNumber(state, getters) {
      getters.groupList.forEach((group, index) => {
        let map = state.map;
        let position = new Vue.maps.LatLng(group.lat, group.lng);

        // 커스텀 오버레이에 표시할 내용입니다
        // HTML 문자열 또는 Dom Element 입니다
        let content = `<span style="position: absolute; top: -31.5px; left: -2.5px;
              font-size: 12px; color: #3b8de0; font-weight: bold">${index+1}</span>`;

        // 커스텀 오버레이를 생성합니다
        let customOverlay = new Vue.maps.CustomOverlay({
          position: position,
          content: content,
        });

        // 커스텀 오버레이를 지도에 표시합니다
        customOverlay.setMap(map);
      });
    },
    
  },
  actions: {
    
  }
};