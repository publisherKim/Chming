<template lang="pug">
  .main-container
    loading-modal
    main-header
    main-filter
    main-map.main-map
    group-list-slider.slider
</template>

<script>
  import LoadingModal from '@/components/common/LoadingModal';
  import MainHeader from '@/components/common/Header';
  import MainFilter from '@/components/filter/Filter';
  import MainMap from '@/components/common/Map';
  import GroupListSlider from '@/components/main/GroupListSlider';
  import {mapMutations, mapActions} from 'vuex';

  let watchPosition = window.navigator.geolocation.watchPosition;

  export default {
    beforeRouteLeave (to, from, next) {
      this.setActiveFilter(null);
      next();
    },
    mounted() {
      // let watchID = navigator.geolocation.watchPosition(function(position) {
        // console.log(position.coords.latitude, position.coords.longitude);

        // map.setCenter(new Vue.maps.LatLng(37.508352837, 127.0307565127));
      // });
      this.getGroupList();
    },
    name: 'Main',
    components: {
      LoadingModal,
      MainMap,
      MainFilter,
      MainHeader,
      GroupListSlider,
    },
    methods: {
      ...mapActions(['getGroupList']),
      ...mapMutations(['setMyLocation', 'setActiveFilter']),
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
  @import "~chming"

  +mobile
    $header-height-px: rem-to-px($mobile-base-root-font-size, $mobile-main-header-container-height)
    $filter-height-px: rem-to-px($mobile-base-root-font-size, $mobile-filter-container-height)
    $header-filter-height: $header-height-px + $filter-height-px
    .main-map
      +container()
      height: calc(100vh - #{$header-filter-height})
  +desktop
    $header-height-px: rem-to-px($desktop-base-root-font-size, $desktop-main-header-container-height)
    $filter-height-px: rem-to-px($desktop-base-root-font-size, $desktop-filter-container-height)
    $header-filter-height: $header-height-px + $filter-height-px
    .main-map
      +container()
      height: calc(100vh - #{$header-filter-height})
</style>