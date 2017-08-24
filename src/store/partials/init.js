
export default {
  state: {
    isInitialized: false,
  },
  getters: {
    isInitialized(state) {
      return state.isInitialized;
    },
  },
  mutations: {
    setIsInitialized(state, isInitialized) {
      state.isInitialized = isInitialized;
    },
  },
  actions: {
    initialize({dispatch, commit}) {
      commit('setIsInitialized', true);
      dispatch('getRegionList');
      dispatch('getHobbyList');

      let token = sessionStorage.getItem('token');
      if(token !== null) {
        dispatch('getUserProfile', token);
      }
    },
  },
};