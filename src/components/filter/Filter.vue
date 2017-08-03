<template lang="pug">
  .filter-wrap
    button.sort-button(
      @click="viewFilter('sort')"
      type="button"
    ) 거리순
    button.mylocation-button(
      @click="viewFilter('mylocation')"
      type="button"
    ) 내주변
    button.interest-button(
      @click="viewFilter('interest')"
      type="button"
    ) 관심사
    .filter(ref="filter" :is="filter")
</template>

<script>
import SortFilter from './SortFilter';
import InterestFilter from './InterestFilter';
import MylocationFilter from './MylocationFilter';

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

  .filter-wrap
    +container()
    background: rgb(248, 248, 248)
    button
      font-size: 1.2rem
      padding: 3px 5px
  .sort-button
    border: 0
    text-decoration: underline
    background: none
  .mylocation-button
    border: 0
    background: rgb(230, 230, 230)
    border-radius: 1rem
  .interest-button
    border: 1px solid #000
    background: none
    border-radius: 1rem
  .filter
    +full
    position: absolute
    bottom: 0
    left: 0
</style>