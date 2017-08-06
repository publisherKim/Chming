<template lang="pug">
  .icon-container(:class="iconColor")
    i.fa(:class="iconClass" aria-hidden="true")
</template>

<script>
export default {
  mounted() {
    switch(this.iconClass) {
    case 'fa-car':
      this.iconColor = 'red';
      break;
    }
  },
  props: {
    iconClass: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      iconColor: false
    };
  }
};
</script>

<style lang="sass" scoped>
  .icon-container
    width: 2.5rem
    height: 2.5rem
    text-align: center
    border-radius: 1000px
  i
    vertical-align: middle
    font-size: 1.5rem
  .red
    background: red
</style>