
export default {
  state: {
    activeFilter: null,
  },
  getters: {
    activeFilter(state) {
      return state.activeFilter;
    },
  },
  mutations: {
    setActiveFilter(state, filter){
      state.activeFilter = filter;
    },
  },
};