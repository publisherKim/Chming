<template lang="pug">
  .filter-wrap
    button.sort-button(
      @click="filterToggle('sort')"
      type="button"
    ) 거리순
    button.mylocation-button(
      @click="filterToggle('mylocation')"
      type="button"
    ) 내주변
    button.interest-button(
      @click="filterToggle('interest')"
      type="button"
    ) 필터
</template>

<script>
export default {
  data() {
    return {
      sortFilterActive: false,
      mylocationFilterActive: false,
      interestFilterActive: false,
    };
  },
  methods: {
    filterToggle(filter) {
      this[filter + 'FilterActive'] = !this[filter + 'FilterActive'];
    },
  },
};
</script>

<style lang="sass" scoped>
  @import "~chming"
  $filter-background-color: rgb(248, 248, 248)

  .filter-wrap
    +container()
    background: $filter-background-color
    button
      font-size: 1.2rem
      padding: 3px 5px
      background: none
  .sort-button
    border: 0
    text-decoration: underline
  .mylocation-button
    border: 1px solid #000
    border-radius: 1rem
  .interest-button
    border: 1px solid #000
    border-radius: 1rem
</style>