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
  import {mapGetters, mapMutations} from 'vuex';
  import defaultImage from '@/assets/default.png';

  export default {
    beforeRouteEnter (to, from, next) {
      let token = sessionStorage.getItem('token');
      !token && next({name: 'main'});
      token && next();
    },
    created() {
      if(!this.isAccessible) this.goToGroupHome();
      else this.getAlbumList();
    },
    updated() {
      let albumWrapperTarget = this.$refs.albumList;
      this.scrollBottom = albumWrapperTarget.scrollHeight - albumWrapperTarget.clientHeight;
    },
    components: {
      AlbumView
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
    computed: {
      ...mapGetters(['userInfo']),
      groupId() {
        return this.$route.params.id;
      },
      isAccessible() {
        let userInfo = this.userInfo;
        let groupId = this.groupId;
        if(userInfo) {
          let isJoinedGroup = userInfo.joined_groups.some(group => {
            return Number(groupId) === group.pk;
          });
          let isOpenGroup = userInfo.open_groups.some(group => {
            return Number(groupId) === group.pk;
          });
          return isJoinedGroup || isOpenGroup;
        } else return false;
      },
    },
    methods: {
      ...mapMutations(['setIsLoading']),
      changeRoute(route) {
        this.$router.push(route);
      },
      goToGroupHome() {
        this.changeRoute({name: 'group_info_home', params: {id: this.groupId}});
      },
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