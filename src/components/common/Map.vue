<template lang="pug">
  #map(ref="map")
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex';
  import Vue from 'vue';

  export default {
    data() {
      return {
        map: null,
      };
    },
    mounted() {
      let mapContainer = this.$refs.map;
      this.setCenter(Vue.maps.getDefaultLocation());
      let mapOption = {
        center: this.center, // 지도의 중심좌표
        level: 4 // 지도의 확대 레벨
      };
      this.map = new this.$maps.Map(mapContainer, mapOption);
      this.setMap(this.map);

      window.addEventListener('resize', this.setCenterInMap);
      // 맵 드래그 끝날 때 발생
      Vue.maps.event.addListener(this.map, 'dragend', this.mapDragEndHandler);
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.setCenterInMap);
      Vue.maps.event.removeListener(this.map, 'dragend', this.mapDragEndHandler);
    },
    computed: {
      ...mapGetters(['center']),
    },
    methods: {
      ...mapMutations(['setMap', 'setCenter', 'setIsMapMoving']),
      setCenterInMap() {
        this.map.setCenter(this.center);
      },
      mapDragEndHandler() {
        this.setCenter(this.map.getCenter());
        this.setIsMapMoving(true);
      },
    },
  };
</script>

<style lang="sass" scoped>
  @import "~chming"
</style>