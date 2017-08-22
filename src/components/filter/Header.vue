<template lang="pug">
  .filter-header-container
    button.header_cancel-button(type="button" @click="setActiveFilter(null)") 취소
    button.header_apply-button(type="button" @click="setFilter(filter)") 적용
</template>

<script>
  import Vue from 'vue';
  import {mapGetters, mapMutations, mapActions} from 'vuex';

  export default {
    props: {
      filter: {
        type: String,
        required: true,
      },
      selectedLocation: {
        type: Object,
      },
      selectedSort: {
        type: String,
      },
      selectedRadius: {
        type: String,
      },
    },
    data() {
      return {
        options: null,
      };
    },
    methods: {
      ...mapActions(['getGroupList', 'arrangeGroupList']),
      ...mapMutations(['setActiveFilter', 'setLocation', 'setSort', 'setRadius', 'setCenter']),
      setFilter(filter) {
        if(filter === 'sort') {
          this.setSort(this.selectedSort);
          this.arrangeGroupList();
        } else {
          if(filter === 'location') {
            let location = this.selectedLocation;
            this.setLocation(location);
          }
          (filter === 'myLocation') && this.setRadius(this.selectedRadius);

          this.getGroupList();
        }

        this.setActiveFilter(null);
      },
    },
    computed: {
      ...mapGetters(['location', 'filterOptions', 'map']),
    },
  };
</script>

<style lang="sass" scoped>
  @import "~chming"

  .filter-header-container
    display: block
    height: 3rem
    background: $filter-panel-header-background-color
    +clearfix
    button
      position: relative
      padding: 3px 0
      color: $filter-panel-header-color
      background: none
      border: 0
      +align-vertical-middle
    .header_cancel-button
      float: left
      margin-left: 2rem
    .header_apply-button
      float: right
      margin-right: 2rem

</style>