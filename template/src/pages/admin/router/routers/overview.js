export default [
    {
        path: '/overview',
        component: () => import('@/pages/admin/views/overview'),
        name: 'overview',
        meta: {
            isIndex: true,
            title: '数据概览'
        }
    }
]
