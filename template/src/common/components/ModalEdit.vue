<template>
  <vue-fa-modal v-bind="modalAttrs"
                :before-open="onBeforeOpen"
                @submit="baseFormSubmit"
                @open="init">
    <ele-form v-bind="formAttrs"
              v-on="$listeners" />
    <el-button slot="footer-middle"
               :size="respBtnSize"
               @click="resetForm">
      重置
    </el-button>
  </vue-fa-modal>
</template>
<script>
import editMixin from '@/common/mixins/editMixin'
import modalFormMixin from '@/common/mixins/modalFormMixin'
import { warning } from '@/common/utils/message'
export default {
  name: 'ModalEdit',
  mixins: [editMixin, modalFormMixin],
  props: {
    title: {
      type: String,
      default: '编辑'
    },
    openBtnText: {
      type: String,
      default: '编辑'
    },
    submitBtnText: {
      type: String,
      default: '更新'
    }
  },
  methods: {
    onBeforeOpen() {
      if (this.isBatch && this.ids.length === 0) {
        warning('没有选中项')
        return false
      }
      return true
    }
  }
}
</script>
