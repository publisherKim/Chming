<template lang="pug">
  .container
    .user-edit-wrap
      h3.title 정보수정
      form.join-user_form
        p 
          input(type="text" :v-model="user.name" :placeholder="user.name" aria-label="이름") 
          
        p 
          input(type="email" :placeholder="user.email" aria-label="이메일")
        p  
          input.form_password(type="password" :placeholder="user.password" aria-label="비밀번호")
        p 
          label.form_birth(for="birth") 생년월일
          input.form_year(id="birth" type="number" :placeholder="user.year" min="1900" :max="maxYear" aria-label="생년")
          input.form_month(type="number" :placeholder="user.month" min="1" max="12" aria-label="월")
          input.form_day(type="number" :value="user.day" min="1" max="31" aria-label="일")
        p
          input#man(:v-model="user.gender" type="radio" name="gender" checked)
          label(for="man") 남자
          input#woman(:v-model="user.gender" type="radio" name="gender")
          label(for="woman") 여자
        div
          h4.title 관심사 설정 
            button(@click="changeRoute('user_edit_interest')" type="button") 설정
          ul.interest-list
            li
              img(src="" alt="관심사1")
        div
          h4.title 지역 선택 
            button(@click="changeRoute('user_edit_location')" type="button") 설정
          p.address 경기도 성남시 분당구 정자동 11-2
        button.form_confirm(@click="confirm" type="submit") 완료
    router-view.join-user_interest
    cancel-button.button-close(route="main")
</template>

<script>
  import UserInterest from '@/components/common/Interest';
  import CancelButton from '@/components/common/CancelButton';

  export default {
    data() {  
      return {
        isMap: false,
        maxYear: new Date().getFullYear(),
        user: {
          name: 'kkk',
          email: 'h@naver.com',
          password: 12345,
          year: 1983,
          month: 9,
          day: 1,
          gender: 'man'
        },
      };
    },
    components: {
      UserInterest,
      CancelButton
    },
    methods: {
      changeRoute(name) {
        this.$router.push({
          name
        });
      },
      typing(e) {
        this.user.name = e.target.value;
      },
      confirm() {
        this.$router.push('/');
      }
    },
  };
</script>

<style lang="sass">
  @import "~chming"

  .interest-list, .address
    margin-top: 1rem
    padding-left: 1.5rem
      
  .user-edit-wrap
    display: block
    height: 100vh
    padding: 3rem
    background: #e1e1e1
    border: 1px solid #ccc
  .active 
    display: block
  h3.title
    +sub-title
  .join-user_form
    .address
      margin-top: 1rem
    p
      margin-top: 1.5rem
      input 
        width: 100%
        padding: 0 1rem
        line-height: 2rem
      input[type="radio"],
      input[type="number"]
        &:nth-child(-n + 2)
          margin-left: 0
        width: auto
        margin-left: 1rem
    label.form_birth 
      display: block
      line-height: 3rem
  h4.title
    margin-top: 1.5rem
  .form_confirm
    display: block
    margin: 1rem auto      

  .user-info_interest-wrap
    .title
      border: none
</style>