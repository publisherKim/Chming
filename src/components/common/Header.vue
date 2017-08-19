<template lang="pug">
  .header-container
    h1.header_title
      a(href @click.prevent="changeRoute({name: 'main'})")
        img.header_logo-image(src="../../assets/logo.svg" alt="취밍")
    form.header_search-form(autocomplete="off")
      input(v-model.trim="searchString" type="text" id="search" placeholder="지역, 모임 또는 관심사")
      select(v-model="searchType" aria-label="검색 조건")
        option(value='all') 전체
        option(value='address') 지역
        option(value='group') 모임
        option(value='hobby') 관심사
      button.search-form_button(@click.prevent="search" aria-label="검색")
        i.fa.fa-search(aria-hidden='true')
    main-menu
</template>

<script>
  import MainMenu from '@/components/common/Menu';
  import { mapGetters, mapMutations } from 'vuex';

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
    methods: {
      ...mapMutations(['setIsLoading']),
      changeRoute(route) {
        this.$router.push(route);
      },
      search() {
        if(this.searchString === '') {
          alert('검색어를 입력해주세요');
          return;
        }

        this.setIsLoading(true);
        this.$http.get(this.url.GROUP_SEARCH, {
          params: {
            search: this.searchString,
            search_type: 'group',
          },
        })
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log('error:', error);
            console.log('error.response:', error.response);
          })
          .finally(() => {
            this.setIsLoading(false);
          });
      },
    },
    computed: {
      ...mapGetters(['url']),
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
    height: $main-header-container-height
    
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

</style>