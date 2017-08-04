<template lang="pug">
  div
    a.hamburger-menu(
      role="button"
      @click="viewMenu"
    )
      i.fa.fa-bars(aria-hidden='true')
</template>

<script>  
  export default {
    data() {
      return {
        isLogin: false
      };
    },
    methods: {
      viewMenu(e) {
        this.isLogin && this.changeRoute({name: 'user_info', params: {id: 1}} );
        !this.isLogin && this.changeRoute({name: 'user_login'});
      },
      changeRoute(route) {
        this.$router.push(route);
      },
    },
  };
</script>

<style lang="sass" scoped>
  @import "~chming"

  +mobile
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
