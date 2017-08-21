import Vue from 'vue';

export default {
  state: {
    activeFilter: null,
    filterOptions: {
      location: {
        dong: '신사동',
      },
      sort: '거리순',
      hobby: [],
      radius: '500m',
    },
  },
  getters: {
    activeFilter(state) {
      return state.activeFilter;
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
    radius(state) {
      return state.filterOptions.radius;
    },
    filterOptions(state) {
      let radius = state.filterOptions.radius;
      let unit = (radius.indexOf('km') === 0) ? 1 : 0.001;
      radius = parseFloat(radius) * unit;

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
        distance_limit: radius,
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
    setLocation(state, location) {
      state.filterOptions.location = location;
    },
    setSort(state, sort) {
      state.filterOptions.sort = sort;
    },
    setHobby(state, hobby) {
      state.filterOptions.hobby = hobby;
    },
    setRadius(state, radius) {
      state.filterOptions.radius = radius;
    },
    setFilterOptions(state, filterOptions) {
      state.filterOptions = filterOptions;
    },
  },
};