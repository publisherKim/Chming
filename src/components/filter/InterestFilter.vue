<template lang="pug">
  .interest-container
    h2.interest_title 관심사 필터
    filter-header.interest-wrap
    .interest_content-wrap
      interest.interest-filter-wrap
</template>

<script>
import Interest from '@/components/common/Interest';
import FilterHeader from '@/components/filter/Header';

export default {
  components: {
    Interest,
    FilterHeader
  },
  data() {
    return {

    };
  },
};
</script>

<style lang="sass" scoped>
  @import "~chming"

  .interest-container
    width: 100%
    z-index: 10

  .interest_title
    +a11y-hidden

  .interest_content-wrap
    background: $filter-panel-background-color

  .interest-filter-wrap
    width: 100%
    +side-space
</style>