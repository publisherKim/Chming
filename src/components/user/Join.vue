<template lang="pug">
  .join-user-wrap
    h3 회원가입
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
        input.year(
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

</template>

<script>
export default {
  data() {  
    return {
      menuToggle: false,
      maxYear: new Date().getFullYear(),
    };
  },
  methods: {
    toggleMenu(e) {
      e.preventDefault();
      this.menuToggle = !this.menuToggle;
    }
  },
};
</script>

<style lang="sass" scoped>
  @import "~chming"

  +mobile
    .join-user-wrap
      +span(width 100% nest)
      background: #e1e1e1
      border: 1px solid #ccc
      min-height: 100vh
    .active 
      display: block
    h3
      title 1.4rem
      padding-left: 1.5rem
      border-bottom: solid 1px #b1b1b1
      line-height: 3rem
    p
      padding: 0 1.5rem
      input 
        width: 100%
        line-height: 2rem
      input[type="radio"],
      input[type="number"]
        &:first-child
          margin-left: 0
        width: auto
        margin-left: 1rem
</style>
