<template lang="pug">
  .join-user-container
    h3.title 로그인
    form.join-user_form
      p  
        input.form_email(type="email" placeholder="이메일" aria-label="이메일")
      p  
        input.form_password(type="password" placeholder="비밀번호" aria-label="비밀번호")
      button.login-button(@click="login") 확인
    ul.join-user_find-list
      li
        a(href @click.prevent="") 아이디 / 비밀번호 찾기
      li
        a(href @click.prevent="chageRoute") 회원가입
    cancel-button(route="main")

</template>

<script>
  import CancelButton from '../common/CancelButton';

  export default {
    components: {
      CancelButton,
    },
    methods: {
      login() {
        console.log('로그인 성공시 : true, 로그인 실패시 : 실패 메시지');
      },
      chageRoute() {
        this.$router.push({
          name: 'user_join'
        });
      }
    }
  };
</script>

<style lang="sass" scoped>
  @import "~chming"
  
  .join-user-container
    +span(width 100% nest)
    // background: #e1e1e1
    background: #fff
    border: 1px solid #ccc
    min-height: 100vh
    padding: 3rem
    h3.title
      +sub-title

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
      +confirm-button(5rem, 4rem)

  .join-user_find-list
    margin-top: 1.5rem
    li
      margin-top: 0.5rem

</style>
