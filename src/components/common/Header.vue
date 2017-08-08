<template lang="pug">
  .header-container
    h1.header_title
      a(href @click.prevent="changeRoute('main')")
        img.header_logo-image(src="../../assets/logo.svg" alt="취밍")
    form.header_search-form
      input(type="text" id="keyword" placeholder="지역, 모임 또는 관심사")
      button.search-form_button(type="submit" aria-label="검색")
        i.fa.fa-search(aria-hidden='true')
    main-menu
</template>

<script>
  import MainMenu from '@/components/common/Menu';

  export default {
    data() {  
      return {
      };
    },
    components: {
      MainMenu,
    },
    methods: {
      changeRoute(route) {
        this.$router.push({name: route});
      },
    },
  };
</script>

<style lang="sass" scoped>
  @import "~chming"

  $img-width: 2.3rem
  $side-space: 2rem
  $filter-container-height: 50px

  .header-container
    position: relative
    height: $filter-container-height
  .header_title
    position: absolute
    +align-vertical-middle()   
    left: $side-space
    display: inline-block
    line-height: 1rem
    a
      display: inline-block
    img
      width: $img-width
      height: 3rem

  .header_search-form
    +align-vertical-middle()
    position: absolute
    margin-left: $img-width + $side-space
    width: calc(100% - 9.7rem)
    height: 3rem
    input
      display: inline-block
      width: calc(100% - 2rem)
      padding: 0 $side-space
      vertical-align: top
      line-height: 3rem
      border: none
    i
      color: $base-theme-color
    button
      display: inline-block
      background: none
      border: none
      font-size: 2rem
      line-height: 3rem

  +desktop()
    .header-container
      height: $filter-container-height + 10px
</style>