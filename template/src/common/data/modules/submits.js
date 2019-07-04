import rules from '../rules'
export default {
    common: {
        item: [
            {
                label: '代码',
                key: 'code',
                type: 'text',
                rules: [...rules.required({ label: '代码' })]
            },
            {
                label: '名称',
                key: 'name',
                type: 'text',

                rules: [...rules.required({ label: '名称' })]
            }
        ],
        data: () => ({
            code: '',
            name: ''
        })
    },

    search: {
        item: [
            {
                label: '代码',
                key: 'code',
                type: 'text',
                meta: {
                    operation: 'like'
                }
            },
            {
                label: '名称',
                key: 'name',
                type: 'text',
                meta: {
                    operation: 'like'
                }
            }
        ],
        data: () => ({
            code: '',
            name: ''
        })
    }
}
