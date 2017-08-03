<template lang="pug">
  .header-wrap
    .current-location-wrap
      form
        h2 지금 보고있는 지역은
        button.select-location(
          type="button"
          @click="viewLocationList"
        ) 서현/야탑
    .search-keyword-wrap
      form
        label(for="keyword")
          input(type="text" id="keyword")
          button(type="button") 검색
    div(:is="locationListActive")
    Menu
</template>

<script>
  import LocationList from './LocationList';
  import Menu from '@/components/common/Menu';

  export default {
    data() {  
      return {
        locationListActive: '',
      };
    },
    components: {
      LocationList,
      Menu
    },
    methods: {
      viewLocationList() {
        if(this.locationListActive === '') this.locationListActive = 'location-list';
        else this.locationListActive = '';
      },
    },
  };
</script>

<style lang="sass" scoped>
  @import "~chming"
  
  +mobile
    .header-wrap
      +clearfix
      +container()
    .title
    // current-location
    .current-location-wrap
      float: left
      h2
        font-size: 14px
        margin: 0px
      .select-location
        background: none
        border: 0
        font-size: 1.2rem
    // search-keyword-wrap
    .search-keyword-wrap
      float: left
      width: calc(100% - 15rem)
      position: relative
      input
        width: calc(100% - 5rem)
        margin-left: 0.5rem
        display: inline-block
      button
        position: absolute
        top: 0 
        right: 0
  
</style>