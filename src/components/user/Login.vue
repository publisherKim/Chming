<template lang="pug">
  .join-user-container
    h3.title 로그인
    form.join-user_form
      p  
        input.form_email(v-model="email" type="email" placeholder="이메일" aria-label="이메일")
      p  
        input.form_password(v-model="password" type="password" placeholder="비밀번호" aria-label="비밀번호")
      button.login-button(@click.prevent="login") 확인
    ul.join-user_find-list
      li
        a(href @click.prevent="") 아이디 / 비밀번호 찾기
      li
        a(href @click.prevent="changeRoute('user_join')") 회원가입
    back-button(:route={name: 'main'})

</template>

<script>
  import BackButton from '../common/BackButton';
  import { mapGetters, mapMutations } from 'vuex';

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
      ...mapMutations(['setToken']),
      login() {
        this.$http.post('/user/login/', {
          username: this.email,
          password: this.password,
        })
          .then(response => {
            if(response.status === 200) {
              this.setToken(response.data.token);
              this.changeRoute('main');
            } else {
              console.log('통신 실패');
            }
          })
          .catch(error => {
            console.log('error.response:', error.response);
            console.alert('서버와의 통신에 실패했습니다.');
          });
      },
      changeRoute(route) {
        this.$router.push({ name: route });
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
