<template lang="pug">
  #map(ref="map")
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  mounted() {
    let mapContainer = this.$refs.map;
    let mapOption = {
      center: new this.$maps.LatLng(37.504301537, 127.0248342127), // 지도의 중심좌표
      level: 3 // 지도의 확대 레벨
    };
    let map = new this.$maps.Map(mapContainer, mapOption);
    this.setMap(map);
  },
  methods: {
    ...mapMutations(['setMap']),
  },
};
</script>

<style lang="sass" scoped>
  @import "~chming"
  
</style>