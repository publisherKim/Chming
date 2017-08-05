<template lang="pug">
  .user-location-container
    h3.title 지역선택
    form.user-location_search-form
      input(type="text" id="keyword" placeholder="지역찾기")
      button.search-form_button(type="submit" aria-label="검색")
        i.fa.fa-search(aria-hidden='true') 
    user-map.user-map
    button.confirm-button(@click="confirm" type="button") 완료
</template>

<script>
  import UserMap from '@/components/common/Map';

  export default {
    components: {
      UserMap
    },
    methods: {
      confirm() {
        this.changeRoute();       
      },
      changeRoute() {
        this.$router.go(-1);
      }
    }
  };
</script>

<style lang="sass" scoped>
  @import "~chming"

  .user-location-container 
    position: absolute
    top: 0
    right: 0
    padding: 2rem
    width: 100%
    height: 100vh
    background: #fff

  .title
    +sub-title
  
  .user-location_search-form
    position: relative
    margin-top: 1rem
    input
      +text-input(100%)
    button
      position: absolute
      top: 0
      right: 0.5rem
      +align-vertical-middle
      padding: 0.5rem
      font-size: 1.5rem
      background: none
      border: 0
  
  .user-map
    margin-top: 1rem
    width: 100%
    height: calc(100vh - 18rem)

  .confirm-button
    display: block
    margin: 2rem auto
    +confirm-button(5rem, 3rem)

</style>