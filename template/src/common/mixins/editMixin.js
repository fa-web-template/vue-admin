import formMixin from '@/common/mixins/formMixin'
import { success } from '@/common/utils/message'
import { mapActions } from 'vuex'
export default {
  mixins: [formMixin],
  props: {
    formData: {
      type: Object,
      required: true
    },
    submitBtnText: {
      type: String,
      default: '更新'
    }
  },
  methods: {
    ...mapActions(['update']),
    submiting(data) {
      this.handleSubmit(data)
        .then(this.submitAfter)
        .catch(this.done)
    },
    submitAfter(res) {
      this.done()
      const message = this.successMessage(res) || '更新成功'
      success(message)
      this.$emit('success')
      this.afterSuccess()
    },
    async handleSubmit(data) {
      return await this.update({
        module: this.module,
        data,
        id: this.formData.id
      })
    }
  }
}
