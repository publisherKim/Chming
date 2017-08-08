<template lang="pug">
  .sort-filter-container
    .sort-filter_header-wrap
      h2 정렬
    .sort-filter_content-wrap
      button(type="button" @click="") 거리순
      button(type="button" @click="") 인원순
    
</template>

<script>
export default {
  name: 'sortFilter',
  data() {
    return {

    };
  },
  methods: {

  },
};
</script>

<style lang="sass" scoped>
  @import "~chming"

  $sort-header-height: 40px
  
  .sort-filter-container
    width: 100%
    z-index: 10
    background: #fff
    text-align: center
  .sort-filter_header-wrap
    width: 95%
    margin: 0 auto
    border-bottom: 1px solid #000
    h2
      line-height: $sort-header-height
      font-size: 1.5rem
      text-align: center
  .sort-filter_content-wrap
    padding: 10px 0
    button
      +rounded-rect-button(8rem)
      &:not(:last-child)
        margin-right: 2rem
</style>