<template lang="pug">
  .edit-container
    .user-edit-wrap
      h3.title 사용자 정보 수정
      form.user-edit_form
        p 이메일 : {{userEditInfo.email}}
        p
          input.form_name(
            v-model.trim="userEditInfo.username"
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
        p
          input.form_password(
            v-model.trim="userEditInfo.password"
            ref="password"
            type="password"
            placeholder="비밀번호(대소문자, 숫자 포함 8글자 이상)"
            aria-label="비밀번호"
          )
          message-box(
            v-if="userEditInfo.password"
            :classList="['fa-check-circle-o', passwordValidate ? 'info' : 'warning']" 
            :message="passwordValidationMessage"
          )
        p
          label.form_birth(for="birth") 생년월일
          input#birth.form_year(
            type="number" 
            v-model.number="userEditInfo.birth_year" 
            min="1900" 
            :max="maxYear" 
            aria-label="년"
          )
          input.form_month(
            type="number"
            v-model.number="userEditInfo.birth_month"
            min="1"
            max="12"
            aria-label="월"
          )
          input.form_day(
            type="number"
            v-model.number="userEditInfo.birth_day"
            min="1"
            max="31"
            aria-label="일"
          )
          input#man(
            v-model="userEditInfo.gender"
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
            v-model="userEditInfo.gender"
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
          input#upload(@change="fileUpload" type="file")
          label.file-upload_label(
            @keyup.enter="$refs.fileLabel.click()"
            ref="fileLabel"
            for="upload"
            tabindex="0"
          ) 프로필 사진
            i.fa.fa-picture-o(aria-hidden="true")
          .upload-file-wrapper(v-if="imageName")
            a.upload-file-name(
              href
              role="button"
              @click.prevent="isOpenImageModal = true"
              aria-label="업로드 이미지명(미리보려면 클릭해주세요)"
            ) {{imageName}}
            button.delete-image-button(@click="deleteUploadImage" type="button")
              i.fa.fa-times(aria-hidden="true")

        .form_hobby-wrap
          button.hobby_button(
            @click="changeRoute({name: 'user_edit_hobby', params: {prev: 'user_edit', hobby: userEditInfo.hobby}})"
            ref="hobby"
            type="button"
          ) 관심사 설정
            i.fa.fa-cog(aria-hidden='true')
          ul.hobby-list(v-if="userEditInfo.hobby && userEditInfo.hobby.length !== 0")
            li.list_item(v-for="hobby in userEditInfo.hobby")
              img(src="" :alt="hobby")
        message-box(
          v-if="isEmptyHobby"
          :classList="['fa-check-circle-o', 'warning']"
          :message="validateMessage.USER_HOBBY_EMPTY"
        )
        .form_location-wrap
          button.location_button(
            @click="changeRoute({name: 'user_edit_location', params: {prev: 'user_edit'}})" 
            ref="location"
            type="button"
          ) 지역선택
            i.fa.fa-map-marker(aria-hidden='true')
          p.location-address {{userEditInfo.address}}
        message-box(
          v-if="isEmptyAddress"
          :classList="['fa-check-circle-o', 'warning']"
          :message="validateMessage.USER_LOCATION_EMPTY"
        )
        button.form_confirm(@click="edit" type="button") 완료
    router-view.hobby-container
    back-button(:route="{name: 'user_info'}")
    modal-image(
      @closeModal="isOpenImageModal = false"
      v-if="isOpenImageModal"
      :imageSrc="imageSrc"
    )
</template>

