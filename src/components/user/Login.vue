<template lang="pug">
  .join-user-container
    h3.title 로그인
    form.join-user_form
      p        
        input.form_email(
          v-model="email" 
          @blur="checkEmpty('email')" 
          ref="email" 
          type="email" 
          placeholder="이메일" 
          aria-label="이메일"
        )
        message-box(
          v-if="isEmptyEmail" 
          :classList="['fa-check-circle-o', 'warning']" 
          message="이메일 입력해주세요."
        )
      p  
        input.form_password(
          v-model="password" 
          @blur="checkEmpty('password')" 
          ref="password"
          type="password" 
          placeholder="비밀번호(대소문자, 숫자 포함 8글자 이상)" 
          aria-label="비밀번호"
        )
        message-box(
          v-if="isEmptyPassword" 
          :classList="['fa-check-circle-o', 'warning']" 
          :message="validateMessage.USER_PASSWORD_EMPTY"
        )
      button.login-button(@click.prevent="userLogin") 확인
    ul.join-user_find-list
      li
        a(href @click.prevent="") 아이디 / 비밀번호 찾기
      li
        a(href @click.prevent="changeRoute({name: 'user_join'})") 회원가입
    back-button(:route="{name: 'main'}")

</template>

<script>
  import BackButton from '../common/BackButton';
  import MessageBox from '@/components/common/MessageBox';
  import Vue from 'vue';
  import {mapGetters, mapActions} from 'vuex';

  export default {
    beforeRouteEnter (to, from, next) {
      let token = sessionStorage.getItem('token');

      token && next({name: 'main'});
      !token && next();
    },
    components: {
      BackButton,
      MessageBox
    },
    data() {
      return {
        email: null,
        password: null,
      };
    },
    computed: {
      ...mapGetters(['userInfo', 'validateMessage']),
      isEmptyEmail() {
        return this.email === '';
      },
      isEmptyPassword() {
        return this.password === '';
      }            
    },    
    methods: {
      ...mapActions(['login']),
      checkEmpty(field) {
        this[field] === null && (this[field] = '');
      },
      loginValidate() {
        let refs = this.$refs;
        
        if(this.isEmptyEmail) {
          this.checkEmpty('email');
          refs.email.focus();
          return false;
        }
        if(this.isEmptyPassword) {
          this.checkEmpty('password');
          refs.password.focus();
          return false;
        }
        return true;
      },
      changeRoute(route) {
        this.$router.push(route);
      },
      userLogin() {
        if(!this.loginValidate()) return;

        this.login({
          email: this.email,
          password: this.password,
        });
      },
    },
    watch: {
      userInfo(newData) {
        // userInfo 값이 바뀌었을 때(로그인 후 유저정보 수신시) 메인으로 라우팅
        newData !== null && this.changeRoute({name: 'main'});
      }
    },
  };
</script>

<style lang="sass" scoped>
  @import "~chming"

  .join-user-container
    +span(width 100% nest)
    background: $user-login-background-color
    min-height: 100vh
    padding: 3.5rem
    h3.title
      +sub-page-title

  p
    margin-top: 1.5rem

  .join-user_form
    position: relative
    .form_email, .form_password
      display: block
      +text-input(100%)
    .login-button
      position: absolute
      bottom: -1.5rem
      right: 0
      transform: translateY(100%)
      +action-button(5rem, 4rem)

  .join-user_find-list
    margin-top: 1.5rem
    li
      margin-top: 0.5rem
      
  .form_confirm
    display: block
    margin: 2rem auto
    +action-button(5rem, 3rem)
</style>
