// import { toRoles } from '@/common/utils/role'
export default [
    {
        path: '/users',
        component: () => import('@/common/layouts/Home'),
        redirect: '/users/list',
        name: 'users',
        meta: {
            // roles: toRoles(['system']),
            title: '用户管理',
            icon: 'el-icon-ali-icon_yuangongguanli'
        },
        children: [
            {
                path: 'list',
                component: () => import('@/pages/admin/views/users'),
                name: 'usersList',
                meta: {
                    icon: 'el-icon-ali-yonghu',
                    // roles: toRoles(['system']),
                    title: '用户列表'
                }
            }
        ]
    }
]
