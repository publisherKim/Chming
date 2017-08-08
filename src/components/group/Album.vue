<template lang="pug">
  .album-container
    group-header
    tab-menu
    ul.album-list
      li.list-item
        .album_image-wrap
          img(src="../../assets/logo.svg", alt="")
      li.list-item
        .album_image-wrap
          img(src="../../assets/logo.svg", alt="")
      li.list-item
        .album_image-wrap
          img(src="../../assets/logo.svg", alt="")
      li.list-item
        .album_image-wrap
          img(src="../../assets/logo.svg", alt="")
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

  +mobile
    .album-list
      +container()
    .list-item
      +span(2)
      margin-top: 1rem
    .album_image-wrap
      position: relative
      height: 0
      padding-top: 56.25%
      img
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
</style>