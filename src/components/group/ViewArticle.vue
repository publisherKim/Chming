<template lang="pug">
  .board_detail-view-container
    group-header
    .detail-view_author-wrap
      img.author_img(src="../../assets/mingu.jpeg" alt="profile")
      p.author_name 홍길동
      p.author_date 2017.01.01
      p.notice 공지사항
    .detail-view_content-wrap
      pre {{text}}
    .detail-view_edit-wrap
      .column 
        a.edit_list(@click.prevent="changeRoute" href="#none" role="button")
          i.fa.fa-list(aria-hidden="true")
          span 목록
      .column
        a.edit_modify(@click.prevent="changeContent(1)" href="" role="button")
          i.fa.fa-pencil-square-o(aria-hidden='true')
          span 수정
      .column
        a.edit_delete(@click.prevent="deleteContent" href="" role="button")
          i.fa.fa-trash(aria-hidden="true")
          span 삭제
    .detail-view_comment-wrap
      .column
        a.edit_like(href="#none" role="button")
          i.fa.fa-thumbs-up(aria-hidden="true")
          span 좋아요
      .column
        a.edit_comment(@click="toggle" href="#none" role="button")
          i.fa.fa-comment(aria-hidden="true")
          span 댓글
    .detail-view_like-wrap
      p.number-like 
        i.fa.fa-thumbs-up(aria-hidden="true")
        span.num 2
        | 명이 좋아하셨습니다.
    .detail-view_author-comment-wrap
      img.author-comment_img(src="../../assets/mingu.jpeg" alt="profile")
      p.author-comment_name 홍길동
      p.author-comment_date 2017.01.01
      p.author-comment_contents 내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용
    .detail-view_author-comment-wrap
      img.author-comment_img(src="../../assets/mingu.jpeg" alt="profile")
      p.author-comment_name 홍길동
      p.author-comment_date 2017.01.01
      p.author-comment_contents 내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용
    .detail-view_rewrite-wrap(:class="{'active' : isShow}")
      form
        input(type="text" placehold="댓글을 달아주세요" aria-label="댓글쓰기")
        button 확인        
</template>

<script>
  import GroupHeader from '@/components/common/Header';

  export default {
    components: {
      GroupHeader
    },
    data (){
      return {
        text: `data data datadata
datadatadatadatadatadata
datadatadatadatadatadata\ndatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadata`,
        isShow: false,
      };
    },
    methods: {
      toggle() {
        this.isShow = !this.isShow;
      },
      changeRoute() {
        this.$router.go(-1);
      },
      changeContent(num) {
        this.$router.push({ name: 'group_editArticle', query: {num: num} });
      },
      deleteContent(){
        this.$router.go(-1);
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
