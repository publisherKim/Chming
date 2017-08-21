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
      this.checkShowIntro();
      
      if(this.routeName === 'intro') return;

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
    data() {
      return {
        routeName: 'main',
      };
    },
    methods: {
      ...mapActions(['getUserProfile', 'getRegionList', 'getHobbyList']),
      checkShowIntro() {
        let showIntro = localStorage.getItem('showIntro');
        if(showIntro === null || showIntro === 'true') {
          localStorage.setItem('showIntro', true);
          this.$router.push({name: 'intro'});
        }        
      }
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

