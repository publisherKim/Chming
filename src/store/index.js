import Vuex from 'vuex';
import Vue from 'vue';
import api from './partials/api';
import user from './partials/user';
import group from './partials/group';
import map from './partials/map';
import hobby from './partials/hobby';
import region from './partials/region';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    api,
    user,
    group,
    map,
    hobby,
    region,
  },
});
