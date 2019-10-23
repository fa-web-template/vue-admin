<template>
  <div class="inner-container add-shop-container">
    <v-card class="v-card card-body-scroll_y"
            title="添加{{ title }}">
      <base-add class="full-tab-form"
                v-bind="$v_data[module].common"
                :form-data="formData"
                :module="module"
                @success="success" />
    </v-card>
  </div>
</template>
<script>
const __module = '{{ name }}'
import BaseAdd from '@/common/components/BaseAdd'
import { success } from '@/common/utils/message'
export default {
  components: {
    BaseAdd
  },
  data: () => ({
    module: __module,
    formData: {}
  }),
  methods: {
    success() {
      this.$router.back()
    }
  }
}
</script>
