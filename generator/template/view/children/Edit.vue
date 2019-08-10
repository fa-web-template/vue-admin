
<template>
  <div class="inner-container edit-shop-container">
    <v-card v-if="loaded"
            class="v-card card-body-scroll_y"
            :title="title">
      <base-edit class="full-tab-form"
                 :form-item="$v_data[module].admin.item"
                 :current="data"
                 :before-submit="beforeSubmit"
                 :module="module"
                 :is-upload="true"
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
    this.data = await this.initData()
    this.loaded = true
  },
  methods: {
    ...mapActions(__module, ['getData']),
    async initData() {
      const data = await this.getData(this.id)
      return data
    },
    beforeSubmit(data) {
      return data
    }
  }
}
</script>