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
      commit('setIsLoading', true);
      http.post(getters.url.LOGIN, loginInfo)
        .then(response => {
          if(response.status === 200) {
            let data = response.data;
            sessionStorage.setItem('token', data.token);
            commit('setUserInfo', data.login_user_info);
          }
        })
        .catch(error => {
          let data = error.response.data;
          if(data.non_field_errors[0] === '제공된 credentials로 로그인 할 수 없습니다.') {
            commit('setToastMessage', '이메일/비밀번호를 확인해주세요');
          }
          console.log('error:', error.response);
        })
        .finally(() => {
          commit('setIsLoading', false);
        });
    },
    getUserProfile({getters, commit}, token){
      commit('setIsLoading', true);
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
        })
        .finally(() => {
          commit('setIsLoading', false);
        });
    },
    logout({getters, commit}){
      let token = sessionStorage.getItem('token');

      commit('setIsLoading', true);
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
        })
        .finally(() => {
          commit('setIsLoading', false);
        });
    },
  }
};