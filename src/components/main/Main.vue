<template lang="pug">
  .main-container
    h2 {{msg}}
    .container
      .is-test
        span {{msg}}
      .is-test
        span {{msg}}
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

.container
  +container(1000px)
.is-test
  +span(isolate 3 at 2)
  background: red
</style>