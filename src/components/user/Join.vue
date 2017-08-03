<template lang="pug">
    .join-user-wrap
      h3.title 회원가입
      form.join-user_form
        p  
          input.name(
            type="text" 
            placeholder="이름" 
            aria-label="이름"
          )
        p  
          input.email(
            type="email" 
            placeholder="이메일" 
            aria-label="이메일"
          )
        p  
          input.password(
            type="password" 
            placeholder="비밀번호" 
            aria-label="비밀번호"
          )
        p 
          label(class="birth" for="birth") 생년월일
          input.year(
            id="birth"
            type="number" 
            placeholder="1993" 
            min="1900" 
            :max="maxYear" 
            aria-label="생년"
          )
          input.month(
            type="number" 
            placeholder="07" 
            min="1" max="12" 
            aria-label="월"
          )
          input.day(
            type="number" 
            placeholder="07" 
            min="1" max="31" 
            aria-label="일"
          )
        p
          input#man(type="radio" name="gender" checked)
          label(for="man") 남자
          input#woman(type="radio" name="gender")
          label(for="woman") 여자
        div
          h4.title 관심사 설정 
            button(
              @click=""
              type="button"
            ) 설정
          ul.interest-list
            li
              img(src="" alt="관심사1")
        div
          h4.title 지역 선택 
            button(
              @click=""
              type="button"
            ) 설정
          p.address 경기도 성남시 분당구 정자동 11-2
        button(
          class="join-confirm" 
          type="submit") 완료
</template>

<script>
export default {
  data() {  
    return {
      menuToggle: false,
      maxYear: new Date().getFullYear()
    };
  },
  methods: {

  }
};
</script>

<style lang="sass" scoped>
  @import "~chming"

  .interest-list, .address
    margin-top: 1rem
    padding-left: 1.5rem
      
  .join-user-wrap
    +span(width 100% nest)
    padding: 0 1.5rem
    background: #e1e1e1
    border: 1px solid #ccc
    min-height: 100vh
  .active 
    display: block
  h3.title
    border-bottom: solid 1px #b1b1b1
    line-height: 3rem
  .join-user_form
    .address
      margin-top: 1rem
    p
      margin-top: 1.5rem
      input 
        width: 100%
        line-height: 2rem
      input[type="radio"],
      input[type="number"]
        &:nth-child(-n + 2)
          margin-left: 0
        width: auto
        margin-left: 1rem
    label.birth 
      display: block
      line-height: 3rem
  h4.title
    margin-top: 1.5rem
  .join-confirm
    display: block
    margin: 10px auto      


</style>