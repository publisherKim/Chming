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
</template>

<script>
  import LocationList from './LocationList';

  export default {
    data() {  
      return {
        locationListActive: '',
      };
    },
    components: {
      LocationList,
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
  .header-wrap
    +container()
    width: calc(100% - 10px)
  .title
  // current-location
  .current-location-wrap 
    +span(isolate 3 at 1)
    h2
      font-size: 14px
      margin: 0px
    .select-location
      background: none
      border: 0
      font-size: 1.2rem
  // search-keyword-wrap
  .search-keyword-wrap
    +span(isolate 5 at 4)
    input
      display: inline-block
      width : span( 3 of 5)
    button
      margin-left: 10px
  
</style>