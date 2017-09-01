import Vue from 'vue';
import Router from 'vue-router';

// Intro
import introRoutes from './partials/intro';
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
    introRoutes,
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