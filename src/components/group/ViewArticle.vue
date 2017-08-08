<template lang="pug">
  .board_detail-view-container
    group-header
    .detail-view_author-wrap
      p.author_name 홍길동
      p.author_date 2017.01.01
      p.notice 공지사항
    .detail-view_content-wrap
      pre {{text}}
    .detail-view_edit-wrap
      .column 
        a.hamburger-menu(@click.prevent="changeRoute" href="#none" role="button")
          i.fa.fa-bars(aria-hidden="true")
          span 목록
      .column
        a.hamburger-menu(@click.prevent="changeContent(1)" href="" role="button")
          i.fa.fa-bars(aria-hidden="true")
          span 수정
      .column
        a.hamburger-menu(@click.prevent="deleteContent" href="" role="button")
          i.fa.fa-bars(aria-hidden="true")
          span 삭제
    .detail-view_comment-wrap
      .column
        a.hamburger-menu(href="#none" role="button")
          i.fa.fa-bars(aria-hidden="true")
          span 좋아요
      .column
        a.hamburger-menu(@click="toggle" href="#none" role="button")
          i.fa.fa-bars(aria-hidden="true")
          span 댓글
    .detail-view_like-wrap
      p.number-like 
        img(src="/assets/" alt="좋아요")
        | 2명이 좋아하셨습니다.
    .detail-view_author-comment-wrap
      p.author-comment_name 홍길동
      p.author-comment_date 2017.01.01
      p.author-comment_contents 내용내용내용
    .detail-view_rewrite-wrap(:class="{'active' : isShow}")
      form
        input(type="text" placehold="댓글을 달아주세요" aria-label="댓글쓰기")
        button 전송        
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
    padding: 1rem 8rem
    border-top: solid 1px #ccc
    border-bottom: solid 1px #ccc
    .notice
      position: absolute
      top: 1rem
      right: 2rem
  
  .detail-view_content-wrap
    margin: 2rem
    padding: 1rem
    border: solid 1px #ccc

  .detail-view_comment-wrap,
  .detail-view_edit-wrap,
  .detail-view_like-wrap,
  .detail-view_author-comment-wrap,
  .detail-view_rewrite-wrap
    padding: 1rem 2rem
    border-top: solid 1px #ccc
    a 
      display: inline-block
      min-width: 8rem

  .detail-view_rewrite-wrap
    position: fixed
    bottom: 0
    display: none
    width: 100%
    background: #fff

  .active
    display: block

  .detail-view_rewrite-wrap
    input
      width: calc(100% - 3.5rem)
      padding: 0 1rem
    button
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
</style>
