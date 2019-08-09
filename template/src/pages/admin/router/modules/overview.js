// import { toRoles } from '@/common/utils/role'
export default [
  {
    path: '/overview',
    component: () => import('@/common/layouts/Home'),
    redirect: '/overview/index',
    single: true,
    children: [
      {
        path: 'index',
        component: () => import('@/pages/admin/views/overview'),
        hidden: true,
        name: 'overview',
        meta: {
          isReplace: true,
          isIndex: true,
          title: '数据概览',
          icon: 'el-icon-ali-caigouleixingzhanbi'
        }
      }
    ]
  }
]
