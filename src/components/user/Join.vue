<template lang="pug">
  .join-container
    .user-join-wrap
      h3.title 회원가입
      form.user-join_form
        p
          input.form_name(v-model="userJoinInfo.username" @blur="checkEmpty('username')" type="text" placeholder="이름" aria-label="이름")
          message-box(v-if="isEmpty.username" :classList="['fa-check-circle-o', 'warning']" message="이름을 입력해주세요.")
        p.form_email-wrap
          input.form_email(v-model="userJoinInfo.email" @blur="checkEmpty('email')" type="email" placeholder="이메일" aria-label="이메일")
          message-box(v-if="isEmpty.email && !userJoinInfo.email" :classList="['fa-check-circle-o', 'warning']" message="이메일 입력해주세요.")
          message-box(v-if="userJoinInfo.email" :classList="['fa-check-circle-o', emailValidate ? 'info' : 'warning']" :message="emailValidation" )
        p
          input.form_password(v-model="userJoinInfo.password" @blur="checkEmpty('password')" type="password" placeholder="비밀번호(대소문자, 숫자 포함 8글자 이상)" aria-label="비밀번호")
          message-box(v-if="isEmpty.password" :classList="['fa-check-circle-o', 'warning']" message="비밀번호 입력해주세요.")
        p
          label.form_birth(for="birth") 생년월일 / 성별
          input#birth.form_year(v-model.number="userJoinInfo.birth_year" type="number" min="1900" :max="maxYear" aria-label="생년")
          input.form_month(v-model.number="userJoinInfo.birth_month" type="number" min="1" max="12" aria-label="월")
          input.form_day(v-model.number="userJoinInfo.birth_day" type="number" min="1" max="31" aria-label="일")
          input#man(v-model="userJoinInfo.gender" type="radio" name="gender" value="m" checked)
          label(for="man") 남
          input#woman(v-model="userJoinInfo.gender" type="radio" name="gender" value="f")
          label(for="woman") 여
        .form_file-upload-wrap
          input#upload(@change="fileUpload" type="file")
          label.file-upload_label(for="upload") 프로필 사진
            i.fa.fa-picture-o(aria-hidden="true")
          img(v-if="userJoinInfo.profile_img" :src="uploadSrc") 
          
        .form_interest-wrap
          button.interest_button(
            @click="changeRoute({name: 'user_join_interest', params: {prev: 'user_join'}})"
            @blur="checkEmpty('hobby')"
            type="button"
          ) 관심사 설정
            i.fa.fa-cog(aria-hidden='true')
        message-box(v-if="isEmpty.hobby" :classList="['fa-check-circle-o', 'warning']" message="관심사를 선택 해주세요")
          ul.interest-list(v-if="userJoinInfo.hobby.length !== 0")
            li.list_item(v-for="hobby in userJoinInfo.hobby")
              img(src="" :alt="hobby")
        .form_location-wrap
          button.location_button(
            @click="changeRoute({name: 'user_join_location', params: {prev: 'user_join'}})" 
            @blur="checkEmpty('address')"
            type="button"
          ) 지역 선택
            i.fa.fa-map-marker(aria-hidden='true')
        message-box(v-if="isEmpty.address" :classList="['fa-check-circle-o', 'warning']" message="지역을 선택해주세요")
          p.location-address {{ userJoinInfo.address }}
        button.form_confirm(type="button" @click="join") 완료
    router-view.interest-container
    back-button(:route={name: 'user_login'})
</template>

