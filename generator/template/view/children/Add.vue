<template>
  <div class="inner-container add-shop-container">
    <v-card class="v-card card-body-scroll_y"
            title="添加{{ title }}">
      <base-add class="full-tab-form"
                :form-item="$v_data[module].common.item"
                :get-form-data="$v_data[module].common.data"
                :before-submit="beforeSubmit"
                :is-upload="true"
                :module="module" />
    </v-card>
  </div>
</template>
<script>
const __module = '{{ name }}'
import BaseAdd from '@/common/components/BaseAdd'
export default {
  components: {
    BaseAdd
  },
  data: () => ({
    module: __module
  }),
  methods: {
    beforeSubmit(data) {
      return data
    }
  }
}
</script>
