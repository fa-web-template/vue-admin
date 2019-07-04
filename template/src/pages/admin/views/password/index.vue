<template>
  <div class="inner-container">
    <v-card class="card"
            :title="$route.meta.title">
      <base-form :form-item="$v_data[module].password.item"
                 :get-form-data="$v_data[module].password.data"
                 btn="修改"
                 @submit="submit" />
    </v-card>
  </div>
</template>
<script>
const __module = 'auth_user'
import { success } from '@/common/utils/message'
import BaseForm from '@/common/components/BaseForm'
import { mapActions } from 'vuex'
export default {
    components: {
        BaseForm
    },
    data: () => ({
        module: __module
    }),
    methods: {
        ...mapActions(__module, ['resetPassword']),
        async submit(data) {
            await this.resetPassword({
                data
            })
            await success('修改成功！')
            this.$router.push('/login')
        }
    }
}
</script>
<style lang="scss" scoped>
.card {
    height: 100%;
}
</style>
