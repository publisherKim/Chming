<template lang="pug">
  .user-location-container
    h3.title 나의 지역을 선택해주세요
    form.user-location_search-form(onsubmit="return false;" autocomplete="off")
      input(@keyup.enter="searchLocation" v-model.trim="searchString" type="text" id="keyword" placeholder="지역찾기")
      button.search-form_button(@click="searchLocation" type="button" aria-label="검색")
        i.fa.fa-search(aria-hidden='true')
      ul.result_list(v-if="searchResult.length !== 0")
        li.list_item(v-for="item in searchResult")
          a(href @click.prevent="setMapCenter(item)") {{ item.place_name }}
        li.list_item
          button.list_close-button(@click="closeSearchResult") 닫기
    user-map.user-map
    button.confirm-button(@click="confirm" :disabled="!position.address") 완료
</template>

<script>
  import UserMap from '@/components/common/Map';
  import { mapGetters } from 'vuex';
  
  let maps = window.daum.maps;
  let mapEvent = maps.event;
  let LatLng = maps.LatLng;
  let Status = maps.services.Status;
  let Marker = maps.Marker;
  let InfoWindow = maps.InfoWindow;
  let searchOptions = {
    page: 1,
    size: 10
  };

  export default {
    mounted() {
      mapEvent.addListener(this.getMap, 'click', this.mapClickHandler);
    },
    beforeDestroy() {
      mapEvent.removeListener(this.getMap, 'click', this.mapClickHandler);
    },
    components: {
      UserMap
    },
    data() {
      return {
        searchString: '',
        searchResult: [],
        selectedMarker: null,
        infoWindow: null,
        position: {
          address: null,
          latitude: null,
          longitude: null,
        },
      };
    },
    methods: {
      confirm() {
        let prevRoute = this.$route.params.prev;
        this.changeRoute({name: prevRoute, params: {position: this.position}});  
      },
      changeRoute(route) {
        this.$router.push(route);
      },
      searchLocation() {
        let searchString = this.searchString;
        !searchString && window.alert('검색할 지역을 입력해주세요.');

        if(searchString) {
          let ps = this.mapUtils.places;  
          let placesSearchCB = (result, status, pagination) => {
            if (status === Status.OK) {
              this.searchResult = result;
            }
          };
          ps.keywordSearch(searchString, placesSearchCB, searchOptions);
        }
      },
      closeSearchResult() {
        this.searchResult = [];
      },
      setMapCenter(item) {
        let position = new LatLng(item.y, item.x);
        this.getMap.setCenter(position);
        this.closeSearchResult();
      },
      mapClickHandler(e) {
        let latlng = e.latLng;
        // console.log('latlng:', latlng);

        let geocoder = this.mapUtils.geocoder;

        let getAddress = (result, status) => {
          if (status === Status.OK) {
            result = result[0];

            this.setMarker(latlng, result);
            this.setInfoWindow(latlng, result);
            this.setPosition(latlng, result);
          }
        };
        geocoder.coord2Address(latlng.getLng(), latlng.getLat(), getAddress);
      },
      setPosition(latlng, result) {
        this.position.latitude = latlng.ib;
        this.position.longitude = latlng.hb;
        this.position.address = result.address.address_name;
      },
      setMarker(latlng, result) {
        this.selectedMarker && this.selectedMarker.setMap(null);
        this.selectedMarker = new Marker({
          position: latlng, // 마커를 표시할 위치
          title : result.address.address_name, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시
          image : this.mapUtils.markerImage, // 마커 이미지 
        });
        this.selectedMarker.setMap(this.getMap);
      },
      setInfoWindow(latlng, result) {
        let iwContent = `<div style="padding:5px; width: 200px;">
                            ${result.address.address_name}
                         </div>`;
        this.infowindow && this.infowindow.close();
        this.infowindow = new InfoWindow({ // 인포윈도우 생성
          position: latlng,
          content: iwContent,
        });
        this.infowindow.open(this.getMap, this.selectedMarker); 
      },
    },
    computed: {
      ...mapGetters(['getMap', 'mapUtils']),
    }
  };
</script>

<style lang="sass" scoped>
  @import "~chming"

  .user-location-container 
    position: absolute
    top: 0
    right: 0
    padding: 2rem
    width: 100%
    height: 100vh
    background: #fff

  .title
    +sub-page-title
  
  .user-location_search-form
    position: relative
    margin-top: 1rem
    input
      +text-input(100%)
    .search-form_button
      position: absolute
      top: 0
      right: 0.5rem
      +align-vertical-middle
      padding: 0.5rem
      font-size: 1.5rem
      background: none
      border: 0

  .result_list
    position: absolute
    top: 35px
    width: 100%
    z-index: 10
    background: #fff
    border: 1px solid rgb(190, 200, 216)
    .list_item
      padding: 4px 10px
      &:last-child
        border-top: 1px solid rgb(235, 238, 243)
        text-align: right
    a
      display: block
    .list_close-button
      padding: 1px
      background: none
      border: 0

  
  .user-map
    margin-top: 1rem
    width: 100%
    height: calc(100vh - 18rem)
    padding: 5px 1rem
    border-radius: 0.5rem
    border: 0.5px solid #ccc

  .confirm-button
    display: block
    margin: 2rem auto
    +action-button(5rem, 3rem)

</style>