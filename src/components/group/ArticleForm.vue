<template lang="pug">
  div
    loading-modal
    form
      input(
        v-if="isGroupAuthor"
        v-model="board.post_type"
        id="notice" 
        type="checkbox"
      )
      label(v-if="isGroupAuthor" for="notice") 공지
      input(
        v-model.trim="board.title"
        @blur="checkEmpty('title')" 
        ref="title"
        type="text" 
        placeholder="제목을 입력해주세요" 
        aria-label="게시글 제목 작성"
      )
      message-box(
        v-if="isEmptyBoardTitle"
        :classList="['fa-check-circle-o', 'warning']"
        :message="validateMessage.BOARD_TITLE_EMPTY"
      )
      textarea(
        v-model.trim="board.content"
        @blur="checkEmpty('content')"
        ref="content"
        placeholder="내용을 작성해 주세요" 
        aria-label="게시글 작성"
      )
      message-box(
        v-if="isEmptyBoardContent"
        :classList="['fa-check-circle-o', 'warning']"
        :message="validateMessage.BOARD_CONTENT_EMPTY"
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
        ) 사진 올리기
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
      .write-article_decision-wrap
        button(
          @click="changeRoute({name: 'group_info_board', params: {id: groupId}})" 
          type="button"
        ) 취소
        button(
          @click="isArticleWrite ? createPost() : editPost()" 
          type="button"
        ) 확인
      modal-image(
        @closeModal="isOpenImageModal = false"
        v-if="isOpenImageModal"
        :imageSrc="uploadSrc"
      )
</template>

<script>
  import LoadingModal from '@/components/common/LoadingModal'; 
  import MessageBox from '@/components/common/MessageBox';
  import ModalImage from '@/components/common/ModalImage';
  import Vue from 'vue';
  import {mapGetters, mapMutations} from 'vuex';

  export default {
    created() {
      if(this.$route.name === 'group_articleEdit') {
        this.getPostDetail(); 
      }
    },
    components: {
      MessageBox,
      LoadingModal,
      ModalImage,
    },
    data() {
      return {
        uploadImageName: null,
        uploadSrc: '',
        isOpenImageModal: false,
        originPostImage: '',
        board: {
          post_type: false,
          title: null,
          content: null,
          post_img: ''
        },
      };       
    },
    computed: {
      ...mapGetters(['url', 'validateMessage', 'isGroupAuthor']),      
      isEmptyBoardTitle() {
        return this.board.title === '';
      },
      isEmptyBoardContent() {
        return this.board.content === '';
      },
      groupId() {
        return this.$route.params.id;
      },
      articleId() {
        return this.$route.params.articleId;
      },
      isArticleWrite() {
        return this.$route.name === 'group_articleWrite';
      },
      userImageSrc() {
        if(this.uploadSrc) return this.uploadSrc;
        else return this.board.post_img;
      },
    },
    methods: {
      ...mapMutations(['setIsLoading', 'setToastMessage', '']),
      changeRoute(route) {
        this.$router.push(route);
      },      
      checkEmpty(field) {
        let board = this.board;
        board[field] === null && (board[field] = '');
      },       
      fileUpload(e) {
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = e => {
          if(Vue.isFileValidate(file)) {
            this.board.post_img = file;
            this.uploadSrc = e.target.result;
            this.uploadImageName = `[${file.name}]`;
          } else {
            this.setToastMessage('이미지 파일이면서 5MB 이하만 업로드 가능합니다.');
          }
        };
      },
      deleteUploadImage() {
        this.board.post_img = '';
        this.uploadSrc = '';
        this.uploadImageName = null;
      },
      boardValidate(field) {
        let refs = this.$refs;
        let board = this.board;

        if(this.isEmptyBoardTitle || !board.title) {
          this.checkEmpty('title');
          refs.title.focus();
          return false;
        }
        if(this.isEmptyBoardContent || !board.content) {
          this.checkEmpty('content');
          refs.content.focus();
          return false;
        }
        return true;
      },
      getPostDetail() {
        let url = `/group/${this.groupId}/post/${this.articleId}/`;

        this.setIsLoading(true);
        this.$http.get(url)
          .then( response => {
            this.originPostImage = response.data.post_img;
            this.board = response.data;
          })
          .catch(error => {
            console.log('error.response: ', error.response);
          })
          .finally(() => {
            this.setIsLoading(false);
          });
      },            
      createPost() {
        if(!this.boardValidate()) return;
        let formData = Vue.setFormData(this.board);
        let token = sessionStorage.getItem('token');
        let url = `/group/${this.groupId}/post/create/`;
        this.setIsLoading(true);
        this.$http.post(url, formData, {headers: {Authorization: `Token ${token}`}}).
          then(response => {
            if(response.status === 201) {
              this.setToastMessage('게시글이 작성되었습니다');
              this.changeRoute({name: 'group_info_board', params: {id: this.groupId}});
            }
          })
          .catch(error => {
            console.log('error.response: ', error.response);
          })
          .finally(() => {
            this.setIsLoading(false);
          });
      },
      editPost() {
        if(!this.boardValidate()) return;
        let editData = this.board;
        (this.originPostImage === editData.post_img) && delete editData.post_img;

        let formData = Vue.setFormData(editData);
        let token = sessionStorage.getItem('token');
        let url = `/group/${this.groupId}/post/${this.articleId}/update/`; 
        this.setIsLoading(true);
        this.$http.put(url, formData, {headers: {Authorization: `Token ${token}`}}).
          then(response => {
            if(response.status === 200) {
              this.setToastMessage('게시글이 수정되었습니다');
              this.changeRoute({name: 'group_articleView', params: {id: this.groupId, articleId: this.articleId}}); 
            }
          })
          .catch(error => {
            console.log('error.response: ', error.response);
          })
          .finally(() => {
            this.setIsLoading(false);
          });
      },
    }        
  };
</script>

<style lang="sass" scoped>
  @import "~chming"

  form
    margin-top: 1rem
    padding: 0 2rem
    border-top: solid 1px #ccc
    input
      margin-top: 2rem
    input[type="text"]
      +text-input(100%)
      display: block
    textarea
      margin-top: 2rem
      +text-input(100%, 20rem)
      display: block
    input[type="file"]
      position: absolute
      display: block
      visibility: hidden
    label[for="file-upload"]
      display: inline-block
      +text-input()
      color: $base-theme-color
      margin-top: 2rem
      cursor: pointer
    label[for="file-upload"]::hover
      +is-active()
  
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
  
  .write-article_decision-wrap
    margin-top: 2rem
    text-align: center
    button
      display: inline-block
      +action-button(8rem, 3rem)
      margin: 0 1rem

  .form_file-upload-wrap
    margin-top: 2rem
    input
      visibility: hidden
      position: absolute
    label
      cursor: pointer

  .form_file-upload-wrap
    margin-top: 1.5rem
    .label_group-img
      display: block
      width: 100%  

  .file-upload_label
    & > .fa
      margin-left: 1rem
      font-size: 1.5rem
    font-weight: bold
    background: none
    border: 0
</style>