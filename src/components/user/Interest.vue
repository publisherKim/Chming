<template lang="pug">
  div()
    h2 test
    button(@click="back")
</template>

<script>
export default {
  methods: {
    back() {
      this.$router.push({name: 'user_join', params: {show: true}});
    },
  }
};
</script>
