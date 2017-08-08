<template lang="pug">
  button.edit-button(@click="changeRoute" type="button")
    i.fa.fa-pencil-square-o(aria-hidden="true")
</template>

<script>
export default {
  props: {
    route: {
      type: String,
      required: true
    },
  },
  methods: {
    changeRoute() {
      this.$router.push({name: this.route});
    },
  },
};
</script>

<style lang="sass" scoped>
  .edit-button
    position: absolute
    top: 0
    right: 0
    padding: 2px
    font-size: 1.7rem
    background: none
    border: 0
</style>