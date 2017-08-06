<template lang="pug">
  ul.group-list
    li.list_item
      .group-image_wrap
        img(src="../../assets/logo.png", alt="")
      a.group-description_link(href @click.prevent="changeRoute(1)")
        span.group_name(aria-label="모임명") 분당 쉐보레 스파크 모임
        span.group_description(aria-label="모임 설명") 분당구 경차사랑 스파크 모임입니다.dsa asdasd ad asd asd asd 
        span.group_member(aria-label="모임멤버") 모임멤버 58명
        interest-icon.group_interest-icon(iconClass="fa-car")
    li.list_item
      .group-image_wrap
        img(src="../../assets/logo.png", alt="")
      a.group-description_link(href @click.prevent="changeRoute(2)")
        span.group_name(aria-label="모임명") 분당 쉐보레 스파크 모임
        span.group_description(aria-label="모임 설명") 분당구 경차사랑 스파크 모임입니다.
        span.group_member(aria-label="모임멤버") 모임멤버 58명
        interest-icon.group_interest-icon(iconClass="fa-car")
    li.list_item
      .group-image_wrap
        img(src="../../assets/logo.png", alt="")
      a.group-description_link(href @click.prevent="changeRoute(3)")
        span.group_name(aria-label="모임명") 분당 쉐보레 스파크 모임
        span.group_description(aria-label="모임 설명") 분당구 경차사랑 스파크 모임입니다.
        span.group_member(aria-label="모임멤버") 모임멤버 58명
        interest-icon.group_interest-icon(iconClass="fa-car")
</template>

<script>
import InterestIcon from '@/components/common/InterestIcon';

export default {
  components: {
    InterestIcon,
  },
  methods: {
    changeRoute(id) {
      this.$router.push({name: 'group_info', params: {id}});
    },
  },
};
</script>



<style lang="sass" scoped>
  @import "~chming"
  
  +mobile
    .list_item
      height: 65px
      padding: 3px 0
      border-bottom: 1px solid #000
    .group-image_wrap
      height: 100%
      text-align: center
      img
        position: relative
        height: 80%
        +align-vertical-middle
    .group-description_link
      display: block
      position: relative
      +align-vertical-middle
      padding-right: 2.5rem
      span
        display: block
        font-size: 1.3rem
        +fit-text-in-box
      .group_description,
      .group_member
        font-size: 1.2rem
      .group_interest-icon
        position: absolute
        top: 0
        right: 0

    +mobile
    .list_item
      +container()
    .group-image_wrap
      +span(1)
    .group-description_link
      +span(3)
  
</style>