import axios from 'axios';

let http = axios;

export default {
  state: {
    userInfo: null,
  },
  getters: {
    userInfo(state) {
      return state.userInfo;
    },
  },
  mutations: {
    setUserInfo(state, data){
      state.userInfo = data;
    },
  },
  actions: {
    login({getters, commit}, loginInfo) {
      http.post(getters.url.LOGIN, loginInfo)
        .then(response => {
          if(response.status === 200) {
            let data = response.data;
            sessionStorage.setItem('token', data.token);
            commit('setUserInfo', data.login_user_info);
          }
        })
        .catch(error => {
          console.log('error:', error.response);
        });
    },
    getUserProfile({getters, commit}, token){
      http.get(getters.url.USER_PROFILE, {headers: {'Authorization': `Token ${token}`}})
        .then(response => {
          if(response.status === 200) {
            commit('setUserInfo', response.data);
          }
        })
        .catch(error => {
          console.log('error.response:', error.response);
          if(error.response.statusText === 'Unauthorized') {
            sessionStorage.removeItem('token');
          }
        });
    },
    logout({getters, commit}){
      let token = sessionStorage.getItem('token');

      http.post(getters.url.LOGOUT, null, {
        headers: {'Authorization': `Token ${token}`}
      })
        .then(response => {
          if(response.status === 200) {
            sessionStorage.removeItem('token');
            commit('setUserInfo', null);
          }
        })
        .catch(error => {
          console.log('error:', error.response);
        });
    },
  }
};