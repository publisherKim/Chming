<template lang="pug">
  .location-list-wrap
    h2 지역 선택 메뉴

    ul.location-list(role="tablist")
      li#tab1.location-list-item(
        v-for="(arr, region, index) in regionList"
        :id="`tab${index+1}`"
        role="tab"
        :aria-controls="`section${index+1}`"
        :aria-selected="(index === 0) ? 'true' : 'false'"
        @click="changeTabContents(index)"
      ) {{ region }}
    .tab-contents
      template(v-for="(arr, region, index) in regionList")
        section(
          :id="`section${index+1}`"
          :class="{'is-active': (index === activeSection)}"
          role="tabpanel"
          :aria-labelledby="`tab${index+1}`"
        )
          ul.region-list
            li.region-list-item(v-for="detail in arr")
              button(type="button") {{ detail }}
</template>

<script>
export default {
  data() {
    return {
      regionList: {
        '경기도': ['테스트1', '테스트2', '테스트3'],
        '서울': ['가로수길', '논현동', '강남역'],
        '성남': ['테스트4', '테스트5', '테스트6'],
      },
      activeSection: 0,
      // region: Array.prototype.keys(this.regionList),
      // regionDetail: Array.prototype.values(this.regionList),
    };
  },
  methods: {
    changeTabContents(index) {
      this.activeSection = index;
    }
  },
};
</script>

<style lang="sass" scoped>
  @import "~chming"

  $location-list-height: 40px
  
  .location-list-wrap
    position: absolute
    z-index: 10
    bottom: 0
    left: 0
    width: 100%
    background: #fff
    h2
      margin: 0
      +a11y-hidden
  .location-list
    +clearfix
    height: $location-list-height
    border-bottom: 1px solid #000
  .location-list-item
    float: left
    line-height: $location-list-height
    cursor: pointer
  .tab-contents
    section
      display: none
      &.is-active
        display: block
  .region-list
    padding: 5px
  .region-list-item
    text-align: center
    padding: 5px 0
    button
      border: 1px solid #666
      border-radius: 1000px
      background: none
      width: 70%
      padding: 5px 0

  +mobile
    .location-list-wrap
      +container()
    .location-list-item
      padding: 0 (gutter() * 2)
    .region-list
      +container()
    .region-list-item
      +span(2)

</style>