
export default {
  state: {
    toastMessage: null,
  },
  getters: {
    toastMessage(state) {
      return state.toastMessage;
    },
  },
  mutations: {
    setToastMessage(state, toastMessage) {
      state.toastMessage = toastMessage;
    }
  },
};