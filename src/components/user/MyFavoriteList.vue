<template lang="pug">
  .group-list-container
    main-header
    group-list
    
</template>

<script>
import MainHeader from '@/components/common/Header';
import GroupList from '@/components/user/GroupList';

export default {
  components: {
    MainHeader,
    GroupList,
  },
};
</script>

<style lang="sass" scoped>
  @import "~chming"

</style>