<template lang="pug">
  .board-container
    board-list(
      ref="boardList"
      :boardList="boardList" 
      :page="page" 
      v-scroll="onScroll"
    )
    button.confirm(
      @click="changeRoute({name: 'group_articleWrite'})" 
      type="button"
    ) 글쓰기
</template>

<script>
  import BoardList from '@/components/group/BoardList';
  import {mapMutations} from 'vuex';
  
  export default {
    created() {
      this.getBoardList();
    },
    updated() {
      let boardWrapperTarget = this.$refs.boardList.$el;
      this.scrollBottom = boardWrapperTarget.scrollHeight - boardWrapperTarget.clientHeight;
    },
    components: {
      BoardList,
    },
    data() {
      return {
        boardList: [],
        albumListMax: 0,
        page: 1,
        scrollBottom: 0,
      };
    },
    computed: {
      groupId() {
        return this.$route.params.id;
      },
      currentScrollPosition() {
        return this.position;
      }
    },
    methods: {
      ...mapMutations(['setIsLoading']),
      changeRoute(route) {
        this.$router.push(route);
      },
      getBoardList() {
        let url = `/group/${this.groupId}/post/`;
        this.setIsLoading(true);
        this.$http.get(url, {
          params: {
            page: this.page,
          },
        })
          .then(response => {
            if(response.status === 200) {
              this.boardList.push(...response.data.results);
              this.albumListMax = Math.ceil(response.data.count/10);
            }
          })
          .catch(error => {
            console.log('error', error);
            console.log('error-message', error.response);
          })
          .finally(() => {
            this.setIsLoading(false);
          });
      },
      onScroll(e, position){
        let scrollTop = Math.ceil(position.scrollTop);
        if(scrollTop >= this.scrollBottom && this.page < this.albumListMax){
          this.page++;
          this.getBoardList();
        }
      } 
    },
  };
</script>

<style lang="sass" scoped>
  @import "~chming"

  .confirm 

    display: block
    margin: 2rem auto
    +action-button(8rem, 3rem)
</style>