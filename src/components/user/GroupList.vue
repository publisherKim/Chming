<template lang="pug">
  .group-list-container
    main-header
    div(v-if="isMyGroupList && !isEmptyOpenGroups")
      h2 내가 개설한 모임
      ul.group-list
        li.list_item(v-for="group in userInfo.open_groups")
          .group-info_wrap
            .group-image_wrap
              img(:src="group.image", alt="group.name")
            a.group-description_link(href @click.prevent="changeRoute(group.pk)")
              span.group_name(aria-label="모임명") {{group.name}}
              span.group_description(aria-label="모임 설명") {{group.description}}
              span.group_member(aria-label="모임멤버") 모임멤버 {{group.member_count}}명
              hobby-icon.group_hobby-icon(:hobby="group.hobby" :title="group.hobby")
    h2 {{title}}
    ul.group-list
      li.list_item(v-for="group in groupList")
        .group-info_wrap
          .group-image_wrap
            img(:src="group.image", alt="group.name")
          a.group-description_link(href @click.prevent="changeRoute(group.pk)")
            span.group_name(aria-label="모임명") {{group.name}}
            span.group_description(aria-label="모임 설명") {{group.description}}
            span.group_member(aria-label="모임멤버") 모임멤버 {{group.member_count}}명
            hobby-icon.group_hobby-icon(:hobby="group.hobby"  :title="group.hobby")
</template>

<script>
  import MainHeader from '@/components/common/Header';
  import HobbyIcon from '@/components/common/HobbyIcon';
  import {mapGetters} from 'vuex';

  export default {
    components: {
      MainHeader,
      HobbyIcon,
    },
    created() {
      this.isMyGroupList && (this.title = '내가 가입한 모임');
      this.isLikeGroupList && (this.title = '내가 좋아요한 모임');
    },
    data() {
      return {
        title: '',
      };
    },
    computed: {
      ...mapGetters(['userInfo']),
      isMyGroupList() {
        return this.$route.name === 'user_myGroupList';
      },
      isLikeGroupList() {
        return this.$route.name === 'user_myLikeGroupList';
      },
      isEmptyOpenGroups() {
        let userInfo = this.userInfo;
        if(userInfo) {
          return userInfo.open_groups.length === 0;
        }
        return true;
      },
      groupList() {
        let userInfo = this.userInfo;
        if(userInfo) {
          return this.isMyGroupList ? userInfo.joined_groups : userInfo.like_groups;
        }
        return [];
      },
    },
    methods: {
      changeRoute(id) {
        this.$router.push({name: 'group_info_home', params: {id}});
      },
    },
  };
</script>



<style lang="sass" scoped>
  @import "~chming"
  
  $list-item-height: 8rem

  .group-list-container
    background: $my-group-list-background-color

  h2
    line-height: 3rem
    font-size: 1.5rem
    +side-space
    color: $my-group-header-color
    background: $my-group-header-background-color

  .group-info_wrap
    position: relative
    width: 100%
    height: 100%
    padding: 0 1rem
    +clearfix
    
  .list_item
    height: $list-item-height
    padding: 3px 0
    border-bottom: 0.5px solid $my-group-list-border-color

  .group-image_wrap
    overflow: hidden
    float: left
    overflow: hidden
    position: relative
    height: 100%
    // +align-vertical-middle
    width: $list-item-height
    text-align: center
    img
      position: relative
      height: 80%
      +align-center
      // +align-vertical-middle

  .group-description_link
    float: left
    position: relative
    +align-vertical-middle
    width: calc(100% - #{$list-item-height} - 3rem)
    margin-left: 1rem
    padding-right: 2.5rem
    span
      display: block
      +fit-text-in-box
    .group_name
      font-size: 1.5rem
      font-weight: bold
    .group_description,
    .group_member
      font-size: 1.3rem
    .group_hobby-icon
      position: absolute
      top: 0
      right: 0
    &:hover
      text-decoration: none
  
</style>