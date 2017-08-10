<template lang="pug">
  .home-container
    .introduce-home-wrap
      img(src="../../assets/group.jpg" width="100%" alt="groupIntroduce") 
      p testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest
      p.address 경기도 성남시 분당구 265-2
    .home_news-wrap
      h3.title 새소식
      board-list
    button.home_join(type="button") 가입하기
    button.home_modify(type="button") 수정하기
    .home_member-wrap
      h3.title 모임멤버 
        span.member-number 57 명
      ul.member-list
        li.list-item
          img(src="../../assets/mingu.jpeg" alt="profileName")
          span.item-name 홍길동
          span.item-position 모임장
        li.list-item
          img(src="../../assets/mingu.jpeg" alt="profileName")
          span.item-name 홍길동
</template>

<script>
  import BoardList from '@/components/group/BoardList';

  export default {
    components: {
      BoardList
    },
    data() {  
      return {

      };
    },
  };
</script>

<style lang="sass" scoped>
  @import "~chming"
  .home-container
    li
      +clearfix()
      +side-space()
      position: relative
      padding: 1.5rem 2rem
      border-bottom: solid 1px #ccc
      img 
        float: left
      span 
        margin-left: 1rem 

  .introduce-home-wrap
    p
      padding: 1rem 2rem
      line-height: 2.6rem
  .title
    +sub-title_group()
  .member-number
    color: $group-home-member-number-color
  .list-item
    img
      +circle()

  .home_join,
  .home_modify
    +action-button
    display: block
    margin: 1rem auto
    padding: 0.5rem 1rem
  .item-position
    float: right      
</style>