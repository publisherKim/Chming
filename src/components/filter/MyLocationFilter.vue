<template lang="pug">
  .mylocation-container
    filter-header(filter="myLocation")
    .mylocation_header-wrap
      h2 내 위치에서 검색 반경 선택
    .mylocation_content-wrap
      button.is-active(type="button" @click="") 500m
      button(type="button" @click="") 1km
      button(type="button" @click="") 1.5km
      //- span(aria-label="반경") 500m
      //- .range-slider slider
</template>

<script>
  import FilterHeader from '@/components/filter/Header';

  export default {
    components: {
      FilterHeader
    },
  };
</script>

<style lang="sass" scoped>
  @import "~chming"

  $mylocation-header-height: 40px
  
  .mylocation-container
    width: 100%
    z-index: 10
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