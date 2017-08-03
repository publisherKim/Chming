<template lang="pug">
  .menu-wrap
    a(@click="memberAuth") menu

</template>

<script>  
  export default {
    methods:{
      memberAuth(e) {
        this.$router.push({name: 'user_login'});
      },
    },
  };
</script>

<style lang="sass" scoped>
  @import "~chming"
  .menu-wrap
    +span(isolate 1 at 12 last)
</style>
