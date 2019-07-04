import getters from '@/common/store/getters'
export default {
    ...getters,
    token: state => state.auth_user.access_token,
    username: state => state.auth_user.me.name,
    device: state => state.app.device,
    isMobile: state => state.app.device === 'mobile',
    sidebar: state => state.app.sidebar,
    showAvatar: state => state.app.showAvatar,
    title: state => state.app.title
}
