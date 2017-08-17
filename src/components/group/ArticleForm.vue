<template lang="pug">
  div
    loadingModal
    form
        input(
          v-model="board.post_type"
          id="notice" 
          type="checkbox"
        )
        label(for="notice") 공지
        input(
          v-model="board.title"
          @blur="checkEmpty('title')" 
          ref="title"
          type="text" 
          placeholder="제목을 입력해주세요" 
          aria-role="제목 작성"
        )
        message-box(
          v-if="isEmptyBoardTitle"
          :classList="['fa-check-circle-o', 'warning']"
          message="제목을 잊어버리셨군요? 잊지말아주세용 &^&"
        )
        textarea(
          v-model="board.content"
          @blur="checkEmpty('content')"
          ref="content"
          palceholder="내용을 작성해 주세요" 
          aria-role="내용 작성"
        )
        message-box(
          v-if="isEmptyBoardContent"
          :classList="['fa-check-circle-o', 'warning']"
          message="게시판 내용을 풍성하게 채워주세요"
        )
        input(
          id="file-upload" 
          type="file"
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
          ) 추억 그림 올리기
            .fa.fa-picture-o(aria-hidden="true")
            img.label_group-img(
              v-if="board.post_img" 
              :src="userImageSrc"
            )
        .write-article_decision-wrap
          button(
            @click="changeRoute({name: 'group_info_board', params: {id: groupId}})" 
            type="button"
          ) 취소
          button(
            @click="isArticleWrite ? createPost() : editPost()" 
            type="button"
          ) 확인
</template>

<script>
  import LoadingModal from '@/components/common/LoadingModal'; 
  import MessageBox from '@/components/common/MessageBox';
  import Vue from 'vue';
  import { mapGetters, mapMutations } from 'vuex';

  export default {
    created() {
      if(this.$route.name === 'group_editArticle') {
        this.getPostDetail(); 
      }
    },
    components: {
      MessageBox,
      LoadingModal
    },
    data() {
      return {
        uploadSrc: '',
        board: {
          post_type: false,
          title: null,
          content: null,
          post_img: ''
        }
      };       
    },
    computed: {
      ...mapGetters(['url']),      
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
        return this.$route.name === 'group_writeArticle';
      },
      userImageSrc() {
        if(this.uploadSrc) return this.uploadSrc;
        else return this.board.post_img;
      },
    },
    methods: {
      ...mapMutations(['setIsLoading']),
      changeRoute(route) {
        this.$router.push(route);
      },      
      checkEmpty(field) {
        let board = this.board;
        board[field] === null && (board[field] = '');
      },       
      fileUpload(e) {
        let file = e.target.files[0];
        this.board.post_img = file;
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = f => {
          this.uploadSrc = f.srcElement.result;
        };
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
        console.log(this.url.GROUP_DETAIL_REGISTER);
        console.log('url', url);
        this.setIsLoading(true);
        this.$http.post(url, formData, {headers: {Authorization: `Token ${token}`}}).
          then(response => {
            if(response.status === 201) {
              alert('게시글이 작성되었습니다');
              this.changeRoute({name: 'group_info_board', params: {id: this.groupId}});
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
      editPost() {
        console.log('edit');
        if(!this.boardValidate()) return;
        let formData = Vue.setFormData(this.board);
        let token = sessionStorage.getItem('token');
        let url = `/group/${this.groupId}/post/${this.articleId}/update/`; 
        this.setIsLoading(true);
        this.$http.put(url, formData, {headers: {Authorization: `Token ${token}`}}).
          then(response => {
            if(response.status === 200) {
              console.log(response);
              alert('게시글이 수정되었습니다');
              this.changeRoute({name: 'group_viewArticle', params: {id: this.groupId, articleId: this.articleId}}); 
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