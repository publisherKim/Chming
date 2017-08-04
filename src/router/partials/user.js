// User
import User from '@/components/user/User';
import UserLogin from '@/components/user/Login';
import UserJoin from '@/components/user/Join';
import UserInterest from '@/components/common/Interest';
import UserLocation from '@/components/user/Location';
import UserEdit from '@/components/user/Edit';
import UserInfo from '@/components/user/Info';
import UserFindId from '@/components/user/FindId';
import UserFindPw from '@/components/user/FindPw';
import UserGroupList from '@/components/user/GroupList';
import UserFavoriteList from '@/components/user/FavoriteList';

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
      path: 'groupList',
      name: 'user_groupList',
      component: UserGroupList,
    },
    {
      path: 'favoriteList',
      name: 'user_favoriteList',
      component: UserFavoriteList,
    },
  ],
};
