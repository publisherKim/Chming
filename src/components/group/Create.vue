<template lang="pug">
  .group-create-container
    h3.title 모임 개설
    form.group-create_form
      input.form_name(
        v-model="group.name" 
        @blur="checkEmpty('name')" 
        ref="name" 
        type="text" 
        placeholder="모임 이름을 작성해주세요." 
        aria-label="모임 이름"
      )
      message-box(
        v-if="isEmptyGroupName"
        :classList="['fa-check-circle-o', 'warning']"
        message="그룹명을 입력해주세요."
      )
      textarea.form_description(
        v-model="group.description"
        @blur="checkEmpty('description')" 
        ref="description" 
        placeholder="어떤 모임인지 설명해주세요." 
        aria-label="모임 설명"
      )
      message-box(
        v-if="isEmptyGroupDescription"
        :classList="['fa-check-circle-o', 'warning']"
        message="그룹설명을 입력해주세요."
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
          img.label_group-img(
            v-if="group.image" 
            :src="uploadSrc"
          )
      .form_location-wrap
        button.location_button(
          @click="changeRoute({name: 'group_create_location', params: {prev: 'group_create'}})"
          @blur="checkEmpty('address')"
          ref="address" 
          type="button"
        ) 지역선택
          i.fa.fa-map-marker(aria-hidden='true')
        p.location-address {{group.address}}      
      message-box(
        v-if="isEmptyGroupAddrss"
        :classList="['fa-check-circle-o', 'warning']"
        message="지역을 선택해주세요"
      )
  
      .form_hobby-wrap
        button.hobby_button(
          @click="changeRoute({name: 'group_create_hobby', params: {prev: 'group_create', hobby: [group.hobby]}})"
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
        @click="createGroup" 
        type="button"
      ) 완료
    router-view.hobby-container
    back-button(:route={name: 'user_info'})
</template>

<script>
  import GroupHeader from '@/components/common/Header';
  import BackButton from '@/components/common/BackButton';
  import MessageBox from '@/components/common/MessageBox';
  import Vue from 'vue';
  import { mapGetters, mapMutations } from 'vuex';

  export default {
    components: {
      GroupHeader,
      BackButton,
      MessageBox
    },
    data(){
      return {
        uploadSrc: '',
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
      ...mapGetters(['url']),
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
      ...mapMutations(['setIsLoading']),
      changeRoute(route) {
        this.$router.push(route);
      },
      fileUpload(e) {
        let file = e.target.files[0];
        this.group.image = file;
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = f => {
          this.uploadSrc = f.srcElement.result;
        };
      },
      checkEmpty(field) {
        let group = this.group;
        group[field] === null && (group[field] = '');
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
              alert('모임 생성이 완료되었습니다.');
              this.changeRoute({name: 'group_info_home'});
              console.log(response);
            } else {
              console.log(response);
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