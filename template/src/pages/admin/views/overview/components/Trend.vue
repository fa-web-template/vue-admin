<template>
  <v-card title="业绩走势">
    <div slot="toolbar"
         class="toolbar">
      <base-form ref="trendSearchForm"
                 :show-label="false"
                 :form-item="search.item"
                 :get-form-data="search.data"
                 :inline="true"
                 :need-submit-btn="false"
                 :need-reset-btn="false"
                 @submit="submit" />
      <el-button :size="respBtnSize"
                 @click="changeType">
        切换
      </el-button>
    </div>
    <ve-chart v-if="!loading"
              ref="chart_trend"
              :data="trend"
              :data-zoom="zoom"
              :settings="settings" />
  </v-card>
</template>
<script>
const __module = 'overview.trend'
import loading from '@/common/mixins/loading'
import BaseForm from '@/common/components/BaseForm'
import ResponsiveSize from '@/common/mixins/ResponsiveSize'
export default {
  components: {
    BaseForm
  },
  mixins: [ResponsiveSize, loading],
  data() {
    const types = ['line', 'histogram']
    const index = 0
    return {
      module: __module,
      types: types,
      type_index: index,
      trend: {
        columns: ['date', 'price'],
        rows: []
      },
      settings: {
        labelMap: {
          price: '金额'
        },
        type: types[index]
      },
      zoom: [
        {
          type: 'slider',
          start: 0
        }
      ]
    }
  },
  computed: {
    search() {
      return this._.get(this.$v_data, this.module).search
    }
  },
  async mounted() {
    await this.$nextTick(async () => {
      await this.handleSubmit()
      this.$refs.chart_trend.echarts.resize()
      this.makeLoaded()
    })
  },
  methods: {
    async submit(data) {
      if (!data.date) {
        data.date = []
      }
      const res = await this.$axios.get('/data/analysis', data)
      this.trend.rows = res
    },
    async handleSubmit() {
      await this.$refs.trendSearchForm.submit()
    },
    async changeType() {
      this.type_index++
      if (this.type_index >= this.types.length) {
        this.type_index = 0
      }
      this.settings.type = this.types[this.type_index]
    }
  }
}
</script>
<style lang="scss" scoped>
.toolbar .el-form {
    padding-top: 0.7rem;
}
</style>
