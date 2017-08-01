<template lang="pug">
  .container
    Header
    MainMap
</template>

<script>
import Header from '@/components/header/Header';
import MainMap from '@/components/common/Map';

export default {
  name: 'Main',
  components: {
    MainMap,
    Header,
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