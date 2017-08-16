<template lang="pug">
  .board-list-container
    p.empty(v-if="boardList.legnth === 0") 게시글을 작성해 주세요. 모임이 더욱 풍성해 진답니다.
    ul(v-if="boardList.length !== 0")
      //- li.list_item(v-if="boardList[0].post_type === true")
      //-   a(@click.prevent="changeRoute(1)" href="" role="button")
      //-     h4.item_title 
      //-       span.notice 공지
      //-       | {{boardList[0].title}}
      //-     p.item_contents {{boardList[0].contents}}
      //-   span.item_like
      //-     i.fa.fa-thumbs-up(aria-hidden="true")
      //-     span {{boardList[0].post_like_count}}
      //-   span.item_comment
      //-     i.fa.fa-comment(aria-hidden="true")
      //-     span {{boardList[0].comments_count}}
      li.list_item(v-for="board in boardList")
        .item_author(v-if="!board.post_type")
          img.author_image(:src="board.author.profile_image" :alt="board.author.username")
          p.author_name {{board.author.username}}
          p.author_date {{board.modified_date ? board.modified_date : board.created_date}}
        a(@click="changeRoute({name: 'group_viewArticle', params: {id: 7, articleId: board.pk}})" href="#none" role="button")
          h4.item_title(v-if="board.post_type") 
            span.notice 공지
            | {{boardList[0].title}}
          p.item_contents {{boardList[0].contents}}
          h4.item_title {{board.title}}
          p.item_contents {{board.content}}
        span.item_like
          i.fa.fa-thumbs-up(aria-hidden="true")
          span {{board.post_like_count}}
        span.item_comment
          i.fa.fa-comment(aria-hidden="true")
          span {{board.comments_count}}
</template>

<script>
  export default {
    props: {
      boardList : {
        type: Array,
        required: true
      }
    },
    methods: {
      changeRoute(id) {
        this.$router.push({name: 'group_viewArticle', params: {num: id}});
      }
    }
  };
</script>

<style lang="sass" scoped>
  @import "~chming"

  .empty 
    padding: 2rem
    text-align: center
  .list_item
    +clearfix()
    +side-space()
    position: relative
    padding : 2rem
    border-bottom: solid 1px #ccc
  .item_title
    width: calc(100% - 6rem)
    font-size: 1.4rem
    +fit-text-in-box()
  .notice
    display: inline-block
    margin-right: 1rem
    padding: 0 0.5rem
    font-weight: normal
    color: $base-action-color
    background: $base-point-color
  .item_contents
    margin-top: 0.5rem
    font-size: 1.2rem
    color: #666
    +fit-text-in-box()
  .item_like, .item_comment
    position: absolute
    top: 1.8rem
    span
      margin-left: 0.5rem
  .item_like
    right: 6rem
    i
      color: $base-point-color
  .item_comment
    right: 2rem  
    i
      color: #666
  .item_author
    +clearfix
    .author_image
      float: left
      max-width: 4rem
      max-height: 4rem
      border: solid 1px #ccc
      border-radius: 50%
    .author_name,
    .author_date
      display: block
      padding-left: 5rem
</style>