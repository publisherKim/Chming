<template lang="pug">
  div
    h2 {{ msg }}
    MainMap
</template>

<script>
import MainMap from '../../components/common/Map';

export default {
  name: 'Map',
  data() {
    return {
      msg: 'Welcome Map',
      test: 'test',
    };
  },
  components: {
    MainMap,
  },
  methods: {

  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
