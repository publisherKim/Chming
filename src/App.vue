<template lang="pug">
  #app
    router-view
</template>

<script>
  export default {
    
  };
</script>

<style lang="sass">
  @import "~chming"
  +spoqa('./assets/fonts/SpoqaHanSans')

  +mobile
    html
      font-size: $mobile-base-root-font-size
  +desktop
    html
      font-size: $desktop-base-root-font-size
</style>

