<template lang="pug">
  #app
    router-view(name="menu")
    router-view
</template>

<script>
export default {
  name: 'app',
};
</script>

<style lang="sass">
  @import "~chming"
</style>

