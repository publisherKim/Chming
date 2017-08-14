<template lang="pug">
  #app
    router-view
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    created(){
      let token = sessionStorage.getItem('token');
      
      if(token !== null) {
        this.getUserProfile(token);
      }
    },
    methods: {
      ...mapActions(['getUserProfile']),
    }
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

