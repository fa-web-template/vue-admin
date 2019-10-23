import { warning } from '@/common/utils/message'
export default {
  props: {
    customSubmit: {
      type: Function,
      default: data => data
    },
    beforeSubmit: {
      type: Function,
      default: data => data
    },
    beforeVerify: {
      type: Function,
      default: data => data
    },
    successMessage: {
      type: Function,
      default: () => null
    },
    module: {
      type: String,
      default: ''
    },
    btnType: {
      type: String,
      default: ''
    },
    btnSize: {
      type: String,
      default: 'small'
    }
  },
  data: () => ({
    btnLoading: false
  }),
  methods: {
    done() {
      this.btnLoading = false
    },
    async submit(data) {
      if (!this.beforeVerify(data)) {
        return warning('请填写正确')
      }
      if (!this.module) {
        await this.customSubmit(data)
        this.resetForm()
        this.done()
        this.$emit('success')
        this.afterSuccess()
      } else {
        this.btnLoading = true
        data = this.beforeSubmit(data)
        await this.submiting(data)
      }
    },
    async submiting() {
      // Placeholder
    },
    afterSuccess() {
      // Placeholder
    },
    resetForm() {
      this.$nextTick(() => {
        this.$refs.baseForm.resetForm()
      })
    }
  }
}
