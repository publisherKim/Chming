<template lang="pug">
  .header-container
    h1.header_title
      a(href @click.prevent="changeRoute({name: 'main'})")
        img.header_logo-image(src="../../assets/logo.svg" alt="취밍")
    form.header_search-form(autocomplete="off")
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
        this.$router.push(route);
      },
    },
  };
</script>

<style lang="sass" scoped>
  @import "~chming"

  $img-width: 2.3rem
  $side-space: 2rem

  .header-container
    position: relative
    background: $main-header-background-color
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
      width: calc(100% - 6.3rem)
      padding-left: 1rem
      margin: 0 $side-space
      vertical-align: top
      line-height: 3rem
      border: none
    i
      color: $main-header-icon-color
    button
      display: inline-block
      background: none
      border: none
      font-size: 2rem
      line-height: 3rem

  +mobile()
    .header-container
      height: $mobile-main-header-container-height
  +desktop()
    .header-container
      height: $desktop-main-header-container-height
</style>