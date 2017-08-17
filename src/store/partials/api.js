
export default {
  state: {
    url: {
      JOIN: '/user/signup/',
      VALIDATE_EMAIL: '/user/validate_email/',
      LOGIN: '/user/login/',
      LOGOUT: '/user/logout/',
      USER_PROFILE: '/user/profile/',
      GROUP_REGISTER: '/group/register/',
      MAIN_GROUP_LIST: '/group/',
      GROUP_DETAIL: '/group/',
<<<<<<< HEAD
<<<<<<< HEAD
      GROUP_DETAIL_LIST: '/group/detail/',
=======
      GROUP_DETAIL_REGISTER: `/group/${this.groupId}/post/create/`,
>>>>>>> 8fc46470f48b29c67144198c74ab1dbd9d53bc94
=======
      GROUP_DETAIL_LIST: '/group/detail/',
      GROUP_DETAIL_REGISTER: `/group/${this.groupId}/post/create/`,
>>>>>>> 90e63850b56711a56f569eb69f62039ab21f25ee
      GROUP_EDIT: '/group/',
      GROUP_JOIN: '/group/',
      GROUP_LIST: '/group/all/',
      REGION_LIST: '/group/region/',
      HOBBY_LIST: '/group/hobby/',
    },
  },
  getters: {
    url(state) {
      return state.url;
    },
  }
};