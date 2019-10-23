
<template>
  <div class="inner-container edit-shop-container">
    <v-card v-if="loaded"
            class="v-card card-body-scroll_y"
            :title="title">
      <base-edit class="full-tab-form"
                 v-bind="$v_data[module].common"
                 :form-data="data"
                 :module="module"
                 @success="success" />
    </v-card>
  </div>
</template>
<script>
const __module = '{{ name }}'
import BaseEdit from '@/common/components/BaseEdit'
import loadingMixin from '@/common/mixins/loadingMixin'
import { mapActions } from 'vuex'
export default {
  components: {
    BaseEdit
  },
  mixins: [loadingMixin],
  data: () => ({
    module: __module,
    loaded: false,
    data: {}
  }),
  computed: {
    id() {
      return this.$route.params.id
    },
    title() {
      return `编辑{{ title }}${this.data.name} 中`
    }
  },
  async created() {
    await this.initData()
    this.loaded = true
  },
  methods: {
    ...mapActions(__module, ['getData']),
    async initData() {
      this.data = await this.getData(this.id)
    },
    success() {
      this.$router.back()
    }
  }
}
</script>
