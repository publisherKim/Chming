<template lang="pug">
  .board-container
    group-header
    tab-menu
    BoardList
    button.write(@click="createWrite(1)" type="button") 글작성
</template>

<script>
  import GroupHeader from '@/components/common/Header';
  import TabMenu from '@/components/group/TabMenu';
  import BoardList from '@/components/group/BoardList';

  export default {
    components: {
      GroupHeader,
      TabMenu,
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

  .write 
    display: block
    margin: 1rem auto
    padding: 0.5rem 1rem
    color: #fff
    background: #ff6600
    border: none
</style>