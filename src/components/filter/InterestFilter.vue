<template lang="pug">
  .interest-container
    h2.interest_title 관심사 필터
    .interest_header-wrap
      button.header_cancel-button(type="button" @click="") 취소
      button.header_apply-button(type="button" @click="") 필터 적용
    .interest_content-wrap
      interest.interest-filter-wrap
</template>

<script>
import Interest from '../common/Interest';

export default {
  components: {
    Interest,
  },
  data() {
    return {

    };
  },
};
</script>

<style lang="sass" scoped>
  @import "~chming"

  $interest-header-height: 30px

  button
    background: none
    font-size: 1.2rem
  .interest-container
    width: 100%
    z-index: 10
  .interest_title
    +a11y-hidden
  .interest_header-wrap
    background: rgb(248, 248, 248)
    display: block
    height: $interest-header-height
    +clearfix
    button
      border: 0
      font-weight: bold
      position: relative
      +align-vertical-middle
    .header_cancel-button
      float: left
      margin-left: 1rem
    .header_apply-button
      float: right
      margin-right: 1rem
  .interest_content-wrap
    background: #fff
  .interest_list-wrap
    +clearfix
    h2
      margin: 0
    li
      float: left
      margin-right: gutter()
    button
      border: 1px solid #000
      border-radius: 1rem
      padding: 3px 5px
  .interest-filter-wrap
    width: 95%
    margin: 0 auto
</style>