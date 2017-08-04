<template lang="pug">
  .interest-container
    h2.interest_title 관심사 필터
    .interest_header-wrap
      button(type="button" @click="") 취소
      button(type="button" @click="") 필터 적용
    .interest_content-wrap
      .interest_list-wrap
        h2 운동/스포츠
        ul
          li 
            button 자전거
          li 
            button 배드민턴
          li 
            button 볼링
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

  +mobile
    button
      background: none
      font-size: 1.2rem
    .interest-container
      z-index: 10
    .interest_title
      +a11y-hidden
    .interest_header-wrap
      background: rgb(248, 248, 248)
      button
        border: 0
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
</style>