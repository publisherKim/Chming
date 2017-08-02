<template lang="pug">
  .header-wrap
    .current-location-wrap
      form
        h2 지금 보고있는 지역은
        button(type="button") 서현/야탑
    .search-keyword-wrap
      form
        label(for="keyword")
          input(type="text" id="keyword")
          button(type="button") 검색
</template>

<script>
  export default {
    data() {  
      return {};
    },
  };
</script>

<style lang="sass" scoped>
  @import "~chming"
  .header-wrap
    +container()
    width: calc(100% - 10px)
  .title
    aldfljf
  // current-location
  .current-location-wrap 
    +span(isolate 3 at 1)
    h2
      font-size: 14px
      margin: 0px

  // search-keyword-wrap
  .search-keyword-wrap
    +span(isolate 5 at 4)
    input
      display: inline-block
      width : span( 3 of 5)
    button
      margin-left: 10px
  // c  
</style>