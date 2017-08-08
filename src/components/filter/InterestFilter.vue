<template lang="pug">
  .interest-container
    h2.interest_title 관심사 필터
    choice-header.interest-wrap
    .interest_content-wrap
      interest.interest-filter-wrap
</template>

<script>
import Interest from '@/components/common/Interest';
import ChoiceHeader from '@/components/filter/ChoiceHeader';

export default {
  components: {
    Interest,
    ChoiceHeader
  },
  data() {
    return {

    };
  },
};
</script>

<style lang="sass" scoped>
  @import "~chming"

  button
    background: none
    font-size: 1.2rem
  .interest-container
    width: 100%
    z-index: 10
  .interest_title
    +a11y-hidden

  .interest_content-wrap
    background: #fff
  .interest_list-wrap
    +clearfix
    h2
      margin: 0
    li
      float: left
      margin-right: gutter()
    button
      border: 1px solid #000
      border-radius: 1rem
      padding: 3px 5px
  .interest-filter-wrap
    width: 100%
    padding: 0 2rem
</style>