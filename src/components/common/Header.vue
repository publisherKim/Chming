<template lang="pug">
  .header-container
    h1.header_title
      a(href="/")
        img.header_logo-image(src="../../assets/logo.svg" alt="취밍")
    form.header_search-form
      input(type="text" id="keyword" placeholder="지역, 모임 또는 관심사")
      button.search-form_button(type="submit" aria-label="검색")
        i.fa.fa-search(aria-hidden='true')
    main-menu.header_menu-wrap
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
  };
</script>

<style lang="sass" scoped>
  @import "~chming"

  $search-input-width: 97%
  
  .header-container
    height: 50px
  .header_title
    height: 100%
    text-align: right
    a
      display: block
      height: 100%
      width: 100%
    .header_logo-image
      position: relative
      +align-vertical-middle
      display: inline-block
      height: 60%
  .header_search-form
    position: relative
    height: 100%
    padding-left: 1rem
    font-size: 1.7rem
    line-height: 50px
    input
      position: absolute
      +align-vertical-middle
      display: block
      width: $search-input-width
      height: 60%
      padding-left: 1rem
      border-radius: 0.5rem
      border: 0.5px solid #999
      box-shadow: 1px 1px 3px #888888
  .search-form_button
    position: absolute
    +align-vertical-middle
    right: calc(100% - #{$search-input-width})
    background: none
    border: 0
    color: #666
    text-align: right
  .header_menu-wrap
    height: 100%

  +mobile()
    .header-container
      +container()
    .header_title
      +span(1 of 8)
    .header_search-form
      +span(6 of 8)
    .header_menu-wrap
      +span(1 of 8)
  
</style>