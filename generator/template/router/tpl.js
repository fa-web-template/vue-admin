// import { toRoles } from '@/common/utils/role'
export default [
  {
    path: '/{{ name }}',
    component: () => import('@/common/layouts/Home'),
    redirect: '/users/list',
    name: '{{ name }}',
    meta: {
      // roles: toRoles(['admin']),
      title: '{{ title }}',
      icon: 'el-icon-ali-icon_yuangongguanli'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/pages/{{ page }}/views/{{ name }}'),
        name: '{{ name }}List',
        meta: {
          icon: 'el-icon-ali-yonghu',
          title: '{{ title }}列表'
        }
      }
    ]
  }
]
