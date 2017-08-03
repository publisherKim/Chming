<template lang="pug">
  .header-wrap
    h1.header-logo
      a(href="/")
        img(src="../../assets/logo.png" alt="취밍")
    .current-location-wrap 
      h2 지금 보고있는 지역은
      button.select-location(
        type="button"
        @click="viewLocationList"
      ) 서현/야탑
    form.search-form
      label(for="keyword")
        input(type="text" id="keyword")
        button(type="submit") O
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
  
  +mobile
    .header-wrap
      +container()
      
    .header-logo
      display: inline-block
      width: 30px
      vertical-align: top
      margin: 0
      img
        width: 100%
    .current-location-wrap
      display: inline-block
      width: 100px
      vertical-align: top
      // background: red
      h2
        font-size: 10px
        margin: 0px
      .select-location
        background: none
        border: 0
        font-size: 1.2rem
    // search-keyword-wrap
    .search-form
      display: inline-block
      width: calc(100% - 130px)
      vertical-align: top
      // background: blue
      input
        font-size: inherit
        width: calc(100% - 40px)
        height: 30px
        display: inline-block
      button
        width: 30px
        height: 30px
        margin-left: 10px
  
</style>