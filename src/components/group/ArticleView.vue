<template lang="pug">
  .board_detail-view-container
    group-header
    .detail-view_author-wrap
      img.author_img(src="../../assets/mingu.jpeg" :alt="boardDetail.author.username")
      p.author_name(aria-label="글쓴이") {{boardDetail.author.username}}
      p.author_date(aria-label="글 작성일자") {{boardDetail.modified_date ? boardDetail.modified_date : boardDetail.created_date}}
      p.notice {{boardDetail.post_type ? '공지사항' : '일반글'}}
    .detail-view_content-wrap
      h3.content_title(aria-label="글 제목") {{boardDetail.title}}
      pre(aria-label="글 내용") {{boardDetail.content}}
      img.content_photo(
        v-if="boardDetail.post_img"
        :src="boardDetail.post_img"
        :alt="boardDetail.title"
      )
    .detail-view_edit-wrap
      .column 
        a.edit_list(
          @click.prevent="changeRoute({name: 'group_info_board'}, {params: {id: groupId}})" 
          role="button"
        )
          i.fa.fa-list(aria-hidden="true")
          | 목록
      .column
        a.edit_modify(
            @click.prevent="editArticle" 
            role="button"
          )
          i.fa.fa-pencil-square-o(aria-hidden='true')
          | 수정
      .column
        a.edit_delete(
          @click.prevent="deleteBoardDetail"
          role="button"
        )
          i.fa.fa-trash(aria-hidden="true")
          | 삭제
    .detail-view_comment-wrap
      .column
        a.edit_like(
          @click.prevent="likeArticleToggle"
          role="button"
        )
          i.fa.fa-thumbs-up(aria-hidden="true")
          | 좋아요
      .column
        a.edit_comment(
          @click="toggleCommentInput"
          role="button"
        )
          i.fa.fa-comment(aria-hidden="true")
          | 댓글
    .detail-view_like-wrap(v-if="boardDetail.post_like_count")
      p.number-like(aria-label="좋아요한 인원수")
        i.fa.fa-thumbs-up(aria-hidden="true")
        span.num {{boardDetail.post_like_count}} 
        | 명이 좋아하셨습니다.
    .detail-view_author-comment-wrap(v-if="boardDetail.comment_set")
      .comment-list(v-for="comment in boardDetail.comment_set")
        img.author-comment_img(
          src="../../assets/mingu.jpeg" 
          alt="profile"
        )
        p.author-comment_name(aria-label="댓글 작성자") {{comment.author.username}}
        p.author-comment_date(aria-label="댓글 작성일자") {{comment.created_date}}
        p.author-comment_contents(aria-label="댓글 내용") {{comment.content}}
        a.author-comment_delete(
          v-if="comment.author.pk === userInfo.pk"
          @click.prevent="deleteComment(comment.pk)"
          role="button"
        )
          i.fa.fa-trash(aria-hidden="true" aria-label="댓글 삭제")
    .detail-view_comment-input-wrap(:class="{'active' : isCommentInputShow}")
      form
        input(
          v-model.trim="content"
          ref="content"
          type="text" 
          placehold="댓글을 달아주세요" 
          aria-label="댓글쓰기"
        )
        button(
          @click.prevent="createContent"
        ) 확인
</template>

