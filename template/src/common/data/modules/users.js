import { sexOptions } from '../common'
import rules from '../rules'
export default {
  add: {
    item: (() => {
      let tmp_password = ''
      return [
        {
          label: '用户名',
          key: 'name',
          type: 'text',
          rules: [...rules.required({ label: '用户名' })]
        },
        {
          label: '登陆名',
          key: 'number',
          type: 'text',
          meta: {
            row: 3
          },
          rules: [...rules.required({ label: '登陆名' })]
        },
        {
          label: '密码',
          key: 'password',
          type: 'password',
          rules: [
            ...rules.required({ label: '密码' }),
            ...rules.between({
              min: 6,
              max: 18,
              label: '密码'
            }),
            {
              validator: (rule, value, callback) => {
                tmp_password = value
                return callback()
              },
              trigger: 'change'
            }
          ]
        },
        {
          label: '确认密码',
          key: 'password_confirmation',
          type: 'password',
          rules: [
            ...rules.required({ label: '确认密码' }),
            ...rules.between({
              min: 6,
              max: 18,
              label: '密码'
            }),
            {
              validator: (rule, value, callback) => {
                if (value !== tmp_password) {
                  return callback(new Error('密码不一致'))
                }
                return callback()
              },
              trigger: 'blur'
            }
          ]
        },
        {
          label: '性别',
          key: 'gender',
          type: 'radio',
          meta: {
            options: sexOptions()
          },
          rules: [
            ...rules.required({
              message: '必须选择一个性别',
              trigger: 'change'
            })
          ]
        },
        {
          label: '电话',
          key: 'phone',
          type: 'number',
          rules: [
            ...rules.required({ label: '电话' }),
            ...rules.phoneNumber()
          ]
        },
        {
          label: '角色',
          key: 'roleArr',
          type: 'select',
          meta: {
            filterable: true,
            multiple: true,
            option_module: 'roles'
          },
          rules: [
            ...rules.required({
              type: 'array',
              message: '至少选择一个角色',
              trigger: 'change'
            })
          ]
        }
      ]
    })(),
    data: () => ({
      name: '',
      number: '',
      password: '',
      password_confirmation: '',
      gender: '',
      phone: '',
      roleArr: ''
    })
  },

  edit: {
    item: [
      {
        label: '用户名',
        key: 'name',
        type: 'text',
        rules: [...rules.required({ label: '用户名' })]
      },
      {
        label: '登陆名',
        key: 'number',
        type: 'text',
        meta: {
          row: 3
        },
        rules: [...rules.required({ label: '登陆名' })]
      },
      {
        label: '电话',
        key: 'phone',
        type: 'text',
        rules: [
          ...rules.required({ label: '电话' }),
          ...rules.phoneNumber()
        ]
      },
      {
        label: '性别',
        key: 'gender',
        type: 'radio',
        meta: {
          options: sexOptions(false)
        },
        rules: [
          ...rules.required({
            message: '必须选择一个性别',
            trigger: 'change'
          })
        ]
      },
      {
        label: '角色',
        key: 'roleArr',
        type: 'select',
        meta: {
          multiple: true,
          option_module: 'roles',
          filterable: true
        },
        rules: [
          ...rules.required({
            type: 'array',
            message: '至少选择一个角色',
            trigger: 'change'
          })
        ]
      }
    ]
  },

  password: {
    item: (() => {
      let tmp_password = ''
      return [
        {
          label: '新密码',
          key: 'password',
          type: 'password',
          rules: [
            ...rules.required({ label: '新密码' }),
            ...rules.between({
              min: 6,
              max: 18,
              label: '新密码'
            }),
            {
              validator(rule, value, callback) {
                tmp_password = value
                return callback()
              },
              trigger: 'change'
            }
          ]
        },
        {
          label: '确认密码',
          key: 'password_confirmation',
          type: 'password',
          rules: [
            ...rules.required({ label: '确认密码' }),
            ...rules.between({
              min: 6,
              max: 18,
              label: '确认密码'
            }),
            {
              validator(rule, value, callback) {
                if (value !== tmp_password) {
                  return callback(new Error('密码不一致'))
                }
                return callback()
              },
              trigger: 'blur'
            }
          ]
        }
      ]
    })(),

    data: () => ({
      password: '',
      password_confirmation: ''
    })
  },

  search: {
    item: [
      {
        label: '用户名',
        key: 'name',
        type: 'text',
        meta: {
          operation: 'like'
        }
      },
      {
        label: '登录名',
        key: 'number',
        type: 'text',
        meta: {
          operation: 'like'
        }
      },
      {
        label: '电话',
        key: 'phone',
        type: 'text',
        meta: {
          operation: 'like'
        }
      },
      {
        label: '性别',
        key: 'gender',
        type: 'select',
        meta: {
          operation: '=',
          options: sexOptions(true)
        }
      },
      {
        label: '角色',
        key: 'role_id',
        type: 'select',
        meta: {
          operation: '=',
          outside: true,
          option_module: 'roles',
          filterable: true
        }
      }
    ],
    data: () => ({
      name: '',
      number: '',
      phone: '',
      gender: '',
      role_id: ''
    })
  }
}
