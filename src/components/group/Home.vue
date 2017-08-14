<template lang="pug">
  .home-container
    .introduce-home-wrap
      img(
        :src="groupInfo.image" 
        width="100%" 
        alt="groupIntroduce"
      ) 
      p {{groupInfo.description}}
      p.address {{groupInfo.address}}
    .home_news-wrap
      h3.title 새소식
      board-list
    button.home_join(type="button") 가입하기
    button.home_modify(type="button") 수정하기
    .home_member-wrap
      h3.title 모임멤버 
        span.member-number {{groupInfo.member_count}} 명
      ul.member-list
        li.list-item
          img(
            :src="groupInfo.author.profile_img" 
            :alt="groupInfo.author.username"
          )
          span.item-name {{groupInfo.author.username}}
          span.item-position 모임장
        li.list-item(v-for="member in groupInfo.members")
          img(src="member.profile_img" alt="profileName")
          span.item-name {{member.username}}
</template>

<script>
  import BoardList from '@/components/group/BoardList';

  export default {
    created() {
      let data = this.getGroupInfo();
      console.log(data);
    },
    components: {
      BoardList
    },
    data() {   
      return {
        groupInfo: ''
      };
    },
    methods: {
      getGroupInfo() {
        this.$http.get('/group/7/')
          .then(response => {
            if(response.status === 200) {
              this.groupInfo = response.data;
              console.log(this.groupInfo);
            }
          })
          .catch(error => {
            console.log('error:', error.response);
          });        
      }
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
        float: leff        
      span 
        margin-left: 1rem 

  .introduce-home-wrap
    img
      display: block
      margin: 0 auto
      max-width: 640px
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