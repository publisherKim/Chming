import Vue from 'vue';

export default {
  state: {
    activeFilter: null,
    selectedHobby: [],
    filterOptions: {
      location: {
        level2: '신사동',
      },
      sort: '거리순',
      hobby: [],
    },
  },
  getters: {
    activeFilter(state) {
      return state.activeFilter;
    },
    selectedHobby(state) {
      return state.selectedHobby;
    },
    location(state) {
      return state.filterOptions.location;
    },
    sort(state) {
      return state.filterOptions.sort;
    },
    hobby(state) {
      return state.filterOptions.hobby;
    },
    filterOptions(state) {
      let location = state.filterOptions.location;
      if(!location.lat) {
        let defaultLocation = Vue.maps.getDefaultLocation();
        location = {
          lat: defaultLocation.lat,
          lng: defaultLocation.lng,
        };
      }

      let options = {
        lat: location.lat,
        lng: location.lng,
        hobby: state.filterOptions.hobby.toString(),
        sort: state.filterOptions.sort,
      };

      return options;
    },
  },
  mutations: {
    setActiveFilter(state, filter) {
      state.activeFilter = filter;
    },
    setSelectedHobby(state, selectedHobby) {
      state.selectedHobby = selectedHobby;
    },
    setLocation(state, location) {
      state.filterOptions.location = location;
    },
    setSort(state, sort) {
      state.filterOptions.sort = sort;
    },
    setHobby(state, hobby) {
      state.filterOptions.hobby = hobby;
    },
    setFilterOptions(state, filterOptions) {
      state.filterOptions = filterOptions;
    },
  },
};