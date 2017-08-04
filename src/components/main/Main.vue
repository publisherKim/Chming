<template lang="pug">
  .container
    main-header
    main-filter
    main-map.main-map
</template>

<script>
import MainHeader from '@/components/header/Header';
import MainFilter from '@/components/filter/Filter';
import MainMap from '@/components/common/Map';

export default {
  name: 'Main',
  components: {
    MainMap,
    MainFilter,
    MainHeader,
  },
  data() {
    return {

    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
  @import "~chming"
  +mobile
    .main-map
      width: 100%
      height: calc(100vh - 100px)
</style>