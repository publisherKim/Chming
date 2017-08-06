<template lang="pug">
  .container
    group-header
    group-tab-menu
    .introduce-group-wrap
      img(src="/assets/" alt="groupIntroduce") 
      p testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest
      p.address 경기도 성남시 분당구 265-2
    .news-wrap
      h3 새소식
      ul.news-list
        li
          
</template>

<script>
  import GroupHeader from '@/components/common/Header';
  import GroupTabMenu from '@/components/group/TabMenu';

  export default {
    components: {
      GroupHeader,
      GroupTabMenu
    },
    data() {  
      return {

      };
    },
  };
</script>

<style lang="sass" scoped>
  @import "~chming"
  
  .introduce-group-wrap
    p
      padding: 1rem 3rem
      line-height: 2.6rem
</style>