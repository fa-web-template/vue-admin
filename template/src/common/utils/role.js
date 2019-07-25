const system_value = 1
const role_config = [
    {
        value: system_value,
        label: 'system',
        index: '/overview'
    },
    {
        value: 2,
        label: 'manager',
        index: '/overview'
    },
    {
        value: 3,
        label: 'fe',
        index: '/placards'
    },
    {
        value: 4,
        label: 're',
        index: '/placards'
    }
]

export const toRoles = roleNames => {
    let roles = roleNames.map(name => {
        const rule = role_config.find(item => item.label === name)
        return rule ? rule.value : null
    })
    roles = roles.filter(item => item)
    return roles.length ? roles : null
}

export const findRoleHome = roleIndexs => {
    roleIndexs = roleIndexs.sort((a, b) => a - b)
    const res = role_config.find(item => {
        return roleIndexs.find(index => item.value === index)
    })
    return res ? res.index : '/error/404'
}

export const hasPermission = (roles, route) => {
    const isSystem = roles.includes(system_value)
    if (isSystem) {
        return true
    }
    if (route.meta && route.meta.roles) {
        return roles.some(role => route.meta.roles.includes(role))
    } else {
        return true
    }
}
