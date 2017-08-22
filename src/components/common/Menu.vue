<template lang="pug">
  div
    a.hamburger-button(href role="button" @click.prevent="viewMenu")
      i.fa.fa-bars(aria-hidden="true")
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    methods: {
      viewMenu(e) {
        let token = sessionStorage.getItem('token');

        token && this.changeRoute({name: 'user_info'});
        !token && this.changeRoute({name: 'user_login'});
      },
      changeRoute(route) {
        this.$router.push(route);
      },
    },
    computed: {
      ...mapGetters(['userInfo']),
    }
  };
</script>

<style lang="sass" scoped>
  @import "~chming"
  .hamburger-button
    display: block
    height: 100%
    &:hover
      text-decoration: none
    i
      display: block
      position: relative
      +align-vertical-middle
      color: $main-header-icon-color
    
</style>
