<template lang="pug">
  .filter-container
    .location-filter-wrap
      .location-filter
        h2 지금 보고있는 지역은
        button(
          @click="viewFilter('location')"
          type="button"
          aria-label="지역기반 모임 검색"
        ) {{location.level2}} &dtrif;
      .filter-button-wrap
        //- button.sort-button(@click="viewFilter('sort')" type="button") {{sort}} &dtrif;
        button.sort-button(
          @click="viewFilter('sort')"
          type="button"
          aria-label="모임 정렬(거리순, 인원순, 좋아요순)"
        ) {{sort}} &dtrif;
        button.hobby-button(
          @click="viewFilter('hobby')"
          :class="{'is-active': hobby.length !== 0}"
          type="button"
          arai-label="관심사 기반 모임 검색"
        ) 관심사 &dtrif;
        button.mylocation-button(
          @click="searchAroundMyLocation"
          type="button"
          aria-label="내 주변 모임 검색"
        )
          i.fa.fa-street-view(aria-hidden='true')
    .filter(ref="filter" :is="activeFilter")
</template>

<script>
  import Vue from 'vue';
  import SortFilter from '@/components/filter/SortFilter';
  import HobbyFilter from '@/components/filter/HobbyFilter';
  import MylocationFilter from '@/components/filter/MylocationFilter';
  import LocationFilter from '@/components/filter/LocationFilter';
  import {mapMutations, mapGetters, mapActions} from 'vuex';

  export default {
    components: {
      SortFilter,
      HobbyFilter,
      MylocationFilter,
      LocationFilter,
    },
    methods: {
      ...mapActions(['getGroupList']),
      ...mapMutations(['setActiveFilter', 'setLocation']),
      viewFilter(filter) {
        this.setActiveFilter(filter + '-filter');

        // 현재 Active된 Filter를 다시 한번 클릭 했을 때의 처리
        let refFilter = this.$refs.filter;
        refFilter && (refFilter.$options._componentTag.indexOf(filter) === 0) && this.setActiveFilter(null);
      },
      searchAroundMyLocation() {
        let watchPosition = window.navigator.geolocation.watchPosition;
        let watchID = navigator.geolocation.watchPosition(position => {
          let coords = position.coords;
          let geocoder = Vue.maps.getGeocoder();
          let lat = coords.latitude;
          let lng = coords.longitude;
          geocoder.coord2RegionCode(lng, lat, (result, status) => {
            if(status === Vue.maps.services.Status.OK) {
              this.setLocation({
                level2: result[0].region_3depth_name,
                lat,
                lng
              });
              this.getGroupList();
            }   
          });
        });
      },
    },
    computed: {
      ...mapGetters(['activeFilter', 'location', 'sort', 'hobby']),
    },
  };
</script>

<style lang="sass" scoped>
  @import "~chming"

  .filter-container
    height: $filter-container-height
    background: $filter-background-color

  .location-filter-wrap
    position: relative
    padding: 0 2rem
    height: 100%
    .location-filter
      position: absolute
      +align-vertical-middle
      display: inline-block
      button
        font-size: 1.5rem
        font-weight: bold
    h2
      color: $filter-color
      font-size: 1.1rem
      font-weight: normal
    button
      color: $filter-color
      background: none
      border: 0
    .mylocation-button
      position: absolute
      right: 0
      z-index: 10
      background: #fff
      padding: 0 7px
      line-height: 3rem
      font-size: 1.7rem
      border-radius: 3px

  .filter-button-wrap
    position: absolute
    right: 0
    height: 100%
    font-weight: normal
    button
      border: 0

  .sort-button,
  .hobby-button
    position: relative
    +align-vertical-middle
    margin-left: 1rem
    font-size: 1.3rem
    background: none
    &:hover
      text-decoration: underline
    &.is-active
      color: $base-theme-color3

  .filter
    position: absolute
    bottom: 0
    left: 0
    z-index: 40

  .sort-filter_content-wrap button,
  .hobby_list label
      color: $base-theme-color

  +mobile
    .filter-button-wrap
      margin-right: 2rem
    .mylocation-button
      top: $filter-container-height + 1.5rem
  +desktop
    .mylocation-button
      top: $filter-container-height + 2rem
    .filter-button-wrap
      margin-right: 2rem
</style>