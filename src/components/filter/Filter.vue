<template lang="pug">
  .filter-wrap
    .location-filter-wrap
      div
        h2 지금 보고있는 지역은
        button(@click="viewFilter('location')" type="button") 서현/야탑&dtrif;
    .filter-button-wrap
      button.sort-button(@click="viewFilter('sort')" type="button") 거리순&dtrif;
      button.interest-button(@click="viewFilter('interest')" type="button") 관심사&dtrif;
      button.mylocation-button(@click="viewFilter('mylocation')" type="button" aria-label="내 주변 검색")
        i.fa.fa-street-view(aria-hidden='true')
    .filter(ref="filter" :is="filter")
</template>

<script>
import SortFilter from '@/components/filter/SortFilter';
import InterestFilter from '@/components/filter/InterestFilter';
import MylocationFilter from '@/components/filter/MylocationFilter';
import LocationFilter from '@/components/filter/LocationFilter';

export default {
  data() {
    return {
      filter: null
    };
  },
  components: {
    SortFilter,
    InterestFilter,
    MylocationFilter,
    LocationFilter,
  },
  methods: {
    viewFilter(filter) {
      this.filter = filter + '-filter';
      let refFilter = this.$refs.filter;

      refFilter && refFilter.$options._componentTag.includes(filter) && (this.filter = null);
    },
  },
};
</script>

<style lang="sass" scoped>
  @import "~chming"

  $filter-wrap-height: 50px

  .filter-wrap
    height: $filter-wrap-height
    background: rgb(238, 238, 238)
  .location-filter-wrap
    height: 100%
    div
      position: relative
      +align-vertical-middle
    h2
      font-size: 0.8rem
    button
      background: none
      border: 0
      padding-top: 3px
      font-size: 1.5rem
      font-weight: bold
  .filter-button-wrap
    position: relative
    height: 100%
    text-align: right
    button
      border: 0
      margin-left: 0.5rem
      padding: 5px 5px
  .sort-button
    position: relative
    +align-vertical-middle
    background: none
    text-decoration: underline
    font-size: 1.2rem
  .mylocation-button
    position: absolute
    top: $filter-wrap-height + 10px
    right: 0
    z-index: 10
    background: #fff
    padding: 5px
    font-size: 1.7rem
    border-radius: 3px
    color: #444
  .interest-button
    position: relative
    +align-vertical-middle
    background: none
    font-size: 1.2rem
    text-decoration: underline
  .filter
    position: absolute
    bottom: 0
    left: 0

  +mobile
    .filter-wrap
      +container()
    .location-filter-wrap
      +span(2)
    .filter-button-wrap
      +span(2)
</style>