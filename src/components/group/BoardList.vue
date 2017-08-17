<template lang="pug">
  .board-list-container
    p.empty(v-if="boardList.length === 0") 게시글을 작성해 주세요. 모임이 더욱 풍성해집니다.
    ul(v-else)
      li.list_item(v-for="board in boardList")
        .item_author(v-if="!board.post_type")
          img.author_image(:src="board.author.profile_img" :alt="board.author.username")
          p.author_name {{board.author.username}}
          p.author_date {{board.modified_date ? board.modified_date : board.created_date}}
        a(
          @click="changeRoute({name: 'group_viewArticle', params: {id: groupId, articleId: board.pk}, query: {page}})"
          role="button"
        )
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
        img.item_preview-image(:src="board.post_img")
</template>

<script>
  export default {
    props: {
      boardList : {
        type: Array,
        required: true,
      },
      page: {
        tyep: Number,
      },
    },
    computed: {
      groupId() {
        return this.$route.params.id;
      },
    },
    methods: {
      changeRoute(route) {
        this.$router.push(route);
      }
    },
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
  .item_preview-image
    position: absolute
    top: 4.5rem
    right: 2rem
    max-width: 4rem
    max-height: 4rem
</style>