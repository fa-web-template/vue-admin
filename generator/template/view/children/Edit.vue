
<template>
  <div class="inner-container edit-shop-container">
    <v-card v-if="loaded"
            class="v-card card-body-scroll_y"
            :title="title">
      <base-edit class="full-tab-form"
                 v-bind="$v_data[module].common"
                 :form-data="data"
                 :module="module"
                 @get-data="getData" />
    </v-card>
  </div>
</template>
<script>
const __module = '{{ name }}'
import BaseEdit from '@/common/components/BaseEdit'
import { mapActions } from 'vuex'
import loading from '@/common/mixins/loading'
export default {
  components: {
    BaseEdit
  },
  mixins: [loading],
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
    }
  }
}
</script>
