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
        ) {{ reigon.level1 }}
      .tab-contents
        template(v-for="(category, index) in regionCategoryList")
          section(
            :id="`section${index+1}`"
            :class="{'is-active': (index === activeSection)}"
            role="tabpanel"
            :aria-labelledby="`tab${index+1}`"
          )
            ul.region-list
              li.region-list-item(v-if="category.level1 === region.level1" v-for="region in regionList")
                button(
                  @click="setSelectedLocation(region)" 
                  :class="{'is-active' : region === selectedLocation}" 
                  type="button"
                ) {{ region.level2 }}
</template>

<script>
import FilterHeader from '@/components/filter/Header';
import {mapGetters, mapMutations, mapActions} from 'vuex';

export default {
  created() {
    this.selectedLocation = this.location;
  },
  components: {
    FilterHeader,
  },
  data() {
    return {
      activeSection: 0,
      selectedLocation: null,
    };
  },
  methods: {
    ...mapActions(['getGroupList']),
    ...mapMutations(['setLocation', 'setActiveFilter']),
    changeTabContents(index) {
      this.activeSection = index;
    },
    setSelectedLocation(region) {
      this.setLocation(region);
      this.getGroupList();
      this.setActiveFilter(null);
    },
  },
  computed: {
    ...mapGetters(['regionList', 'regionCategoryList', 'location']),
  },
};
</script>

<style lang="sass" scoped>
  @import "~chming"

  $location-list-height: 40px

  .location-container
    position: absolute
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