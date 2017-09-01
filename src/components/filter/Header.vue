<template lang="pug">
  .filter-header-container
    button.header_cancel-button(
      @click="setActiveFilter(null)"
      type="button"
    ) 취소
    button.header_apply-button(
      v-if="activeFilter === 'hobby-filter'"
      @click="setFilter()"
      type="button"
    ) 적용
</template>

<script>
  import Vue from 'vue';
  import {mapGetters, mapMutations, mapActions} from 'vuex';

  export default {
    data() {
      return {
        options: null,
      };
    },
    methods: {
      ...mapActions(['getGroupList']),
      ...mapMutations(['setActiveFilter', 'setHobby']),
      setFilter() {
        this.setHobby(this.selectedHobby.slice());
        this.getGroupList();
        this.setActiveFilter(null);
      },
    },
    computed: {
      ...mapGetters(['activeFilter', 'selectedHobby']),
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