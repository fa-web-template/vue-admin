<template>
  <v-card title="业绩走势">
    <div slot="toolbar"
         class="toolbar">
      <ele-form ref="trendSearchForm"
                v-bind="search"
                :form-data="search.getFormData()"
                :request-fn="submit" />
      <el-button size="mini"
                 type="primary"
                 @click="handleSubmit">
        搜索
      </el-button>
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
import loadingMixin from '@/common/mixins/loadingMixin'
import responsiveSizeMixin from '@/common/mixins/responsiveSizeMixin'
export default {
  mixins: [responsiveSizeMixin, loadingMixin],
  data() {
    const types = ['line', 'histogram']
    const index = 0
    return {
      module: __module,
      types: types,
      type_index: index,
      trend: {
        columns: ['date', 'price', 'profit'],
        rows: []
      },
      settings: {
        labelMap: {
          price: '金额',
          profit: '利润'
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
      //   const res = await this.$axios.get('/data/analysis', data)
      const res = new Array(30).fill().map((item, index) => ({
        date: `2019-08-${index + 1}`,
        price: Math.random() * 10000,
        profit: Math.random() * 5000
      }))
      this.trend.rows = res
    },
    handleSubmit() {
      this.$refs.trendSearchForm.handleSubmitForm()
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
