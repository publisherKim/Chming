<template lang="pug">
  .user-info-container
    .user-info_profile-wrap
      img(src='' alt="userName")
      ul.profile_list
        li.list_item 홍길동
        li.list_item 1999.
        li.list_item 01.
        li.list_item 01
      p.profile_location 경기도 성남시 서현동 
    .user-info_interest-wrap
      h3.title 관심사
      .interest_list
        li.item 배드민턴
    .user-info_group-wrap
      ul.group_list
        li
          a 내모임
        li
          a 관심모임
        li
          a 모임개설
</template>

<script>
import EditButton from '@/components/common/EditButton';
export default {
  components: {
    EditButton,
  },
};
</script>

<style lang="sass" scoped>
  @import "~chming"

  .user-info-container
    width: 100%
    height: 100vh
    padding: 2rem
    background: #e1e1e1
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