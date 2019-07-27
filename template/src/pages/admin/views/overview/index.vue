<template>
  <div v-if="loaded"
       class="inner-container overview-container">
    <el-row>
      <income :data="order_data" />
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <turnover ref="turnover" />
      </el-col>
    </el-row>
    <el-divider content-position="center">订单分析</el-divider>
    <el-row :gutter="10">
      <el-col :span="8">
        <v-card title="产品分析">
          <ve-pie ref="chart_product"
                  :data="product" />
        </v-card>
      </el-col>
      <el-col :span="8">
        <v-card title="需求分析">
          <ve-pie ref="chart_demand"
                  :data="product" />
        </v-card>
      </el-col>
      <el-col :span="8">
        <v-card title="支付方式">
          <ve-pie ref="chart_pay"
                  :data="product" />
        </v-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
const __module = 'overview'
import 'echarts/lib/component/dataZoom'
import 'v-charts/lib/style.css'
import loading from '@/common/mixins/loading'
import VePie from 'v-charts/lib/pie.common'
import Income from './components/Income'
import Turnover from './components/Turnover'
export default {
    components: {
        VePie,
        Income,
        Turnover
    },
    mixins: [loading],
    data() {
        return {
            module: __module,
            loaded: false,
            product: {
                columns: ['name', 'clients_count'],
                rows: [
                    {
                        date: '2018-01-01',
                        clients_count: '200'
                    },
                    {
                        date: '2018-01-02',
                        clients_count: '500'
                    }
                ]
            },
            order_data: {}
        }
    },
    async created() {
        await this.$nextTick(async () => {
            await this.init()
            Object.keys(this.$refs).map(item => {
                if (item.indexOf('chart') === 0) {
                    this.$refs[item].echarts.resize()
                }
            })
            this.makeLoaded()
        })
    },
    methods: {
        async init() {
            await this.getData()
            this.loaded = true
        },
        async getData() {
            // const data = await this.$axios.get('/index')
            // this.age.rows = data.age
            // this.career.rows = data.career
            // this.demand.rows = data.demand
            // this.product.rows = data.product
            // this.channel.rows = data.channel
            // this.pay.rows = data.pay
            // this.order_data = data.order_data
        }
    }
}
</script>
<style lang="scss" scoped>
.inner-container {
    overflow-y: auto !important;
}
.info .info-box {
    @include flex;
    .icon-container {
        width: 20%;
        @include sub-center;
        .icon {
            color: white;
            font-size: 2.5rem;
        }
    }
    .content {
        flex: 1;
        @include sub-center;
        @include flex-column;
        line-height: 2;
        .count {
            font-size: 2.5rem;
        }
    }
}
</style>
<style lang="scss" scoped>
.inner-container {
    overflow-y: auto !important;
    /deep/ .turnover-type-select {
        .el-input__inner {
            border: none;
        }
    }
}
.info .info-box {
    @include flex;
    .icon-container {
        width: 20%;
        @include sub-center;
        .icon {
            color: white;
            font-size: 2.5rem;
        }
    }
    .content {
        flex: 1;
        @include sub-center;
        @include flex-column;
        line-height: 2;
        .count {
            font-size: 2.5rem;
        }
    }
}
</style>
