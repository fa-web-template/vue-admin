// import { toRoles } from '@/common/utils/role'
export default [
  {
    path: '/{{ name }}',
    component: () => import('@/common/layouts/Home'),
    redirect: '/{{ name }}/list',
    name: '{{ name }}',
    single: true,
    meta: {
      // roles: toRoles(['admin']),
      title: '{{ title }}',
    },
    children: [
      {
        path: 'list',
        component: () => import('@/pages/{{ page }}/views/{{ name }}'),
        name: '{{ name }}List',
        hidden: true,
        meta: {
          icon: 'el-icon-ali-yonghu',
          title: '{{ title }}列表'
        }
      }
    ]
  }
]
