<template lang="pug">
  button.cancel_button(@click="changeRoute")
    i.fa.fa-times(aria-hidden="true")
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
  
</style>