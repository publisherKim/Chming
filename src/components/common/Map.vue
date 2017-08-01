<template lang="pug">
  .map-wrap
    #map(ref="map")
</template>

<script>
export default {
  mounted() {
    let mapContainer = this.$refs.map;
    let mapOption = {
      center: new this.daum.maps.LatLng(37.504301537, 127.0248342127), // 지도의 중심좌표
      level: 3 // 지도의 확대 레벨
    };
    this.map = new this.daum.maps.Map(mapContainer, mapOption);
    this.$store.commit('setMap', this.map);
  },
  data() {
    return {
      daum: window.daum,
      map: null,
    };
  },
};
</script>

<style lang="sass">
  #map
    width: 100%
    height: 70vh
</style>