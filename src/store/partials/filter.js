
export default {
  state: {
    activeFilter: null,
    location: null,
    sort: '거리순',
    hobby: [],
    radius: 0.5,
  },
  getters: {
    activeFilter(state) {
      return state.activeFilter;
    },
    location(state) {
      return state.location;
    },
    sort(state) {
      return state.sort;
    },
    hobby(state) {
      return state.hobby;
    },
    radius(state) {
      return state.radius;
    },
  },
  mutations: {
    setActiveFilter(state, filter) {
      state.activeFilter = filter;
    },
    setLocation(state, location) {
      state.location = location;
    },
    setSort(state, sort) {
      state.sort = sort;
    },
    setHobby(state, hobby) {
      state.hobby = hobby;
    },
    setRadius(state, radius) {
      state.radius = radius;
    },
  },
};