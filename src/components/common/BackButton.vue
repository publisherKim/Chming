<template lang="pug">
  button.back-button(@click="changeRoute" type="button")
    i.fa.fa-times(aria-hidden="true")
</template>

<script>
  export default {
    props: {
      route: {
        type: Object,
        required: true
      }
    },
    methods: {
      changeRoute() {
        console.log('this.route:', this.route);
        this.route.name === 'back' && this.$router.go(-1);
        this.route.name !== 'back' && this.$router.push(this.route);
      },
    },
  };
</script>

<style lang="sass" scoped>
  @import '~chming'

  .back-button
    position: absolute
    display: inline-block
    top: 1.5rem
    right: 3rem
    padding: 2px 6px
    font-size: 1.7rem
    background: none
    border: 0
    i
      color: $back-button-color
</style>