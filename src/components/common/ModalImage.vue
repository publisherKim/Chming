<template lang="pug">
  .modal-image-container(@click.self="closeModal")
    .modal-image-wrapper
      img(:src="imageSrc")
    button.close-modal-button(@click="closeModal" type="button")
      i.fa.fa-times(aria-hidden="true")
</template>

<script>
  import BackButton from '@/components/common/BackButton';

  export default {
    components: {
      BackButton,
    },
    props: {
      imageSrc: {
        type: String,
        required: true,
      },
    },
    methods: {
      closeModal() {
        this.$emit('closeModal');
      },
    },
  };
</script>

<style lang="sass" scoped>
  @import "~chming"

  .modal-image-container
    position: fixed
    display: block
    top: 0
    left: 0
    width: 100%
    height: 100vh
    background: rgba(0, 0, 0, 0.8)
    z-index: 1000
  .modal-image-wrapper
    position: absolute
    +align-center
    width: 90%
    text-align: center
    img
      max-width: 100%
  .close-modal-button
    position: absolute
    top: 1rem
    right: 1rem
    padding: 0 5px
    border: 0
    background: none
    font-size: 1.7rem
    text-align: center
    i
      color: $base-theme-color2
</style>