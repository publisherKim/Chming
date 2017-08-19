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
      GROUP_DETAIL_LIST: '/group/detail/',
      GROUP_DETAIL_REGISTER: `/group/${this.groupId}/post/create/`,
      GROUP_SEARCH: '/group/search/',
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