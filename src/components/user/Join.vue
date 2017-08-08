<template lang="pug">
  .join-container
    .user-join-wrap
      h3.title 회원가입
      form.user-join_form
        p
          input.form_name(v-model="userJoinInfo.name" type="text" placeholder="이름" aria-label="이름")
        p
          input.form_email(v-model="userJoinInfo.email" type="email" placeholder="이메일" aria-label="이메일")
        p
          input.form_password(v-model="userJoinInfo.password" type="password" placeholder="비밀번호" aria-label="비밀번호")
        p
          label.form_birth(for="birth") 생년월일
          input#birth.form_year(v-model.number="userJoinInfo.birth.year" type="number" min="1900" :max="maxYear" aria-label="생년")
          input.form_month(v-model.number="userJoinInfo.birth.month" type="number" min="1" max="12" aria-label="월")
          input.form_day(v-model.number="userJoinInfo.birth.day" type="number" min="1" max="31" aria-label="일")
          input#man(v-model="userJoinInfo.gender" type="radio" name="gender" value="m" checked)
          label(for="man") 남
          input#woman(v-model="userJoinInfo.gender" type="radio" name="gender" value="f")
          label(for="woman") 여
        .form_interest-wrap
          button.interest_button(
            @click="changeRoute({name: 'user_join_interest'})"
            type="button"
          ) 관심사 설정
            i.fa.fa-cog(aria-hidden='true')
          ul.interest-list
            li(v-for="hobby in userJoinInfo.hobby")
              img(src="" :alt="hobby")
        .form_location-wrap
          button.location_button(
            @click="changeRoute({name: 'user_join_location'})" 
            type="button"
          ) 지역 선택
            i.fa.fa-map-marker(aria-hidden='true')
          p.location-address {{ userJoinInfo.position.address }}
        button.form_confirm(@click="changeRoute({name: 'main'})" type="submit") 완료
    router-view.user_interest
    cancel-button(route="main")
</template>

<script>
  import CancelButton from '@/components/common/CancelButton';

  export default {
    data() {  
      return {
        isMap: false,
        maxYear: new Date().getFullYear(),
        userJoinInfo: {
          name: null,
          email: null,
          password: null,
          birth: {
            year: 1990,
            month: 1,
            day: 1,
          },
          gender: 'm',
          hobby: [],
          position: {
            address: null,
            latitude: null,
            longitude: null,
          },
        },
      };
    },
    components: {
      CancelButton
    },
    methods: {
      changeRoute(route) {
        this.$router.push(route);
      },
    },
    watch: {
      $route(newRoute) {
        let hobby = newRoute.params.hobby;
        hobby && (this.userJoinInfo.hobby = hobby);
        let position = newRoute.params.position;
        position && (this.userJoinInfo.position = position);
      },
    }
  };
</script>

<style lang="sass">
  @import "~chming"

  .interest-list, .location-address
    margin-top: 1rem
    padding-left: 1.5rem

  .user-join-wrap
    display: block
    padding: 3rem
    background: #fff

  h3.title
    +sub-title

  .user-join_form
    p
      margin-top: 1.5rem
    .form_name,
    .form_email,
    .form_password,
      +text-input(100%)
    input[type="number"]
      +text-input(25%)
      &:not(:nth-of-type(1))
        width: 22%
        margin-left: 1rem
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
  .form_interest-wrap,
  .form_location-wrap
    margin-top: 1.5rem
  
  .interest_button,
  .location_button
    & > .fa
      margin-left: 1rem
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