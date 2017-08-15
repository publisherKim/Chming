<template lang="pug">
  .location-container
    filter-header
    .location-wrap
      h2 지역 선택 메뉴
      ul.location-list(role="tablist")
        li#tab1.location-list-item(
          v-for="(reigon, index) in regionCategoryList"
          :id="`tab${index+1}`"
          :class="{'is-active': (index === activeSection)}"
          role="tab"
          :aria-controls="`section${index+1}`"
          :aria-selected="(index === 0) ? 'true' : 'false'"
          @click="changeTabContents(index)"
        ) {{ reigon.si }}
      .tab-contents
        template(v-for="(category, index) in regionCategoryList")
          section(
            :id="`section${index+1}`"
            :class="{'is-active': (index === activeSection)}"
            role="tabpanel"
            :aria-labelledby="`tab${index+1}`"
          )
            ul.region-list
              li.region-list-item(v-if="category.si === region.si" v-for="region in regionList")
                button(type="button" @click="searchGroupByRegion(region)") {{ region.dong }}
</template>

<script>
import FilterHeader from '@/components/filter/Header';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    FilterHeader
  },
  created() {
    this.regionList.length === 0 && this.getRegionList();
  },
  data() {
    return {
      activeSection: 0,
    };
  },
  methods: {
    ...mapActions(['getRegionList']),
    changeTabContents(index) {
      this.activeSection = index;
    },
    searchGroupByRegion(region) {
      console.log('region:', region);
    },
  },
  computed: {
    ...mapGetters(['regionList', 'regionCategoryList']),
  },
};
</script>

<style lang="sass" scoped>
  @import "~chming"

  $location-list-height: 40px

  .location-container
    position: absolute
    z-index: 10
    bottom: 0
    left: 0
    width: 100%
    background: $filter-panel-background-color

  .location-wrap
    h2
      margin: 0
      +a11y-hidden

  .location-list
    +clearfix
    width: 95%
    height: $location-list-height

  .location-list-item
    float: left
    line-height: $location-list-height
    color: $filter-panel-color
    font-weight: bold
    cursor: pointer
    &.is-active
      color: $filter-panel-tab-active-color
      border-bottom: 1px solid $filter-panel-tab-active-color

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
      +rounded-rect-button(95%, 30px)
      &:hover, &.is-active
        +rounded-rect-button-active()
        
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