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
        },
        children: [
          {
            path: 'add',
            name: '{{ name }}Add',
            component: () =>
              import('@/pages/admin/views/{{ name }}/children/Add'),
            hidden: true,
            meta: {
              title: '添加{{ title }}'
            }
          },
          {
            path: ':id/edit',
            name: '{{ name }}Edit',
            component: () =>
              import('@/pages/admin/views/{{ name }}/children/Edit'),
            hidden: true,
            meta: {
              title: '编辑{{ title }}'
            }
          }
        ]
      }
    ]
  }
]
