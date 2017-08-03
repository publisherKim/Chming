<template lang="pug">
  .user-info-wrap
    .user-profile
      .user-image-wrap
        img(src="../../assets/logo.png", alt="홍길동")
      .user-detail
        span.user-name(aria-label="이름") 홍길동
        span.user-birth(aria-label="생년월일") 1999.01.01
        span.user-location(aria-label="주소") 경기도 성남시 서현동
        edit-button.edit-button(edit="user")
    .user-interest
      h2 관심사
      ul.interest-list
        li.interest-list-item 축구
        li.interest-list-item 야구
        li.interest-list-item 농구
    .user-info-menu
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

  .user-image-wrap
    background: red
    text-align: right
    img
      width: 50px
      height: 50px
  .user-detail
    position: relative
    background: blue
    height: 50px
    vertical-align: bottom
  .user-location
    display: block
  .edit-button
    position: absolute
    right: 0
    top: 0
  .interest-list-item
    float: left
    width: 30px
    height: 30px
    background: blue
    border-radius: 1000px

    
  +mobile
    .user-profile
      +container()
    .user-image-wrap
      +span(1)
    .user-detail
      +span(3)
</style>