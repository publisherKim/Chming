<template lang="pug">
  .intro-container
    .intro_header-wrap
      h2 모임 
        span.strong No.1
        |  서비스
        img.main-logo-image(src="../../assets/logo/logo_intro.svg")
      p 같은 관심사로 오프라인 동호회 
      p 이제 여가시간을 의미있게 보내요.
      button.go-main-button(
        @click="changeRoute({name: 'main'})"
        type="button"
      ) 모임 이용하기
      button.show-tutorial-button(
        @click="showMovie"
      ) 튜토리얼 영상

    .intro_video-wrap(
      @click.self="closeMovie"
      v-if="isMovieShow"
    )
      .intro-youtube-wrap
        iframe(
          width="100%" 
          src="https://www.youtube.com/embed/JbdWYK5rIKA?autoplay=1" 
          frameborder="0"
          allowfullscreen
        )
      button.close-modal-button(
        @click="closeMovie"
        type="button" 
      )
        i.fa.fa-times(aria-hidden="true")
    .intro_bottom-wrap
      button.never-show-intro-button(
        @click="closeIsIntro"
        type="button"
      ) 다시 보지않기
</template>

<script>
  export default {
    beforeCreate() {
      localStorage.setItem('showIntro', true);
    },
    data() {
      return {
        isMovieShow: false
      };
    },
    methods: {
      changeRoute(route) {
        this.$router.push(route);
      },
      closeIsIntro() {
        localStorage.setItem('showIntro', false);
        this.changeRoute({name: 'main'});
      },
      showMovie() {
        this.isMovieShow = !this.isMovieShow;
      },
      closeMovie() {
        this.isMovieShow = !this.isMovieShow;
      }      
    },
  };
</script>

<style lang="sass" scoped>
  @import "~chming"

  .intro-container
    min-height: 100vh
    background: linear-gradient(-45deg, #66cdcc 0%, $base-theme-color 100%)
    button
      +action-button
      padding: 1rem
    .strong
      color: $base-point-color
    .main-logo-image
      margin: 4rem auto
      display: block

  .intro_header-wrap
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    width: 100%
    text-align: center
    h2
      font-size: 2rem
      color: #fff
    p
      margin: 0 auto
      width: calc(100% - 8rem)
      text-align: center
      color: #fff
    
    .go-main-button, .show-tutorial-button
      margin: 4rem 0.5rem
      padding: 1rem 2rem
      color: #fff
      background: none
      border-radius: 2rem
      border-color: #fff

  .intro_video-wrap
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100vh
    background: #000
    background: rgba(0, 0, 0, 0.5)
    z-index: 2    
    .close-modal-button
      position: absolute
      top: 1rem
      right: 1rem
      padding: 0 5px
      border: 0
      background: none
      font-size: 1.7rem
      text-align: center
      i
        color: $base-theme-color2

  .intro-youtube-wrap
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    width: 300px
    padding-bottom: 400px
    iframe
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%

  .intro_bottom-wrap
    position: fixed
    bottom: 0
    width: 100%

    .never-show-intro-button
      display: block
      width: 100%
      color: #fff
      background: none
      border: none

  +mobile
    // .intro-youtube-wrap
    //   max-width: 200px
    .main-logo-image
      width: 70%
  +desktop
    .intro-youtube-wrap
      width: 33.33%
      padding-bottom: 44.44%
      
    .main-logo-image
      width: 50%
</style>