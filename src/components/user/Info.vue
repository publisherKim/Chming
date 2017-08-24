<template lang="pug">
  .user-info-container
    .user-info_profile
      .profile-image-wrap
        img(
          ref="profile_image"
          @load="fitImageSize"
          :src="userImage" 
          :alt="_userInfo.username"
        )
      .profile-wrap
        span.profile_name(aria-label="이름") {{_userInfo.username}}
        span.profile_birth(aria-label="생년월일") {{userBirth}}
        span.profile_location(aria-label="주소")
          i.fa.fa-map-marker(aria-hidden="true")
          | {{_userInfo.address}}
        ul.hobby_list
          li.list-item(v-for="hobby in _userInfo.hobby")
            hobby-icon(:hobby="hobby" :title="hobby")
    ul.user-info_list
      li.list_menu
        a(href @click.prevent="changeRoute({name: 'main'})") 홈
      li.list_menu
        a(href @click.prevent="changeRoute({name: 'user_edit'})") 정보수정
      li.list_menu
        a(href @click.prevent="changeRoute({name: 'user_myGroupList'})") 내모임
      li.list_menu
        a(href @click.prevent="changeRoute({name: 'user_myLikeGroupList'})") 관심모임
      li.list_menu
        a(href @click.prevent="changeRoute({name: 'group_create'})") 모임개설
      li.list_menu
        a(href @click.prevent="logout") 로그아웃
    back-button(:route={name: 'main'})
</template>

<script>
  import BackButton from '@/components/common/BackButton';
  import {mapGetters, mapActions} from 'vuex';
  import HobbyIcon from '@/components/common/HobbyIcon';

  export default {
    beforeRouteEnter (to, from, next) {
      let token = sessionStorage.getItem('token');
      !token && next({name: 'main'});
      token && next();
    },
    components: {
      BackButton,
      HobbyIcon,
    },
    methods: {
      ...mapActions(['logout']),
      changeRoute(route) {
        this.$router.push(route);
      },
      fitImageSize(index) {
        const img = this.$refs.profile_image;
        let bigWidth = img.width - img.height > 0;
        if(!bigWidth) {
          img.classList.add('fit-width');
        }
      }
    },
    computed: {
      ...mapGetters(['userInfo']),
      userBirth() {
        let userInfo = this._userInfo;
        if(this.userInfo) {
          return `${userInfo.birth_year}.${userInfo.birth_month}.${userInfo.birth_day}`;
        }
      },
      userImage() {
        let userInfo = this._userInfo;
        return userInfo.profile_img;
      },
      _userInfo() {
        if(this.userInfo) return this.userInfo;
        else return {};
      },
    },
    watch: {
      userInfo(newVal) {
        // userInfo 값이 바뀌었을 때(로그인 후 유저정보 null 처리시) 메인으로 라우팅
        !newVal && this.changeRoute({name: 'main'});
      },
    },
  };
</script>

<style lang="sass" scoped>
  @import "~chming"

  $profile-height: 14rem
  $menu-height: 5.5rem

  .user-info-container
    width: 100%
    height: 100vh
    background: $user-info-background-color
    .edit-button
      position: absolute
      top: 4rem
      right: 3rem
    .logout-button
      position: absolute
      top: 6rem
      right: 3rem
      font-size: 1.7rem
      background: none
      border: 0

  .user-info_profile
    padding: 4rem 2rem 2rem 2rem
    background: $user-info-profile-background-color
    +clearfix
    .profile_image
      float: left
      position: relative
      border-radius: 1000px
    .hobby_list
      +clearfix
      li
        height: 2rem
        float: left
        margin-right: 0.5rem
    .profile-wrap
      float: left
      position: relative
      margin-left: 2rem
      span
        font-size: 1.5rem
      .profile_name
        margin-right: 1rem

    .profile_location
      display: block
      margin: 0.6rem 0
      i
        margin-right: 1rem

  .user-info_list
    .list_menu
      border-bottom: 0.5px solid $user-info-menu-border-color
      height: $menu-height
      margin: 0 2rem
      text-align: center
      font-size: 1.7rem
      line-height: $menu-height
      color: $user-info-menu-color
      font-weight: bold
      & > a
        display: block
        line-height: $menu-height
        &:hover
          background: $user-info-menu-background-hover-color
          text-decoration: none
          color: $user-info-menu-hover-color

  .profile-image-wrap
    +circle(6.5rem, 6.5rem)
    img 
      +profileImagePosition(auto, 100%)
    .fit-width
      +profileImagePosition(100%, auto)
</style>
