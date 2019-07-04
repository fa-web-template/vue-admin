import Modal from '@/common/components/Modal'
import ResponsiveSize from '@/common/mixins/ResponsiveSize'
export default {
    mixins: [ResponsiveSize],
    components: {
        Modal
    },
    props: {
        btnStyle: {
            type: Object,
            default: () => {
                return {}
            }
        },
        btnIcon: {
            type: String,
            default: ''
        }
    },
    methods: {
        baseFormSubmit() {
            this.$refs.baseForm.submit()
        },
        afterSuccess() {
            this.$emit('get-data')
            this.$refs.modal.hidden()
        }
    }
}
