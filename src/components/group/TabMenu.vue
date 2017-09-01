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
        @click="changeGroupTab({name: 'group_info_board', params: {id: groupId}})" 
        :class="{'is-active': routeName === 'group_info_board'}" 
        type="button"
      ) 게시판
    li
      button(
        @click="changeGroupTab({name: 'group_info_album', params: {id: groupId}})" 
        :class="{'is-active': routeName ==='group_info_album'}" 
        type="button"
      ) 사진첩
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex';

  export default {
    created() {
      this.getMembers();
    },
    data() {
      return {
        authorId: null,
        groupInfo: {},
      };
    },
    computed:{
      ...mapGetters(['url', 'userInfo', 'validateMessage']),
      routeName(){
        return this.$route.name;
      },
      groupId() {
        return this.$route.params.id;
      },
      isAuthorized() {
        return this.isMember || this.isAuthor;
      },
      isAuthor() {
        let userInfo = this.userInfo;
        if(userInfo) {
          return this.groupInfo.author.pk === this.userInfo.pk;
        }
        return false;
      },
      isMember() {
        let userInfo = this.userInfo;
        if(userInfo) {
          return this.groupInfo.members.some(member => {
            return member.pk === this.userInfo.pk;
          });
        }
        return false;
      },
    },
    methods: {
      ...mapMutations(['setIsLoading', 'setToastMessage', 'setIsAuthor']),
      changeRoute(route) {
        this.$router.push(route);
      },
      changeGroupTab(route){
        if(!this.isAuthorized) return this.setToastMessage(this.validateMessage.GROUP_ACCESS);
        this.changeRoute(route);
      },
      getMembers() {
        let url = this.url.GROUP_DETAIL + this.groupId + '/';
        this.setIsLoading(true);
        this.$http.get(url)
          .then(response => {
            if(response.status === 200) {
              this.groupInfo = response.data;
              this.checkAuthorization();
              this.setIsAuthor(this.isAuthor);
            }
          })
          .catch(error => {
            console.log('error:', error.response);
          })
          .finally(() => {
            this.setIsLoading(false);
          });     
      },
      checkAuthorization() {
        (this.routeName !== 'group_info_home' && !this.isAuthorized) &&
            this.changeRoute({name: 'group_info_home', params: {id: this.groupId}});
      },
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