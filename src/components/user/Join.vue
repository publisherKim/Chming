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
          input#man(type="radio" name="gender" checked)
          label(for="man") 남
          input#woman(type="radio" name="gender")
          label(for="woman") 여
        .form_interest
          button.interest_button(@click="changeRoute('user_join_interest')" type="button") 관심사 설정
            i.fa.fa-cog(aria-hidden='true')
          ul.interest-list
            li
              img(src="" alt="관심사1")
        .form_location
          button.location_button(@click="changeRoute('user_join_location')" type="button") 지역선택
            i.fa.fa-map-marker(aria-hidden='true')
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
      
  .join-user-wrap
    display: block
    height: 100vh
    padding: 3rem
    background: #fff
    border: 1px solid #ccc

  h3.title
    +sub-title

  .join-user_form
    .address
      margin-top: 1rem
    p
      margin-top: 1.5rem
    .form_name,
    .form_email,
    .form_password,
      +text-input(100%)
    input[type="number"]
      +text-input(27%)
      &:not(:nth-of-type(1))
        width: 23%
        margin-left: 0.5rem
    input[type="radio"]
      visibility: hidden
      position: absolute
      & + label
        padding: 2px 5px
        margin-left: 0.5rem
        vertical-align: middle
        cursor: pointer
      &:checked + label
        background: #000
        color: #fff
    .form_birth, .form_gender
      display: block
      line-height: 3rem
      font-weight: bold
  .form_interest,
  .form_location
    margin-top: 1.5rem
  
  .interest_button,
  .location_button
    & > .fa
      margin-left: 0.5rem
      font-size: 1.5rem
    font-weight: bold
    background: none
    border: 0

  .form_confirm
    display: block
    margin: 2rem auto
    +confirm-button(5rem, 3rem)

  .user-info_interest-wrap
    .title
      border: none
</style>