<template lang="pug">
  .mylocation-filter-container
    h2 내 위치에서 검색 반경 선택
    span 500m
    .range-slider slider
</template>

<script>
export default {
  
};
</script>

<style lang="sass" scoped>
  @import "~chming"
  
  +mobile
    .mylocation-filter-container
      z-index: 10
      background: #fff
      text-align: center
      h2
        margin: 0
      span
        display: block
</style>