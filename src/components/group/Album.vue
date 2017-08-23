<template lang="pug">
  .album-container(
    ref="albumList"
    v-scroll="onScroll"
  )
    ul.album-list
      li.list-item(v-for="(album, index) in albumList")
        .album_image-wrap
          a.image_modal-big(@click.prevent="viewAlbum(index)")
            img(:src="album.post_img", alt="유저가 올린 사진 입니다.")
    album-view(
      v-if="imageKey !== null"
      :isActiveProp="isActive" 
      :albumListProp="albumList" 
      :imageKeyProp="imageKey"
      @closeModal="imageKey=null"
    )
</template>

<script>
  import AlbumView from '@/components/group/AlbumView';
  import {mapMutations} from 'vuex';
  import defaultImage from '@/assets/default.png';

  export default {
    created() {
      this.getAlbumList();
    },
    updated() {
      let albumWrapperTarget = this.$refs.albumList;
      this.scrollBottom = albumWrapperTarget.scrollHeight - albumWrapperTarget.clientHeight;
    },
    components: {
      AlbumView
    },
    computed: {
      groupId() {
        return this.$route.params.id;
      },
    },
    data() {
      return {
        albumList: [],
        albumListMax: 0,
        page: 1,
        scrollBottom: 0,
        isActive: false,
        imageKey: null
      };
    },
    methods: {
      ...mapMutations(['setIsLoading']),
      getAlbumList() { 
        let url = `/group/${this.groupId}/post/img/`;
        this.setIsLoading(true);
        this.$http(url,{
          params: {
            page: this.page,
          },
        })
          .then( response => {
            this.albumList.push(...response.data.results);
            this.albumListMax = Math.ceil(response.data.count/10);
          })
          .catch( error => {
            console.log(error);
            console.log(error.response);
          })
          .finally( () => {
            this.setIsLoading(false);
          });
      },
      viewAlbum(index) {
        this.imageKey = index;
        this.isActive = !this.isActive;
      },
      onScroll(e, position){
        if(position.scrollTop >= this.scrollBottom && this.page < this.albumListMax){
          this.page = this.page+1;
          this.getAlbumList();
        }
      } 
    }    
  };
</script>

<style lang="sass" scoped>
  @import "~chming"

  .list-item
    margin-top: 1rem
  .album-container
    height: calc(100vh - 9rem)
    overflow-y: scroll
  .album_image-wrap
    position: relative
    height: 0
    padding-top: 80%
    overflow: hidden
    img
      position: absolute
      top: 50%
      left: 50%
      max-width: 100%
      transform: translate(-50%, -50%)

  +mobile
    .album-list
      +container()
    .list-item
      +span(2)
      
  +desktop
    .album-list
      +container()
    .list-item
      +span(2)
</style>