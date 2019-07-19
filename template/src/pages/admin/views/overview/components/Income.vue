<template>
  <v-card title="收入信息">
    <div slot="toolbar"
         class="toolbar">
    </div>
    <div class="income-container">
      <div v-for="(item,index) in getAllow"
           :key="item.prop"
           class="income-item allow">
        <v-card :need-header="false">
          <div class="info-box">
            <div class="icon-container"
                 :style="{background:item.color}">
              <i :class="['icon',item.icon]"></i>
            </div>
            <div class="content">
              <count-to :key="index"
                        :start-val="0"
                        :end-val="data[item.prop] | number"
                        :duration="3000"
                        prefix="￥"
                        class="count" />
              <p class="title">\{{ item.title }}</p>
            </div>
          </div>
        </v-card>
      </div>
    </div>
  </v-card>
</template>
<script>
const allowRoles = ['system']
// import hasRole from '@/common/mixins/hasRole'
import CountTo from 'vue-count-to'
import ResponsiveSize from '@/common/mixins/ResponsiveSize'
export default {
    components: { CountTo },
    filters: {
        number(value) {
            return parseInt(value)
        }
    },
    mixins: [ResponsiveSize],
    props: {
        // data: {
        //     type: Object,
        //     required: true
        // }
    },
    data: () => ({
        data: {
            total: 3000,
            deposit: 3000,
            balance: 3000,
            profit: 3000
        },
        countData: [
            {
                prop: 'total',
                title: '总额',
                icon: 'el-icon-ali-jiaoshi',
                color: '#2d8cf0'
            },
            {
                prop: 'deposit',
                title: '定金',
                icon: 'el-icon-ali-jiaoshi',
                color: '#19be6b'
            },
            {
                prop: 'balance',
                title: '余款',
                icon: 'el-icon-ali-jiaoshi',
                color: '#ff9900'
            },
            {
                prop: 'profit',
                title: '利润',
                icon: 'el-icon-ali-jiaoshi',
                color: '#bd72ff',
                roles: allowRoles
            }
        ]
    }),
    computed: {
        getAllow() {
            return this.countData.filter(item => {
                if (!item.roles) return true
                // return this.hasPermission(item.roles)
                return true
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.income-container {
    @include flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 0.2vh 0;
    .income-item {
        &:nth-child(n + 5) {
            margin-top: 7px;
        }
        width: 21%;
        .info-box {
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
                    font-size: 1.8rem;
                }
            }
        }
    }
}
</style>
<style lang="scss">
.income-container {
    .el-card__body {
        padding: 0;
    }
}
</style>
