<template lang="pug">
  .group-list-container
    ul.group-list
      li.list_item
        .group-image_wrap
          img(src="../../assets/logo.png", alt="")
        .group-description_wrap
          span.group_name(aria-label="모임명") 분당 쉐보레 스파크 모임
          span.group_description(aria-label="모임 설명") 분당구 경차사랑 스파크 모임입니다.dsa asdasd ad asd asd asd 
          span.group_member(aria-label="모임멤버") 모임멤버 58명
          interest-icon.group_interest-icon(iconClass="fa-car")
      li.list_item
        .group-image_wrap
          img(src="../../assets/logo.png", alt="")
        .group-description_wrap
          span.group_name(aria-label="모임명") 분당 쉐보레 스파크 모임
          span.group_description(aria-label="모임 설명") 분당구 경차사랑 스파크 모임입니다.
          span.group_member(aria-label="모임멤버") 모임멤버 58명
          interest-icon.group_interest-icon(iconClass="fa-car")
      li.list_item
        .group-image_wrap
          img(src="../../assets/logo.png", alt="")
        .group-description_wrap
          span.group_name(aria-label="모임명") 분당 쉐보레 스파크 모임
          span.group_description(aria-label="모임 설명") 분당구 경차사랑 스파크 모임입니다.
          span.group_member(aria-label="모임멤버") 모임멤버 58명
          interest-icon.group_interest-icon(iconClass="fa-car")
</template>

<script>
import InterestIcon from '../common/InterestIcon';

export default {
  components: {
    InterestIcon,
  },
};
</script>



<style lang="sass" scoped>
  @import "~chming"

  
  +mobile
    .group-list-container
      // background: skyblue
    .list_item
      +container()
      height: 65px
      padding: 3px 0
      border-bottom: 1px solid #000
    .group-image_wrap
      +span(1)
      height: 100%
      text-align: center
      img
        position: relative
        height: 80%
        +align-vertical-middle
    .group-description_wrap
      +span(3)
      +align-vertical-middle
      position: relative
      // background: tomato
      padding-right: 2.5rem
      span
        display: block
        +fit-text-in-box
      .group_description,
      .group_member
        font-size: 1.3rem
      .group_interest-icon
        position: absolute
        top: 0
        right: 0
  
</style>