<template lang="pug">
  .join-container
    .user-join-wrap
      h3.title 회원가입
      form.user-join_form
        p
          input.form_name(v-model="userJoinInfo.username" type="text" placeholder="이름" aria-label="이름")
        p
          input.form_email(v-model="userJoinInfo.email" type="email" placeholder="이메일" aria-label="이메일")
        p
          input.form_password(v-model="userJoinInfo.password" type="password" placeholder="비밀번호" aria-label="비밀번호")
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
          img(:src="uploadSrc")
        .form_interest-wrap
          button.interest_button(
            @click="changeRoute({name: 'user_join_interest', params: {prev: 'user_join'}})"
            type="button"
          ) 관심사 설정
            i.fa.fa-cog(aria-hidden='true')
          ul.interest-list(v-if="userJoinInfo.hobby.length !== 0")
            li.list_item(v-for="hobby in userJoinInfo.hobby")
              img(src="" :alt="hobby")
        .form_location-wrap
          button.location_button(
            @click="changeRoute({name: 'user_join_location', params: {prev: 'user_join'}})" 
            type="button"
          ) 지역 선택
            i.fa.fa-map-marker(aria-hidden='true')
          p.location-address {{ userJoinInfo.address }}
        button.form_confirm(type="button" @click="join") 완료
    router-view.user_interest
    back-button(:route={name: 'user_login'})
</template>

<script>
  import BackButton from '@/components/common/BackButton';
  import {mapGetters} from 'vuex';

  export default {
    data() {  
      return {
        isMap: false,
        maxYear: new Date().getFullYear(),
        uploadSrc: '',
        userJoinInfo: {
          email: null,
          username: null,
          password: null,
          confirm_password: null,
          birth_year: 1990,
          birth_month: 1,
          birth_day: 1,
          gender: 'm',
          profile_img: null,
          hobby: [],
          address: null,
          lat: null,
          lng: null,
        },
        // userJoinInfo: {
        //   name: null,
        //   email: null,
        //   password: null,
        //   birth: {
        //     year: 1990,
        //     month: 1,
        //     day: 1,
        //   },
        //   gender: 'm',
        //   profileImage: null,
        //   hobby: [],
        //   position: {
        //     address: null,
        //     latitude: null,
        //     longitude: null,
        //   },
        // },
      };
    },
    components: {
      BackButton
    },
    methods: {
      changeRoute(route) {
        this.$router.push(route);
      },
      fileUpload(e) {
        let file = e.target.files[0];
        this.userJoinInfo.profile_img = file;
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = f => {
          // this.userJoinInfo.profile_img = f.srcElement.result;
          this.uploadSrc = f.srcElement.result;
        };
      },
      join() {
        let option = {
          'header': {
            'Content-Type': 'multipart/form-data',
          },
        };
        // let formData = new FormData();
        // formData.append('email', this.userJoinInfo.email);
        // formData.append('username', this.userJoinInfo.username);
        // formData.append('password', this.userJoinInfo.password);
        // formData.append('confirm_password', this.userJoinInfo.confirm_password);
        // formData.append('birth_year', this.userJoinInfo.birth_year);
        // formData.append('birth_month', this.userJoinInfo.birth_month);
        // formData.append('birth_day', this.userJoinInfo.birth_day);
        // formData.append('gender', this.userJoinInfo.gender);
        // formData.append('profile_img', this.userJoinInfo.profile_img);
        // formData.append('hobby', this.userJoinInfo.hobby);
        // formData.append('address', this.userJoinInfo.address);
        // formData.append('lat', this.userJoinInfo.lat);
        // formData.append('lng', this.userJoinInfo.lng);

        this.$http.post(this.apiUrl + '/user/signup/', this.userJoinInfo, option).
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
      ...mapGetters(['apiUrl']),
      confirmPassword() {
        this.userJoinInfo.confirm_password = this.userJoinInfo.password;
      },
      hobbyToString() {
        this.userJoinInfo.hobby = this.userJoinInfo.hobby.toString();
      },
    },
  };
</script>

<style lang="sass">
  @import "~chming"

  .user-join-wrap
    display: block
    padding: 3.5rem
    background: $user-join-background-color

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

  
</style>