<template lang="pug">
  .sort-filter-container
    choice-header      
    .sort-filter_header-wrap
      h2 정렬
    .sort-filter_content-wrap
      button.is-active(type="button" @click="") 거리순
      button(type="button" @click="") 인원순
    
</template>

<script>
  import ChoiceHeader from '@/components/filter/ChoiceHeader';

  export default {
    name: 'sortFilter',
    components: {
      ChoiceHeader
    },
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
    border-bottom: 0.5px solid $base-theme-color
    h2
      text-align: center
      font-size: 1.5rem
      color: $base-theme-color
      line-height: $sort-header-height
          
  .sort-filter_content-wrap
    padding: 1.3rem 0
    button
      +rounded-rect-button(8rem)
      &:hover, &.is-active
        +rounded-rect-button-active()
      &:not(:last-child)
        margin-right: 2rem
    .is-active
      color: #fff
      background: $base-theme-color
      border: 0
</style>