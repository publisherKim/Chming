<template lang="pug">
  .container
    .join-user-wrap
      h3.title 회원가입
      form.join-user_form
        p  
          input.form_name(type="text" placeholder="이름" aria-label="이름")
        p  
          input.form_email(type="email" placeholder="이메일" aria-label="이메일")
        p  
          input.form_password(type="password" placeholder="비밀번호" aria-label="비밀번호")
        p 
          label.form_birth(class="birth" for="birth") 생년월일
          input.form_year(id="birth" type="number" placeholder="1993" min="1900" :max="maxYear" aria-label="생년")
          input.form_month(type="number" placeholder="07" min="1" max="12" aria-label="월")
          input.form_day(type="number" placeholder="07" min="1" max="31" aria-label="일")
        p
          input#man(type="radio" name="gender" checked)
          label(for="man") 남자
          input#woman(type="radio" name="gender")
          label(for="woman") 여자
        div
          h4.title 관심사 설정 
            button(@click="changeRoute('user_join_interest')" type="button") 설정
          ul.interest-list
            li
              img(src="" alt="관심사1")
        div
          h4.title 지역 선택 
            button(@click="changeRoute('user_join_location')" type="button") 설정
          p.address 경기도 성남시 분당구 정자동 11-2
        button.form_confirm(@click="confirm" type="submit") 완료
    router-view.join-user_interest
</template>

<script>
  import UserInterest from '@/components/common/Interest';

  export default {
    data() {  
      return {
        isMap: false,
        maxYear: new Date().getFullYear()
      };
    },
    components: {
      UserInterest
    },
    methods: {
      changeRoute(name) {
        this.$router.push({
          name
        });
      },
      confirm() {
        this.$router.push('/');
      }
    }
  };
</script>

<style lang="sass">
  @import "~chming"

  .interest-list, .address
    margin-top: 1rem
    padding-left: 1.5rem
      
  .join-user-wrap
    display: block
    height: 100vh
    padding-top: 2rem
    padding: 0 1.5rem
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

</style>