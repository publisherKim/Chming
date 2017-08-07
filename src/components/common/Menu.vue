<template lang="pug">
  div
    a.hamburger-menu(href="" role="button" @click.prevent="viewMenu")
      i.fa.fa-bars(aria-hidden="true")
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    data() {
      return {
        
      };
    },
    methods: {
      viewMenu(e) {
        this.getToken && this.changeRoute({ name: 'user_info', params: { id: 1 } } );
        !this.getToken && this.changeRoute({ name: 'user_login' });
      },
      changeRoute(route) {
        this.$router.push(route);
      },
    },
    computed: {
      ...mapGetters(['getToken']),
    }
  };
</script>

<style lang="sass" scoped>
  @import "~chming"

  .hamburger-menu
    display: block
    position: relative
    top: 50%
    transform: translateY(-50%)
    // height: 100%
    font-size: 2rem
    color: #666
    text-align: center
      
</style>
