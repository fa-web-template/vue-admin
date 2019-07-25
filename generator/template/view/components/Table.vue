<template>
  <v-card :title="title"
          class="table-card">
    <div slot="toolbar"
         class="toolbar">
      <modal-add :btn-size="respBtnSize"
                 :form-item="$v_data[module].common.item"
                 :get-form-data="$v_data[module].common.data"
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
        <el-table-column label="操作"
                         min-width="130"
                         align="center">
          <template slot-scope="scope">
            <modal-edit :title=" `编辑{{ title }} ${scope.row.name} 中`"
                        :form-item="$v_data[module].common.item"
                        :current="scope.row"
                        :module="module"
                        btn-size="mini"
                        @get-data="getData" />
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
const __module = '{{ name }}'
const allOptions = []
import vTable from '@/common/components/Table'
import Pagination from '@/common/components/Pagination'
import ModalEdit from '@/common/components/ModalEdit'
import ModalAdd from '@/common/components/ModalAdd'
import ManageTable from '@/common/mixins/ManageTable'
import { mapState, mapMutations } from 'vuex'
export default {
  components: {
    vTable,
    Pagination,
    ModalEdit,
    ModalAdd
  },
  mixins: [ManageTable],
  props: {
    title: {
      type: String,
      default: '{{ title }}表'
    }
  },
  data: () => ({
    module: __module,
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
    ...mapState({
      state: __module
    })
  },
  async created() {
    await this.getData()
    await this.getAllOptions(allOptions)
    this.loaded = true
    this.makeLoaded()
  },
  methods: {
    ...mapMutations(__module, {
      setOrder: 'update'
    })
  }
}
</script>