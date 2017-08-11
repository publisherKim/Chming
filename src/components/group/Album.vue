<template lang="pug">
  .album-container
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

<style lang="sass" scoped>
  @import "~chming"

  .list-item
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

  +mobile
    .album-list
      +container()
    .list-item
      +span(2)
      
  +desktop
    .album-list
      +container()
    .list-item
      +span(6)
</style>