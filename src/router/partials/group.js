// Group
import Group from '@/components/group/Group';
import GroupInfo from '@/components/group/Info';
import GroupHome from '@/components/group/Home';
import GroupBoard from '@/components/group/Board';
import GroupArticleView from '@/components/group/ArticleView';
import GroupArticleEdit from '@/components/group/ArticleEdit';
import GroupArticleWrite from '@/components/group/ArticleWrite';
import GroupAlbum from '@/components/group/Album';
import GroupCreate from '@/components/group/Create';
import GroupHobby from '@/components/common/Hobby';
import GroupLocation from '@/components/common/Location';
import GroupEdit from '@/components/group/Edit';

export default {
  path: '/group',
  name: 'group',
  component: Group,
  children: [
    {
      path: 'info/:id',
      name: 'group_info',
      component: GroupInfo,
      children: [
        {
          path: 'home',
          name: 'group_info_home',
          component: GroupHome,
        },
        {
          path: 'board',
          name: 'group_info_board',
          component: GroupBoard,
        },        
        {
          path: 'album',
          name: 'group_info_album',
          component: GroupAlbum,
        },
      ],
    },   
    {
      path: 'board/:id/articleView/:articleId',
      name: 'group_articleView',
      component: GroupArticleView,
    },
    {
      path: 'board/:id/articleEdit/:articleId',
      name: 'group_articleEdit',
      component: GroupArticleWrite,
    },
    {
      path: 'board/:id/articleWrite',
      name: 'group_articleWrite',
      component: GroupArticleWrite,
    },
    {
      path: 'create',
      name: 'group_create',
      component: GroupCreate,
      children: [
        {
          path: 'hobby',
          name: 'group_create_hobby',
          component: GroupHobby,
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
          path: 'hobby',
          name: 'group_edit_hobby',
          component: GroupHobby,
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
