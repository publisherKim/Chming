<template lang="pug">
  .group-list-slider-container
    ul.group-list
      h2 검색된 그룹 정보 리스트
      li.list_item
        .group-image_wrap
          img(src="../../assets/logo.png", alt="")
        a.group-description_link(href @click.prevent="changeRoute(1)")
          span.group_name(aria-label="모임명") 분당 쉐보레 스파크 모임
          span.group_description(aria-label="모임 설명") 분당구 경차사랑 스파크 모임입니다.dsa asdasd ad asd asd asd 
          span.group_member(aria-label="모임멤버") 모임멤버 58명
          interest-icon.group_interest-icon(iconClass="fa-car")
    button.prev-button(type="button")
      i.fa.fa-angle-left(aria-hidden="true")
    button.next-button(type="button")
      i.fa.fa-angle-right(aria-hidden="true")
</template>

<script>
  import InterestIcon from '@/components/common/InterestIcon';

  export default {
    data() {
      return {
        
      };
    },
    components: {
      InterestIcon,
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

  $list-item-height: 7rem

  .group-list-slider-container
    position: absolute
    width: 85%
    z-index: 20
    bottom: 3rem
    +align-horizontal-middle
    background: $group-list-slider-background-color
    border: 0.5px solid $group-list-slider-border-color
    border-radius: 1rem

  h2
    +a11y-hidden
    
  .list_item
    width: 100%
    height: $list-item-height
    padding: 3px 1rem

  .group-image_wrap
    float: left
    position: relative
    height: 100%
    // +align-vertical-middle
    width: $list-item-height
    text-align: center
    img
      position: relative
      height: 80%
      +align-vertical-middle

  .group-description_link
    float: left
    position: relative
    +align-vertical-middle
    width: calc(100% - #{$list-item-height} - 2rem)
    margin-left: 1rem
    padding-right: 2.5rem
    span
      display: block
      +fit-text-in-box
    .group_name
      font-weight: bold
    .group_description,
    .group_member
      font-size: 1.3rem
    .group_interest-icon
      position: absolute
      z-index: 30
      top: 0
      right: 0
    &:hover
      text-decoration: none

  .prev-button,
  .next-button
    position: absolute
    z-index: 30
    // transform: translateY(-50%)
    background: none
    border: 0
    padding: 0 0.5rem
    i
      font-size: 5rem
      line-height: $list-item-height
      color: #555
  .prev-button
    transform: translate(-100%, -50%)
    top: 50%
    left: -2%
  .next-button
    transform: translate(100%, -50%)
    top: 50%
    right: -2%
</style>