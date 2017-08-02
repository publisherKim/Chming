<template lang="pug">
  .sort-filter-wrap
    h2 정렬
    button(
      type="button"
      @click=""
    ) 거리순
    button(
      type="button"
      @click=""
    ) 인원순
    
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
  .sort-filter-wrap
    z-index: 10
    background: #fff
    h2
      text-align: center
    button
      background: none
      border: 1px solid #000
      border-radius: 1rem
      font-size: 1.2rem
      padding: 3px 5px
</style>