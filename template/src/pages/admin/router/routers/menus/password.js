export default [
    {
        path: '/password',
        component: () => import('@/pages/admin/views/password'),
        name: 'password',
        meta: {
            title: '修改用户密码'
        }
    }
]
