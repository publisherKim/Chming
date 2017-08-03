<template lang="pug">
  .join-user-wrap
    h3 로그인
    form.join-user_form
      p  
        input.email(
          type="email" 
          placeholder="이메일" 
          aria-label="이메일"
        )
      p  
        input.password(
          type="password" 
          placeholder="비밀번호" 
          aria-label="비밀번호"
        )
    button(class="button-close" @click="loginClose") 닫기
    ul.join-user_find-list
      li
        a 아이디 / 비밀번호 찾기
      li
        a 회원가입
    button(class="button-login" @click="login") 로그인
</template>

<script>
export default {
  methods: {
    loginClose() {
      this.$router.push({
        name: 'main'
      });
    },
    login() {
      console.log('로그인 성공시 : true, 로그인 실패시 : 실패 메시지');
    }
  }
};
</script>

<style lang="sass" scoped>
  @import "~chming"
  +mobile
    .join-user-wrap
      +span(width 100% nest)
      background: #e1e1e1
      border: 1px solid #ccc
      min-height: 100vh
      padding: 3rem
    .active 
      display: block
    h3
      title 1.4rem
      border-bottom: solid 1px #b1b1b1
      line-height: 3rem
    p
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

</style>
