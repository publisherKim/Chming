<template lang="pug">
  div.message-box-container
    i.fa(:class="classList" aria-hidden="true")
    | {{ message }}
</template>

<script>
  export default {
    props: {
      message: {
        type: String,
        required: true,
      },
      classList: {
        type: Array,
        required: true,
      },
    },
  };
</script>

<style lang="sass" scoped>
  @import "~chming"

  .message-box-container
    i
      margin-right: 0.5rem
      font-size: 1.6rem
      &.warning
        color: #f03
      &.info
        color: $base-theme-color
</style>