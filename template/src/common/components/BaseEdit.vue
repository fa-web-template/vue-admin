<template>
  <ele-form v-bind="formAttrs" />
</template>

<script>
import editMixin from '@/common/mixins/editMixin'
import baseFormMixin from '@/common/mixins/baseFormMixin'
export default {
  name: 'BaseEdit',
  mixins: [editMixin, baseFormMixin]
}
</script>
