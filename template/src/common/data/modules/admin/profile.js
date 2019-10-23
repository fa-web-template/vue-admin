import rules from '../../rules'

export default {
  isShowBackBtn: false,
  isShowResetBtn: true,
  submitBtnText: '修改',
  formAttrs: {
    size: 'small',
  },
  formDesc: {
    name: { type: 'input', label: '用户名' },
    number: { type: 'input', label: '登录名' },
  },
  rules: {
    name: [...rules.required({ label: '用户名' })],
    number: [
      ...rules.required({ label: '登陆名' }),
      ...rules.between({
        max: 16,
        label: '登陆名',
      }),
    ],
  },
}
