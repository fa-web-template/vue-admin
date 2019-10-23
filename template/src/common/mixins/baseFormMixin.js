import responsiveSizeMixin from '@/common/mixins/responsiveSizeMixin'
export default {
  mixins: [responsiveSizeMixin],
  data: () => ({
    innerFormData: {}
  }),
  computed: {
    formAttrs() {
      const base = {
        ref: 'baseForm',
        formAttrs: {
          size: this.respBtnSize
        },
        isLoading: this.btnLoading,
        isShowResetBtn: true,
        submitBtnText: this.submitBtnText,
        formData: this.innerFormData,
        requestFn: this.submit
      }
      return Object.assign({}, base, this.$attrs)
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.innerFormData = this._.clone(this.formData)
    }
  }
}
