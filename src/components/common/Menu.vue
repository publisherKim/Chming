<template lang="pug">
  .menu-wrap
    a(@click="memberAuth") menu

</template>

<script>
  import LoginMenu from '@/components/common/LoginMenu';
  
  export default {
    methods:{
      memberAuth(e) {
        this.$router.push({name: 'user_join'});
      },
    },
  };
</script>

<style lang="sass" scoped>
  @import "~chming"
  .menu-wrap
    +span(isolate 1 at 12 last)
</style>
