import Vue from 'vue';
import axios from 'axios';

let http = axios;

export default {
  state: {
    map: null,
    center: null,
    isMapMoving: false,
    markers: [],
    markerTexts: [],
  },
  getters: {
    map(state) {
      return state.map;
    },
    markers(state) {
      return state.markers;
    },
    center(state) {
      return state.center;
    },
    isMapMoving(state) {
      return state.isMapMoving;
    },
  },
  mutations: {
    setMap(state, map) {
      state.map = map;
    },
    setMarker(state, {commit, getters}) {
      let groupList = getters.groupList;
      let bounds = new Vue.maps.LatLngBounds();
      let event = Vue.maps.event;

      state.markers = groupList.map((group, index) => {
        let map = state.map;
        let position = new Vue.maps.LatLng(group.lat, group.lng);

        // 지도 범위 재설정(bounds 객체에 마커가 표시되어야할 좌표값을 확장 시킴)
        bounds.extend(position);

        // 마커 생성 및 표시
        let marker = new Vue.maps.Marker({
          map: map, // 마커를 표시할 지도
          position: position, // 마커를 표시할 위치
          // title: group.name + '\n' + group.description, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          image: Vue.maps.getMarkerImage(), // 마커 이미지 
        });
        
        // 웹 호버콘텐츠
        let iWContent = `
          <div style="padding:5px;">
            <p style="display:block;width:140px;text-align:center;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal;overflow:hidden;">
              ${groupList[index].name}
            </p>
          </div>`;
        let infowindow = new Vue.maps.InfoWindow({
          content : iWContent
        });
        event.addListener(marker, 'mouseover', function() {
          infowindow.open(map, marker);
        });

        event.addListener(marker, 'mouseout', function() {
          infowindow.close();
        });

        // 마커 이벤트 리스너 추가
        event.addListener(marker, 'click', () => {
          commit('setActiveSlide', index);
          let position = getters.groupList[index].position;
          getters.map.panTo(position);
          commit('setCenter', position);
          commit('setIsMapMoving', false);
        });

        return marker;
      });
      window.markers = state.markers;
      // 지도 범위 재설정 (중심좌표와 지도 레벨 변경될 수 있음)
      getters.map.setBounds(bounds);
    },
    setCenter(state, center) {
      state.center = center;
    },
    setIsMapMoving(state, isMapMoving) {
      state.isMapMoving = isMapMoving;
    },
    setMarkerNumber(state, getters) {
      state.markerTexts = getters.groupList.map((group, index) => {
        let map = state.map;
        let position = new Vue.maps.LatLng(group.lat, group.lng);
        // 커스텀 오버레이에 표시할 내용입니다
        // HTML 문자열 또는 Dom Element 입니다
        // let content = `<span style="position: absolute; top: -31.5px; left: -2.5px;
              // font-size: 12px; color: #3b8de0; font-weight: bold">${index+1}</span>`;
        let content = `<span onclick="daum.maps.event.trigger(markers[${index}], 'click')"
              style="position: absolute; top: -30px; left: 1px;
              transform: translateX(-50%); text-align: center; color: #3b8de0;
              font-size: ${index >= 10 ? '10' : '11'}px; font-weight: bold">${index+1}</span>`;

        // 커스텀 오버레이를 생성합니다
        let customOverlay = new Vue.maps.CustomOverlay({
          position: position,
          content: content,
        });
        
        customOverlay.setMap(map);       
        return customOverlay;
      });
    },
    setMarkerCluster(state) {
      let clusterer = new Vue.maps.MarkerClusterer({
        map: state.map, // 마커들을 클러스터로 관리하고 표시할 지도 객체 
        averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정 
        minLevel: 5 // 클러스터 할 최소 지도 레벨 
      });

      clusterer.addMarkers(state.markers);
    },
    removeMarkers(state) {
      state.markers.forEach(marker => {
        marker.setMap(null);
      });
    },
    removeMarkerTexts(state) {
      state.markerTexts.forEach(markerText => {
        markerText.setMap(null);
      });
    },
    setMarkersEmpty(state) {
      state.markers = [];
    },
    setRadiusInMap(state, options) {
      let bounds = state.map.getBounds();
      //ib 위도, hb 경도
      let swLatLng = bounds.getSouthWest();
      let neLatLng = bounds.getNorthEast(); 

      let line = Vue.maps.getPolyline();
      let LatLng = Vue.maps.LatLng;

      // 지도상 수직 거리(m)
      line.setPath([new LatLng(neLatLng.ib, neLatLng.hb), new LatLng(swLatLng.ib, neLatLng.hb)]);
      let width = Math.round(line.getLength());
      
      // 지도상 수평 거리(m)
      line.setPath([new LatLng(neLatLng.ib, neLatLng.hb), new LatLng(neLatLng.ib, swLatLng.hb)]);
      let height = Math.round(line.getLength());

      // 수평거리와 수직거리중 긴 축을 기준으로 검색
      let distance = width > height ? width : height;

      // 반경이므로 /2, km 단위로 전환 *0.001
      options.distance_limit = distance / 2 * 0.001;
    },
  },
  actions: {
    resetMarkers({commit, state}) {
      // 지도에 마커가 존재한다면 모두 제거
      if(state.markers.length !== 0) {
        commit('removeMarkers');
        commit('removeMarkerTexts');
        commit('setMarkersEmpty');
      }
    },
    setCenterInMap({getters, commit}) {
      let options = getters.filterOptions;
      let position = new Vue.maps.LatLng(options.lat, options.lng);
      commit('setCenter', position);
      getters.map.setCenter(position);
    },
  }
};