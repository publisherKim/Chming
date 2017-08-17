
export default {
  state: {
    activeFilter: null,
    filterOption: {
      location: {},
      sort: '거리순',
      hobby: [],
      radius: 0.5,
    },
  },
  getters: {
    activeFilter(state) {
      return state.activeFilter;
    },
    location(state) {
      return state.filterOption.location;
    },
    sort(state) {
      return state.filterOption.sort;
    },
    hobby(state) {
      return state.filterOption.hobby;
    },
    radius(state) {
      return state.filterOption.radius;
    },
    filterOption(state) {
      return state.filterOption;
    },
  },
  mutations: {
    setActiveFilter(state, filter) {
      state.activeFilter = filter;
    },
    setLocation(state, location) {
      state.filterOption.location = location;
    },
    setSort(state, sort) {
      state.filterOption.sort = sort;
    },
    setHobby(state, hobby) {
      state.filterOption.hobby = hobby;
    },
    setRadius(state, radius) {
      state.filterOption.radius = radius;
    },
    setFilterOption(state, filterOption) {
      state.filterOption = filterOption;
    },
  },
};