<template lang="pug">
  div
    .hobby-wrap(v-if="hobbyList.length !== 0")
      h3.title 운동/스포츠
      ul.hobby_list
        li
          input(v-model="selectedList" id="item1" type="checkbox" value="자전거")
          label(for="item1") 자전거    
      
    button.hobby_confirm(v-if="!isRouteMain" @click="confirm" type="button") 완료
    back-button(v-if="!isRouteMain")
</template>

<script>
  import BackButton from '@/components/common/BackButton';
  import Vue from 'vue';
  import { mapGetters, mapActions } from 'vuex';

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
      this.hobbyList.length === 0 && this.getHobbyList();
      if(this.$route.name === 'user_edit_hobby') {
        this.selectedList = this.userInfo.hobby.slice();
      }
    },
    components: {
      BackButton,
    },
    data() {
      return {
        selectedList: [],
      };
    },
    computed: {
      ...mapGetters(['userInfo', 'hobbyList']),
      isRouteMain() {
        return this.$route.name === 'main';
      }
    },
    methods: {
      ...mapActions(['getHobbyList']),
      confirm() {
        this.changeRoute({name: this.$route.params.prev, params: {hobby: this.selectedList}});
      },
      changeRoute(route) {
        this.$router.push(route);
      },
    },
    watch: {
      selectedList(newValue) {
        if( (this.$route.name === 'group_create_hobby' && newValue.length === 2) ) {
          newValue = newValue.shift();
        } 
      }  
    }
  };
</script>

<style lang="sass" scoped>
  @import "~chming"

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

