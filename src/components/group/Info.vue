<template lang="pug">
  .info-container
    group-header
    tab-menu
    .introduce-info-wrap
      img(src="../../assets/group.jpg" width="100%" alt="groupIntroduce") 
      p testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest
      p.address 경기도 성남시 분당구 265-2
    .info_news-wrap
      h3.title 새소식
      board-list
    button.info_join(type="button") 가입하기
    button.info_join(type="button") 수정하기
    .info_member-wrap
      h3.title 모임멤버 
        span.member-number 57 명
      ul.member-list
        li.list-item
          img(src="/assets/" alt="profileName")
          span.item-name 홍길동
          span.item-position 모임장
        li.list-item
          img(src="/assets/" alt="profileName")
          span.item-name 홍길동
</template>

<script>
  import GroupHeader from '@/components/common/Header';
  import TabMenu from '@/components/group/TabMenu';
  import BoardList from '@/components/group/BoardList';

  export default {
    components: {
      GroupHeader,
      TabMenu,
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
  .info-container
    li
      +clearfix()
      +side-space()
      position: relative
      margin-top: 1.5rem
      padding-bottom : 1rem
      border-bottom: solid 1px #ccc
  .introduce-info-wrap
    p
      padding: 1rem 3rem
      line-height: 2.6rem
  .title
    +sub-title_group()
  .member-number
    color: $base-point-color

  .info_join
    +action-button
    display: block
    margin: 1rem auto
    padding: 0.5rem 1rem
  .item-position
    float: right      
</style>