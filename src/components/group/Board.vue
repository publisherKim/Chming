<template lang="pug">
  .board-container
    loading-modal
    board-list(:boardList="boardList" :page="page")
    button.confirm(
      @click="changeRoute({name: 'group_writeArticle'})" 
      type="button"
    ) 글쓰기
</template>

<script>
  import LoadingModal from '@/components/common/LoadingModal';
  import BoardList from '@/components/group/BoardList';
  import { mapMutations } from 'vuex';

  export default {
    created() {
      this.getBoardList();
    },
    components: {
      LoadingModal,
      BoardList,
    },
    data() {
      return {
        boardList: [],
        page: 1,
      };
    },
    computed: {
      groupId() {
        return this.$route.params.id;
      },
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
              this.boardList = response.data.results;
              console.log('notice modify: ', response.data.results.length);
            }
          })
          .catch(error => {
            console.log(error);
          })
          .finally(() => {
            this.setIsLoading(false);
          });
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