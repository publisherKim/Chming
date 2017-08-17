<template lang="pug">
  .filter-header-container
    button.header_cancel-button(type="button" @click="setActiveFilter(null)") 취소
    button.header_apply-button(type="button" @click="setFilter(filter)") 적용
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex';

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
      selectedHobby: {
        type: Array,
      },
      selectedMyLocation: {
        type: String,
      },
    },
    methods: {
      ...mapMutations(['setActiveFilter', 'setLocation', 'setSort']),
      setFilter(filter) {
        if(filter === 'location') {
          this.setLocation(this.selectedLocation);
        }
        if(filter === 'myLocation') {
          console.log('');
        }
        if(filter === 'hobby') {
          console.log('');
        }
        if(filter === 'sort') {
          console.log('this.selectedSort:', this.selectedSort);
          this.setSort(this.selectedSort);
        }
        this.setActiveFilter(null);
      },
    },
    computed: {
      ...mapGetters(['location']),
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