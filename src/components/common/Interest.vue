<template lang="pug">
  .interest-container
    h3.title 운동/스포츠
    ul.interest_list
      li
        input(v-model="selectList" id="item1" type="checkbox" value="1")
        label(for="item1") 자전거    
      li
        input(v-model="selectList" id="item2"  type="checkbox" value="2")
        label(for="item2") 배드민턴
    button.interest_confirm(@click="interestConfirm" type="button") 선택완료
</template>

<script>
export default {
  data() {
    return {
      selectList: [],
    };
  },
  methods: {
    interestConfirm(){
      this.$router.push({
        name: 'user_join'
      });
    },
  },
};
</script>

<style lang="sass" scoped>
  @import "~chming"

  .interest_confirm
    display: none

  .join-user_interest
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100vh
    padding: 2rem
    background: #e1e1e1
    .interest_confirm
      display: block
      margin: 1rem auto
  .title
    +sub-title

  .interest_list
    padding: 10px 0
    +clearfix
    li
      float: left
      width: calc(25% - 1rem)
      text-align: center
      &:not(:last-child)
        margin-right: 2rem
      font-size: 1.2rem
    label
      +rounded-rect-button
      display: block
      text-align: center
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

