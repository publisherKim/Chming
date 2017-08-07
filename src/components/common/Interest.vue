<template lang="pug">
  .interest-container
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
    button.interest_confirm(@click="interestConfirm" type="button") 완료
</template>

<script>

export default {
  data() {
    return {
      selectedList: [],
    };
  },
  methods: {
    interestConfirm() {
      this.changeRoute({name: 'user_join', params: {hobby: this.selectedList}});
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
      +confirm-button(5rem, 3rem)

  .title
    +sub-title

  .interest_list
    padding: 10px 0
    +clearfix
    li
      float: left
      margin-bottom: 1rem
      text-align: center
      font-size: 1.2rem
      &:not(:last-child)
        margin-right: 2rem
    label
      +rounded-rect-button
      display: block
      text-align: center
      padding-left: 2rem
      padding-right: 2rem
      cursor: pointer
    input
      position: absolute
      visibility: hidden
      width: 0
      height: 0
    input:checked + label
      color: #fff
      background: #000
      
</style>

