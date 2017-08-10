// Group
import Group from '@/components/group/Group';
import GroupInfo from '@/components/group/Info';
import GroupHome from '@/components/group/Home';
import GroupBoard from '@/components/group/Board';
import GroupViewArticle from '@/components/group/ViewArticle';
import GroupEditArticle from '@/components/group/EditArticle';
import GroupWriteArticle from '@/components/group/WriteArticle';
import GroupAlbum from '@/components/group/Album';
import GroupCreate from '@/components/group/Create';
import GroupInterest from '@/components/common/Interest';
import GroupLocation from '@/components/common/Location';
import GroupEdit from '@/components/group/Edit';

export default {
  path: '/group',
  name: 'group',
  component: Group,
  children: [
    {
      path: 'info',
      name: 'group_info',
      component: GroupInfo,
      children: [
        {
          path: 'home/:id',
          name: 'group_info_home',
          component: GroupHome,
        },
        {
          path: 'album/:id',
          name: 'group_info_album',
          component: GroupAlbum,
        },
        {
          path: 'board/:id',
          name: 'group_info_board',
          component: GroupBoard,
        },
      ],
    },   
    {
      path: 'board/:id/viewArticle',
      name: 'group_viewArticle',
      component: GroupViewArticle,
    },
    {
      path: 'board/:id/editArticle',
      name: 'group_editArticle',
      component: GroupEditArticle,
    },
    {
      path: 'board/:id/writeArticle',
      name: 'group_writeArticle',
      component: GroupWriteArticle,
    },
    {
      path: 'create',
      name: 'group_create',
      component: GroupCreate,
      children: [
        {
          path: 'interest',
          name: 'group_create_interest',
          component: GroupInterest,
        },
        {
          path: 'location',
          name: 'group_create_location',
          component: GroupLocation,
        },
      ],
    },
    {
      path: 'edit/:id',
      name: 'group_edit',
      component: GroupEdit,
      children: [
        {
          path: 'interest',
          name: 'group_edit_interest',
          component: GroupInterest,
        },
        {
          path: 'location',
          name: 'group_edit_location',
          component: GroupLocation,
        },
      ],
    },
  ],
};
