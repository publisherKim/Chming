<template lang="pug">
  .write-article-container
    group-header
    article-form
</template>

<script>
  import GroupHeader from '@/components/common/Header';
  import ArticleForm from '@/components/group/ArticleForm';
  
  export default {
    components: {
      GroupHeader,
      ArticleForm
    }
  };
</script>

<style lang="sass" scoped>
  @import "~chming"
  
</style>