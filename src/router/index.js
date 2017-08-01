import Vue from 'vue';
import Router from 'vue-router';
import Main from '@/components/main/Main';
import Join from '@/components/join/Join';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
    },
    {
      path: '/join',
      name: 'Join',
      component: Join,
    },
  ],
});
