<template lang="pug">
  #app
    loading-modal
    router-view
</template>

<script>
  import { mapActions } from 'vuex';
  import LoadingModal from '@/components/common/LoadingModal';

  export default {
    created() {
      this.getRegionList();
      this.getHobbyList();

      let token = sessionStorage.getItem('token');
      if(token !== null) {
        this.getUserProfile(token);
      }
    },
    components: {
      LoadingModal,
    },
    methods: {
      ...mapActions(['getUserProfile', 'getRegionList', 'getHobbyList']),
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

