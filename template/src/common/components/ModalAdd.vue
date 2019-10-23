<template>
  <vue-fa-modal v-bind="modalAttrs"
                @submit="baseFormSubmit"
                @open="init">
    <ele-form v-bind="formAttrs" />
    <el-button slot="footer-middle"
               :size="respBtnSize"
               @click="resetForm">
      重置
    </el-button>
  </vue-fa-modal>
</template>
<script>
import addMixin from '@/common/mixins/addMixin'
import modalFormMixin from '@/common/mixins/modalFormMixin'
export default {
  name: 'ModalAdd',
  mixins: [addMixin, modalFormMixin],
  props: {
    title: {
      type: String,
      default: '添加'
    },
    openBtnText: {
      type: String,
      default: '添加'
    },
    submitBtnText: {
      type: String,
      default: '添加'
    },
    btnType: {
      type: String,
      default: 'primary'
    }
  }
}
</script>
