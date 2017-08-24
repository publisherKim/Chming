<template lang="pug">
  .home-container
    .introduce-home-wrap
      img.group-image(
        :src="`${groupInfo.image}`" 
        alt="groupIntroduce"
      )
      .group-info-wrap
        p.group-name-wrap
          hobby-icon.group_hobby-icon(
            v-if="groupInfo.hobby"
            :hobby="groupInfo.hobby[0]"
            :title="groupInfo.hobby[0]"
          )
          span.group-name(aria-labe="그룹명") {{groupInfo.name}}
        pre.group-description(aria-label="모임 소개") {{groupInfo.description}}
        p.group-address(aria-label="모임 주요 활동지역")
          i.fa.fa-map-marker(aria-hidden='true')
          | {{groupInfo.address}}
        a.introduce-home_like(
          v-if="!isAuthor"
          :class="{'is-active': likeToggle}"
          @click.prevent="favoriteGroupToggle"
          :title="likeToggleLabel"
          :aria-label="likeToggleLabel"
        )
          i.fa(
            :class="likeToggle ? 'fa-heart' : 'fa-heart-o'"
            aria-hidden="true"
            aria-label="관심모임"
          )
    .home_news-wrap
      h3.title 새소식
      board-list(:isReadable="isMember || isAuthor" :boardList="groupInfo.notice")
    button.home_join(v-if="isJoinable || !isLogin" @click="groupJoin" type="button") 가입하기
    button.home_modify(v-if="isAuthor" @click="changeRoute({name: 'group_edit'})" type="button") 수정하기
    .home_member-wrap
      h3.title 모임멤버 
        span.member-number(aria-label="모임 인원수") {{groupInfo.member_count}} 명
      ul.member-list
        li.member-list-item
          .profile-image-wrap
            img(
              ref="profile_image0"
              @load="fitImageSize(0)"
              :src="groupInfo.author.profile_img" 
              :alt="groupInfo.author.username"
            )
          span.author-name(aria-label="모임장 이름") {{groupInfo.author.username}}
          span.author-position(aria-label="모임장 여부") 모임장
        li.member-list-item(v-for="(member, index) in groupInfo.members")
          .profile-image-wrap
            img(
              :ref="`profile_image${index+1}`"
              @load="fitImageSize(index+1)"
              :src="member.profile_img" 
              :alt="member.username"
            )
          span.member-name {{member.username}}
</template>

<script>
  import BoardList from '@/components/group/BoardList';
  import {mapGetters, mapMutations, mapActions} from 'vuex';
  import defaultImage from '@/assets/default.png';
  import HobbyIcon from '@/components/common/HobbyIcon';

  export default {
    created() {
      this.getGroupInfo();
    },
    components: {
      HobbyIcon,
      BoardList,
    },
    data() {   
      return {
        groupId: this.$route.params.id,
        groupInfo: {
          // 비동기 통신 후 groupInfo를 받아오기 때문에, 최초 groupInfo.author 값이 null로 처리되지 않도록 설정
          author: {},
          members: [],
          notice: [],
          image: defaultImage
        },
        likeUsers: [],
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
      likeToggleLabel() {
        return this.likeToggle ? '모임 좋아요 취소' : '모임 좋아요';
      },
      likeToggle() {
        let userInfo = this.userInfo;
        if(userInfo) {
          return this.likeUsers.some((user)=> {
            return user.pk === userInfo.pk;
          });
        }
        else return false;
      },
    },
    methods: {
      ...mapMutations(['setIsLoading', 'setToastMessage']),
      ...mapActions(['getUserProfile']),
      groupJoin() {
        if(!this.isLogin) return this.setToastMessage('로그인을 해주세요.');
        if(!confirm('모임에 가입하시겠습니까?')) return;
        let url = this.url.GROUP_JOIN + this.groupId + '/join/';
        let token = sessionStorage.getItem('token');

        this.setIsLoading(true);
        this.$http.post(url, null, {headers: {'Authorization': `Token ${token}`}})
          .then(response => {
            if(response.status === 200) {
              if(response.data.joined) {
                this.setToastMessage('모임 가입이 완료되었습니다.');
                location.reload();
              }
            }
          })
          .catch(error => {
            console.log('error: ', error);
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
              this.likeUsers = response.data.like_users;
              this.groupInfo = response.data;
            }
          })
          .catch(error => {
            console.log('error: ', error);
            console.log('error:', error.response);
          })
          .finally(() => {
            this.setIsLoading(false);
          });     
      },
      favoriteGroupToggle() {
        if(!this.isLogin) return this.setToastMessage('로그인을 해주세요');

        let url = `/group/${this.groupId}/like_toggle/`;
        let token = sessionStorage.getItem('token');
        this.setIsLoading(true);
        this.$http.post(url, null, {headers: {Authorization: `Token ${token}`}})
          .then(response => {
            if(response.status === 200) {
              this.getUserProfile(sessionStorage.getItem('token'));
              this.getGroupInfo();
            }
          })
          .catch(error => {
            console.log('error: ', error);
            console.log('error message:', error.response);
          })
          .finally(() => {
            this.setIsLoading(false);
          });
      },
      changeRoute(name){
        this.$router.push(name);
      },
      fitImageSize(index) {
        let img;
        let targetImage = this.$refs[`profile_image${index}`];

        index === 0 && (img = targetImage);
        index !== 0 && (img = targetImage[0]);

        let bigWidth = img.naturalWidth - img.naturalHeight > 0;

        !bigWidth && img.classList.add('fit-width');
      }
    },
  };
</script>

<style lang="sass" scoped>
  @import "~chming"  
  .member-list-item
    +clearfix()
    position: relative
    padding: 1.5rem 2rem
    border-bottom: 0.5px solid #ccc       
    span 
      margin-left: 1rem 

  .group-image
    display: block
    margin: 0 auto
    width: 100%
    max-width: 640px

  .group-info-wrap
    position: relative
    .introduce-home_like
      position: absolute
      right: 2rem
      top: 1rem
      font-size: 1.6rem
      &.is-active
        i, span
          color: $group-like-color
    .group-description,
    .group-address,
    .group-name-wrap
      padding: 1rem 4rem 1rem 2rem
      // line-height: 2.6rem
      i
        margin-right: 1rem
    .group-name-wrap
      border-bottom: 0.5px solid #ccc
      position: relative
      .group-name
        display: block
        padding-left: 3.5rem
        +fit-text-in-box()

      .group_hobby-icon
        position: absolute
        +align-vertical-middle
        margin-right: 1rem

  .title
    +sub-title_group()
  .member-number
    color: $group-home-member-number-color

  .home_join,
  .home_modify
    +action-button
    display: block
    margin: 1rem auto
    padding: 0.5rem 1rem
  
  .author-name,
  .member-name,
  .author-position
    font-weight: bold

  .author-name,
  .member-name,
    position: absolute
    +align-vertical-middle

  .author-position
    float: right
    color: $base-point-color

  .profile-image-wrap
    +circle(4rem, 4rem)
    img 
      +profileImagePosition(auto, 100%)
    .fit-width
      +profileImagePosition(100%, auto)
</style>