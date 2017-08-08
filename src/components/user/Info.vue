<template lang="pug">
  .user-info-container
    edit-button.edit-button(route="user_edit")     
    button.logout-button(type="button" @click="logout")
      i.fa.fa-sign-out(aria-hidden="true")  
    .user-info_profile-wrap
      img.profile_image(src="../../assets/logo.svg" alt="userName")
      ul.profile_list
        li.list_item 홍길동
        li.list_item 1999.
        li.list_item 01.
        li.list_item 01
      p.profile_location 경기도 성남시 서현동 
    .user-info_interest-wrap
      h3.title 관심사
      .interest_list
        li.list-item 배드민턴
    .user-info_group-wrap
      ul.group_list
        li
          a(href @click.prevent="changeRoute('user_myGroupList')") 내모임
        li
          a(href @click.prevent="changeRoute('user_myFavoriteList')") 관심모임
        li
          a(href @click.prevent="changeRoute('group_create')") 모임개설
    cancel-button.button-close
</template>

<script>
import EditButton from '@/components/common/EditButton';
import CancelButton from '@/components/common/CancelButton';
import { mapGetters } from 'vuex';

export default {
  components: {
    EditButton,
    CancelButton
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

  .user-info-container
    width: 100%
    height: 100vh
    padding: 3rem
    background: #fff
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

  .user-info_profile-wrap
    +clearfix
    img
      float: left
      width: 10rem
      height: 10rem
    
  .profile_list
    float: left
    width: calc(100% - 12rem)
    margin-left: 2rem
    +clearfix
    li 
      float: left

  .profile_location
    float: left
    margin-left: 2rem

  .user-info_interest-wrap
    margin-top: 2rem
    
  .group_list
    +clearfix
    margin-top: 1rem
    padding-top: 3rem  
    border-top: solid 1px #000
    li
      float: left
      width: 33.33%
      text-align: center
    a
      display: inline-block
      width: 6rem
      height: 6rem
      line-height: 6rem
      border-radius: 100%
      background: red
    
</style>