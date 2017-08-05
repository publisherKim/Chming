<template lang="pug">
  .user-location-container
    h3.title 지역선택
    form.user-location_search-form
      input(type="text" id="keyword" placeholder="지역찾기")
      button.search-form_button(type="submit" aria-label="검색")
        i.fa.fa-search(aria-hidden='true') 
    user-map.user-map
    button.confirm(@click="confirm" type="button") 완료
</template>

<script>
  import UserMap from '@/components/common/Map';

  export default {
    components: {
      UserMap
    },
    methods: {
      confirm() {
        this.$router.push({name: 'user_join'});      
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
    background: #e1e1e1

  .title
    +sub-title
  
  .user-location_search-form
    margin-top: 1rem
    input
      padding: 0 1rem
      width: calc(100% - 3rem)
      line-height: 2rem
    button
      width: 3rem 
      .fa-search
        height: 2rem
    
  .confirm 
    display: block
    margin: 1rem auto
</style>