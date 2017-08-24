<template lang="pug">
  .icon-container(:class="'bg-' + iconClass")
    span.hobby-icon(:class="iconClass" aria-hidden="true")
</template>

<script>
  import {mapGetters} from 'vuex';
  export default {
    props: {
      hobby: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        iconColor: false
      };
    },
    computed: {
      ...mapGetters(['hobbyList']),
      hobbyCategory() {
        let hobby = this.hobbyList.filter(hobbyItem => {
          return hobbyItem.category_detail === this.hobby;
        });
        return hobby[0] && hobby[0].category;
      },
      iconClass() {
        switch(this.hobbyCategory) {
        case '게임/오락' :
          return 'icon-game';
        case '댄스/무용' :
          return 'icon-dance';
        case '문화/공연' :
          return 'icon-movie';
        case '사진' :
          return 'icon-camera';
        case '스터디' :
          return 'icon-study';
        case '아웃도어/여행' :
          return 'icon-travel';
        case '운동/스포츠' :
          return 'icon-exercise';
        case '인문학/책/글' :
          return 'icon-book';
        case '차/오토바이' :
          return 'icon-car';
        }
      },
    },
  };
</script>

<style lang="sass" scoped>
  @import "~chming"
  .icon-container
    position: relative
    display: inline-block
    width: 2.5rem
    height: 2.5rem
    text-align: center
    border-radius: 50%

  .hobby-icon
    opacity: 0.7
    position: absolute
    +align-center
    display: block
    width: 1.5rem
    height: 1.5rem
    background-size: 1.5rem auto
  i
    color: inherit
    vertical-align: middle
    font-size: 1.4rem
  .bg-icon-game
    border: 1.5px solid #bfbfbf
  .bg-icon-dance
    border: 1.5px solid #bfbfbf
  .bg-icon-movie
    border: 1.5px solid #bfbfbf
  .bg-icon-camera
    border: 1.5px solid #bfbfbf
  .bg-icon-study
    border: 1.5px solid #bfbfbf
  .bg-icon-travel
    border: 1.5px solid #bfbfbf
  .bg-icon-exercise
    border: 1.5px solid #bfbfbf
  .bg-icon-book
    border: 1.5px solid #bfbfbf
  .bg-icon-car
    border: 1.5px solid #bfbfbf
</style>