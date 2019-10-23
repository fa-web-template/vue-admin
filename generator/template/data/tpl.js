import rules from '../rules'
export default {
  common: {
    formDesc: {
      name: {
        label: '名称',
        type: 'input'
      }
    },
    rules: {
      name: [...rules.required({ label: '名称' })]
    }
  },

  search: {
    formDesc: {
      id: {
        label: '编号',
        type: 'input'
      },
      name: {
        label: '名称',
        type: 'input',
        meta: {
          operation: 'like'
        }
      }
    },
    getFormData: () => ({
      id: 1,
      name: ''
    })
  }
}
