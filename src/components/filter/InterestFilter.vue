<template lang="pug">
  .interest-filter-wrap
    h2.filter-title 관심사 필터
    .filter-header-wrap
      button(
        type="button"
        @click=""
      ) 취소
      button(
        type="button"
        @click=""
      ) 필터 적용
    .filter-content-wrap
      .interest-list-wrap
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
  button
    background: none
    font-size: 1.2rem
  .interest-filter-wrap
    z-index: 10
  .filter-title
    @extend %a11y-hidden
  .filter-header-wrap
    background: rgb(248, 248, 248)
    button
      border: 0
  .filter-content-wrap
    background: #fff
  .interest-list-wrap
    @extend %clearfix
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