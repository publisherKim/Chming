<template lang="pug">
  .loading-modal-container(v-if="isLoading")
    .loading(aria-label="잠시만 기다려주세요")
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    computed: {
      ...mapGetters(['isLoading']),
    }, 
  };
</script>

<style lang="sass" scoped>
  @import "~chming"

  .loading-modal-container
    position: fixed
    display: block
    top: 0
    left: 0
    width: 100%
    height: 100vh
    background: rgba(0, 0, 0, 0.7)
    z-index: 1000
    .loading
      position: absolute
      display: block
      top: 50%
      left: 50%
      margin-left: -5rem
      margin-top: -5rem
      height: 10rem
      width: 10rem
      border: 1rem solid #dbdbdb
      border-radius: 50%
      border-right-color: transparent
      border-top-color: transparent
      animation: spinAround 500ms infinite linear
  @keyframes spinAround
    0%
      transform: rotate(0deg)
    100%
      transform: rotate(360deg)
</style>