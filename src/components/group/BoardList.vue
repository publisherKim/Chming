<template lang="pug">
  .board-list-container
    p.empty(v-if="boardList.length === 0") 게시글을 작성해 주세요. 모임이 더욱 풍성해집니다.
    ul(v-else)
      li.list_item(v-for="board in boardList")
        .item_author(v-if="!board.post_type")
          img.author_image(
            :src="board.author.profile_img"
            :alt="board.author.username"
          )
          p.author_name(aria-label="글쓴이") {{board.author.username}}
          p.author_date(aria-label="글 작성일자") {{board.modified_date ? board.modified_date : board.created_date}}
        a(
          @click="viewArticle(board)"
          role="button"
          aria-label="작성글 보기"
        )
          h4.item_title(v-if="board.post_type") 
            span.notice 공지
            | {{board.title}}
          p.item_contents(aria-label="공지 내용") {{board.contents}}
          h4.item_title(v-if="!board.post_type") {{board.title}}
          p.item_contents(aria-label="글 내용") {{board.content}}
        span.item_like
          i.fa.fa-thumbs-up(aria-hidden="true")
          span(aria-label="게시글 좋아요 수") {{board.post_like_count}}
        span.item_comment
          i.fa.fa-comment(aria-hidden="true")
          span(aria-label="게시글 댓글 수") {{board.comments_count}}
        img.item_preview-image(
          v-if="board.post_img"
          :src="board.post_img"
          :alt="board.title"
        )
</template>

<script>
  import { mapGetters } from 'vuex';

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
      ...mapGetters(['validateMessage']),
      groupId() {
        return this.$route.params.id;
      },
    },
    methods: {
      changeRoute(route) {
        this.$router.push(route);
      },
      viewArticle(board) {
        this.changeRoute({
          name: 'group_articleView',
          params: {
            id: this.groupId,
            articleId: board.pk,
          },
          query: {
            page: this.page,
          },
        });
      },
    },
  };
</script>

<style lang="sass" scoped>
  @import "~chming"
  .board-container
    .board-list-container
      overflow-y: scroll
      height: calc(100vh - 16rem)

  .empty 
    padding: 2rem
    text-align: center
  .list_item
    +clearfix()
    position: relative
    padding: 1.5rem 2rem
    border-bottom: solid 1px #ccc
  .item_title
    width: calc(100% - 6rem)
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
    font-size: 1.3rem
    color: #666
    +fit-text-in-box()
  .item_like, .item_comment
    position: absolute
    top: 1rem
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
      border-radius: 50%
    .author_name,
    .author_date
      display: block
      padding-left: 5rem
    .author_date
      font-size: 1.3rem
  .item_preview-image
    position: absolute
    top: 3.5rem
    right: 2rem
    max-width: 3.5rem
    max-height: 3.5rem
</style>