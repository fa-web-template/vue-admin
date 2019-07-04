import { mapActions } from 'vuex'
export default {
    filters: {
        byOptionName(id, module) {
            const item = module.options.find(el => el.value === id)
            return item ? item.label : ''
        }
    },
    methods: {
        ...mapActions(['getOptions']),
        async getAllOptions(modules) {
            modules.forEach(async item => {
                await this.getOptions(item)
            })
        },
        byOptionName(id, module) {
            const item = module.options.find(el => el.value === id)
            return item ? item.label : ''
        }
    }
}
