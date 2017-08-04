<template lang="pug">
  button(@click="changeRoute" type="button") 수정
</template>

<script>
export default {
  props: {
    edit: {
      type: String,
      required: true
    },
  },
  methods: {
    changeRoute() {
      if(this.edit === 'user') this.$router.push({name: 'user_edit'});
    },
  },
};
</script>

<style lang="sass" scoped>
  
</style>