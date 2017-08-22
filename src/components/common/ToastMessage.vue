<template lang="pug">
  transition(name="fade-out")
    .toast-message-container(v-if="toastMessage")
      span.message(aria-label="알림 메시지") {{toastMessage}}
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex';
  export default {
    data() {
      return {
        toastTime: 2000,
      };
    },
    computed: {
      ...mapGetters(['toastMessage']),
    },
    methods: {
      ...mapMutations(['setToastMessage']),
    },
    watch: {
      toastMessage(toastMessage) {
        if(toastMessage) {
          setTimeout(() => {
            this.setToastMessage(null);
          }, this.toastTime);
        }
      },
    },
  };
</script>

<style lang="sass" scoped>
  @import "~chming"
  .toast-message-container
    position: fixed
    display: block
    +align-horizontal-middle
    bottom: 30%
    z-index: 1001
    padding: 0.5rem 2rem
    background: rgba(0, 0, 0, 0.5)
    border-radius: 1rem
    .message
      color: #fff
  
  .fade-out-enter-active,
  .fade-out-leave-active
    transition: opacity 0.3s
  .fade-out-enter,
  .fade-out-leave-to,
    opacity: 0
</style>