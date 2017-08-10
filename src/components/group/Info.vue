<template lang="pug">
  .info-container
    group-header
    tab-menu
    router-view
</template>

<script>
  import GroupHeader from '@/components/common/Header';
  import TabMenu from '@/components/group/TabMenu';

  export default {
    components: {
      GroupHeader,
      TabMenu
    }
  };
</script>
