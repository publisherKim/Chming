<template lang="pug">
  .main-container
    main-header
    main-filter
    main-map.main-map
    group-list-slider.slider
</template>

<script>
import MainHeader from '@/components/common/Header';
import MainFilter from '@/components/filter/Filter';
import MainMap from '@/components/common/Map';
import GroupListSlider from '@/components/main/GroupListSlider';

export default {
  name: 'Main',
  components: {
    MainMap,
    MainFilter,
    MainHeader,
    GroupListSlider,
  },
  data() {
    return {

    };
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