<template lang="pug">
  .user-info-wrap
   .user-info_profile
    img(src='' alt="userName")
    ul.profile_list
      li.list_item 홍길동
      li.user-info-profile-item 1999.
      li.user-info-profile-item 01.
      li.user-info-profile-item 01
    p.profile_location 경기도 성남시 서현동 
  .user-info_interest
    h3.title 관심사
    .user-info_interest_list
      li.item 배드민턴

</template>

<script>
import EditButton from '@/components/common/EditButton';
export default {
  components: {
    EditButton,
  },
};
</script>

<style lang="sass" scoped>
  @import "~chming"

</style>