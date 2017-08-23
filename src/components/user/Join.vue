<template lang="pug">
  .join-container
    .user-join-wrap
      h3.title 회원가입
      form.user-join_form
        p
          input.form_name(
            v-model.trim="userJoinInfo.username"
            @blur="checkEmpty('username')"
            ref="username"
            type="text"
            placeholder="이름"
            aria-label="이름"
          )
          message-box(
            v-if="isEmptyUsername"
            :classList="['fa-check-circle-o', 'warning']"
            :message="validateMessage.USER_NAME_EMPTY"
          )
        p.form_email-wrap
          input.form_email(
            v-model.trim="userJoinInfo.email" 
            @focus="isEmailDuplicated = null" 
            @blur="checkEmail" 
            ref="email"
            type="email"
            placeholder="이메일"
            aria-label="이메일"
          )
          message-box(
            v-if="isEmptyEmail"
            :classList="['fa-check-circle-o', 'warning']"
            :message="validateMessage.USER_EMAIL_EMPTY"
          )
          message-box(
            v-if="userJoinInfo.email && !emailValidate"
            :classList="['fa-check-circle-o', emailValidate ? 'info' : 'warning']"
            :message="emailValidationMessage"
          )
          message-box(
            v-if="isEmailDuplicated !== null"
            :classList="['fa-check-circle-o', !isEmailDuplicated ? 'info' : 'warning']"
            :message="emailDuplicateMessage"
          )
        p
          input.form_password(
            v-model.trim="userJoinInfo.password"
            @blur="checkEmpty('password')"
            ref="password"
            type="password"
            placeholder="비밀번호(대소문자, 숫자 포함 8글자 이상)"
            aria-label="비밀번호"
          )
          message-box(
            v-if="isEmptyPassword"
            :classList="['fa-check-circle-o', 'warning']"
            message="비밀번호 입력해주세요."
          )
          message-box(
            v-if="userJoinInfo.password"
            :classList="['fa-check-circle-o', passwordValidate ? 'info' : 'warning']" 
            :message="passwordValidationMessage"
          )
        p
          label.form_birth(for="birth") 생년월일 / 성별
          input#birth.form_year(
            v-model.number="userJoinInfo.birth_year"
            type="number"
            min="1900"
            :max="maxYear"
            aria-label="생년"
          )
          input.form_month(
            v-model.number="userJoinInfo.birth_month"
            type="number"
            min="1"
            max="12"
            aria-label="월"
          )
          input.form_day(
            v-model.number="userJoinInfo.birth_day"
            type="number"
            min="1"
            max="31"
            aria-label="일"
          )
          input#man(
            v-model="userJoinInfo.gender"
            type="radio"
            name="gender"
            value="m"
            checked
          )
          label(
            ref="genderM"
            @keyup.enter="$refs.genderM.click()"
            for="man"
            tabindex="0"
          ) 남
          input#woman(
            v-model="userJoinInfo.gender"
            type="radio"
            name="gender"
            value="f"
          )
          label(
            ref="getderF"
            @keyup.enter="$refs.getderF.click()"
            for="woman"
            tabindex="0"
          ) 여
        .form_file-upload-wrap
          input#upload(ref="file" @change="fileUpload" type="file")
          label.file-upload_label(
            @keyup.enter="$refs.fileLabel.click()"
            ref="fileLabel"
            for="upload"
            tabindex="0"
          ) 프로필 사진
            i.fa.fa-picture-o(aria-hidden="true")
          .upload-file-wrapper(v-if="uploadImageName")
            a.upload-file-name(
              href
              role="button"
              @click.prevent="isOpenImageModal = true"
              aria-label="업로드 이미지명(미리보려면 클릭해주세요)"
            ) {{uploadImageName}}
            button.delete-image-button(@click="deleteUploadImage" type="button")
              i.fa.fa-times(aria-hidden="true")
          
        .form_hobby-wrap
          button.hobby_button(
            @click="changeRoute({name: 'user_join_hobby', params: {prev: 'user_join', hobby: userJoinInfo.hobby}})"
            @blur="checkEmpty('hobby')"
            ref="hobby"
            type="button"
          ) 관심사 설정
            i.fa.fa-cog(aria-hidden='true')
          ul.hobby-list(v-if="userJoinInfo.hobby && userJoinInfo.hobby.length !== 0" aria-label="선택 관심사")
            li.list_item(v-for="hobby in userJoinInfo.hobby")
              img(src="" :alt="hobby")
        message-box(
          v-if="isEmptyHobby"
          :classList="['fa-check-circle-o', 'warning']"
          :message="validateMessage.USER_HOBBY_EMPTY"
        )
        .form_location-wrap
          button.location_button(
            @click="changeRoute({name: 'user_join_location', params: {prev: 'user_join'}})" 
            @blur="checkEmpty('address')"
            ref="location"
            type="button"
          ) 지역 선택
            i.fa.fa-map-marker(aria-hidden='true')
          p.location-address(aria-label="선택 지역명") {{ userJoinInfo.address }}
        message-box(
          v-if="isEmptyAddress"
          :classList="['fa-check-circle-o', 'warning']"
          :message="validateMessage.USER_LOCATION_EMPTY"
        )
        button.form_confirm(@click="join" type="button") 완료
    router-view.hobby-container
    back-button(:route="{name: 'user_login'}")
    modal-image(
      @closeModal="isOpenImageModal = false"
      v-if="isOpenImageModal"
      :imageSrc="uploadSrc"
    )
