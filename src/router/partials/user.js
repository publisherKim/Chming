// User
import User from '@/components/user/User';
import UserLogin from '@/components/user/Login';
import UserJoin from '@/components/user/Join';
import UserInterest from '@/components/common/Interest';
import UserLocation from '@/components/common/Location';
import UserEdit from '@/components/user/Edit';
import UserInfo from '@/components/user/Info';
import UserFindId from '@/components/user/FindId';
import UserFindPw from '@/components/user/FindPw';
import UserMyGroupList from '@/components/user/MyGroupList';
import UserMyFavoriteList from '@/components/user/MyFavoriteList';

export default {
  path: '/user',
  name: 'user',
  component: User,
  children: [
    {
      path: 'login',
      name: 'user_login',
      component: UserLogin,
    },
    {
      path: 'join',
      name: 'user_join',
      component: UserJoin,
      children: [
        {
          path: 'interest',
          name: 'user_join_interest',
          component: UserInterest,
        },
        {
          path: 'location',
          name: 'user_join_location',
          component: UserLocation,
        },
      ],
    },
    {
      path: 'edit',
      name: 'user_edit',
      component: UserEdit,
      children: [
        {
          path: 'interest',
          name: 'user_edit_interest',
          component: UserInterest,
        },
        {
          path: 'location',
          name: 'user_edit_location',
          component: UserLocation,
        },
      ],
    },
    {
      path: 'info/:id',
      name: 'user_info',
      component: UserInfo,
    },
    {
      path: 'findId',
      name: 'user_findId',
      component: UserFindId,
    },
    {
      path: 'findPw',
      name: 'user_findPw',
      component: UserFindPw,
    },
    {
      path: 'myGroupList/:id',
      name: 'user_myGroupList',
      component: UserMyGroupList,
    },
    {
      path: 'myFavoriteList/:id',
      name: 'user_myFavoriteList',
      component: UserMyFavoriteList,
    },
  ],
};
