<template lang="pug">
  .main-container
    main-header
    main-filter
    main-map.main-map
    button.search(v-if="isMapMoving" @click="searchThisLocation") 이 지역 검색하기
    group-list-slider.slider
</template>

<script>
  import MainHeader from '@/components/common/Header';
  import MainFilter from '@/components/filter/Filter';
  import MainMap from '@/components/common/Map';
  import GroupListSlider from '@/components/main/GroupListSlider';
  import Vue from 'vue';
  import {mapGetters, mapMutations, mapActions} from 'vuex';

  export default {
    beforeRouteLeave(to, from, next) {
      this.setActiveFilter(null);
      next();
    },
    created() {
      !this.isInitialized && this.initialize();
    },
    mounted() {
      this.getGroupList();
    },
    name: 'Main',
    components: {
      MainMap,
      MainFilter,
      MainHeader,
      GroupListSlider,
    },
    methods: {
      ...mapActions(['getGroupList', 'initialize']),
      ...mapMutations(['setActiveFilter', 'setLocation', 'setMarkerCluster']),

      searchThisLocation() {
        this.getGroupListInCurrentLocation(this.center);
      },
      getGroupListInCurrentLocation(position) {
        let geocoder = Vue.maps.getGeocoder();

        let lat = position.getLat();
        let lng = position.getLng();
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
      },
    },
    computed: {
      ...mapGetters(['isMapMoving', 'activeFilter', 'center', 'isInitialized']),
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
  @import "~chming"
  .main-container
    position: relative

  .main-map
    +container()
    height: calc(100vh - #{$main-header-container-height} - #{$filter-container-height})
    
  .search
    position: absolute
    z-index: 30
    bottom: 3rem
    background: $base-theme-color
    color: $base-theme-color2
    border: 0
    border-radius: 2px
    padding: 0.5rem 1rem
    +align-horizontal-middle

</style>