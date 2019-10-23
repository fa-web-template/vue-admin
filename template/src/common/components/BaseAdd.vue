<template>
  <ele-form v-bind="formAttrs" />
</template>

<script>
import addMixin from '@/common/mixins/addMixin'
import baseFormMixin from '@/common/mixins/baseFormMixin'
export default {
  name: 'BaseAdd',
  mixins: [addMixin, baseFormMixin]
}
</script>
