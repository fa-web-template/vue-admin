<template>
  <v-card :title="title"
          class="table-card">
    <div slot="toolbar"
         class="toolbar">
      <modal-add :btn-size="respBtnSize"
                 :form-item="$v_data[module].add.item"
                 :get-form-data="$v_data[module].add.data"
                 :module="module"
                 title="添加用户"
                 @get-data="getData" />
      <el-button :size="respBtnSize"
                 type="danger"
                 @click="handleDelete(multipleSelection)">
        删除
      </el-button>
    </div>

    <v-table ref="table"
             :loading="loading"
             :data="state.data"
             :columns="columns"
             @selection-change="handleSelectionChange"
             @sort-change="handleSortChange">
      <template slot="append">
        <el-table-column label="性别"
                         prop="gender"
                         align="center"
                         sortable="custom">
          <template slot-scope="scope">
            <span>{{ scope.row.gender | sex }}</span>
          </template>
        </el-table-column>
        <el-table-column label="角色"
                         prop="role"
                         align="center"
                         sortable="custom">
          <template slot-scope="scope">
            <span>
              <el-tag v-for="(item,index) in byRoleName(scope.row.roleArr)"
                      :key="index"
                      size="mini">
                {{ item }}
              </el-tag>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作"
                         min-width="130"
                         align="center">
          <template v-if="isAdmin(scope.row)"
                    slot-scope="scope">
            <modal-edit :title=" `编辑用户 ${scope.row.name} 中`"
                        :form-item="$v_data[module].edit.item"
                        :current="scope.row"
                        :module="module"
                        btn-size="mini"
                        @get-data="getData"
                        @refresh="refreshTable" />
            <modal-edit :title=" `重置用户 ${scope.row.name} 密码`"
                        :form-item="$v_data[module].password.item"
                        :get-form-data="$v_data[module].password.data"
                        :current="scope.row"
                        btn-size="mini"
                        open-btn-text="重置密码"
                        submit-btn-text="更新"
                        :custom-submit="handleResetPassword.bind(this,scope.row.id)" />
            <el-button size="mini"
                       type="danger"
                       @click="handleDelete([scope.row.id])">
              删除
            </el-button>
          </template>
        </el-table-column>
      </template>
    </v-table>

    <pagination :state="state"
                :module="module"
                :get-data="getData"
                @before-change="beforeChange"
                @after-change="afterChange" />
  </v-card>
</template>
<script>
const __module = 'users'
const allOptions = ['roles']
import vTable from '@/common/components/Table'
import Pagination from '@/common/components/Pagination'
import ModalEdit from '@/common/components/ModalEdit'
import ModalAdd from '@/common/components/ModalAdd'
import ManageTable from '@/common/mixins/ManageTable'
import getOptionName from '@/common/mixins/getOptionName'
import { mapActions, mapState, mapMutations } from 'vuex'
import { success } from '@/common/utils/message'
export default {
    components: {
        vTable,
        Pagination,
        ModalEdit,
        ModalAdd
    },
    mixins: [ManageTable, getOptionName],
    props: {
        title: {
            type: String,
            default: '用户表'
        }
    },
    data: () => ({
        module: __module,
        columns: [
            {
                prop: 'name',
                label: '用户名',
                sortable: 'custom',
                minWidth: 100
            },
            {
                prop: 'number',
                label: '登录名',
                sortable: 'custom',
                minWidth: 100
            },
            {
                prop: 'phone',
                label: '电话号码',
                sortable: 'custom',
                minWidth: 100
            }
        ]
    }),
    computed: {
        ...mapState(allOptions),
        ...mapState({
            state: __module
        })
    },
    async created() {
        await this.getData()
        // await this.getAllOptions(allOptions)
        this.loaded = true
        this.makeLoaded()
    },
    methods: {
        ...mapActions(__module, ['resetPassword']),
        ...mapMutations(__module, {
            setOrder: 'update'
        }),
        isAdmin(row) {
            return !row.roleArr.includes(1)
        },
        byRoleName(roleArr) {
            return roleArr.map(item => {
                return this.byOptionName(item, this.roles)
            })
        },
        async handleResetPassword(id, data) {
            await this.resetPassword({ id, data })
            await success('重置成功！')
        }
    }
}
</script>
<style lang="scss" scoped>
.el-tag {
    margin-left: 5px;
}
</style>
