<template lang="pug">
  .board_detail-view-container
    group-header
    .detail-view_author-wrap
      .profile-image-wrap
        img.author_img(
          ref="profile_image0"
          @load="imageSizeJudge(0)"
          :src="boardDetail.author.profile_img" 
          :alt="boardDetail.author.username"
        )
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
          href
          @click.prevent="changeRoute({name: 'group_info_board'}, {params: {id: groupId}})" 
          role="button"
        )
          i.fa.fa-list(aria-hidden="true")
          | 목록
      .column
        a.edit_modify(
          href
            @click.prevent="editArticle" 
            role="button"
        )
          i.fa.fa-pencil-square-o(aria-hidden='true')
          | 수정
      .column
        a.edit_delete(
          href
          @click.prevent="deleteBoardDetail"
          role="button"
        )
          i.fa.fa-trash(aria-hidden="true")
          | 삭제
    .detail-view_comment-wrap
      .column
        a.edit_like(
          href
          @click.prevent="likeArticleToggle"
          role="button"
        )
          i.fa.fa-thumbs-up(aria-hidden="true")
          | 좋아요
      .column
        a.edit_comment(
          href
          @click.prevent="toggleCommentInput"
          role="button"
        )
          i.fa.fa-comment(aria-hidden="true")
          | 댓글
    .detail-view_like-wrap(v-if="boardDetail.post_like_count")
      p.number-like(aria-label="좋아요한 인원수")
        i.fa.fa-thumbs-up(aria-hidden="true")
        span.num {{boardDetail.post_like_count}} 
        | 명이 좋아하셨습니다.
    .detail-view_comment-header
      span.comment-number(aria-label="댓글 수") 댓글 {{boardDetail.comments_count}}
      a.comment-arrange(
        href
        role="button"
        @click.prevent="arrangeCommentByCreateDate"
        aria-label="최신순 정렬"
      ) 최신순 보기

    .detail-view_author-comment-wrap(v-if="boardDetail.comment_set && boardDetail.comment_set.length")
      .comment-list(v-for="(comment, index) in boardDetail.comment_set")
        .profile-image-wrap
          img.author-comment_img(
            :ref="`profile_image${index+1}`"
            @load="imageSizeJudge(index+1)"
            :src="comment.author.profile_img" 
            alt="profile"
          )
        p.author-comment_name(aria-label="댓글 작성자") {{comment.author.username}}
        p.author-comment_date(aria-label="댓글 작성일자") {{comment.created_date}}
        p.author-comment_contents(aria-label="댓글 내용") {{comment.content}}
        a.author-comment_delete(
          v-if="userInfo && comment.author.pk === userInfo.pk"
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
          @click.prevent="createComment"
        ) 확인
</template>

<script>
  import GroupHeader from '@/components/common/Header';
  import {mapGetters, mapMutations} from 'vuex';
  import defaultImage from '@/assets/default.png';

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
          comment_set: null,
          post_img: defaultImage      
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
      ...mapMutations(['setIsLoading', 'setToastMessage']),
      changeRoute(route) {
        this.$router.push(route);
      },
      toggleCommentInput() {
        this.isCommentInputShow = !this.isCommentInputShow;
      },
      editArticle() {
        if(!this.isArticleEditable) return this.setToastMessage('수정 권한이 없습니다.');
        this.changeRoute({name: 'group_articleEdit', params: {id: this.groupId, articleId: this.articleId}});
      },
      createComment() {
        let url = `/group/${this.groupId}/post/${this.articleId}/comment/create/`;
        let token = sessionStorage.getItem('token');
        this.setIsLoading(true);
        this.$http.post(url, {content: `${this.content}`}, {headers: {Authorization: `Token ${token}`}})
          .then(response => {
            if(response.status === 201) {
              this.content = '';
              this.getBoardDetail();
              this.toggleCommentInput();
              this.setToastMessage('댓글 작성이 등록되었습니다.');
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
        if(!this.isArticleEditable) return this.setToastMessage('삭제 권한이 없습니다');
        if(!confirm('게시글을 삭제하시겠습니까?')) return;
        
        let url = `/group/${this.groupId}/post/${this.articleId}/delete/`;
        let token = sessionStorage.getItem('token');
        this.setIsLoading(true);
        this.$http.delete(url, {headers: {Authorization: `Token ${token}`}})
          .then( response => {
            if( response.status === 200){
              this.setToastMessage('게시글이 삭제 되었습니다.');
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
        if(!confirm('댓글을 삭제하시겠습니까?')) return;
        
        let url = `/group/${this.groupId}/post/comment/${commentId}/delete/`;
        let token = sessionStorage.getItem('token');
        this.setIsLoading(true);
        this.$http.delete(url, {headers: {Authorization: `Token ${token}`}})
          .then( response => {
            if( response.status === 200){
              this.getBoardDetail();
              this.setToastMessage('댓글이 삭제 되었습니다.');
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
      },
      arrangeCommentByCreateDate() {
        this.boardDetail.comment_set.sort((detail1, detail2) => {
          return detail1.created_date < detail2.created_date;
        });
      },
      imageSizeJudge(index) {
        const $profileImage = this.$refs[`profile_image${index}`];
        const img = index === 0 ?  $profileImage : $profileImage[0];
        const bigWidth = img.naturalWidth - img.naturalHeight > 0;

        if(!bigWidth) {
          img.classList.add('fit-width');
        }
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

  .board_detail-view-container
    .detail-view_comment-input-wrap
      background: rgba(255, 255, 255, 0.5) !important
      z-index: 100
      
  .detail-view_like-wrap,
  .detail-view_comment-header
    padding: 1rem 2rem
    border-bottom: 1px solid #ccc

  .detail-view_comment-header
    +clearfix
    .comment-number
      float: left
    .comment-arrange
      float: right

  .comment-list
    position: relative
    padding: 1rem 2rem
    border-bottom: 0.5px solid #ccc

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

  .profile-image-wrap
    +circle(4rem, 4rem)
    z-index: 1
    img 
      +profileImagePosition(auto, 100%)
    .fit-width
      +profileImagePosition(100%, auto)

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
