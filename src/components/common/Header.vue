<template lang="pug">
  .header-container
    h1.header-title
      a(href @click.prevent="changeRoute({name: 'main'})")
        img.header_logo-image(src="../../assets/logo/logo_mobile.svg" alt="취밍")
    form.header_search-form(autocomplete="off")
      select(v-model="searchType" aria-label="검색 조건")
        option(value='all') 통합
        option(value='address') 지역
        option(value='group') 모임명
        option(value='hobby') 관심사
      input(v-model.trim="searchString" type="text" aria-label="검색 필드" placeholder="지역, 모임 또는 관심사")
      button.search-form_button(@click.prevent="search" aria-label="검색")
        i.fa.fa-search(aria-hidden='true')
    main-menu.menu-container
</template>

<script>
  import MainMenu from '@/components/common/Menu';
  import {mapMutations, mapActions} from 'vuex';

  export default {
    data() {  
      return {
        searchString: '',
        searchType: 'all',
      };
    },
    components: {
      MainMenu,
    },
    computed: {
      isRouteMain() {
        return this.$route.name === 'main';
      },
    },
    methods: {
      ...mapMutations(['setIsLoading', 'setToastMessage']),
      ...mapActions(['searchGroups']),
      changeRoute(route) {
        this.$router.push(route);
      },
      search() {
        if(this.searchString === '') {
          this.setToastMessage('검색어를 입력해주세요.');
          return;
        }

        !this.isRouteMain && this.changeRoute({name: 'main'});

        this.searchGroups({
          search: this.searchString,
          search_type: this.searchType,
        });
      },
    },
  };
</script>

<style lang="sass" scoped>
  @import "~chming"

  $img-width: 3.3rem
  $side-space: 2rem
  $icon-width: 2rem

  .header-container
    position: relative
    background: $main-header-background-color
    height: $main-header-container-height
    
  .header-title
    margin-left: $side-space
    float: left
    height: 100%
    a
      position: relative
      top: 50%
      transform: translateY(-50%)
      display: block
    img
      position: relative
      display: block
      width: $img-width
      border: 0

  .header_search-form
    position: relative
    float: left
    width: calc(100% - 10.3rem)
    height: 100%
    select
      position: absolute
      +align-vertical-middle
      left: 2rem
      width: 5.5rem
      z-index: 10
      font-size: 1.2rem
      color: inherit
      border: 0
      border-right: 1px solid #ccc
      background: none
    input
      position: relative
      +align-vertical-middle
      width: calc(100% - 5rem)
      padding-left: 6.5rem
      margin-left: 1.5rem
      height: 3rem
      vertical-align: top
      border: 1px solid $base-theme-color
    .search-form_button
      position: relative
      top: 50%
      transform: translateY(-50%)
      margin-left: 0.5rem
      padding: 0 0.5rem
      display: inline-block
      width: $icon-width
      background: none
      border: none
      font-size: 2rem
      i
        display: block
        width: $icon-width
        color: $main-header-icon-color
  
  .menu-container
    position: relative
    top: 50%
    transform: translateY(-50%)  
    display: inline-block
    width: $icon-width
    margin-left: 1.5rem
    font-size: 2rem
   
</style>