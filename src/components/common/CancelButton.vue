<template lang="pug">
  button.cancel-button(@click="changeRoute" type="button")
    i.fa.fa-times(aria-hidden="true")
</template>

<script>
export default {
  methods: {
    changeRoute() {
      this.$router.go(-1);
    },
  },
};

</script>

<style lang="sass" scoped>
  .cancel-button
    position: absolute
    top: 1rem
    right: 3rem
    padding: 2px
    font-size: 1.7rem
    background: none
    border: 0
</style>