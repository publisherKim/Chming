<template lang="pug">
  .container
    main-header
    main-map
</template>

<script>
import MainHeader from '@/components/header/Header';
import MainMap from '@/components/common/Map';

export default {
  name: 'Main',
  components: {
    MainMap,
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