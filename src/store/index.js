import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

let maps = window.daum.maps;
let Marker = maps.Marker;
let LatLng = maps.LatLng;
// let imageSrc = 'http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
// let imageSize = new maps.Size(24, 35);
// let imageSrc = '../assets/marker.svg';
let imageSrc = 'https://firebasestorage.googleapis.com/v0/b/chming-6e62d.appspot.com/o/marker.svg?alt=media&token=ef42b73d-8697-432b-b240-d139f7c32a69';
let imageSize = new maps.Size(24, 35);
let CustomOverlay = maps.CustomOverlay;
let http = axios;
let defaultLocation = new LatLng(37.50415875922816, 127.0256049101885);

export default new Vuex.Store({
  state: {
    // url: 'http://chming.jeongmyeonghyeon.com/api',
    url: 'https://chming-6e62d.firebaseio.com/',
    token: null + '',
    // token: null,
    userInfo: {
      
    },
    mapUtils: {
      markerImage: new maps.MarkerImage(imageSrc, imageSize),
      places: new maps.services.Places(),
      geocoder: new maps.services.Geocoder(),
      polyline: new maps.Polyline(),
    },
    map: null,
    groupList: [],
    markers: [],
    myLocation: null,
//  - 모임 pk
//  - 모임 관심사 카테고리
//  - 모임 관심사명
//  - 모임 이름
//  - 모임 소개 사진 URL
//  - 모임 소개 내용
//  - 모임 주소
//  - 모임 위도
//  - 모임 경도
//  - 모임 공지사항 리스트 { 게시글 pk, 제목, 내용, 좋아요수, 댓글수 }
//  - 모임장 pk
//  - 모임장 이름
//  - 모임 가입자 리스트 { 가입자 pk, 프로필 사진, 이름 }
//  - 모임 좋아요 여부 : bool
//  - 모임 가입 여부: bool
  },
  getters: {
    apiUrl(state) {
      return state.url;
    },
    token(state) {
      return state.token;
    },
    map(state) {
      return state.map;
    },
    mapUtils(state) {
      return state.mapUtils;
    },
    groupList(state) {
      return state.groupList;
    },
    markers(state) {
      return state.markers;
    },
  },
  mutations: {
    setMap(state, map) {
      state.map = map;
    },
    setToken(state, token) {
      state.token = token;
    },
    setGroupList(state, groupList) {
      state.groupList = groupList;
    },
    setMarker(state) {
      console.log('state.groupList:', state.groupList);

      state.markers = state.groupList.map((group_info, index) => {
        let map = state.map;
        let position = new LatLng(group_info.latitude, group_info.longitude);

        // 마커 생성 및 표시
        let marker = new Marker({
          map: map, // 마커를 표시할 지도
          position: position, // 마커를 표시할 위치
          title: group_info.name + '\n' + group_info.description, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          image: state.mapUtils.markerImage, // 마커 이미지 
        });

        // 커스텀 오버레이에 표시할 내용입니다
        // HTML 문자열 또는 Dom Element 입니다
        let content = `<span>${index}</span>`;

        // 커스텀 오버레이를 생성합니다
        let customOverlay = new CustomOverlay({
          position: position,
          content: content,
        });

        // 커스텀 오버레이를 지도에 표시합니다
        customOverlay.setMap(map);

        return marker;
      });
    },
    arrangeGroupByDistance(state) {
      let groupList = state.groupList;
      let myLocation = state.myLocation;

      groupList.forEach(function(group) {
        let line = state.mapUtils.polyline;
        group.position = new LatLng(group.latitude, group.longitude);
        line.setPath([myLocation, group.position]);
        group.distance = Math.round(line.getLength());
      });

      groupList.sort(function(group1, group2) {
        return group1.distance - group2.distance;
      });

      state.map.setCenter(myLocation);
    },
    setMyLocation(state, myLocation) {
      console.log(myLocation);
      state.myLocation = myLocation;
    },
  },
  actions: {
//  - 현재위치 위도
//  - 현재위치 경도
//  - 반경 ( meter 단위 )
//  - 로그인 한 유저의 관심사 리스트 { 관심사명 }
    setGroupList({commit, state}, location) {
      location && (state.myLocation = location);
      !location && (state.myLocation = defaultLocation);

      http.get(state.url + 'groups.json').
        then(response => {
          if(response.status === 200) {
            commit('setGroupList', response.data);
            commit('setMarker');
            commit('arrangeGroupByDistance');
          }
        }).
        catch(error => {
          console.log('error:', error);
        });
    },
    
  }
});