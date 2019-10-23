import rules from '../../rules'

let tmp_password = ''

export default {
  isShowBackBtn: false,
  isShowResetBtn: true,
  submitBtnText: '修改',
  formAttrs: {
    size: 'small',
  },
  formDesc: {
    password_current: { type: 'password', label: '旧密码' },
    password: { type: 'password', label: '新密码' },
    password_confirmation: { type: 'password', label: '确认密码' },
  },
  rules: {
    password_current: [...rules.required({ label: '旧密码' })],
    password: [
      ...rules.required({ label: '新密码' }),
      ...rules.between({
        min: 6,
        max: 18,
        label: '新密码',
      }),
      {
        validator: (rule, value, callback) => {
          tmp_password = value
          return callback()
        },
        trigger: 'change',
      },
    ],
    password_confirmation: [
      ...rules.required({ label: '确认密码' }),
      ...rules.between({
        min: 6,
        max: 18,
        label: '确认密码',
      }),
      {
        validator: (rule, value, callback) => {
          if (value !== tmp_password) {
            return callback(new Error('密码不一致'))
          }
          return callback()
        },
        trigger: 'blur',
      },
    ],
  },
}
