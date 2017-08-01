<template lang="pug">
  .main-container
    h2 {{msg}}
    .foo
      span test
</template>

<script>
export default {
  name: 'Main',
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
@import "~susy/sass/susy"
.foo
  width: span(5 of 12) 
</style>
