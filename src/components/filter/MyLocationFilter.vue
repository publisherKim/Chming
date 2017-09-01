<template lang="pug">
  .mylocation-container
    filter-header(filter="myLocation" :selectedRadius="selectedRadius")
    .mylocation_header-wrap
      h2 내 위치에서 검색 반경 선택
    .mylocation_content-wrap
      button(
        v-for="radiusItem in radiusItems"
        :class="{'is-active': radiusItem === selectedRadius}"
        @click="setSelectedRadius(radiusItem)"
        type="button"
      ) {{radiusItem}}
</template>

<script>
  import FilterHeader from '@/components/filter/Header';
  import {mapGetters} from 'vuex';

  export default {
    created() {
      this.selectedRadius = this.radius;
    },
    components: {
      FilterHeader
    },
    data() {
      return {
        radiusItems: ['500m', '1km', '1.5km'],
        selectedRadius: null,
      };
    },
    methods: {
      setSelectedRadius(radiusItem) {
        this.selectedRadius = radiusItem;
      },
    },
    computed: {
      ...mapGetters(['radius']),
    },
  };
</script>

<style lang="sass" scoped>
  @import "~chming"

  $mylocation-header-height: 40px
  
  .mylocation-container
    width: 100%
    background: $filter-panel-background-color
    text-align: center
    h2
      line-height: $mylocation-header-height
      font-size: 1.5rem
      text-align: center
    span
      display: block
  .mylocation_header-wrap
    line-height: $mylocation-header-height
    width: 95%
    margin: 0 auto
    border-bottom: 0.5px solid $base-theme-color
  .mylocation_content-wrap
    // padding: 5px 0
    padding: 1.3rem 0
    button
      +rounded-rect-button(8rem)
      &:hover, &.is-active
        +rounded-rect-button-active()
      &:not(:last-child)
        margin-right: 2rem
</style>