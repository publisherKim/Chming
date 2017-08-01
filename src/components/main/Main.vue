<template lang="pug">
  .main-container
    main-map
      
</template>

<script>
import MainMap from '../common/Map';
export default {
  name: 'Main',
  components: {
    MainMap,
  },
  data() {
    return {
      msg: 'Welcome Main',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
  @import "~chming"
  .main-container
    +container()
</style>