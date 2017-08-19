<template lang="pug">
  .board_detail-view-container
    group-header
    .detail-view_author-wrap
      img.author_img(src="../../assets/mingu.jpeg" alt="profile")
      p.author_name {{boardDetail.author.username}}
      p.author_date {{boardDetail.modified_date ? boardDetail.modified_date : boardDetail.created_date}}
      p.notice {{boardDetail.post_type ? '공지사항' : '일반글'}}
    .detail-view_content-wrap
      h3.content_title {{boardDetail.title}}
      pre {{boardDetail.content}}
      img.content_photo(
        v-if="boardDetail.post_img"
        :src="boardDetail.post_img"
      )
    .detail-view_edit-wrap
      .column 
        a.edit_list(
          @click.prevent="changeRoute({name: 'group_info_board'}, {params: {id: groupId}})" 
          role="button"
        )
          i.fa.fa-list(aria-hidden="true")
          span 목록
      .column
        a.edit_modify(
            @click.prevent="changeRoute({name: 'group_editArticle', params: {id: groupId, articleId: articleId}})" 
            role="button"
          )
          i.fa.fa-pencil-square-o(aria-hidden='true')
          span 수정
      .column
        a.edit_delete(
          @click.prevent="deleteBoardDetail"
          role="button"
        )
          i.fa.fa-trash(aria-hidden="true")
          span 삭제
    .detail-view_comment-wrap
      .column
        a.edit_like(role="button")
          i.fa.fa-thumbs-up(aria-hidden="true")
          span 좋아요
      .column
        a.edit_comment(
          @click="toggle"
          role="button"
        )
          i.fa.fa-comment(aria-hidden="true")
          span 댓글
    .detail-view_like-wrap(v-if="!boardDetail.post_like_count")
      p.number-like 
        i.fa.fa-thumbs-up(aria-hidden="true")
        span.num {{boardDetail.post_like_count}}
        | 명이 좋아하셨습니다.
    .detail-view_author-comment-wrap(
      v-if="" 
      v-for="comment in boardDetail.comment_set"
    )
      img.author-comment_img(src="../../assets/mingu.jpeg" alt="profile")
      p.author-comment_name comment.author
      p.author-comment_date comment.created_date
      p.author-comment_contents comment.content
    .detail-view_rewrite-wrap(:class="{'active' : isShow}")
      form
        input(type="text" placehold="댓글을 달아주세요" aria-label="댓글쓰기")
        button 확인        
</template>

<script>
  import GroupHeader from '@/components/common/Header';
  import { mapMutations } from 'vuex';

  export default {
    created() {
      this.getBoardDetail();
    },    
    components: {
      GroupHeader
    },
    data (){
      return {
        boardDetail : {
          author: {
            username : null
          },
          comment_set: null
        },
        isShow: false,
      };
    },
    computed: {
      groupId() {
        return this.$route.params.id;
      },
      articleId(){
        return this.$route.params.articleId;
      }
    },
    methods: {
      ...mapMutations(['setIsLoading']),
      changeRoute(route) {
        this.$router.push(route);
      },
      changeContent(num) {
        this.$router.push({ name: 'group_editArticle', query: {num: num} });
      },
      toggle() {
        this.isShow = !this.isShow;
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
              console.log(response);
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
      deleteBoardDetail(){
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
  .detail-view_rewrite-wrap
    padding: 1rem 2rem
    border-top: solid 1px $viewArticle-backround-color
    background: $viewArticle-color
    a 
      display: inline-block
      min-width: 8rem
    i, i+span
      color: $base-theme-color2

  .detail-view_like-wrap, .detail-view_author-comment-wrap
    padding: 1rem 2rem
    border-top: solid 1px $viewArticle-color

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
    margin-top: 0.3rem
  .author_name,
  .author_date,
    color: $viewArticle-backround-color
  .content_photo
    width: 100%
  .author-comment_contents
    margin-top: 1rem

  .detail-view_rewrite-wrap
    position: fixed
    bottom: 0
    display: none
    width: 100%
    background: #fff

  .active
    display: block

  i+span
    margin-left: 5px
  .detail-view_rewrite-wrap
    input
      +text-input(calc(100% - 4rem), 2rem)
      padding: 1.2rem 1rem
    button
      +action-button()
      margin-left: 0.5rem

  +mobile
    .detail-view_comment-wrap
      +container()
      .column
        +span(2)
        text-align: center
      span 
        margin-left: 5px
    .detail-view_edit-wrap
      +container()
      .column
        +span(3 of 9)
        text-align: center

  +desktop
    .detail-view_comment-wrap
      +container()
      .column
        +span(6)
        text-align: center
      span 
        margin-left: 5px
    .detail-view_edit-wrap
      +container()
      .column
        +span(3 of 9)
        text-align: center
</style>
