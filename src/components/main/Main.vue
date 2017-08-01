<template lang="pug">
<<<<<<< HEAD
  .container
    Header
    MainMap
</template>

<script>
import Header from '@/components/header/Header';
import MainMap from '@/components/common/Map';

=======
  .main-container
    main-map
      
</template>

<script>
import MainMap from '../common/Map';
>>>>>>> b5b98f951a9673959016b9f8c4b8e28e9b2e4575
export default {
  name: 'Main',
  components: {
    MainMap,
<<<<<<< HEAD
    Header,
=======
>>>>>>> b5b98f951a9673959016b9f8c4b8e28e9b2e4575
  },
  data() {
    return {

    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
<<<<<<< HEAD
@import "~chming"

=======
  @import "~chming"
  .main-container
    +container()
>>>>>>> b5b98f951a9673959016b9f8c4b8e28e9b2e4575
</style>