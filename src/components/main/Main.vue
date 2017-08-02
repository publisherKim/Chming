<template lang="pug">
  .container
    main-header
    main-filter
    main-map
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

</style>