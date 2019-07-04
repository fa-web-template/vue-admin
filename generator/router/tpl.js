export default [
    {
        path: "/{{ name }}",
        component: () => import("@/pages/admin/views/{{ name }}"),
        name: "{{ name }}",
        meta: {
            title: "{{ title }}"
        }
    }
]
