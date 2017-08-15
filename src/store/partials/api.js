
export default {
  state: {
    url: {
      JOIN: '/user/signup/',
      VALIDATE_EMAIL: '/user/validate_email/',
      LOGIN: '/user/login/',
      LOGOUT: '/user/logout/',
      USER_PROFILE: '/user/profile/',
      GROUP_REGISTER: '/group/register/',
      HOBBY_LIST: '/group/hobby/',

    },
  },
  getters: {
    url(state) {
      return state.url;
    },
  },
};