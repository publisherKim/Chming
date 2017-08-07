<template lang="pug">
  #app
    router-view
</template>

<script>
export default {
  name: 'app',
};
</script>

<style lang="sass">
  @import "~chming"

  +mobile
    html
      font-size: 10px
  +desktop
    html
      font-size: 12px
</style>

