<template lang="pug">
  .join-user-container
    h3.title 로그인
    form.join-user_form
      p  
        input.form_email(v-model="email" type="email" placeholder="이메일" aria-label="이메일")
      p  
        input.form_password(v-model="password" type="password" placeholder="비밀번호" aria-label="비밀번호")
      button.login-button(@click.prevent="userLogin") 확인
    ul.join-user_find-list
      li
        a(href @click.prevent="") 아이디 / 비밀번호 찾기
      li
        a(href @click.prevent="changeRoute('user_join')") 회원가입
    back-button(:route={name: 'main'})

</template>

<script>
  import BackButton from '../common/BackButton';
  import { mapActions } from 'vuex';

  export default {
    components: {
      BackButton,
    },
    data() {
      return {
        email: null,
        password: null,
      };
    },
    methods: {
      ...mapActions(['login']),
      changeRoute(route) {
        this.$router.push({ name: route });
      },
      userLogin() {
        this.login({
          email: this.email,
          password: this.password,
        });
        this.changeRoute('main');
      },

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
