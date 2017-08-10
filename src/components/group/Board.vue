<template lang="pug">
  .board-container
    BoardList
    button.confirm(@click="createWrite(1)" type="button") 글쓰기
</template>

<script>
  import BoardList from '@/components/group/BoardList';

  export default {
    components: {
      BoardList
    },
    methods: {
      createWrite(num){
        this.$router.push({name: 'group_writeArticle'});
      },
    },
  };
</script>

<style lang="sass" scoped>
  @import "~chming"

  .confirm 
    display: block
    margin: 2rem auto
    +action-button(8rem, 3rem)
</style>