<script>
  import GroupHeader from '@/components/common/Header';
  import { mapGetters, mapMutations } from 'vuex';

  export default {
    created() {
      this.getBoardDetail();
    },    
    components: {
      GroupHeader
    },
    data () {
      return {
        boardDetail : {
          author: {
            username : null
          },
          comment_set: null
        },
        isCommentInputShow: false,
        content : '',
      };
    },
    computed: {
      ...mapGetters(['userInfo']),
      groupId() {
        return this.$route.params.id;
      },
      articleId() {
        return this.$route.params.articleId;
      },
      isArticleAuthor() {
        let userInfo = this.userInfo;
        if(userInfo) {
          return this.boardDetail.author.pk === this.userInfo.pk;
        }
        return false;
      },
      isMaster() {
        let userInfo = this.userInfo;
        if(userInfo) {
          return this.boardDetail.group.author === this.userInfo.pk;
        }
        return false;
      },
      isArticleEditable() {
        return this.isArticleAuthor || this.isMaster;
      },
    },
    methods: {
      ...mapMutations(['setIsLoading']),
      changeRoute(route) {
        this.$router.push(route);
      },
      toggleCommentInput() {
        this.isCommentInputShow = !this.isCommentInputShow;
      },
      editArticle() {
        if(!this.isArticleEditable) return alert('작성자만 수정할 수 있습니다.');
        this.changeRoute({name: 'group_articleEdit', params: {id: this.groupId, articleId: this.articleId}});
      },
      createContent() {
        let url = `/group/${this.groupId}/post/${this.articleId}/comment/create/`;
        let token = sessionStorage.getItem('token');
        this.setIsLoading(true);
        this.$http.post(url, {content: `${this.content}`}, {headers: {Authorization: `Token ${token}`}})
          .then(response => {
            if(response.status === 201) {
              this.content = '';
              this.getBoardDetail();
              this.toggle();
              alert('댓글 작성이 등록되었습니다.');
            }
          })
          .catch(error => {
            console.log('error.response: ', error.response);
          })
          .finally(() => {
            this.setIsLoading(false);
          });
      },
      getBoardDetail() {
        let url = `/group/${this.groupId}/post/${this.articleId}/`;
        this.setIsLoading(true);
        this.$http.get(url, {
          params: {
            page: this.page,
          },
        })
          .then(response => {
            if(response.status === 200) {
              this.boardDetail = response.data;
            }
          })
          .catch(error => {
            console.log(error);
          })
          .finally(() => {
            this.setIsLoading(false);
          });
      },
      deleteBoardDetail() {
        if(!this.isArticleEditable) return alert('삭제 권한이 없습니다');
        
        let url = `/group/${this.groupId}/post/${this.articleId}/delete/`;
        let token = sessionStorage.getItem('token');
        this.setIsLoading(true);
        this.$http.delete(url, {headers: {Authorization: `Token ${token}`}})
          .then( response => {
            if( response.status === 200){
              console.log(response);
              alert('게시글이 삭제 되었습니다.');
              this.changeRoute({name: 'group_info_board'});
            }
          })
          .catch(error => {
            console.log('error.response: ', error.response);
          })
          .finally(() => {
            this.setIsLoading(false);
          });
      },
      deleteComment(commentId) {
        let url = `/group/${this.groupId}/post/comment/${commentId}/delete/`;
        let token = sessionStorage.getItem('token');
        this.setIsLoading(true);
        this.$http.delete(url, {headers: {Authorization: `Token ${token}`}})
          .then( response => {
            if( response.status === 200){
              this.getBoardDetail();
              alert('댓글이 삭제 되었습니다.');
            }
          })
          .catch(error => {
            console.log('error: ', error);
            console.log('error.response: ', error.response);
          })
          .finally(() => {
            this.setIsLoading(false);
          });
      },
      likeArticleToggle() {
        let url = `/group/${this.groupId}/post/${this.articleId}/like_toggle/`;
        let token = sessionStorage.getItem('token');
        this.setIsLoading(true);
        this.$http.post(url, null, {headers: {Authorization: `Token ${token}`}})
          .then(response => {
            if(response.status === 200){
              console.log(response);
              this.getBoardDetail();
            }
          })
          .catch(error => {
            console.log('error: ', error);
            console.log('error message:', error.response);
          })
          .finally(() => {
            this.setIsLoading(false);
          });
      }      
    }
  };
</script>

<style lang="sass" scoped>
  @import "~chming"
           
  .detail-view_author-wrap
    position: relative
    padding: 1rem 2rem 
    background: $viewArticle-color
    +clearfix()
    .notice
      position: absolute
      top: 1rem
      right: 2rem
      padding: 0 1rem
      border-radius: 5px
      color: $viewArticle-color
      background: $viewArticle-backround-color
  
  .detail-view_content-wrap
    margin: 2rem

  .detail-view_comment-wrap,
  .detail-view_edit-wrap,
  .detail-view_comment-input-wrap
    padding: 1rem 2rem
    border-top: solid 1px $viewArticle-backround-color
    background: $viewArticle-color
    .column
      text-align: center
    a 
      display: inline-block
      min-width: 8rem
      color: $base-theme-color2
      i
        margin-right: 5px
        color: inherit

  .detail-view_like-wrap, .detail-view_author-comment-wrap
    padding: 1rem 2rem
    border-top: solid 1px $viewArticle-color

  .comment-list
    position: relative
    padding: 1rem 0
    border-bottom: 1px solid $viewArticle-color

  .author_img, 
  .author-comment_img
    float: left
    +circle()
  .author_name,
  .author_date,
  .author-comment_name,
  .author-comment_date,
    $author-img-width : 6rem
    width: calc(100% - $author-img-width)
    margin-left: $author-img-width
    // margin-top: 0.3rem
  .author_date,
  .author-comment_date,
    font-size: 1.3rem
  .author_name,
  .author_date,
    color: $viewArticle-backround-color
  .content_photo
    max-width: 100%
  .author-comment_contents
    margin-top: 1rem
  .author-comment_delete
    position: absolute
    top: 1rem
    right: 2rem
  .detail-view_comment-input-wrap
    position: fixed
    bottom: 0
    display: none
    width: 100%
    background: #fff

  .active
    display: block

  i+span
    margin-left: 5px
  .detail-view_comment-input-wrap
    input
      +text-input(calc(100% - 5rem), 2rem)
      padding: 1.2rem 1rem
    button
      +action-button(4.5rem)
      margin-left: 0.5rem
  .number-like
    i, .num
      color: $group-like-color

  +mobile
    .detail-view_comment-wrap
      +container()
      .column
        +span(2)
    .detail-view_edit-wrap
      +container()
      .column
        +span(3 of 9)

  +desktop
    .detail-view_comment-wrap
      +container()
      .column
        +span(6)
    .detail-view_edit-wrap
      +container()
      .column
        +span(3 of 9)
</style>