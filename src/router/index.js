import Vue from 'vue';
import Router from 'vue-router';
// Main
import mainRoutes from './partials/main';
// User
import userRoutes from './partials/user';
// Group
import groupRoutes from './partials/group';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    mainRoutes,
    userRoutes,
    groupRoutes,
    {
      path: '*',
      redirect: {
        name: 'main'
      },
    },
  ],
});