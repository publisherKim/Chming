<template lang="pug">
  .mylocation-container
    .mylocation_header-wrap
      h2 내 위치에서 검색 반경 선택
    .mylocation_content-wrap
      span(aria-label="반경") 500m
      .range-slider slider
</template>

<script>
export default {
  
};
</script>

<style lang="sass" scoped>
  @import "~chming"

  $mylocation-header-height: 40px
  
  .mylocation-container
    width: 100%
    z-index: 10
    background: #fff
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
    border-bottom: 1px solid #000
  .mylocation_content-wrap
    padding: 5px 0
</style>