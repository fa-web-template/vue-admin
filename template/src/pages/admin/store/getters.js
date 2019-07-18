import getters from '@/common/store/getters'
export default {
    ...getters,
    token: state => state.auth_user.access_token,
    me: state => state.auth_user.me,
    meRoles: state => state.auth_user.me.roleArr,
    username: state => state.auth_user.me.name,
    device: state => state.app.device,
    isMobile: state => state.app.device === 'mobile',
    sidebar: state => state.app.sidebar,
    navList: state => state.app.sidebar.navList,
    searchList: state => state.app.sidebar.searchList,
    showAvatar: state => state.app.showAvatar,
    title: state => state.app.title
}
