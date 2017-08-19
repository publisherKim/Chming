<template lang="pug">
  .group-create-container
    h3.title 모임 정보 수정
    form.group-create_form
      p.form_name {{ group.name }}
      textarea.form_description(
        v-model="group.description" 
        placeholder="어떤 모임인지 설명해주세요." 
        aria-label="모임 설명"
        ref="description"
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
          v-if="groupImageSrc" 
          :src="groupImageSrc"
        )
      .form_location-wrap
        button.location_button(
          @click="changeRoute({name: 'group_edit_location', params: {prev: 'group_edit'}})"
          type="button"
          ref="address" 
        ) 지역선택
          i.fa.fa-map-marker(aria-hidden='true')
        p.location-address {{group.address}}
      .form_hobby-wrap
        button.hobby_button(
          @click="changeRoute({name: 'group_edit_hobby', params: {prev: 'group_edit', hobby: [group.hobby]}})" 
          type="button"
        ) 관심사 설정
          i.fa.fa-cog(aria-hidden='true')
        ul.hobby-list
          li.list_item {{group.hobby}}
      router-view.hobby-container
      button.form_confirm(
        @click="edit" 
        type="button"
      ) 완료
    back-button(:route="{name: 'group_info'}")
</template>

<script>
  import BackButton from '@/components/common/BackButton';
  import MessageBox from '@/components/common/MessageBox';
  import Vue from 'vue';
  import { mapGetters, mapMutations } from 'vuex';

  export default {
    created() {
      this.getGroupInfo();
      //console.log(data);
    },
    components: {
      BackButton,
      MessageBox
    },    
    data() {
      return {
        group: {
          author: {},
          hobby: []
        },
        uploadSrc: '',
        originGroupImage: '',
      };
    },
    computed: {
      ...mapGetters(['url']),
      isEmptyGroupDescription() {
        return this.group.description === '';
      },    
      groupImageSrc() {
        if(this.uploadSrc) return this.uploadSrc;
        else return this.group.image;
      },
    },
    methods: {
      ...mapMutations(['setIsLoading']),
      fileUpload(e) {
        let file = e.target.files[0];
        this.group.image = file;
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = f => {
          this.uploadSrc = f.srcElement.result;
        };
      },
      changeRoute(route) {
        this.$router.push(route);
      },
      editValidate() {
        let refs = this.$refs;
        let group = this.group;
        
        if(this.isEmptyGroupDescription || !group.description) {
          console.log('test');
          refs.description.focus();
          return false;
        }

        return true;
      },      
      getGroupInfo() {
        let groupId = this.$route.params.id;
        let url = this.url.GROUP_DETAIL + groupId + '/';
        this.setIsLoading(true);
        this.$http.get(url)
          .then(response => {
            if(response.status === 200) {
              let data = response.data;
              data.hobby = data.hobby[0];
              this.originGroupImage = data.image;
              this.group = data;
            }
          })
          .catch(error => {
            console.log('error:', error.response);
          })
          .finally(() => {
            this.setIsLoading(false);
          });
      },
      edit() {
        if(!this.editValidate()) return;

        let token = sessionStorage.getItem('token');

        let group = this.group;
        (this.originGroupImage === group.image) && delete group.image;

        let formData = Vue.setFormData(group);
        let groupId = this.$route.params.id;
        let url = this.url.GROUP_EDIT + groupId + '/edit/';
        this.setIsLoading(true);
        this.$http.put(url, formData, {headers: {'Authorization': `Token ${token}`}}).
          then(response => {
            if(response.status === 200) {
              this.changeRoute({name: 'group_info_home'});
              alert('그룹정보수정이 완료되었습니다.');
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
  p
    display: block
    margin-top: 1.5rem

  .form_name
    font-size: 1.5rem
    font-weight: bold
  
  .form_description
    +text-input(100%, 100px)

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
    & > .fa
      margin-left: 1rem
      font-size: 1.5rem
    font-weight: bold
    background: none
    border: 0
  
  .hobby-list, .location-address
    margin-top: 1rem
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