<template lang="pug">
  ul.tab-menu-list
    li
      button(@click="changeRoute('/group/info/1')" type="button") 정보
    li
      button(@click="changeRoute('/group/board/1')" type="button") 게시판
    li
      button(@click="changeRoute('/group/album/1')" type="button") 사진첩    
</template>

<script>
  export default {
    data() {  
      return {
      };
    },
    methods: {
      changeRoute(name) {
        this.$router.push(name);
      }
    }
  };
</script>

<style lang="sass" scoped>
  @import "~chming"


  .tab-menu-list
    height: 40px
    +action-active()
    li
      text-align: center
    button
      padding: 1rem 0
      min-width: 8rem
      font-weight: bold
      border: none
      background: none
    button:hover
      +is-active()

  +mobile()
    .tab-menu-list
      +container()
      li
        +span(3 of 9)
</style>