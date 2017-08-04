<template lang="pug">
  .location-list-wrap
    h2 지역 선택 메뉴
    ul.location-list(role="tablist")
      li#tab1.location-list-item(role="tab" aria-controls="section1" aria-selected="true")
        button(type="button") 경기도
      li#tab2.location-list-item(role="tab" aria-controls="section2" aria-selected="true")
        button(type="button") 강남
      li#tab3.location-list-item(role="tab" aria-controls="section3" aria-selected="true")
        button(type="button") 강북
      li#tab4.location-list-item(role="tab" aria-controls="section4" aria-selected="true")
        button(type="button") 분당
    .tab-contents
      section#section1(role='tabpanel' aria-labelledby='tab1')
        ul.region-list
          li.region-list-item
            button(type="button") 가로수길
          li.region-list-item
            button(type="button") 논현동
          li.region-list-item
            button(type="button") 강남역
        
</template>

<script>
export default {
  
};
</script>

<style lang="sass" scoped>
  @import "~chming"
  
  +mobile
    .location-list-wrap
      +full
      position: absolute
      background: red
      z-index: 10
      bottom: 0
      left: 0
      h2
        margin: 0
        +a11y-hidden
    .location-list
      +clearfix
      border-bottom: 1px solid #000
    .location-list-item
      float: left
      margin-right: gutter()
</style>