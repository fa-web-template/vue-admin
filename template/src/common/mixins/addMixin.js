import formMixin from '@/common/mixins/formMixin'
import { success } from '@/common/utils/message'
import { mapActions } from 'vuex'
export default {
  mixins: [formMixin],
  props: {
    submitBtnText: {
      type: String,
      default: '添加'
    }
  },
  methods: {
    ...mapActions(['add']),
    submiting(data) {
      this.handleSubmit(data)
        .then(this.submitAfter)
        .catch(this.done)
    },
    submitAfter(res) {
      this.resetForm()
      this.done()
      const message = this.successMessage(res) || '添加成功'
      success(message)
      this.$emit('success')
      this.afterSuccess()
    },
    async handleSubmit(data) {
      return await this.add({
        module: this.module,
        data
      })
    }
  }
}
