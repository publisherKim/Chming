<template lang="pug">
  .edit-container
    .user-edit-wrap
      h3.title 사용자 정보 수정
      form.user-edit_form
        p {{ `이메일 : ${userInfo.email}` }}
        p
          input.form_name(
            v-model="userEditInfo.username"
            @blur="checkEmpty('username')"
            type="text"
            placeholder="이름"
            aria-label="이름"
          )
          message-box(
            v-if="isEmptyUsername"
            :classList="['fa-check-circle-o', 'warning']"
            message="이름을 입력해주세요."
          )
        p
          input.form_password(
            type="password"
            placeholder="비밀번호(대소문자, 숫자 포함 8글자 이상)"
            aria-label="비밀번호"
          )
        p
          label.form_birth(for="birth") 생년월일
          input#birth.form_year(type="number" v-model="userEditInfo.birth_year" min="1900" :max="maxYear" aria-label="생년")
          input.form_month(type="number" v-model="userEditInfo.birth_month" min="1" max="12" aria-label="월")
          input.form_day(type="number" v-model="userEditInfo.birth_day" min="1" max="31" aria-label="일")
          input#man(v-model="userEditInfo.gender" type="radio" name="gender" value="m")
          label(for="man") 남
          input#woman(:v-model="userEditInfo.gender" type="radio" name="gender" value="f")
          label(for="woman") 여
        .form_file-upload-wrap
          input#upload(@change="fileUpload" type="file")
          label.file-upload_label(for="upload") 프로필 사진
            i.fa.fa-picture-o(aria-hidden="true")
          img(v-if="userImageSrc" :src="userImageSrc")
        .form_hobby-wrap
          button.hobby_button(
            @click="changeRoute({name: 'user_edit_hobby'})"
            type="button"
          ) 관심사 설정
            i.fa.fa-cog(aria-hidden='true')
          ul.hobby-list(v-if="userEditInfo.hobby && userEditInfo.hobby.length !== 0")
            li.list_item(v-for="hobby in userEditInfo.hobby")
              img(src="" :alt="hobby")
        .form_location-wrap
          button.location_button(
            @click="changeRoute({name: 'user_edit_location'})" 
            type="button"
          ) 지역선택
            i.fa.fa-map-marker(aria-hidden='true')
          p.location-address {{userEditInfo.address}}
        button.form_confirm(@click="confirm" type="submit") 완료
      back-button
    router-view.user_hobby
</template>

<script>
  import BackButton from '@/components/common/BackButton';
  import MessageBox from '@/components/common/MessageBox';
  import Vue from 'vue';
  import { mapGetters } from 'vuex';

  export default {
    beforeRouteEnter (to, from, next) {
      let token = sessionStorage.getItem('token');
      !token && next({name: 'main'});
      token && next();
    },
    created() {
      this.userEditInfo = Vue.mixin({}, this.userInfo);
    },
    data() {  
      return {
        isMap: false,
        maxYear: new Date().getFullYear(),
        uploadSrc: '',
        userEditInfo: null,
      };
    },
    components: {
      BackButton,
      MessageBox,
    },
    methods: {
      test() {
        console.log('ddd');
      },
      checkEmpty(field) {
        let userInfo = this.userInfo;
        (field === 'hobby' && userInfo[field] === null) && (userInfo[field] = []);
        userInfo[field] === null && (userInfo[field] = '');
      },
      changeRoute(route) {
        this.$router.push(route);
      },
      confirm() {
        this.$router.push('/');
      },
      fileUpload(e) {
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = f => {
          this.uploadSrc = f.srcElement.result;
        };
      }
    },
    computed: {
      ...mapGetters(['userInfo']),
      isEmptyUsername() {
        return this.userInfo.username === '';
      },
      maskingPassword() {
        // let length = this.user.password.length;
        let length = 5;
        let masking = '';
        while(length--) masking += '*';
        return masking;
      },
      userImageSrc() {
        if(this.uploadSrc) return this.uploadSrc;
        else return this.userInfo.profile_img;
      },
    },
  };
</script>

<style lang="sass">
  @import "~chming"

  .user-edit-wrap
    display: block
    padding: 3rem
    background: $user-edit-background-color

  .hobby-list
    +clearfix
    .list_item
      float: left
      margin-right: 1rem

  .title
    +sub-page-title

  .user-edit_form
    .hobby-list, .location-address
      margin-top: 0.5rem
      padding-left: 1.5rem
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
        display: inline-block
        vertical-align: top
        padding: 0 0.7rem
        margin-left: 0.5rem
        line-height: 3rem
        color: $user-edit-color
        border-radius: 3px
        cursor: pointer
      &:checked + label
        +action-active()
    .form_birth, .form_gender
      display: block
      line-height: 3rem
      font-weight: bold

  .form_file-upload-wrap,
  .form_hobby-wrap,
  .form_location-wrap
    margin-top: 1.5rem
    & .fa
      margin-left: 1rem
      font-size: 1.5rem

  .form_file-upload-wrap
    img 
      display: block
      width: 50px
      height: 50px
    input
      visibility: hidden
      position: absolute
    label
      cursor: pointer

  .hobby_button,
  .location_button,
  .file-upload_label
    color: $user-edit-color
    font-weight: bold
    background: none
    border: 0

  .form_confirm
    display: block
    margin: 2rem auto
    +action-button(5rem, 3rem)

  .user-info_hobby-wrap
    .title
      border: none
</style>