<template lang="pug">
  .join-user-container
    h3.title 로그인
    form.join-user_form
      p  
        input.form_email(type="email" placeholder="이메일" aria-label="이메일")
      p  
        input.form_password(type="password" placeholder="비밀번호" aria-label="비밀번호")
    ul.join-user_find-list
      li
        a 아이디 / 비밀번호 찾기
      li
        a(@click="chageRoute") 회원가입
    button.button-login(@click="login") 로그인
    cancel-button.button-close(route="main")
    //- button.button-close(@click="loginClose") 닫기

</template>

<script>
  import CancelButton from '../common/CancelButton';

  export default {
    components: {
      CancelButton,
    },
    methods: {
      // loginClose() {
      //   this.$router.push({
      //     name: 'main'
      //   });
      // },
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
    background: #e1e1e1
    border: 1px solid #ccc
    min-height: 100vh
    padding: 3rem
    .active 
      display: block
    h3.title
      +sub-title
    p
      margin-top: 1.5rem
      input 
        width: 100%
        line-height: 2rem
        padding: 0 1rem
      input[type="radio"],
      input[type="number"]
        &:first-child
          margin-left: 0
        width: auto
        margin-left: 1rem
    .button-close
      position: absolute
      top: 1rem
      right: 3rem
    .button-login

  .join-user_find-list
    margin-top: 1.5rem
    li
      line-height: 2rem

</style>
