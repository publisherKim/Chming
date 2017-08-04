<template lang="pug">
  .menu-wrap
    a(@click="viewMenu") menu
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
    .menu-wrap
      
</style>
