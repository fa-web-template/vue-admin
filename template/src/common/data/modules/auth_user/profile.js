import rules from '../../rules'
import { sexOptions } from '../../common'

export default {
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
      rules: [
        ...rules.required({ label: '登陆名' }),
        ...rules.between({
          max: 16,
          label: '登陆名'
        })
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
    }
  ]
}
