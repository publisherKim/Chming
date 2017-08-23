<template lang="pug">
  .board-list-container
    p.empty(v-if="boardList.length === 0") 게시글을 작성해 주세요. 모임이 더욱 풍성해집니다.
    ul(v-else)
      li.list_item(v-for="(board, index) in boardList" :class="{note: board.post_type}")
        .item_author(v-if="!board.post_type")
          .profile-image-wrap
            img.author_image(
              :ref="`profile_image${index}`"
              @load="imageSizeJudge(index)"
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
          h4.article-title(v-if="board.post_type") 
            span.notice 공지
            | {{board.title}}
          p.article-contents(aria-label="공지 내용") {{board.contents}}
          h4.article-title(v-if="!board.post_type") {{board.title}}
          p.article-contents(aria-label="글 내용") {{board.content}}
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
  import {mapGetters, mapMutations} from 'vuex';

  export default {
    props: {
      boardList : {
        type: Array,
        required: true,
      },
      page: {
        type: Number,
      },
      isReadable: {
        type: Boolean,
      },
    },
    computed: {
      ...mapGetters(['validateMessage']),
      groupId() {
        return this.$route.params.id;
      },
      isGroupHome() {
        return this.$route.name === 'group_info_home';
      },
    },
    methods: {
      ...mapMutations(['setToastMessage']),
      changeRoute(route) {
        this.$router.push(route);
      },
      viewArticle(board) {
        if(this.isGroupHome && !this.isReadable) return this.setToastMessage('접근 권한이 없습니다.');
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
      imageSizeJudge(index) {
        const img = this.$refs[`profile_image${index}`][0];
        const bigWidth = img.naturalWidth - img.naturalHeight > 0;

        if(!bigWidth) {
          img.classList.add('fit-width');
        }
      }
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
    border-bottom: 0.5px solid #ccc
  .article-title
    width: calc(100% - 7rem)
    +fit-text-in-box()
  .notice
    display: inline-block
    margin-right: 1rem
    padding: 0 0.5rem
    font-weight: normal
    color: $base-action-color
    background: $base-point-color
  .article-contents
    margin-top: 0.5rem
    width: calc(100% - 7rem)
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
    .author_name,
    .author_date
      display: block
      padding-left: 5rem
    .author_date
      font-size: 1.3rem
  .item_preview-image
    position: absolute
    bottom: 2rem
    right: 2rem
    width: 3.5rem
    height: 3.5rem
  .item_preview-image
      bottom: 2rem
  .note
    .item_preview-image
      bottom: 1rem

  .profile-image-wrap
    +circle(4rem, 4rem)
    z-index: 1
    img 
      +profileImagePosition(auto, 100%)
    .fit-width
      +profileImagePosition(100%, auto)
</style>