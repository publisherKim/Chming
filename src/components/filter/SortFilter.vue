<template lang="pug">
  .sort-filter-container
    h2 정렬
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
  
  +mobile
    .sort-filter-wrap
      +container()
      width: 100%
      z-index: 10
      background: #fff
      text-align: center
      h2
        font-size: 1.4rem
        text-align: center
      button
        background: none
        border: 1px solid #000
        border-radius: 1rem
        font-size: 1.2rem
        padding: 3px 5px
        &:not(:last-child)
          margin-right: 5px
</style>