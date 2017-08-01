import Vue from 'vue';
import Router from 'vue-router';
// Main
import mainRoutes from './partials/main';
// User
import userRoutes from './partials/user';
// Group
import groupRoutes from './partials/group';

Vue.use(Router);

const router = new Router({
  routes: [
    mainRoutes,
    userRoutes,
    groupRoutes,
  ],
});

export default router;