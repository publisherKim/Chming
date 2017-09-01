<template lang="pug">
  transition(name="bounce")
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

      button.close-modal-button(
        @click="closeModal"
        type="button" 
      )
        i.fa.fa-times(aria-hidden="true")
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex';

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
        show: true,
      };
    },
    computed: {
      ...mapGetters(['validateMessage']),
    },
    methods: {
      ...mapMutations(['setToastMessage']),
      
      closeModal() {
        this.$emit('closeModal');
      },
      viewAlbum(num) {
        if(!this.albumListProp[this.imageIndex + num]) {
          this.setToastMessage(this.validateMessage.GROUP_ALBUM_EMPTY);
          return;
        }
        this.imageIndex += num;
      }
    }
  };
</script>

<style lang="sass" scoped>
  @import "~chming"

  .bounce-enter-active 
    animation: bounce-in .5s
  .bounce-leave-active 
    animation: bounce-in .5s reverse

  @keyframes bounce-in 
    0%
      transform: scale(0)
    50% 
      transform: scale(1.5)
    100% 
      transform: scale(1)
      
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
    border-radius: 3rem
    img
      position: absolute
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)      
      width: 100%
      max-width: 400px
      border-radius: 3rem
      border: solid 3px #ccc

  .prev-button, .next-button
    position: absolute
    transform: translateY(-50%)
    background: none
    border: none
    i
      font-size: 7rem
      color: #fff
  .prev-button
    top: 50%
    left: 1rem
  .next-button
    top: 50%
    right: 1rem

  .close-modal-button
    position: absolute
    top: 2rem
    right: 2rem
    padding: 0 5px
    border: 0
    background: none
    font-size: 1.7rem
    text-align: center
    i
      color: $base-theme-color2
  
  +desktop
    .view-album
      max-width: 50%
      max-height: 50%
</style>