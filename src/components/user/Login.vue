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
        message-box(
          v-if="email" 
          :classList="['fa-check-circle-o', emailValidate ? 'info' : 'warning']"
          :message="emailValidationMessage"
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
        message-box(
          v-if="password" 
          :classList="['fa-check-circle-o', passwordValidate ? 'info' : 'warning']" 
          :message="passwordValidationMessage"
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
  import { mapGetters, mapActions } from 'vuex';
  let emailRegexp = /^(?:(?:[\w`~!#$%^&*\-=+;:{}'|,?\/]+(?:(?:\.(?:"(?:\\?[\w`~!#$%^&*\-=+;:{}'|,?\/\.()<>\[\] @]|\\"|\\\\)*"|[\w`~!#$%^&*\-=+;:{}'|,?\/]+))*\.[\w`~!#$%^&*\-=+;:{}'|,?\/]+)?)|(?:"(?:\\?[\w`~!#$%^&*\-=+;:{}'|,?\/\.()<>\[\] @]|\\"|\\\\)+"))@(?:[a-zA-Z\d\-]+(?:\.[a-zA-Z\d\-]+)*|\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])$/;
  let passwordRegexp = /^(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;

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
      emailValidate() {
        if(emailRegexp.test(this.email)) {
          this.emailValidationMessage = this.validateMessage.USER_EMAIL_OK;
          return true;
        } else {
          this.emailValidationMessage = this.validateMessage.USER_EMAIL_NOT_OK;
          return false;
        }
      },
      isEmptyEmail() {
        return this.email === '';
      },
      passwordValidate() {
        if(passwordRegexp.test(this.password)) {
          this.passwordValidationMessage = this.validateMessage.USER_PASSWORD_OK;
          return true;
        } else {
          this.passwordValidationMessage = this.validateMessage.USER_PASSWORD_NOT_OK;
          return false;
        }
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
        
        if(this.isEmptyEmail || !this.emailValidate) {
          this.checkEmpty('email');
          refs.email.focus();
          return false;
        }
        if(this.isEmptyPassword || !this.passwordValidate) {
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