<script>
  import BackButton from '@/components/common/BackButton';
  import MessageBox from '@/components/common/MessageBox';
  import ModalImage from '@/components/common/ModalImage';
  import Vue from 'vue';
  import {mapGetters, mapMutations, mapActions} from 'vuex';

  let passwordRegexp = /^(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;

  export default {
    beforeRouteEnter (to, from, next) {
      let token = sessionStorage.getItem('token');
      !token && next({name: 'main'});
      token && next();
    },
    created() {
      let userInfo = this.userInfo;

      if(userInfo) {
        userInfo.password = '';
        this.userEditInfo = Vue.mixin({}, userInfo);
      }
    },
    data() {  
      return {
        maxYear: new Date().getFullYear(),
        isOpenImageModal: false,
        uploadImageName: null,
        uploadSrc: null,
        passwordValidationMessage: '',
        userEditInfo: {},
      };
    },
    components: {
      BackButton,
      MessageBox,
      ModalImage,
    },
    methods: {
      ...mapMutations(['setIsLoading', 'setToastMessage']),
      ...mapActions(['getUserProfile']),
      changeRoute(route) {
        this.$router.push(route);
      },
      edit() {
        if(!this.editValidate()) return;

        let token = sessionStorage.getItem('token');

        let userEditInfo = this.userEditInfo;
        (this.userEditInfo.profile_img === this.userInfo.profile_img) && delete userEditInfo.profile_img;
        userEditInfo.password === '' && delete userEditInfo.password;

        let formData = Vue.setFormData(userEditInfo);
        this.setIsLoading(true);
        this.$http.put(this.url.USER_PROFILE, formData, {headers: {'Authorization': `Token ${token}`}}).
          then(response => {
            if(response.status === 200) {
              this.getUserProfile(sessionStorage.getItem('token'));
              this.changeRoute({name: 'user_info'});
              this.setToastMessage('정보수정이 완료되었습니다.');
            }
          })
          .catch(error => {
            console.log('error.response: ', error.response);
          })
          .finally(() => {
            this.setIsLoading(false);
          });
      },
      editValidate() {
        let refs = this.$refs;
        let userEditInfo = this.userEditInfo;
        
        if(this.isEmptyUsername || !userEditInfo.username) {
          refs.username.focus();
          return false;
        } else if(!this.passwordValidate) {
          refs.password.focus();
          return false;
        } else if(this.isEmptyHobby || !userEditInfo.hobby) {
          refs.hobby.focus();
          return false;
        } else if(this.isEmptyAddress || !userEditInfo.address) {
          refs.location.focus();
          return false;
        }

        return true;
      },
      fileUpload(e) {
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = e => {
          if(Vue.isFileValidate(file)) {
            this.userEditInfo.profile_img = file;
            this.uploadSrc = e.target.result;
            this.uploadImageName = `[${file.name}]`;
          } else {
            this.setToastMessage('이미지 파일이면서 5MB 이하만 업로드 가능합니다.');
          }
        };
      },
      deleteUploadImage() {
        this.userEditInfo.profile_img = '';
        this.uploadSrc = '';
        this.uploadImageName = '';
      },
    },
    computed: {
      ...mapGetters(['userInfo', 'url', 'validateMessage']),
      userImageSrc() {
        if(this.uploadSrc) return this.uploadSrc;
        else return this.userEditInfo.profile_img;
      },
      passwordValidate() {
        let userEditInfo = this.userEditInfo;
        if(userEditInfo) {
          if(!userEditInfo.password) return true;
          if(passwordRegexp.test(userEditInfo.password)) {
            this.passwordValidationMessage = this.validateMessage.USER_PASSWORD_OK;
            return true;
          } else {
            this.passwordValidationMessage = this.validateMessage.USER_PASSWORD_NOT_OK;
            return false;
          }
        }
      },
      isEmptyUsername() {
        return this.userEditInfo.username === '';
      },
      isEmptyHobby() {
        let hobby = this.userEditInfo.hobby;
        return hobby && hobby.length === 0;
      },
      isEmptyAddress() {
        return this.userEditInfo.address === '';
      },
      imageName() {
        if(this.uploadImageName !== null) return this.uploadImageName;
        else {
          if(this.userInfo) {
            return decodeURI(this.userInfo.profile_img).split('?')[0].split('/').pop();
          }
        }
      },
      imageSrc() {
        if(this.uploadSrc !== null) return this.uploadSrc;
        else return this.userInfo.profile_img;
      },
    },
    watch: {
      userInfo(newVal) {
        newVal.password = '';
        this.userEditInfo = Vue.mixin({}, newVal);
      },
      $route(newRoute) {
        let userEditInfo = this.userEditInfo;
        let hobby = newRoute.params.hobby;
        hobby && (userEditInfo.hobby = hobby);
        let position = newRoute.params.position;
        // position && (userEditInfo.position = position);
        if(position) {
          userEditInfo.address = position.address;
          userEditInfo.lat = position.latitude;
          userEditInfo.lng = position.longitude;
        }
      },
    },
  };
</script>

<style lang="sass" scoped>
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
    & .fa
      margin-left: 1rem
      font-size: 1.5rem

  .form_confirm
    display: block
    margin: 2rem auto
    +action-button(5rem, 3rem)
    
  .hobby-container
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100vh
    padding: 2rem
    background: #fff
</style>