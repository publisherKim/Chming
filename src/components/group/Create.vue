<template lang="pug">
  .group-create-container
    h3.title 모임 개설
    form.group-create_form
      input.form_name(
        v-model.trim="group.name" 
        @blur="checkEmpty('name')" 
        ref="name" 
        type="text" 
        placeholder="모임 이름을 작성해주세요." 
        aria-label="모임 이름"
      )
      message-box(
        v-if="isEmptyGroupName"
        :classList="['fa-check-circle-o', 'warning']"
        :message="validateMessage.GROUP_NAME_EMPTY"
      )
      textarea.form_description(
        v-model.trim="group.description"
        @blur="checkEmpty('description')" 
        ref="description" 
        placeholder="어떤 모임인지 설명해주세요." 
        aria-label="모임 설명"
      )
      message-box(
        v-if="isEmptyGroupDescription"
        :classList="['fa-check-circle-o', 'warning']"
        :message="validateMessage.GROUP_DESCRIPTION_EMPTY"
      )
      .form_file-upload-wrap
        input#upload(
          @change="fileUpload" 
          type="file"
        )
        label.file-upload_label(
          for="upload"
          ref="fileUpload" 
          @keyup.enter="$refs.fileUpload.click()" 
          tabindex="0" 
          role="button"
        ) 모임 대표 사진
          .fa.fa-picture-o(aria-hidden="true")
        .upload-file-wrapper(v-if="uploadImageName")
          a.upload-file-name(
            href
            role="button"
            @click.prevent="isOpenImageModal = true"
            aria-label="업로드 이미지명(미리보려면 클릭해주세요)"
          ) {{uploadImageName}}
          button.delete-image-button(@click="deleteUploadImage" type="button")
            i.fa.fa-times(aria-hidden="true")
      .form_location-wrap
        button.location_button(
          @click="setGroupLocation"
          @blur="checkEmpty('address')"
          ref="address" 
          type="button"
        ) 지역선택
          i.fa.fa-map-marker(aria-hidden='true')
        p.location-address {{group.address}}      
      message-box(
        v-if="isEmptyGroupAddrss"
        :classList="['fa-check-circle-o', 'warning']"
        :message="validateMessage.GROUP_LOCATION_EMPTY"
      )
  
      .form_hobby-wrap
        button.hobby_button(
          @click="setGroupHobby"
          @blur="checkEmpty('hobby')"
          ref="hobby"
          type="button"
        ) 관심사 설정
          i.fa.fa-cog(aria-hidden='true') 
        ul.hobby-list
          li.list_item {{group.hobby}}
      message-box(
        v-if="isEmptyGroupHobby"
        :classList="['fa-check-circle-o', 'warning']"
        message="관심사를 선택해주세요"
      ) 
      button.form_confirm(
        @click.prevent="createGroup" 
        type="button"
      ) 완료
    router-view.hobby-container
    back-button(:route={name: 'user_info'})
    modal-image(
      @closeModal="isOpenImageModal = false"
      v-if="isOpenImageModal"
      :imageSrc="uploadSrc"
    )
</template>

