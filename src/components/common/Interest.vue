<template lang="pug">
  .interest-container
    .interest-wrap
      h3.title 운동/스포츠
      ul.interest_list
        li
          input(v-model="selectedList" id="item1" type="checkbox" value="자전거")
          label(for="item1") 자전거    
        li
          input(v-model="selectedList" id="item2"  type="checkbox" value="배드민턴")
          label(for="item2") 배드민턴
        li
          input(v-model="selectedList" id="item3"  type="checkbox" value="축구")
          label(for="item3") 축구
        li
          input(v-model="selectedList" id="item4"  type="checkbox" value="농구")
          label(for="item4") 농구
        li
          input(v-model="selectedList" id="item5"  type="checkbox" value="레이싱")
          label(for="item5") 레이싱
    .interest-wrap
      h3.title 음악
      ul.interest_list
        li
          input(v-model="selectedList" id="item6" type="checkbox" value="클래식")
          label(for="item6") 클래식    
        li
          input(v-model="selectedList" id="item7"  type="checkbox" value="재즈")
          label(for="item7") 재즈
        li
          input(v-model="selectedList" id="item8"  type="checkbox" value="팝송")
          label(for="item8") 팝송
        li
          input(v-model="selectedList" id="item9"  type="checkbox" value="K-POP")
          label(for="item9") K-POP
      
    button.interest_confirm(@click="confirm" type="button") 완료
</template>

<script>

export default {
  data() {
    return {
      selectedList: [],
    };
  },
  methods: {
    confirm() {
      let prevRoute = this.$route.params.prev;
      this.changeRoute({name: prevRoute, params: {hobby: this.selectedList}});
    },
    changeRoute(route) {
      console.log('route:', route);
      this.$router.push(route);
    },
  },
};
</script>

<style lang="sass" scoped>
  @import "~chming"

  .interest_confirm
    display: none

  .user_interest
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100vh
    padding: 2rem
    background: #fff
    .interest_confirm
      display: block
      margin: 2rem auto
      +action-button(5rem, 3rem)

  .title
    padding: 3px 0
    color: $interest-color
    line-height: 3rem
    border-bottom: 1px solid $base-theme-color
    font-size: 1.4rem

  .interest_list
    padding: 10px 0
    +clearfix
    li
      // float: left
      margin-bottom: 1rem
      text-align: center
      font-size: 1.2rem
      // &:not(:last-child)
      //   margin-right: 2rem
    label
      +rounded-rect-button(95%)
      &:hover
        +rounded-rect-button-active()
      display: block
      text-align: center
      cursor: pointer
    input
      position: absolute
      visibility: hidden
      width: 0
      height: 0
    input:checked + label
      +rounded-rect-button-active()
  
  +mobile
    .interest_list
      +container()
      li
        +span(3 of 9)
  +desktop
    .interest_list
      +container()
      li
        +span(3)

</style>

