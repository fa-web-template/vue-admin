<template>
  <v-card title="营业额分析">
    <div slot="toolbar"
         class="toolbar">
      <base-form ref="turnoverSearchForm"
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
              ref="chart_turnover"
              :data="turnover"
              :data-zoom="zoom"
              :settings="settings" />
  </v-card>
</template>
<script>
const __module = 'overview.turnover'
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
            turnover: {
                columns: ['date', 'profit', 'total', 'total_cost'],
                rows: []
            },
            settings: {
                labelMap: {
                    profit: '盈利',
                    total: '总额',
                    total_cost: '成本'
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
        await this.$nextTick(async() => {
            await this.handleSubmit()
            this.$refs.chart_turnover.echarts.resize()
            this.makeLoaded()
        })
    },
    methods: {
        async submit(data) {
            if (!data.date) {
                data.date = []
            }
            // const res = await this.$axios.get('/data/analysis', data)
            // this.turnover.rows = res
        },
        async handleSubmit() {
            await this.$refs.turnoverSearchForm.submit()
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
