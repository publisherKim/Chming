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
    padding: 1rem 0
    background: #e1e1e1
    li
      text-align: center
    button
      min-width: 8rem
      border: none
      background: none
    button:hover
      color: #fff
      background: #000
  +mobile()
    .tab-menu-list
      +container()
      li
        +span(3 of 9)
</style>