<script>
  import Vue from 'vue';
  import BackButton from '@/components/common/BackButton';
  import MessageBox from '@/components/common/MessageBox';
  import { mapGetters } from 'vuex';

  let emailRegexp = /^(?:(?:[\w`~!#$%^&*\-=+;:{}'|,?\/]+(?:(?:\.(?:"(?:\\?[\w`~!#$%^&*\-=+;:{}'|,?\/\.()<>\[\] @]|\\"|\\\\)*"|[\w`~!#$%^&*\-=+;:{}'|,?\/]+))*\.[\w`~!#$%^&*\-=+;:{}'|,?\/]+)?)|(?:"(?:\\?[\w`~!#$%^&*\-=+;:{}'|,?\/\.()<>\[\] @]|\\"|\\\\)+"))@(?:[a-zA-Z\d\-]+(?:\.[a-zA-Z\d\-]+)*|\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])$/;
  let passwordRegexp = /^(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;

  export default {
    components: {
      BackButton,
      MessageBox
    },
    data() {  
      return {
        imgSrc: false,  
        isMap: false,
        maxYear: new Date().getFullYear(),
        uploadSrc: '',
        userJoinInfo: {
          email: '',
          username: '',
          password: '',
          confirm_password: '',
          birth_year: 1990,
          birth_month: 1,
          birth_day: 1,
          gender: 'm',
          profile_img: null,
          hobby: [],
          address: '',
          lat: '',
          lng: '',
        },
        emailValidation: '',
        passwordValidation: '',
        isEmpty: {
          email: false,
          username: false,
          password: false,
          hobby: false,
          address: false,
        },
      };
    },
    methods: {
      checkEmpty(field) {
        let userJoinInfo = this.userJoinInfo[field];
        if(userJoinInfo === '' || userJoinInfo.length === 0) {
          this.isEmpty[field] = true;
        } else {
          this.isEmpty[field] = false;
        }
      },
      changeRoute(route) {
        this.$router.push(route);
      },
      fileUpload(e) {
        let file = e.target.files[0];
        this.userJoinInfo.profile_img = file;
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = f => {
          this.uploadSrc = f.srcElement.result;
        };
      },
      join() {
        this.joinValidate();

        let formData = Vue.setFormData(this.userJoinInfo);
        this.$http.post('/user/signup/', formData).
          then(response => {
            if(response.status === 200) {
              console.log(response);
            } else {
              console.log(response);
            }
          })
          .catch(error => {
            console.log('error.response: ', error.response);
          });
      },
      joinValidate() {
        let userJoinInfo = this.userJoinInfo;
        // if(!this.emailValidate) {

        // } else if(userJoinInfo.username != '') {

        // } else if(userJoinInfo.hobby.length === 0) {

        // } else if(userJoinInfo.address != '') {

        // }
      },
    },
    watch: {
      $route(newRoute) {
        let userJoinInfo = this.userJoinInfo;
        let hobby = newRoute.params.hobby;
        hobby && (userJoinInfo.hobby = hobby);
        let position = newRoute.params.position;
        // position && (userJoinInfo.position = position);
        if(position) {
          userJoinInfo.address = position.address;
          userJoinInfo.lat = position.latitude;
          userJoinInfo.lng = position.longitude;
        }
      },
    },
    computed: {
      confirmPassword() {
        let userJoinInfo = this.userJoinInfo;
        userJoinInfo.confirm_password = userJoinInfo.password;
      },
      emailValidate() {
        if(emailRegexp.test(this.userJoinInfo.email)) {
          this.emailValidation = '올바른 이메일 주소입니다.';
          return true;
        } else {
          this.emailValidation = '올바른 이메일 주소를 입력해주세요';
          return false;
        }
      },
      passwordValidate() {
        if(passwordRegexp.test(this.userJoinInfo.password)) {
          this.passwordValidation = '올바른 이메일 주소입니다.';
          return true;
        } else {
          this.passwordValidation = '올바른 이메일 주소를 입력해주세요';
          return false;
        }
      },
    },
  };
</script>

<style lang="sass">
  @import "~chming"
  
  .user-join-wrap
    display: block
    padding: 3.5rem
    // overflow-y: scroll
    // max-height: 100vh
    background: $user-join-background-color

  .form_file-upload-wrap
    img 
      display: block
      width: 50px
      height: 50px
  h3.title
    +sub-page-title

  .interest-list
    +clearfix
    .list_item
      float: left
      margin-right: 1rem

  .user-join_form
    .interest-list, .location-address
      margin-top: 0.5rem
      padding-left: 1.5rem
    p
      margin-top: 1.5rem

    .form_name,
    .form_email,
    .form_password,
      +text-input(100%)
      padding-right: 2.5rem
    input[type="number"]
      +text-input(25%)
      &:not(:nth-of-type(1))
        width: 21%
        margin-left: 0.8rem
    input[type="radio"]
      visibility: hidden
      position: absolute
      & + label
        display: inline-block
        vertical-align: top
        padding: 0 0.7rem
        margin-left: 0.5rem
        line-height: 3rem
        color: $user-join-color
        border-radius: 3px
        cursor: pointer
      &:checked + label
        +action-active()
    .form_birth
      display: block
      font-weight: bold
      line-height: 3rem

  .form_file-upload-wrap,
  .form_interest-wrap,
  .form_location-wrap
    margin-top: 1.5rem
    & .fa
      margin-left: 1rem
      font-size: 1.5rem
  
  .form_file-upload-wrap
    input
      visibility: hidden
      position: absolute
    label
      cursor: pointer

  .form_birth,
  .interest_button,
  .location_button,
  .file-upload_label
    color: $user-join-color
    font-weight: bold
    background: none
    border: 0

  .form_confirm
    display: block
    margin: 2rem auto
    +action-button(5rem, 3rem)

  .user-info_interest-wrap
    .title
      border: none

  .interest-container
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100vh
    padding: 2rem
    background: #fff
    .interest_confirm
      display: block
      margin: 2rem auto
      +action-button(5rem, 3rem)
        
</style>