<script>
  import GroupHeader from '@/components/common/Header';
  import BackButton from '@/components/common/BackButton';
  import MessageBox from '@/components/common/MessageBox';
  import ModalImage from '@/components/common/ModalImage';
  import Vue from 'vue';
  import {mapGetters, mapMutations, mapActions} from 'vuex';

  export default {
    components: {
      GroupHeader,
      BackButton,
      MessageBox,
      ModalImage,
    },
    data(){
      return {
        uploadImageName: null,
        uploadSrc: '',
        isOpenImageModal: false,
        group: {
          name: null,
          description: null,
          image: '',
          address: null,
          lat: '',
          lng: '',
          hobby: null,
        }
      };
    },
    computed: {
      ...mapGetters(['url', 'validateMessage']),
      isEmptyGroupName() {
        return this.group.name === '';
      },
      isEmptyGroupDescription() {
        return this.group.description === '';
      },
      isEmptyGroupAddrss() {
        return this.group.address === '';
      },
      isEmptyGroupHobby(){
        return this.group.hobby === '';
      }
    },    
    methods: {
      ...mapMutations(['setIsLoading', 'setToastMessage']),
      ...mapActions(['getUserProfile']),
      changeRoute(route) {
        this.$router.push(route);
      },
      fileUpload(e) {
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = e => {
          if(Vue.isFileValidate(file)) {
            this.group.image = file;
            this.uploadSrc = e.target.result;
            this.uploadImageName = `[${file.name}]`;
          } else {
            this.setToastMessage('이미지 파일이면서 5MB 이하만 업로드 가능합니다.');
          }
        };
      },
      deleteUploadImage() {
        this.group.image = '';
        this.uploadSrc = '';
        this.uploadImageName = null;
      },
      checkEmpty(field) {
        let group = this.group;
        group[field] === null && (group[field] = '');
      },
      setGroupLocation() {
        this.changeRoute({
          name: 'group_create_location',
          params: {
            prev: 'group_create'
          }
        });
      },
      setGroupHobby() {
        this.changeRoute({
          name: 'group_create_hobby',
          params: {
            prev: 'group_create',
            hobby: this.group.hobby ? [this.group.hobby] : [],
          },
        });
      },
      groupValidate(field) {
        let refs = this.$refs;
        let group = this.group;

        if(this.isEmptyGroupName || !group.name) {
          this.checkEmpty('name');
          refs.name.focus();
          return false;
        }
        if(this.isEmptyGroupDescription || !group.description) {
          this.checkEmpty('description');
          refs.description.focus();
          return false;
        }
        if(this.isEmptyGroupAddrss || !group.address){
          this.checkEmpty('address');
          refs.address.focus();
          return false;
        }
        if(this.isEmptyGroupHobby || !group.hobby){
          this.checkEmpty('hobby');
          refs.hobby.focus();
          return false;
        }

        return true;
      },
      createGroup() {
        if(!this.groupValidate()) return;
        let formData = Vue.setFormData(this.group);
        let token = sessionStorage.getItem('token');

        this.setIsLoading(true);
        this.$http.post(this.url.GROUP_REGISTER, formData, {headers: {Authorization: `Token ${token}`}})
          .then(response => {
            if(response.status === 201) {
              this.getUserProfile(sessionStorage.getItem('token'));
              this.changeRoute({name: 'group_info_home', params: {id: response.data.pk}});
              this.setToastMessage('모임 생성이 완료되었습니다.');
            }
          })
          .catch(error => {
            console.log('error.response: ', error.response);
          })
          .finally(() => {
            this.setIsLoading(false);
          });
      },
    },
    watch: {
      $route(newRoute) {
        let group = this.group;
        let hobby = newRoute.params.hobby;
        hobby && (group.hobby = hobby[0]);
        let position = newRoute.params.position;
        if(position) {
          group.address = position.address;
          group.lat = position.latitude;
          group.lng = position.longitude;
        }
      },
    }
  };
</script>

<style lang="sass" scoped>
  @import "~chming"
  
  .group-create-container
    padding: 3rem

  .title
    +sub-page-title

  .form_name,    
  .form_description,
    display: block
    margin-top: 1.5rem

  .form_name,    
    +text-input(100%)
  
  .form_description
    +text-input(100%, 100px)

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

  .form_file-upload-wrap,
  .form_hobby-wrap,
  .form_location-wrap
    margin-top: 1.5rem
    .label_group-img
      display: block
      width: 100%
  .form_file-upload-wrap
    input
      visibility: hidden
      position: absolute
    label
      cursor: pointer
  
  .hobby_button,
  .location_button,
  .file-upload_label
    & > .fa
      margin-left: 1rem
      font-size: 1.5rem
    font-weight: bold
    background: none
    border: 0
  
  .hobby-list, .location-address
    margin-top: 0.5rem
    padding-left: 1.5rem

  .hobby-container
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100vh
    padding: 2rem
    background: #fff
    .hobby_confirm
      display: block
      margin: 2rem auto
      +action-button(5rem, 3rem)
        
  .form_confirm
    display: block
    margin: 2rem auto
    +action-button(5rem, 3rem)
</style>