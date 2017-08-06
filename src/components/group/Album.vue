<template lang="pug">
  .board-container
    group-header
    tab-menu
</template>

<script>
  import GroupHeader from '@/components/common/Header';
  import TabMenu from '@/components/group/TabMenu';

  export default {
    components: {
      GroupHeader,
      TabMenu
    },
  };

</script>

<style lang="sass" scoped>
  @import "~chming"

</style>