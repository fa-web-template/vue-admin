<template>
  <v-card :title="title"
          class="table-card">
    <div slot="toolbar"
         class="toolbar">
      <modal-add :btn-size="respBtnSize"
                 v-bind="$v_data[module].common"
                 :form-data="formData"
                 :module="module"
                 title="添加{{ title }}"
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
        <el-table-column prop="created_at"
                         label="创建时间"
                         sortable="custom"
                         align="center"
                         min-width="120">
          <template slot-scope="scope">
            \{{ scope.row.created_at }}
          </template>
        </el-table-column>
        <el-table-column label="操作"
                         min-width="130"
                         align="center">
          <template slot-scope="scope">
            <modal-edit :title=" `编辑{{ title }} ${scope.row.name} 中`"
                        v-bind="$v_data[module].common"
                        :form-data="scope.row"
                        :module="module"
                        btn-size="mini"
                        @get-data="getData"
                        @refresh="$refs.table.refreshTable" />
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
const allOptions = []
import VTable from '@/common/components/VTable'
import Pagination from '@/common/components/Pagination'
import ModalEdit from '@/common/components/ModalEdit'
import ModalAdd from '@/common/components/ModalAdd'
import manageTableMixin from '@/common/mixins/manageTableMixin'
import getOptionNameMixin from '@/common/mixins/getOptionNameMixin'
import { mapState } from 'vuex'
export default {
  components: {
    VTable,
    Pagination,
    ModalEdit,
    ModalAdd
  },
  mixins: [manageTableMixin, getOptionNameMixin],
  props: {
    title: {
      type: String,
      default: '{{ title }}列表'
    }
  },
  data: () => ({
    formData: {},
    columns: [
      {
        prop: 'id',
        label: '编号',
        sortable: 'custom',
        minWidth: 100
      },
      {
        prop: 'name',
        label: '名称',
        sortable: 'custom'
      }
    ]
  }),
  computed: {
    ...mapState(allOptions)
  },
  async created() {
    await Promise.all([this.getData(), this.getAllOptions(allOptions)])
    this.loaded = true
    this.makeLoaded()
  }
}
</script>
