<template lang="pug">
  ul
    li.list_item
      a(href="#none" role="button")
        h4.item_title 
          span.notice 공지 
          | 제목제목제목제목제목제목제목제목
        p.item_contents 내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용
      a.hamburger-menu(href="#none" role="button")
        i.fa.fa-bars(aria-hidden="true")
        span 1
      a.hamburger-menu(href="#none" role="button")
        i.fa.fa-bars(aria-hidden="true")
        span 22
    li.list_item
      .item_author
        p.author_name 홍길동
        p.author_date 2017.01.01
      a(href="#none" role="button")
        h4.item_title 
          | 제목제목제목제목제목제목제목제목
        p.item_contents 내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용
      a.hamburger-menu(href="#none" role="button")
        i.fa.fa-bars(aria-hidden="true")
        span 1
      a.hamburger-menu(href="#none" role="button")
        i.fa.fa-bars(aria-hidden="true")
        span 22
</template>

<script>
  export default {
    data() {  
      return {

      };
    },
  };
</script>

<style lang="sass" scoped>
  @import "~chming"

  .list_item
    +clearfix()
    +sideSpace()
    position: relative
    margin-top: 1.5rem
    padding-bottom : 1rem
    border-bottom: solid 1px #ccc
  .item_title
    font-size: 1.4rem
    +fit-text-in-box()
  .notice
    display: inline-block
    margin-right: 1rem
    padding: 0 0.5rem
    color: #fff
    background: #ff6600
  .item_contents
    margin-top: 0.5rem
    font-size: 1.2rem
    color: #666
    +fit-text-in-box()
  .hamburger-menu
    position: absolute
    top: 0
    right: 0  
</style>