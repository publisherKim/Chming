<template lang="pug">
  .sort-filter-container
    filter-header
    .sort-filter_header-wrap
      h2 정렬
    .sort-filter_content-wrap
      button(
        v-for="sortItem in sortItems"
        :class="{'is-active': sortItem === selectedSort}"
        @click="setSelectedSort(sortItem)"
        type="button"
      ) {{sortItem}}
    
</template>

<script>
  import FilterHeader from '@/components/filter/Header';
  import {mapGetters, mapMutations, mapActions} from 'vuex';

  export default {
    created() {
      this.selectedSort = this.sort;
    },
    components: {
      FilterHeader,
    },
    data() {
      return {
        sortItems: ['거리순', '인원순', '좋아요순'],
        selectedSort: null,
      };
    },
    methods: {
      ...mapActions(['arrangeGroupList', 'resetMarkers']),
      ...mapMutations(['setSort', 'setActiveFilter', 'setToastMessage']),
      setSelectedSort(sortItem) {
        this.resetMarkers();
        this.setSort(sortItem);
        this.arrangeGroupList();
        this.setActiveFilter(null);
        this.setToastMessage(sortItem + '으로 정렬되었습니다.');
      },
    },
    computed: {
      ...mapGetters(['sort']),
    },
  };
</script>

<style lang="sass" scoped>
  @import "~chming"

  $sort-header-height: 40px
  
  .sort-filter-container
    width: 100%
    background: #fff
    text-align: center
  .sort-filter_header-wrap
    width: 95%
    margin: 0 auto
    border-bottom: 0.5px solid $base-theme-color
    h2
      text-align: center
      font-size: 1.5rem
      color: $filter-panel-color
      line-height: $sort-header-height
          
  .sort-filter_content-wrap
    padding: 1.3rem 0
    button
      +rounded-rect-button(8rem)
      &:hover, &.is-active
        +rounded-rect-button-active()
      &:not(:last-child)
        margin-right: 2rem
</style>