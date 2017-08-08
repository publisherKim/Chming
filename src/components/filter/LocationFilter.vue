<template lang="pug">
  .location-list-container
    h2 지역 선택 메뉴

    ul.location-list(role="tablist")
      li#tab1.location-list-item(
        v-for="(arr, region, index) in regionList"
        :id="`tab${index+1}`"
        :class="{'is-active': (index === activeSection)}"
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
        '경기도': ['테스트1', '테스트2', '테스트3', '테스트4', '테스트5', '테스트6'],
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
  
  .location-list-container
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
    width: 95%
    height: $location-list-height
    // margin: 0 auto
  .location-list-item
    float: left
    line-height: $location-list-height
    font-weight: bold
    cursor: pointer
    &.is-active
      border-top: 2px solid $base-theme-color
  .tab-contents
    section
      display: none
      &.is-active
        display: block
  .region-list
    padding: 1.3rem 10px
  .region-list-item
    text-align: center
    padding: 0.5rem 0
    button
      +rounded-rect-button(100%, 30px)

  +mobile
    .location-list-wrap
      +container()
    .location-list-item
      padding: 0 (gutter() * 2)
    .region-list
      +container()
    .region-list-item
      +span(2)

  +desktop
    .location-list-wrap
      +container()
    .location-list-item
      padding: 0 (gutter() * 2)
    .region-list
      +container()
    .region-list-item
      +span(3)

</style>