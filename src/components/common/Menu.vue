<template lang="pug">
  div.menu-wrap
    a.menu_hambuger(href role="button" @click.prevent="viewMenu")
      i.fa.fa-bars(aria-hidden="true")
</template>

<script>
  import { mapGetters } from 'vuex';

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
  .menu-wrap
    +align-vertical-middle()
    position: absolute
    right: 2rem
    font-size: 2rem
    height: 3rem
    i
      display: block
      line-height: 3rem
      color: $main-header-icon-color
</style>
