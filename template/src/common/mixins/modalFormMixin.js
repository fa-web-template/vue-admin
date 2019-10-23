import VueFaModal from 'vue-fa-modal'
import responsiveSizeMixin from '@/common/mixins/responsiveSizeMixin'
export default {
  mixins: [responsiveSizeMixin],
  components: {
    VueFaModal
  },
  props: {
    formData: {
      type: Object,
      required: true
    },
    btnStyle: {
      type: Object,
      default: () => {
        return {}
      }
    },
    btnIcon: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    innerFormData: {}
  }),
  computed: {
    modalAttrs() {
      const base = {
        ref: 'modal',
        openBtnSize: this.btnSize,
        otherBtnSize: this.respBtnSize
      }
      const keys = [
        'title',
        'openBtnText',
        'submitBtnText',
        'btnType',
        'btnIcon',
        'btnStyle',
        'btnLoading',
        'disabled'
      ]
      return keys.reduce((acc, cur) => {
        return Object.assign(acc, {
          [cur]: this[cur]
        })
      }, base)
    },
    formAttrs() {
      const base = {
        ref: 'baseForm',
        isShowBackBtn: false,
        isShowSubmitBtn: false,
        formData: this.innerFormData,
        requestFn: this.submit
      }
      return Object.assign({}, base, this.$attrs)
    }
  },
  methods: {
    init() {
      this.innerFormData = this._.clone(this.formData)
    },
    baseFormSubmit() {
      this.$refs.baseForm.handleValidateForm()
    },
    afterSuccess() {
      this.$emit('get-data')
      this.$emit('refresh')
      this.$refs.modal.hidden()
    }
  }
}
