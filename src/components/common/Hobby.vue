<template lang="pug">
  div
    .hobby-wrap(v-if="hobbyList.length !== 0")
      template(v-for="obj in hobbyCategoryList")
        h3.title {{obj.category}}
        ul.hobby_list
          li(v-if="obj.category === hobby.category" v-for="hobby in hobbyList")
            input(v-model="selectedList" :id="`item${hobby.pk}`" type="checkbox" :value="hobby.category_detail")
            label(:for="`item${hobby.pk}`") {{hobby.category_detail}}   
    message-box(
      v-if="$route.name === 'user_join_hobby' || $route.name === 'user_edit_hobby'"
      :classList="['fa-check-circle-o', 'warning']"
      :message="validateMessage.USER_HOBBY_MAX"      
    )  
    button.hobby_confirm(v-if="!isRouteMain" @click="confirm" type="button") 완료
    back-button.back-button(v-if="!isRouteMain")
</template>

<script>
  import BackButton from '@/components/common/BackButton';
  import MessageBox from '@/components/common/MessageBox';
  import Vue from 'vue';
  import {mapGetters, mapMutations, mapActions} from 'vuex';

  export default {
    beforeRouteEnter (to, from, next) {
      let fromRouteName = from.name;

      if(fromRouteName === 'user_join' || fromRouteName === 'user_edit' 
        || fromRouteName === 'group_create' || fromRouteName === 'group_edit') {
        next();
      } else {
        next({name: 'main'});
      }
    },
    created() {
      if(this.$route.params.hobby) {
        this.selectedList = this.$route.params.hobby;
      }
      if(this.$route.name === 'main') {
        this.selectedList = this.hobby.slice();
      }
    },
    components: {
      BackButton,
      MessageBox
    },
    data() {
      return {
        selectedList: [],
      };
    },
    computed: {
      ...mapGetters(['userInfo', 'hobbyList', 'hobbyCategoryList', 'hobby', 'validateMessage']),
      isRouteMain() {
        return this.routeName === 'main';
      },
      isRouteUserJoin() {
        return this.routeName === 'user_join_hobby';
      },
      isRouteUserEdit() {
        return this.routeName === 'user_edit_hobby';
      },
      routeName() {
        return this.$route.name;
      },
    },
    methods: {
      ...mapMutations(['setSelectedHobby', 'setToastMessage']),
      validateHobby(){
        if(this.selectedList.length === 0){
          this.setToastMessage('관심사는 1개 이상 선택해주세요.');
          return false;
        }
        return true;
      },
      confirm() {
        if(!this.validateHobby()) return;
        this.changeRoute({
          name: this.$route.params.prev,
          params: {
            hobby: this.selectedList
          }
        });
      },
      changeRoute(route) {
        this.$router.push(route);
      },
    },
    watch: {
      selectedList(newValue) {
        if( (this.$route.name === 'group_create_hobby'|| this.$route.name === 'group_edit_hobby') && newValue.length === 2 ) {
          newValue = newValue.shift();
        }
        if(this.isRouteMain) {
          this.setSelectedHobby(newValue.slice());
        }
        if(newValue.length > 5){
          newValue.pop();
          (this.isRouteMain || this.isRouteUserJoin || this.isRouteUserEdit) && this.setToastMessage('관심사 5개까지 선택 가능합니다.');
        }
      }  
    }
  };
</script>

<style lang="sass" scoped>
  @import "~chming"

  .hobby-wrap
    width: 100%

  .title
    padding: 3px 0
    color: $hobby-color
    line-height: 3rem
    border-bottom: 1px solid $base-theme-color
    font-size: 1.4rem

  .hobby_list
    padding: 10px 0
    +clearfix
    li
      // float: left
      margin-bottom: 1rem
      text-align: center
      font-size: 1.2rem
      // &:not(:last-child)
      //   margin-right: 2rem
    label
      +rounded-rect-button(95%)
      &:hover
        +rounded-rect-button-active()
      display: block
      text-align: center
      cursor: pointer
    input
      position: absolute
      visibility: hidden
      width: 0
      height: 0
    input:checked + label
      +rounded-rect-button-active()
    
  .hobby_confirm
      display: block
      margin: 2rem auto
      +action-button(5rem, 3rem)
  .back-button
    z-index: 1

  +mobile
    .hobby_list
      +container()
      li
        +span(3 of 9)
  +desktop
    .hobby_list
      +container()
      li
        +span(3)

</style>

