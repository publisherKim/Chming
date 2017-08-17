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
        // boardList: [{
        //   'pk': 4,
        //   'post_type': true,
        //   'title': '수정글입니다.2',
        //   'content': '내용 수정중~',
        //   'post_img': 'https://s3.ap-northeast-2.amazonaws.com/chming-bucket/media/group/2017/08/15/%E1%84%86%E1%85%A1%E1%86%AB%E1%84%84%E1%85%A6.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAI43LUFGDQVXUPBOA%2F20170816%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20170816T105441Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=642dab05f1d8d2da1708b450a529482defb2f78d861fae3eb39fbbec4f97f445',
        //   'author': {
        //     'pk': 2,
        //     'username': '송만세',
        //     'profile_image': 'https://s3.ap-northeast-2.amazonaws.com/chming-bucket/media/group/2017/08/15/%E1%84%86%E1%85%A1%E1%86%AB%E1%84%84%E1%85%A6.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAI43LUFGDQVXUPBOA%2F20170816%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20170816T105441Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=642dab05f1d8d2da1708b450a529482defb2f78d861fae3eb39fbbec4f97f445' 
        //   },
        //   'created_date': '2017-08-14',
        //   'modified_date': '2017-08-14',
        //   'comments_count': 1,
        //   'post_like_count': 0
        // },{
        //   'pk': 4,
        //   'post_type': false,
        //   'title': '게시글입니다.',
        //   'content': '게시글 내용입니다.',
        //   'post_img': 'https://s3.ap-northeast-2.amazonaws.com/chming-bucket/media/group/2017/08/15/%E1%84%86%E1%85%A1%E1%86%AB%E1%84%84%E1%85%A6.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAI43LUFGDQVXUPBOA%2F20170816%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20170816T121356Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=ca3ef617a2274d936dd545e3f557999eca4328f14720e3acb3e4568d42434d43',
        //   'author': {
        //     'pk': 2,
        //     'username': '송만세',
        //     'profile_image': 'https://s3.ap-northeast-2.amazonaws.com/chming-bucket/media/group/2017/08/15/%E1%84%86%E1%85%A1%E1%86%AB%E1%84%84%E1%85%A6.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAI43LUFGDQVXUPBOA%2F20170816%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20170816T121356Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=ca3ef617a2274d936dd545e3f557999eca4328f14720e3acb3e4568d42434d43'
        //   },
        //   'created_date': '2017-08-14',
        //   'modified_date': '2017-08-14',
        //   'comments_count': 20,
        //   'post_like_count': 20
        // },{
        //   'pk': 4,
        //   'post_type': false,
        //   'title': '게시글2입니다.',
        //   'content': '게시글2 내용입니다.',
        //   'post_img': 'https://s3.ap-northeast-2.amazonaws.com/chming-bucket/media/group/2017/08/15/%E1%84%86%E1%85%A1%E1%86%AB%E1%84%84%E1%85%A6.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAI43LUFGDQVXUPBOA%2F20170816%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20170816T105441Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=642dab05f1d8d2da1708b450a529482defb2f78d861fae3eb39fbbec4f97f445',
        //   'author': {
        //     'pk': 2,
        //     'username': '송만세',
        //     'profile_image': 'https://s3.ap-northeast-2.amazonaws.com/chming-bucket/media/group/2017/08/15/%E1%84%86%E1%85%A1%E1%86%AB%E1%84%84%E1%85%A6.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAI43LUFGDQVXUPBOA%2F20170816%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20170816T105441Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=642dab05f1d8d2da1708b450a529482defb2f78d861fae3eb39fbbec4f97f445'
        //   },
        //   'created_date': '2017-08-14',
        //   'modified_date': null,
        //   'comments_count': 20,
        //   'post_like_count': 20
        // },{
        //   'pk': 4,
        //   'post_type': true,
        //   'title': '수정글입니다.2',
        //   'content': '내용 수정중~',
        //   'post_img': 'https://s3.ap-northeast-2.amazonaws.com/chming-bucket/media/group/2017/08/15/%E1%84%86%E1%85%A1%E1%86%AB%E1%84%84%E1%85%A6.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAI43LUFGDQVXUPBOA%2F20170816%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20170816T105441Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=642dab05f1d8d2da1708b450a529482defb2f78d861fae3eb39fbbec4f97f445',
        //   'author': {
        //     'pk': 2,
        //     'username': '송만세',
        //     'profile_image': 'https://s3.ap-northeast-2.amazonaws.com/chming-bucket/media/group/2017/08/15/%E1%84%86%E1%85%A1%E1%86%AB%E1%84%84%E1%85%A6.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAI43LUFGDQVXUPBOA%2F20170816%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20170816T105441Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=642dab05f1d8d2da1708b450a529482defb2f78d861fae3eb39fbbec4f97f445' 
        //   },
        //   'created_date': '2017-08-14',
        //   'modified_date': '2017-08-14',
        //   'comments_count': 1,
        //   'post_like_count': 0
        // }],
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