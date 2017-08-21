<template lang="pug">
  .intro-container
    h2 동호회 
      span.strong No.1 
      | 앱
      span.point 소모임
    p 같은 관심사로 오프라인 동호회 이제 여가시간을 의미있게 보내요.
    img(src="../../assets/logo/LogoTextFF3366.svg")
    h2 취밍 소개 동영상 입니다.
    video( 
      controls="controls" 
      class="video-stream" 
      x-webkit-airplay="allow" 
      data-youtube-id="N9oxmRT2YWw"
      width="100%" 
      src="../../assets/sample.mp4"
    )
    video  

</template>

<script>
  export default {
 
  };
</script>

<style lang="sass" scoped>
  @import "~chming"
  
</style>