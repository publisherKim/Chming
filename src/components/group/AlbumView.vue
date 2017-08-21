<template lang="pug">
  .album-modal-container(
    @click.self="closeModal"
  )
    .view-album
      img(:src="albumListProp[imageIndex].post_img")
    button.prev-button(
      @click="viewAlbum(-1)"
      type="button"
    )
      i.fa.fa-angle-left(aria-label="이전사진")
    button.next-button(
      @click="viewAlbum(1)"
      type="button"
    )
      i.fa.fa-angle-right(aria-label="이전사진")    
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    created() {
      this.imageIndex = this.imageKeyProp;
    },
    props: {
      albumListProp: {
        type: Array,
        required: true
      },
      imageKeyProp: {
        type: Number
      }
    },
    data() {
      return {
        imageIndex: null,
      };
    },
    computed: {
      ...mapGetters(['validateMessage'])
    },
    methods: {
      closeModal() {
        this.$emit('closeModal');
      },
      viewAlbum(num) {
        if(!this.albumListProp[this.imageIndex + num]) {
          alert(this.validateMessage.GROUP_ALBUM_EMPTY);
          return;
        }
        this.imageIndex += num;
      }
    }
  };
</script>

<style lang="sass" scoped>
  @import "~chming"
  .album-modal-container
    position: fixed
    top: 0
    left: 0
    display: block
    width: 100%
    height: 100vh
    background: rgba(0, 0, 0, 0.7)
    z-index: 1000
  .view-album
    position: absolute
    display: block
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    width: 70%
    height: 70%
    img
      position: absolute
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)      
      width: 100%
  .prev-button, .next-button
    position: absolute
    transform: translateY(-50%)
    background: none
    border: none
    i
      font-size: 14rem
      color: #fff
  .prev-button
    top: 50%
    left: 1rem
  .next-button
    top: 50%
    right: 1rem
</style>