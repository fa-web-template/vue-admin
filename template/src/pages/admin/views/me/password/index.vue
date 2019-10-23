<template>
  <div class="inner-container">
    <v-card class="card card-body-scroll_y"
            :title="$route.meta.title">
      <div class="container">
        <ele-form v-bind="$v_data[module].password"
                  :form-data="formData"
                  :request-fn="submit"
                  @request-success="handleRequestSuccess" />
      </div>
    </v-card>
  </div>
</template>
<script>
const __module = 'admin'
import { success } from '@/common/utils/message'
import { mapActions } from 'vuex'
export default {
  data: () => ({
    module: __module,
    formData: {}
  }),
  methods: {
    ...mapActions(__module, ['resetPassword']),
    async submit(data) {
      await this.resetPassword({
        data
      })
    },
    async handleRequestSuccess() {
      await success('修改成功')
      this.$router.push('/login')
    }
  }
}
</script>
<style lang="scss" scoped>
.card {
  height: 100%;
}
.container {
  margin: 0 auto;
}
</style>
