import axios from 'axios';

let http = axios;

export default {
  state: {
    hobbyList: [],
    hobbyCategoryList: [],
  },
  getters: {
    hobbyList(state) {
      return state.hobbyList;
    },
    hobbyCategoryList(state) {
      return state.hobbyCategoryList;
    },
  },
  mutations: {
    setHobbyList(state, hobbyList) {
      window.hobbyList = hobbyList;
      const hobbyCategorySet = new window.Set();
      hobbyList.forEach( v => {
        hobbyCategorySet.add(v.category);
      });
      state.hobbyList = hobbyList;
      state.hobbyCategoryList = hobbyList.filter(function(item, pos, array) {
        return !pos || item.category !== array[pos - 1].category;
      });
    },
  },
  actions: {
    getHobbyList({getters, commit}) {
      commit('setIsLoading', true);
      http.get(getters.url.HOBBY_LIST)
        .then(response => {
          if(response.status === 200) {
            commit('setHobbyList', response.data);
          }
        })
        .catch(error => {
          console.log('error.response:', error.response);
        })
        .finally(() => {
          commit('setIsLoading', false);
        });
    },
  }
};