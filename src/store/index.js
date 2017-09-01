import Vuex from 'vuex';
import Vue from 'vue';
import api from './partials/api';
import user from './partials/user';
import group from './partials/group';
import map from './partials/map';
import filter from './partials/filter';
import hobby from './partials/hobby';
import region from './partials/region';
import loading from './partials/loading';
import toastmessage from './partials/toastmessage.js';
import constants from './partials/constants.js';
import init from './partials/init.js';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    api,
    user,
    group,
    map,
    filter,
    hobby,
    region,
    loading,
    toastmessage,
    constants,
    init,
  },
});
