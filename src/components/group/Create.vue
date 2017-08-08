<template lang="pug">
  .group-create-container
    h3.title 모임 개설
    form.group-create_form
      input.form_name(type="text" placeholder="모임 이름을 작성해주세요." aria-label="모임 이름")
      textarea.form_description(placeholder="어떤 모임인지 설명해주세요." aria-label="모임 설명")
      .form_location-wrap
        button.location_button(@click="changeRoute('user_join_location')" type="button") 지역선택
          i.fa.fa-map-marker(aria-hidden='true')
        p.location-address 경기도 성남시 분당구 정자동 11-2
      .form_interest-wrap
        button.interest_button(@click="changeRoute('user_join_interest')" type="button") 관심사 설정
          i.fa.fa-cog(aria-hidden='true')
        ul.interest-list
          li
            img(src="" alt="관심사1")
      button.form_confirm(@click="changeRoute('main')" type="submit") 완료
    cancel-button
</template>

<script>
  import GroupHeader from '@/components/common/Header';
  import CancelButton from '@/components/common/CancelButton';

  export default {
    components: {
      GroupHeader,
      CancelButton,
    },
    methods: {
      changeRoute(route) {
        this.$router.push({name: route});
      },
    },
  };
</script>

<style lang="sass" scoped>
  @import "~chming"
  
  .group-create-container
    padding: 3rem

  .title
    +sub-title

  .form_name,    
  .form_description,
    display: block
    margin-top: 1.5rem

  .form_name,    
    +text-input(100%)
  
  .form_description
    +text-input(100%, 100px)

  .form_interest-wrap,
  .form_location-wrap
    margin-top: 1.5rem
  
  .interest_button,
  .location_button
    & > .fa
      margin-left: 1rem
      font-size: 1.5rem
    font-weight: bold
    background: none
    border: 0
  
  .interest-list, .location-address
    margin-top: 1rem
    padding-left: 1.5rem
  
  .form_confirm
    display: block
    margin: 2rem auto
    +confirm-button(5rem, 3rem)
</style>