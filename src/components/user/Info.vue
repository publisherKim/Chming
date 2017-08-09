<template lang="pug">
  .user-info-container
    .user-info_profile
      img.profile_image(src="../../assets/mingu.jpeg" alt="userName")
      .profile-wrap
        span.profile_name(aria-label="이름") 홍길동
        span.profile_birth(aria-label="생년월일") 1999.01.01
        span.profile_location(aria-label="주소")
          i.fa.fa-map-marker(aria-hidden="true")
          | 경기도 성남시 서현동 
        ul.interest_list
          li.list-item(aria-label="축구")
            interest-icon.interest-icon(iconClass="fa-futbol-o")
          li.list-item(aria-label="음악")
            interest-icon.interest-icon(iconClass="fa-music")
          li.list-item(aria-label="쇼핑")
            interest-icon.interest-icon(iconClass="fa-shopping-bag")
          li.list-item(aria-label="축구")
            interest-icon.interest-icon(iconClass="fa-futbol-o")
          li.list-item(aria-label="음악")
            interest-icon.interest-icon(iconClass="fa-music")
          li.list-item(aria-label="쇼핑")
            interest-icon.interest-icon(iconClass="fa-shopping-bag")
    ul.user-info_list
      li.list_menu
        a(href @click.prevent="changeRoute('main')") 홈
      li.list_menu
        a(href @click.prevent="changeRoute('user_edit')") 정보수정
      li.list_menu
        a(href @click.prevent="changeRoute('user_myGroupList')") 내모임
      li.list_menu
        a(href @click.prevent="changeRoute('user_myFavoriteList')") 관심모임
      li.list_menu
        a(href @click.prevent="changeRoute('group_create')") 모임개설
      li.list_menu
        a(href @click.prevent="logout") 로그아웃
    back-button(:route={name: 'back'})
</template>

<script>
import BackButton from '@/components/common/BackButton';
import { mapGetters } from 'vuex';
import InterestIcon from '@/components/common/InterestIcon';

export default {
  components: {
    BackButton,
    InterestIcon,
  },
  methods: {
    changeRoute(route) {
      (route === 'group_create') && this.$router.push({ name: route });
      (route !== 'group_create') && this.$router.push({ name: route, params: { id: 1 } });
    },
    logout() {
      this.$http.post(this.getUrl + '/member/login/', {
        username: 'testuser01@ex.com',
        password: '1111111a'
      })
        .then(response => {

        })
        .catch(error => {

        });
    },
  },
  computed: {
    ...mapGetters(['getUrl']),
  }
};
</script>

<style lang="sass" scoped>
  @import "~chming"

  $profile-height: 100px
  $menu-height: 60px

  .user-info-container
    width: 100%
    height: 100vh
    padding-top: 4rem
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
    position: relative
    padding: 0 2rem
    background: $user-info-background-color
    +clearfix
    .profile_image
      float: left
      position: relative
      +align-vertical-middle
      border-radius: 1000px
    .interest_list
      +clearfix
      li
        float: left
        margin-right: 1rem
    .profile-wrap
      float: left
      position: relative
      margin-left: 2rem
      +align-vertical-middle
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
      border-bottom: 0.5px solid $user-info-menu-color
      height: $menu-height
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
  
  +mobile
    .user-info_list
      +container()
      &>li
        +span(4)
    .user-info_profile
      height: $profile-height
    .profile_image
      height: $profile-height - 25px
      width: $profile-height - 25px
    .profile-wrap
      width: calc(100% - #{$profile-height})
  +desktop
    $desktop-profile-height: $profile-height + 25px
    .user-info_profile
      height: $desktop-profile-height
    .profile_image
      height: $desktop-profile-height - 35px
      width: $desktop-profile-height - 35px
    .profile-wrap
      width: calc(100% - #{$desktop-profile-height})
</style>