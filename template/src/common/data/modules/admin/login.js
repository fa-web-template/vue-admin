export default {
  isShowBackBtn: false,
  submitBtnText: '登录',
  formAttrs: {
    size: 'small',
  },
  formDesc: {
    number: {
      type: 'input',
      attrs: {
        placeholder: '请输入用户名',
      },
      slots: {
        prepend(h, data) {
          return h('i', { class: 'el-icon-ali-ai-user' })
        },
      },
    },
    password: {
      type: 'password',
      attrs: {
        placeholder: '请输入密码',
      },
      slots: {
        prepend(h, data) {
          return h('i', { class: 'el-icon-ali-mima' })
        },
      },
    },
  },
  rules: {},
}
