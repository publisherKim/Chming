<template lang="pug">
  div.menu-wrap
    a.menu_hambuger(href role="button" @click.prevent="viewMenu")
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
        this.getToken && this.changeRoute({name: 'user_info', params:{id: 1}});
        !this.getToken && this.changeRoute({name: 'user_login'});
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
  .menu-wrap
    +align-vertical-middle()
    position: absolute
    right: 2rem
    font-size: 2rem
    height: 3rem
    i
      color: $main-header-icon-color
</style>
