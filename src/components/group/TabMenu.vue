<template lang="pug">
  ul.tab-menu-list
    li
      button(
        @click="changeRoute({name: 'group_info_home', params: {id: groupId}})" 
        :class="{'is-active': routeName === 'group_info_home'}" 
        type="button"
      ) 정보
    li
      button(
        @click="changeRoute({name: 'group_info_board', params: {id: groupId}})" 
        :class="{'is-active': routeName === 'group_info_board'}" 
        type="button"
      ) 게시판
    li
      button(
        @click="changeRoute({name: 'group_info_album', params: {id: groupId}})" 
        :class="{'is-active': routeName ==='group_info_album'}" 
        type="button"
      ) 사진첩    
</template>

<script>
  export default {
    computed:{
      routeName(){
        return this.$route.name;
      },
      groupId() {
        return this.$route.params.id;
      },
    },
    methods: {
      changeRoute(route) {
        this.$router.push(route);
      }
    }
  };
</script>

<style lang="sass" scoped>
  @import "~chming"

  .tab-menu-list
    height: 4rem
    +action-active()
    li
      text-align: center
    button
      display: block
      padding: 0
      width: 100%
      height: 4rem
      color: $group-tab-color
      font-weight: bold
      border: none
      background: none
      &:hover, &.is-active
        +is-active()
        border: solid 1px #ccc

  +mobile()
    .tab-menu-list
      +container()
      li
        +span(3 of 9 nest)

  +desktop()
    .tab-menu-list
      +container()
      li
        +span(3 of 9 nest)
</style>