</template>

<script>
  import Vue from 'vue';
  import BackButton from '@/components/common/BackButton';
  import MessageBox from '@/components/common/MessageBox';
  import ModalImage from '@/components/common/ModalImage';
  import {mapGetters, mapMutations} from 'vuex';

  let emailRegexp = /^(?:(?:[\w`~!#$%^&*\-=+;:{}'|,?\/]+(?:(?:\.(?:"(?:\\?[\w`~!#$%^&*\-=+;:{}'|,?\/\.()<>\[\] @]|\\"|\\\\)*"|[\w`~!#$%^&*\-=+;:{}'|,?\/]+))*\.[\w`~!#$%^&*\-=+;:{}'|,?\/]+)?)|(?:"(?:\\?[\w`~!#$%^&*\-=+;:{}'|,?\/\.()<>\[\] @]|\\"|\\\\)+"))@(?:[a-zA-Z\d\-]+(?:\.[a-zA-Z\d\-]+)*|\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])$/;
  let passwordRegexp = /^(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;

  export default {
    beforeRouteEnter (to, from, next) {
      let token = sessionStorage.getItem('token');
      token && next({name: 'main'});
      !token && next();
    },
    components: {
      BackButton,
      MessageBox,
      ModalImage,
    },
    data() {  
      return {
        imgSrc: false,  
        isMap: false,
        isOpenImageModal: false,
        maxYear: new Date().getFullYear(),
        uploadImageName: null,
        uploadSrc: '',
        emailValidationMessage: '',
        emailDuplicateMessage: '',
        isEmailDuplicated: null,
        passwordValidationMessage: '',
        userJoinInfo: {
          email: null,
          username: null,
          password: null,
          confirm_password: null,
          birth_year: 1990,
          birth_month: 1,
          birth_day: 1,
          gender: 'm',
          profile_img: '',
          hobby: null,
          address: null,
          lat: null,
          lng: null,
        },
      };
    },
    computed: {
      ...mapGetters(['url', 'validateMessage']),
      emailValidate() {
        if(!emailRegexp.test(this.userJoinInfo.email)) {
          this.emailValidationMessage = this.validateMessage.USER_EMAIL_NOT_OK;
          return false;
        } else {
          return true;
        }
      },
      passwordValidate() {
        if(passwordRegexp.test(this.userJoinInfo.password)) {
          this.passwordValidationMessage = this.validateMessage.USER_PASSWORD_OK;
          return true;
        } else {
          this.passwordValidationMessage = this.validateMessage.USER_PASSWORD_NOT_OK;
          return false;
        }
      },
      isEmptyUsername() {
        return this.userJoinInfo.username === '';
      },
      isEmptyEmail() {
        return this.userJoinInfo.email === '';
      },
      isEmptyPassword() {
        return this.userJoinInfo.password === '';
      },
      isEmptyHobby() {
        let hobby = this.userJoinInfo.hobby;
        return hobby && hobby.length === 0;
      },
      isEmptyAddress() {
        return this.userJoinInfo.address === '';
      },
      prevRoute() {
        return this.$route.params.prev;
      },
    },
    methods: {
      ...mapMutations(['setIsLoading', 'setToastMessage']),
      checkEmail() {
        this.checkEmpty('email');
        this.emailValidate && this.checkDuplicateEmail();
      },
      checkEmpty(field) {
        let userJoinInfo = this.userJoinInfo;
        (field === 'hobby' && userJoinInfo[field] === null) && (userJoinInfo[field] = []);
        userJoinInfo[field] === null && (userJoinInfo[field] = '');
      },
      changeRoute(route) {
        this.$router.push(route);
      },
      fileUpload(e) {
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = e => {
          if(Vue.isFileValidate(file)) {
            this.userJoinInfo.profile_img = file;
            this.uploadSrc = e.target.result;
            this.uploadImageName = `[${file.name}]`;
          } else {
            this.setToastMessage('이미지 파일이면서 5MB 이하만 업로드 가능합니다.');
          }
        };
      },
      deleteUploadImage() {
        this.userJoinInfo.profile_img = '';
        this.uploadSrc = '';
        this.uploadImageName = null;
      },
      join() {
        if(!this.joinValidate()) return;

        let formData = Vue.setFormData(this.userJoinInfo);
        this.setIsLoading(true);
        this.$http.post(this.url.JOIN, formData).
          then(response => {
            if(response.status === 201) {
              this.setToastMessage('회원가입이 완료되었습니다.');
              this.changeRoute({name: 'user_login'});
            }
          })
          .catch(error => {
            console.log('error.response: ', error.response);
          })
          .finally(() => {
            this.setIsLoading(false);
          });
      },
      joinValidate() {
        let refs = this.$refs;
        let userJoinInfo = this.userJoinInfo;
        
        if(this.isEmptyUsername || !userJoinInfo.username) {
          this.checkEmpty('username');
          refs.username.focus();
          return false;
        } else if(this.isEmptyEmail || !this.emailValidate || this.isEmailDuplicated) {
          this.checkEmpty('email');
          refs.email.focus();
          return false;
        } else if(this.isEmptyPassword || !this.passwordValidate) {
          this.checkEmpty('password');
          refs.password.focus();
          return false;
        } else if(this.isEmptyHobby || !userJoinInfo.hobby) {
          this.checkEmpty('hobby');
          refs.hobby.focus();
          return false;
        } else if(this.isEmptyAddress || !userJoinInfo.address) {
          this.checkEmpty('address');
          refs.location.focus();
          return false;
        }

        return true;
      },
      checkDuplicateEmail() {
        this.setIsLoading(true);
        this.$http.get(this.url.VALIDATE_EMAIL, {
          params: {
            email: this.userJoinInfo.email
          },
        })
        .then(response => {
          if(response.data.is_valid) {
            this.emailDuplicateMessage = this.validateMessage.USER_EMAIL_OK;
            this.isEmailDuplicated = false;
          }
          else {
            this.emailDuplicateMessage = this.validateMessage.USER_EMAIL_DUPLICATE;
            this.isEmailDuplicated = true;
          }
        })
        .catch(error => {
          console.log(error.response);
        })
        .finally(() => {
          this.setIsLoading(false);
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
      userJoinInfo: {
        handler: (newVal) => {
          newVal.confirm_password = newVal.password;
        },
        deep: true,
      },
    }
  };
</script>

<style lang="sass" scoped>
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

  .hobby-list
    +clearfix
    .list_item
      float: left
      margin-right: 1rem

  .upload-file-wrapper
    display: inline-block
    .delete-image-button
      padding: 0 5px
      border: 0
      background: none
      text-align: center
      i
        color: $base-theme-color3
    .upload-file-name
      padding-left: 1.5rem
      
  .user-join_form
    .hobby-list, .location-address
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
  .form_hobby-wrap,
  .form_location-wrap
    margin-top: 1.5rem
  
  .form_file-upload-wrap
    input
      visibility: hidden
      position: absolute
    label
      cursor: pointer

  .form_birth,
  .hobby_button,
  .location_button,
  .file-upload_label
    color: $user-join-color
    font-weight: bold
    background: none
    border: 0
    & .fa
      margin-left: 1rem
      font-size: 1.5rem

  .form_confirm
    display: block
    margin: 2rem auto
    +action-button(5rem, 3rem)

  .user-info_hobby-wrap
    .title
      border: none

  .hobby-container
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100vh
    padding: 2rem
    background: #fff
        
</style>