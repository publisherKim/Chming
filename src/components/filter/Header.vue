<template lang="pug">
  .filter-header-container
    button.header_cancel-button(type="button" @click="setActiveFilter(null)") 취소
    button.header_apply-button(type="button" @click="") 적용
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex';

  export default {
    methods: {
      ...mapMutations(['setActiveFilter']),
    },
    computed: {
      ...mapGetters(['activeFilter']),
    },
  };
</script>

<style lang="sass" scoped>
  @import "~chming"

  .filter-header-container
    display: block
    height: 3rem
    background: $filter-panel-header-background-color
    +clearfix
    button
      position: relative
      padding: 3px 0
      color: $filter-panel-header-color
      background: none
      border: 0
      +align-vertical-middle
    .header_cancel-button
      float: left
      margin-left: 2rem
    .header_apply-button
      float: right
      margin-right: 2rem

</style>