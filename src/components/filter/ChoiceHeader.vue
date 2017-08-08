<template lang="pug">
  div
    .header-wrap
      button.header_cancel-button(type="button" @click="") 취소
      button.header_apply-button(type="button" @click="") 적용
    .header_content-wrap
      interest.interest-filter-wrap
</template>

<script>

export default {
  data() {
    return {

    };
  },
};
</script>

<style lang="sass" scoped>
  @import "~chming"

  .header-wrap
    display: block
    height: 3rem
    background: $base-theme-color
    +clearfix
    button
      position: relative
      padding: 3px 0
      color: $base-action-color
      background: none
      border: 0
      +align-vertical-middle
    .header_cancel-button
      float: left
      margin-left: 2rem
    .header_apply-button
      float: right
      margin-right: 2rem
  .header_content-wrap
    background: #fff

</style>