import Vue from 'vue';
import Router from 'vue-router';
// Main
import mainRoutes from './main';
// User
import userRoutes from './user';
// Group
import groupRoutes from './group';


Vue.use(Router);

export default new Router({
  routes: [
    mainRoutes,
    userRoutes,
    groupRoutes,
  ],
});
