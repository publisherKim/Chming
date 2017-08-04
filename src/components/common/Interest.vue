<template lang="pug">
  .interest-wrap
    h3.title 운동/스포츠
    ul.interest_list
      li
        input(v-model="selectList" id="item1" type="checkbox" value="1")
        label(for="item1") 자전거    
      li
        input(v-model="selectList" id="item2"  type="checkbox" value="2")
        label(for="item2") 배드민턴
    button.confirm(@click="interestConfirm" type="button") 선택완료
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

  .interest-wrap
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100vh
    padding: 2rem
    background: #e1e1e1

  .title
    +subTitle

  .interest_list
    +clearfix
    margin-top: 1.5rem
    li
      float: left
      margin-left: 1rem
      width: calc(25% - 1rem)
      text-align: center
    label
      display: block
      text-align: center
      line-height: 3rem
      border: solid 0.1rem #666
      border-radius: 1.5rem
      cursor: pointer
    input
      visibility: hidden
      width: 0
      height: 0
    input:checked + label
      color: #fff
      background: #000
      
  .confirm
    display: block
    margin: 1rem auto
</style>

