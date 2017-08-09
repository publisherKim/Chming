<template lang="pug">
  form
      input(id="notice" type="checkbox")
      label(for="notice") 공지
      input(type="text" placeholder="제목을 입력해주세요" aria-role="제목 작성")
      textarea(palceholder="내용을 작성해 주세요" aria-role="내용 작성")
      input(id="file-upload" type="file")
      label(for="file-upload") 사진 올리기
      .write-article_decision-wrap
        button(@click="cancelContent" type="button") 취소
        button(@click="confirmContent(1, 1)") 확인
</template>

<script>
  export default {
    methods: {
      cancelContent(){
        this.$router.go(-1);
      },
      confirmContent(id, num) {
        this.$router.push({ name: 'group_viewArticle', param:{id: id}, query: {num: num} });
      }
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
          
</style>