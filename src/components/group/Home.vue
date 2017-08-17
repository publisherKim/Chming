<template lang="pug">
  .home-container
    .introduce-home-wrap
      img(
        :src="groupInfo.image" 
        alt="groupIntroduce"
      ) 
      p {{groupInfo.description}}
      p.address {{groupInfo.address}}
    .home_news-wrap
      h3.title 새소식
      board-list(:boardList="groupInfo.notice")
    button.home_join(v-if="isJoinable" @click="groupJoin" type="button") 가입하기
    button.home_modify(v-if="isAuthor" @click="changeRoute({name: 'group_edit'})" type="button") 수정하기
    .home_member-wrap
      h3.title 모임멤버 
        span.member-number {{groupInfo.member_count+1}} 명
      ul.member-list
        li.list-item
          img(
            :src="groupInfo.author.profile_img" 
            :alt="groupInfo.author.username"
          )
          span.item-name {{groupInfo.author.username}}
          span.item-position 모임장
        li.list-item(v-for="member in groupInfo.members")
          img(:src="member.profile_img" :alt="member.username")
          span.item-name {{member.username}}
</template>

<script>
  import BoardList from '@/components/group/BoardList';
  import { mapGetters, mapMutations } from 'vuex';

  export default {
    created() {
      this.getGroupInfo();
    },
    components: {
      BoardList,
    },
    data() {   
      return {
        groupId: this.$route.params.id,
        groupInfo: {
          // 비동기 통신 후 groupInfo를 받아오기 때문에, 최초 groupInfo.author 값이 null로 처리되지 않도록 설정
          author: {},
          members: [],
          notice: []
        },
      };
    },
    computed: {
      ...mapGetters(['url', 'userInfo']),
      isLogin() {
        return !!this.userInfo;
      },
      isMember() {
        let groupInfo = this.groupInfo;
        let userInfo = this.userInfo;
        if(groupInfo && userInfo) {
          return groupInfo.members.some(member => {
            return member.pk === userInfo.pk;
          });
        }
        return false;
      },
      isAuthor() {
        let userInfo = this.userInfo;
        if(userInfo) {
          return this.groupInfo.author.pk === userInfo.pk;
        }
        return false;
      },
      isJoinable() {
        return this.isLogin && !this.isMember && !this.isAuthor;
      },
    },
    methods: {
      ...mapMutations(['setIsLoading']),
      groupJoin() {
        let url = this.url.GROUP_JOIN + this.groupId + '/join/';
        let token = sessionStorage.getItem('token');

        this.setIsLoading(true);
        this.$http.post(url, null, {headers: {'Authorization': `Token ${token}`}})
          .then(response => {
            if(response.status === 200) {
              if(response.data.joined) {
                alert('모임 가입이 완료되었습니다.');
                location.reload();
              }
            }
          })
          .catch(error => {
            console.log('error:', error.response);
          })
          .finally(() => {
            this.setIsLoading(false);
          });
      },
      getGroupInfo() {
        let url = this.url.GROUP_DETAIL + this.groupId + '/';

        this.setIsLoading(true);
        this.$http.get(url)
          .then(response => {
            if(response.status === 200) {
              this.groupInfo = response.data;
              console.log(this.groupInfo);
            }
          })
          .catch(error => {
            console.log('error:', error.response);
          })
          .finally(() => {
            this.setIsLoading(false);
          });     
      },
      changeRoute(name){
        this.$router.push(name);
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
      width: 100%
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